
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
    
    // Check if ID is provided and valid
    if (data.id) {
      const existingMember = database.getTeamMembers().find(m => m.id === data.id);
      if (existingMember) {
        return NextResponse.json({ error: 'ID already exists' }, { status: 400 });
      }
    }
    
    const newMember = database.addTeamMember({
      ...(data.id && { id: data.id }), // Include ID if provided
      name: data.name,
      position: data.position || "Player",
      status: data.status || "active",
      email: data.email || "",
      phone: data.phone || "",
      bio: data.bio || "",
      nationality: data.nationality || "",
      age: data.age || undefined,
      stats: data.stats || {
        goals: 0,
        assists: 0,
        matches: 0,
        rating: 0,
        yellowCards: 0,
        redCards: 0,
        playtime: 0
      },
      socialLinks: data.socialLinks || {},
      achievements: data.achievements || [],
      preferredPosition: data.preferredPosition || data.position,
      contractEndDate: data.contractEndDate || "",
      salary: data.salary || undefined
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
