import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const isDevelopment = process.env.NODE_ENV === "development";
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "mockr.io";
  // Check if we're in a Vercel deployment environment
  const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

  // Skip middleware for auth callback routes to prevent interference with authentication
  if (url.pathname.startsWith('/api/auth')) {
    console.log("Middleware: Skipping auth route:", url.pathname);
    return NextResponse.next();
  }

  // Get hostname of request (e.g. app.mockr.io, app.localhost:3000)
  let hostname = req.headers.get("host")!;
  console.log("Middleware: Processing request for hostname:", hostname, "path:", url.pathname);

  // Special case for Vercel preview deployment URLs
  if (
    hostname.includes("---") &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${rootDomain}`;
    console.log("Middleware: Transformed preview URL to:", hostname);
  }

  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""
    }`;

  // Check if this is an app subdomain request
  const isAppSubdomain =
    (isDevelopment && hostname === "app.localhost:3000") ||
    hostname === `app.${rootDomain}`;

  // Handle app subdomain (both development and production)
  if (isAppSubdomain) {
    console.log("Middleware: Handling app subdomain");

    // Skip auth check for login page
    if (url.pathname === "/login") {
      console.log("Middleware: Login page, allowing access");
      return NextResponse.rewrite(new URL("/app/login", req.url));
    }

    // For all other app routes, check session
    try {
      const session = await getToken({ 
        req,
        // Make sure to use the same secret as in the auth config
        secret: process.env.NEXTAUTH_SECRET,
        // Specify the cookie name to ensure we're checking the right cookie
        cookieName: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
        secureCookie: VERCEL_DEPLOYMENT,
      });
      
      console.log("Middleware: Session check result:", !!session);
      
      // If no session and not on login page, redirect to login
      if (!session) {
        console.log("Middleware: No session, redirecting to login");
        return NextResponse.redirect(new URL("/login", req.url));
      }

      // Session exists, handle routes
      if (path === "/") {
        console.log("Middleware: Root path with session, redirecting to dashboard");
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      // Handle dashboard path
      if (path === "/dashboard" || path.startsWith("/dashboard?")) {
        console.log("Middleware: Rewriting to app/dashboard");
        return NextResponse.rewrite(new URL("/app/dashboard", req.url));
      }

      // Rewrite to the app directory for all other paths
      console.log("Middleware: Rewriting to app directory:", `/app${path === "/" ? "" : path}`);
      return NextResponse.rewrite(
        new URL(`/app${path === "/" ? "" : path}`, req.url),
      );
    } catch (error) {
      console.error("Middleware: Error checking session:", error);
      // On error, redirect to login for safety
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Handle root domain (both development and production)
  const isRootDomain =
    (isDevelopment && (hostname === "localhost:3000" || hostname === "localhost")) ||
    hostname === rootDomain ||
    hostname === `www.${rootDomain}`;

  if (isRootDomain) {
    console.log("Middleware: Handling root domain");
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, req.url),
    );
  }

  // For any other hostnames, rewrite to the appropriate path
  console.log("Middleware: Handling other hostname:", hostname);
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}