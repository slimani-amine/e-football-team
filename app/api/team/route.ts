
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
    const result = await query('SELECT * FROM team_members ORDER BY id ASC');
    return NextResponse.json({ teamMembers: result.rows });
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check session auth via cookies
    const sessionCookie = request.cookies.get('admin_session');
    if (sessionCookie?.value !== 'admin_logged_in') {
      throw new Error('Unauthorized');
    }
    
    const data = await request.json();
    
    await initializeDatabase();
    
    // Check if ID is provided and already exists
    if (data.id) {
      const existingResult = await query('SELECT id FROM team_members WHERE id = $1', [data.id]);
      if (existingResult.rows.length > 0) {
        return NextResponse.json({ error: 'ID already exists' }, { status: 400 });
      }
    }
    
    const insertQuery = data.id 
      ? `INSERT INTO team_members (id, name, position, status, email, phone, bio, nationality, age, stats, social_links, achievements, preferred_position, contract_end_date, salary) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`
      : `INSERT INTO team_members (name, position, status, email, phone, bio, nationality, age, stats, social_links, achievements, preferred_position, contract_end_date, salary) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`;
    
    const values = data.id 
      ? [
          data.id,
          data.name,
          data.position || "Player",
          data.status || "active",
          data.email || "",
          data.phone || "",
          data.bio || "",
          data.nationality || "",
          data.age || null,
          JSON.stringify(data.stats || { goals: 0, assists: 0, matches: 0, rating: 0, yellowCards: 0, redCards: 0, playtime: 0 }),
          JSON.stringify(data.socialLinks || {}),
          data.achievements || [],
          data.preferredPosition || data.position || "Player",
          data.contractEndDate || null,
          data.salary || null
        ]
      : [
          data.name,
          data.position || "Player",
          data.status || "active",
          data.email || "",
          data.phone || "",
          data.bio || "",
          data.nationality || "",
          data.age || null,
          JSON.stringify(data.stats || { goals: 0, assists: 0, matches: 0, rating: 0, yellowCards: 0, redCards: 0, playtime: 0 }),
          JSON.stringify(data.socialLinks || {}),
          data.achievements || [],
          data.preferredPosition || data.position || "Player",
          data.contractEndDate || null,
          data.salary || null
        ];
    
    const result = await query(insertQuery, values);
    const newMember = result.rows[0];
    
    return NextResponse.json({ member: newMember });
  } catch (error) {
    console.error('Error adding team member:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
    const { id, ...updateData } = data;
    
    await initializeDatabase();
    
    const updateQuery = `
      UPDATE team_members 
      SET name = $2, position = $3, status = $4, email = $5, phone = $6, bio = $7, 
          nationality = $8, age = $9, stats = $10, social_links = $11, achievements = $12,
          preferred_position = $13, contract_end_date = $14, salary = $15, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    
    const values = [
      id,
      updateData.name,
      updateData.position || "Player",
      updateData.status || "active",
      updateData.email || "",
      updateData.phone || "",
      updateData.bio || "",
      updateData.nationality || "",
      updateData.age || null,
      JSON.stringify(updateData.stats || {}),
      JSON.stringify(updateData.socialLinks || {}),
      updateData.achievements || [],
      updateData.preferredPosition || updateData.position || "Player",
      updateData.contractEndDate || null,
      updateData.salary || null
    ];
    
    const result = await query(updateQuery, values);
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check session auth via cookies
    const sessionCookie = request.cookies.get('admin_session');
    if (sessionCookie?.value !== 'admin_logged_in') {
      throw new Error('Unauthorized');
    }
    
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '');
    
    await initializeDatabase();
    
    const result = await query('DELETE FROM team_members WHERE id = $1 RETURNING id', [id]);
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
