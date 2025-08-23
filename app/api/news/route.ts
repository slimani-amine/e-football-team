
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';

// In-memory storage (replace with database in production)
let newsArticles = [
  { id: 1, title: "Championship Final Victory", status: "published", date: "2024-03-01", views: 2500, category: "Tournament", content: "We dominated the championship..." },
  { id: 2, title: "New Player Recruitment", status: "draft", date: "2024-03-02", views: 0, category: "Recruitment", content: "Looking for new talent..." },
  { id: 3, title: "Training Schedule Update", status: "published", date: "2024-03-03", views: 950, category: "Training", content: "Updated training times..." },
];

export async function GET(request: NextRequest) {
  try {
    // Check session auth via cookies
    const sessionCookie = request.cookies.get('admin_session');
    if (sessionCookie?.value !== 'admin_logged_in') {
      throw new Error('Unauthorized');
    }
    
    return NextResponse.json({ newsArticles });
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
    const newArticle = {
      id: Date.now(),
      ...data,
      date: new Date().toISOString().split('T')[0],
      views: 0,
    };
    
    newsArticles.push(newArticle);
    
    return NextResponse.json({ article: newArticle });
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
    
    newsArticles = newsArticles.map(article => 
      article.id === id ? { ...article, ...updateData } : article
    );
    
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
    
    newsArticles = newsArticles.filter(article => article.id !== id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
