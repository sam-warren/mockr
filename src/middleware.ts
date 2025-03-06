import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  isDevelopment,
  isVercelDeployment,
  rootDomain,
} from "@/lib/env-config";
import { logger } from "@/lib/logger";

// Create a module-specific logger
const log = logger.forModule("middleware");

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

/**
 * Skip middleware for auth-related endpoints
 */
function skipForAuthEndpoints(url: URL): NextResponse | null {
  // Skip middleware for auth callback routes to prevent interference with authentication
  if (url.pathname.startsWith('/api/auth')) {
    log.debug(`Skipping auth route: ${url.pathname}`);
    return NextResponse.next();
  }

  // Explicitly skip CSRF token verification routes to prevent auth failures
  if (url.pathname === '/api/auth/csrf') {
    log.debug(`Skipping CSRF token route`);
    return NextResponse.next();
  }

  return null;
}

/**
 * Handle Vercel preview deployments by transforming the hostname
 */
function transformPreviewHostname(hostname: string): string {
  // Special case for Vercel preview deployment URLs
  if (
    hostname.includes("---") &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    const transformedHostname = `${hostname.split("---")[0]}.${rootDomain}`;
    log.debug(`Transformed preview URL: ${hostname} -> ${transformedHostname}`);
    return transformedHostname;
  }
  return hostname;
}

/**
 * Handle authenticated app subdomain requests
 */
async function handleAppSubdomain(
  req: NextRequest,
  url: URL,
  path: string
): Promise<NextResponse> {
  log.debug(`Handling app subdomain`);

  // Login page is accessible without authentication
  if (url.pathname === "/login") {
    log.debug(`Login page, allowing access`);
    return NextResponse.rewrite(new URL("/app/login", req.url));
  }

  // Error page should also be accessible without authentication
  if (url.pathname === "/login" && url.searchParams.has("error")) {
    log.debug(`Login error page, allowing access`);
    return NextResponse.rewrite(new URL("/app/login", req.url));
  }

  // For all other app routes, check session
  try {
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      cookieName: `${isVercelDeployment ? "__Secure-" : ""}next-auth.session-token`,
      secureCookie: isVercelDeployment,
    });

    log.debug(`Session check result: ${!!session}`);

    // If no session and not on login page, redirect to login
    if (!session) {
      log.debug(`No session, redirecting to login`);
      const redirectUrl = new URL("/login", req.url);
      redirectUrl.searchParams.set("callbackUrl", url.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Session exists, handle routes based on path
    return handleAuthenticatedRoutes(req, path);
  } catch (error) {
    log.error(`Error checking session`, { error });
    // On error, redirect to login for safety
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

/**
 * Handle routes after successful authentication
 */
function handleAuthenticatedRoutes(
  req: NextRequest,
  path: string
): NextResponse {
  // Root path with session redirects to dashboard
  if (path === "/") {
    log.debug(`Root path with session, redirecting to dashboard`);
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Handle dashboard path
  if (path === "/dashboard" || path.startsWith("/dashboard?")) {
    log.debug(`Rewriting to app/dashboard`);
    return NextResponse.rewrite(new URL("/app/dashboard", req.url));
  }

  // Rewrite to the app directory for all other paths
  const rewritePath = `/app${path === "/" ? "" : path}`;
  log.debug(`Rewriting to app directory: ${rewritePath}`);
  return NextResponse.rewrite(new URL(rewritePath, req.url));
}

/**
 * Handle root domain requests
 */
function handleRootDomain(req: NextRequest, path: string): NextResponse {
  log.debug(`Handling root domain`);
  return NextResponse.rewrite(
    new URL(`/home${path === "/" ? "" : path}`, req.url)
  );
}

/**
 * Main middleware function
 */
export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // Skip for auth endpoints
  const skipResponse = skipForAuthEndpoints(url);
  if (skipResponse) return skipResponse;

  // Get hostname and handle preview URLs
  let hostname = req.headers.get("host") || "";
  hostname = transformPreviewHostname(hostname);

  // Get the path with search params
  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;
  
  log.debug(`Processing request`, {
    hostname,
    path: url.pathname,
    searchParams: searchParams || undefined
  });

  // Check if this is an app subdomain request
  const isAppSubdomain =
    (isDevelopment && hostname === "app.localhost:3000") ||
    hostname === `app.${rootDomain}`;

  // Handle app subdomain (both development and production)
  if (isAppSubdomain) {
    return handleAppSubdomain(req, url, path);
  }

  // Handle root domain (both development and production)
  const isRootDomain =
    (isDevelopment && (hostname === "localhost:3000" || hostname === "localhost")) ||
    hostname === rootDomain ||
    hostname === `www.${rootDomain}`;

  if (isRootDomain) {
    return handleRootDomain(req, path);
  }

  // For any other hostnames, rewrite to the appropriate path
  log.debug(`Handling other hostname: ${hostname}`);
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}