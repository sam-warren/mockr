import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error("Missing GitHub OAuth credentials. Please add GITHUB_ID and GITHUB_SECRET to your .env.local file.");
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("Missing NEXTAUTH_SECRET. Please add NEXTAUTH_SECRET to your .env.local file.");
}

export const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login", // Error code passed in query string as ?error=
  },
  session: {
    strategy: "jwt" as const, // Use JWT for session handling
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Default Next Auth redirect behavior
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session, token }) {
      // Add the user's ID to the session
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;

export const { auth, handlers } = NextAuth(authConfig); 