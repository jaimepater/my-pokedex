import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js middleware for route protection
 * Handles authentication-based redirects
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token');
  const isAuthenticated = !!token;

  // Allow static assets, API routes, and public files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Scenario 1: User is authenticated
  if (isAuthenticated) {
    // If trying to access login page or root, redirect to /pokemons
    if (pathname === '/login' || pathname === '/') {
      return NextResponse.redirect(new URL('/pokemons', request.url));
    }
    // Allow access to protected routes
    return NextResponse.next();
  }

  // Scenario 2: User is NOT authenticated
  if (!isAuthenticated) {
    // If already on login page, allow access
    if (pathname === '/login') {
      return NextResponse.next();
    }
    // Redirect any other route to /login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

/**
 * Configure which routes the middleware should run on
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
