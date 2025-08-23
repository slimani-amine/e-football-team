
import { NextRequest, NextResponse } from 'next/server';
import { parseReplitAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = parseReplitAuth(request.headers);
    
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
  }
}
