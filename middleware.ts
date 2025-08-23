
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parseReplitAuth } from './lib/auth';

export function middleware(request: NextRequest) {
  // Only protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const user = parseReplitAuth(request.headers);
    
    if (!user || !user.isAdmin) {
      // Redirect to login page or show auth prompt
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*']
};
