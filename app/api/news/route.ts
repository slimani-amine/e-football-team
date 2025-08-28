
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
    const result = await query('SELECT * FROM news_articles ORDER BY created_at DESC');
    return NextResponse.json({ newsArticles: result.rows });
  } catch (error) {
    console.error('Error fetching news articles:', error);
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
    
    const insertQuery = `
      INSERT INTO news_articles (title, description, content, category, status, author, tags, priority, read_time, meta_description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;
    
    const values = [
      data.title,
      data.description || '',
      data.content,
      data.category,
      data.status || 'draft',
      'Admin Tarek',
      data.tags || [],
      data.priority || 'normal',
      data.readTime || null,
      data.metaDescription || ''
    ];
    
    const result = await query(insertQuery, values);
    const newArticle = result.rows[0];
    
    return NextResponse.json({ article: newArticle });
  } catch (error) {
    console.error('Error creating news article:', error);
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
      UPDATE news_articles 
      SET title = $2, description = $3, content = $4, category = $5, status = $6, 
          tags = $7, priority = $8, read_time = $9, meta_description = $10, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    
    const values = [
      id,
      updateData.title,
      updateData.description || '',
      updateData.content,
      updateData.category,
      updateData.status || 'draft',
      updateData.tags || [],
      updateData.priority || 'normal',
      updateData.readTime || null,
      updateData.metaDescription || ''
    ];
    
    const result = await query(updateQuery, values);
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'News article not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating news article:', error);
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
    
    const result = await query('DELETE FROM news_articles WHERE id = $1 RETURNING id', [id]);
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'News article not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting news article:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
