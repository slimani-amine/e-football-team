
import { NextResponse } from 'next/server';
import { database } from '@/lib/database';

export async function GET() {
  try {
    const teamMembers = database.getTeamMembers();
    return NextResponse.json({ players: teamMembers });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 });
  }
}
