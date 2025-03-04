import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

// This middleware handles authentication and route protection
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the user is authenticated using the auth() function
  const session = await auth();
  const isAuthenticated = !!session;
  
  // Define protected routes that require authentication
  const protectedRoutes = [
    '/dashboard',
    '/mocks',
    '/analytics',
    '/team',
    '/settings',
  ];
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  
  // Handle login route
  if (pathname === '/login') {
    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    // Rewrite to auth route group
    const url = request.nextUrl.clone();
    url.pathname = `/(auth)${pathname}`;
    return NextResponse.rewrite(url);
  }
  
  // If trying to access protected routes without authentication
  if (isProtectedRoute && !isAuthenticated) {
    // Redirect to login page
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Handle route groups based on the path
  if (isProtectedRoute) {
    // Rewrite to app route group
    const url = request.nextUrl.clone();
    url.pathname = `/(app)${pathname}`;
    return NextResponse.rewrite(url);
  }
  
  // Handle marketing routes
  const marketingRoutes = ['/pricing', '/features', '/about', '/demo'];
  const isMarketingRoute = marketingRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  
  if (isMarketingRoute) {
    const url = request.nextUrl.clone();
    url.pathname = `/(home)${pathname}`;
    return NextResponse.rewrite(url);
  }
  
  // The root route (/) should use the root page.tsx
  // No rewrite needed as it will use the default page.tsx in the app directory
  
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)',
  ],
}; 