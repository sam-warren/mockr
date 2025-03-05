import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import type { Session, User } from "next-auth";

if (!process.env.AUTH_GITHUB_ID || !process.env.AUTH_GITHUB_SECRET) {
  throw new Error("Missing GitHub OAuth credentials. Please add AUTH_GITHUB_ID and AUTH_GITHUB_SECRET to your .env.local file.");
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("Missing NEXTAUTH_SECRET. Please add NEXTAUTH_SECRET to your .env.local file.");
}

// Check if we're in a Vercel deployment environment
const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;
const isDevelopment = process.env.NODE_ENV === "development";
const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "mockr.io";

// Calculate the base URL for auth callbacks based on environment
const baseAuthUrl = isDevelopment 
  ? "http://app.localhost:3000" 
  : `https://app.${rootDomain}`;

// Set NEXTAUTH_URL dynamically based on environment if not already set
if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = baseAuthUrl;
  console.log(`[auth] Setting NEXTAUTH_URL to ${baseAuthUrl}`);
}

// Additional validation to ensure NEXTAUTH_URL isn't pointing to localhost in production
if (!isDevelopment && process.env.NEXTAUTH_URL?.includes('localhost')) {
  console.warn(`[auth][warning] NEXTAUTH_URL contains "localhost" in production environment: ${process.env.NEXTAUTH_URL}`);
  // Override with the correct URL
  process.env.NEXTAUTH_URL = baseAuthUrl;
  console.log(`[auth] Corrected NEXTAUTH_URL to ${baseAuthUrl}`);
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
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When in development, set the domain to the root localhost domain
        // to allow cookie sharing between subdomains
        domain: isDevelopment
          ? ".localhost"
          : VERCEL_DEPLOYMENT
            ? `.${rootDomain}`
            : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
    // Add explicit configuration for other cookies
    callbackUrl: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.callback-url`,
      options: {
        sameSite: "lax",
        path: "/",
        domain: isDevelopment
          ? ".localhost"
          : VERCEL_DEPLOYMENT
            ? `.${rootDomain}`
            : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
    csrfToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Host-" : ""}next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: isDevelopment
          ? ".localhost"
          : undefined, // For CSRF tokens in production, DO NOT set a domain to enhance security
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  // Add explicit CSRF protection configuration
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url }) {
      // Get the app URL for the current environment
      const appUrl = isDevelopment
        ? "http://app.localhost:3000"
        : `https://app.${rootDomain}`;

      console.log("NextAuth redirect callback called with URL:", url);

      // Default destination is the dashboard
      const dashboardUrl = `${appUrl}/dashboard`;

      // If the URL contains "localhost" in production, replace it with the proper domain
      if (!isDevelopment && url.includes("localhost")) {
        // Handle localhost URLs in production by replacing with proper domain
        console.log("NextAuth redirect: Found localhost URL in production, fixing:", url);
        const fixedUrl = url.replace(/http:\/\/(?:app\.)?localhost:3000/g, appUrl);
        
        // Special handling for GitHub callback URLs
        if (fixedUrl.includes("/api/auth/callback/github")) {
          console.log("NextAuth redirect: Fixed GitHub callback URL:", fixedUrl);
          // For GitHub callbacks, always redirect to dashboard after successful auth
          return dashboardUrl;
        }
        
        return fixedUrl.includes("/api/auth") ? dashboardUrl : fixedUrl;
      }

      // Auth callback or unknown URL - always go to dashboard
      if (url.includes("/api/auth/callback") || (!url.startsWith("/") && !url.startsWith(appUrl))) {
        console.log("NextAuth redirect: Auth callback or unknown URL, redirecting to:", dashboardUrl);
        return dashboardUrl;
      }

      // Relative URL - prepend app URL
      if (url.startsWith("/")) {
        const fullUrl = `${appUrl}${url}`;
        console.log("NextAuth redirect: Relative URL, redirecting to:", fullUrl);
        return fullUrl;
      }

      // URL is already on app domain - allow it
      console.log("NextAuth redirect: URL already on app domain, allowing:", url);
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
      if (isDevelopment) {
        console.log("[auth][debug] signIn event", { message });
      }
    },
    async signOut(message) {
      if (isDevelopment) {
        console.log("[auth][debug] signOut event", { message });
      }
    },
    async createUser(message) {
      if (isDevelopment) {
        console.log("[auth][debug] createUser event", { message });
      }
    },
  }
} satisfies NextAuthConfig;

// Create a custom logger for NextAuth errors
if (isDevelopment) {
  console.log("[auth][debug] NextAuth initialized with config:", {
    providers: authConfig.providers.map(p => p.id),
    pages: authConfig.pages,
    debug: authConfig.debug,
    cookies: Object.keys(authConfig.cookies || {})
  });
}

export const { auth, handlers } = NextAuth(authConfig);

// Helper function to get the current session
export async function getSession(): Promise<CustomSession | null> {
  const session = await auth();
  return session as CustomSession | null;
} 