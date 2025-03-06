import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import type { Session, User } from "next-auth";
import { 
  isDevelopment, 
  appBaseUrl,
  dashboardUrl,
  getBaseCookieOptions,
  getCookiePrefix,
  getCsrfCookiePrefix,
  transformLocalhost
} from "@/lib/env-config";
import { logger } from "@/lib/logger";

// Create a module-specific logger
const log = logger.forModule("auth");

if (!process.env.AUTH_GITHUB_ID || !process.env.AUTH_GITHUB_SECRET) {
  throw new Error("Missing GitHub OAuth credentials. Please add AUTH_GITHUB_ID and AUTH_GITHUB_SECRET to your .env.local file.");
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("Missing NEXTAUTH_SECRET. Please add NEXTAUTH_SECRET to your .env.local file.");
}

// Set NEXTAUTH_URL dynamically based on environment if not already set
if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = appBaseUrl;
  log.info(`Setting NEXTAUTH_URL to ${appBaseUrl}`);
}

// Additional validation to ensure NEXTAUTH_URL isn't pointing to localhost in production
if (!isDevelopment && process.env.NEXTAUTH_URL?.includes('localhost')) {
  log.warn(`NEXTAUTH_URL contains "localhost" in production environment: ${process.env.NEXTAUTH_URL}`);
  // Override with the correct URL
  process.env.NEXTAUTH_URL = appBaseUrl;
  log.info(`Corrected NEXTAUTH_URL to ${appBaseUrl}`);
}

// Extend the User type to include GitHub username
interface GithubUser extends User {
  gh_username?: string;
  username?: string;
}

// Extend the Session type to include username
interface CustomSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    username?: string;
  };
}

// Type for the session user that can be modified
interface MutableSessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string;
}

export const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      // Disable PKCE for GitHub provider to fix the error
      checks: ["state"],
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          gh_username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login", // Error code passed in query string as ?error=
    signOut: "/login",
    newUser: "/dashboard", // Redirect new users to the dashboard
  },
  session: {
    strategy: "jwt" as const, // Use JWT for session handling
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `${getCookiePrefix()}next-auth.session-token`,
      options: getBaseCookieOptions(),
    },
    callbackUrl: {
      name: `${getCookiePrefix()}next-auth.callback-url`,
      options: getBaseCookieOptions(),
    },
    csrfToken: {
      name: `${getCsrfCookiePrefix()}next-auth.csrf-token`,
      options: {
        ...getBaseCookieOptions(false),
        // For CSRF tokens in production, DO NOT set a domain to enhance security
        domain: isDevelopment ? ".localhost" : undefined,
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url }) {
      log.debug(`Redirect callback called with URL: ${url}`);

      // If the URL contains "localhost" in production, replace it with the proper domain
      if (!isDevelopment && url.includes("localhost")) {
        const fixedUrl = transformLocalhost(url);
        
        // Special handling for GitHub callback URLs
        if (fixedUrl.includes("/api/auth/callback/github")) {
          log.debug(`Fixed GitHub callback URL: ${fixedUrl}`);
          return dashboardUrl;
        }
        
        return fixedUrl.includes("/api/auth") ? dashboardUrl : fixedUrl;
      }

      // Auth callback or unknown URL - always go to dashboard
      if (url.includes("/api/auth/callback") || (!url.startsWith("/") && !url.startsWith(appBaseUrl))) {
        log.debug(`Auth callback or unknown URL, redirecting to dashboard`);
        return dashboardUrl;
      }

      // Relative URL - prepend app URL
      if (url.startsWith("/")) {
        const fullUrl = `${appBaseUrl}${url}`;
        log.debug(`Relative URL, redirecting to: ${fullUrl}`);
        return fullUrl;
      }

      // URL is already on app domain - allow it
      log.debug(`URL already on app domain, allowing: ${url}`);
      return url;
    },
    async jwt({ token, user }) {
      // Add user data to the token when first signing in
      if (user) {
        token.user = user as GithubUser;
      }
      return token;
    },
    async session({ session, token }) {
      // Add the user's ID and GitHub username to the session
      if (session.user) {
        const mutableUser = session.user as MutableSessionUser;
        mutableUser.id = token.sub as string;

        // Add GitHub username if available
        const tokenUser = token.user as GithubUser | undefined;
        if (tokenUser?.gh_username) {
          mutableUser.username = tokenUser.gh_username;
        }
      }
      return session as CustomSession;
    },
  },
  debug: isDevelopment,
  events: {
    async signIn(message) {
      log.debug(`signIn event`, { message });
    },
    async signOut(message) {
      log.debug(`signOut event`, { message });
    },
    async createUser(message) {
      log.debug(`createUser event`, { message });
    },
  }
} satisfies NextAuthConfig;

// Log initialization in development
if (isDevelopment) {
  log.debug(`NextAuth initialized`, {
    providers: authConfig.providers.map(p => p.id),
    pages: authConfig.pages,
    debug: authConfig.debug,
  });
}

export const { auth, handlers } = NextAuth(authConfig);

// Helper function to get the current session
export async function getSession(): Promise<CustomSession | null> {
  const session = await auth();
  return session as CustomSession | null;
} 