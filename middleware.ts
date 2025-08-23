
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check session auth
  const checkAuth = () => {
    const sessionCookie = request.cookies.get('admin_session');
    if (sessionCookie?.value === 'admin_logged_in') {
      return true;
    }

    return false;
  };

  // Only protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!checkAuth()) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Protect API routes (except auth endpoint)
  if (request.nextUrl.pathname.startsWith('/api/') && 
      !request.nextUrl.pathname.startsWith('/api/auth')) {
    if (!checkAuth()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*']
};
