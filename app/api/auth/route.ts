import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateEmailPassword } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Then try session-based auth
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

    const user = await validateEmailPassword(email, password);
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create response with session cookie
    const response = NextResponse.json({ user });
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'admin_logged_in', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  // Logout endpoint
  const response = NextResponse.json({ message: 'Logged out successfully' });
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return response;
}