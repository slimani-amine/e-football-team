
import { NextRequest, NextResponse } from 'next/server';
import { parseReplitAuth, requireAdmin } from '@/lib/auth';

// In-memory storage (replace with database in production)
let joinRequests = [
  { id: 1, name: "Alex Thunder", position: "Midfielder", experience: "3 years", status: "pending", date: "2024-03-01", email: "alex@email.com", message: "I want to join your clan..." },
  { id: 2, name: "Maria Storm", position: "Winger", experience: "2 years", status: "pending", date: "2024-03-02", email: "maria@email.com", message: "Experienced winger looking for a team..." },
  { id: 3, name: "John Blaze", position: "Defender", experience: "4 years", status: "pending", date: "2024-03-03", email: "john@email.com", message: "Solid defender with leadership skills..." },
];

export async function GET(request: NextRequest) {
  try {
    const user = parseReplitAuth(request.headers);
    requireAdmin(user);
    
    return NextResponse.json({ joinRequests });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newRequest = {
      id: Date.now(),
      ...data,
      status: "pending",
      date: new Date().toISOString().split('T')[0],
    };
    
    joinRequests.push(newRequest);
    
    return NextResponse.json({ request: newRequest });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = parseReplitAuth(request.headers);
    requireAdmin(user);
    
    const data = await request.json();
    const { id, status } = data;
    
    joinRequests = joinRequests.map(req => 
      req.id === id ? { ...req, status } : req
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
