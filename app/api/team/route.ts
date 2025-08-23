
import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    // Check session auth via cookies
    const sessionCookie = request.cookies.get('admin_session');
    if (sessionCookie?.value !== 'admin_logged_in') {
      throw new Error('Unauthorized');
    }
    
    const teamMembers = database.getTeamMembers();
    return NextResponse.json({ teamMembers });
  } catch (error) {
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
    const newMember = database.addTeamMember({
      name: data.name
    });
    
    return NextResponse.json({ member: newMember });
  } catch (error) {
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
    
    const success = database.updateTeamMember(id, updateData);
    if (!success) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
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
    
    const success = database.deleteTeamMember(id);
    if (!success) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
