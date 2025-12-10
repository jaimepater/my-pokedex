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

    // Redirect authenticated users away from login page
    if (pathname.startsWith('/login') && isAuthenticated) {
        return NextResponse.redirect(new URL('/pokemons', request.url));
    }

    // Redirect unauthenticated users to login page
    if (pathname.startsWith('/pokemons') && !isAuthenticated) {
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
