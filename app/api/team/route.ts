
import { NextRequest, NextResponse } from 'next/server';
import { parseReplitAuth, requireAdmin } from '@/lib/auth';

// In-memory storage (replace with database in production)
let teamMembers = [
  { id: 1, name: "CAPTAIN WHITEBEARD", position: "Captain", status: "active", joinDate: "2023-01-15", email: "captain@barbablanca.com", phone: "+1234567890" },
  { id: 2, name: "RED DEMON", position: "Striker", status: "active", joinDate: "2023-02-20", email: "demon@barbablanca.com", phone: "+1234567891" },
  { id: 3, name: "IRON WALL", position: "Defender", status: "active", joinDate: "2023-03-10", email: "wall@barbablanca.com", phone: "+1234567892" },
  { id: 4, name: "SHADOW KEEPER", position: "Goalkeeper", status: "active", joinDate: "2023-04-05", email: "keeper@barbablanca.com", phone: "+1234567893" },
];

export async function GET(request: NextRequest) {
  try {
    const user = parseReplitAuth(request.headers);
    requireAdmin(user);
    
    return NextResponse.json({ teamMembers });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = parseReplitAuth(request.headers);
    requireAdmin(user);
    
    const data = await request.json();
    const newMember = {
      id: Date.now(),
      ...data,
      joinDate: new Date().toISOString().split('T')[0],
    };
    
    teamMembers.push(newMember);
    
    return NextResponse.json({ member: newMember });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = parseReplitAuth(request.headers);
    requireAdmin(user);
    
    const data = await request.json();
    const { id, ...updateData } = data;
    
    teamMembers = teamMembers.map(member => 
      member.id === id ? { ...member, ...updateData } : member
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = parseReplitAuth(request.headers);
    requireAdmin(user);
    
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '');
    
    teamMembers = teamMembers.filter(member => member.id !== id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
