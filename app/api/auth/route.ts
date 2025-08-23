
import { NextRequest, NextResponse } from 'next/server';
import { validateEmailPassword } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Check session-based auth
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('admin_session');
    
    if (sessionToken?.value === 'admin_logged_in') {
      return NextResponse.json({ 
        user: {
          id: 'admin-1',
          username: 'Admin Tarek',
          email: 'tarek@admin.com',
          roles: ['admin'],
          isAdmin: true
        }
      });
    }

    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    const user = validateEmailPassword(email, password);
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create a simple session (in production, use proper JWT or session management)
    const response = NextResponse.json({ user, message: 'Login successful' });
    response.cookies.set('admin_session', 'admin_logged_in', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  // Logout endpoint
  const response = NextResponse.json({ message: 'Logged out successfully' });
  response.cookies.delete('admin_session');
  return response;
}
