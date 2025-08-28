
import { NextRequest, NextResponse } from 'next/server';
import { query, initializeDatabase } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Check session auth via cookies
    const sessionCookie = request.cookies.get('admin_session');
    if (sessionCookie?.value !== 'admin_logged_in') {
      throw new Error('Unauthorized');
    }
    
    await initializeDatabase();
    const result = await query('SELECT * FROM join_requests ORDER BY created_at DESC');
    return NextResponse.json({ joinRequests: result.rows });
  } catch (error) {
    console.error('Error fetching join requests:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    await initializeDatabase();
    
    const insertQuery = `
      INSERT INTO join_requests (name, email, age, position, experience, gamertag, platform, message, skill_level, timezone, languages, nationality, phone_number)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `;
    
    const values = [
      data.name,
      data.email,
      data.age || null,
      data.position,
      data.experience,
      data.gamertag || '',
      data.platform || '',
      data.message,
      data.skillLevel || '',
      data.timezone || '',
      data.languages || [],
      data.nationality || '',
      data.phoneNumber || ''
    ];
    
    const result = await query(insertQuery, values);
    const newRequest = result.rows[0];
    
    return NextResponse.json({ request: newRequest });
  } catch (error) {
    console.error('Error creating join request:', error);
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check session auth via cookies
    const sessionCookie = request.cookies.get('admin_session');
    if (sessionCookie?.value !== 'admin_logged_in') {
      throw new Error('Unauthorized');
    }
    
    const data = await request.json();
    const { id, status } = data;
    
    await initializeDatabase();
    
    const result = await query(
      'UPDATE join_requests SET status = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
      [id, status]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Join request not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating join request:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
