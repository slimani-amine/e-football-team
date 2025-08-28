
import { NextResponse } from 'next/server';
import { query, initializeDatabase } from '@/lib/db';

export async function GET() {
  try {
    await initializeDatabase();
    const result = await query('SELECT id, name FROM team_members ORDER BY id ASC');
    return NextResponse.json({ players: result.rows });
  } catch (error) {
    console.error('Error fetching players:', error);
    return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 });
  }
}
