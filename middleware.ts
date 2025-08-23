
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parseReplitAuth } from './lib/auth';

export function middleware(request: NextRequest) {
  // Only protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const user = parseReplitAuth(request.headers);
    
    if (!user) {
      // User not authenticated, redirect to login
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    
    if (!user.isAdmin) {
      // User authenticated but not admin, redirect to login with error
      const loginUrl = new URL('/auth/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect API routes
  if (request.nextUrl.pathname.startsWith('/api/') && 
      !request.nextUrl.pathname.startsWith('/api/auth')) {
    const user = parseReplitAuth(request.headers);
    
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*']
};
