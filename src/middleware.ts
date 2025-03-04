import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware handles routing between the marketing site and the app
export function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;
  
  // Skip middleware for development environment on localhost
  // This allows us to work with route groups directly in development
  if (hostname === 'localhost' || hostname.includes('127.0.0.1')) {
    // Only handle app and auth routes on localhost
    if (pathname.startsWith('/dashboard') || 
        pathname.startsWith('/mocks') ||
        pathname.startsWith('/analytics') ||
        pathname.startsWith('/team') ||
        pathname.startsWith('/settings')) {
      // Rewrite to app route group
      const url = request.nextUrl.clone();
      url.pathname = `/(app)${pathname}`;
      return NextResponse.rewrite(url);
    }
    
    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
      // Rewrite to auth route group
      const url = request.nextUrl.clone();
      url.pathname = `/(auth)${pathname}`;
      return NextResponse.rewrite(url);
    }
    
    return NextResponse.next();
  }
  
  // Check if the user is authenticated (this is a placeholder - replace with actual auth check)
  const isAuthenticated = false; // This would be your actual auth check
  
  // Handle app subdomain (app.mockr.io)
  if (hostname.startsWith('app.')) {
    // If user is not authenticated and trying to access app routes, redirect to login
    if (!isAuthenticated && 
        !pathname.startsWith('/login') && 
        !pathname.startsWith('/register') && 
        !pathname.startsWith('/_next') && 
        !pathname.startsWith('/api')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if (isAuthenticated && 
        (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    // Rewrite the URL to use the appropriate route group
    const url = request.nextUrl.clone();
    
    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
      // Rewrite auth routes to the auth route group
      url.pathname = `/(auth)${pathname}`;
      return NextResponse.rewrite(url);
    } else {
      // Rewrite app routes to the app route group
      url.pathname = `/(app)${pathname}`;
      return NextResponse.rewrite(url);
    }
  }
  
  // Handle main domain (mockr.io)
  else {
    // If trying to access app-specific routes on the main domain, redirect to app subdomain
    if (pathname.startsWith('/dashboard') || 
        pathname.startsWith('/mocks') ||
        pathname.startsWith('/analytics') ||
        pathname.startsWith('/team') ||
        pathname.startsWith('/settings')) {
      // Redirect to the same path but on app subdomain
      return NextResponse.redirect(new URL(`https://app.${hostname}${pathname}`, request.url));
    }
    
    // For auth routes on main domain, redirect to app subdomain
    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
      return NextResponse.redirect(new URL(`https://app.${hostname}${pathname}`, request.url));
    }
  }
  
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)',
  ],
}; 