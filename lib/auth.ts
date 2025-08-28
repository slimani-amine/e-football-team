
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { query } from './db';

export interface User {
  id: string;
  username: string;
  email?: string;
  roles: string[];
  isAdmin: boolean;
}

export async function validateEmailPassword(email: string, password: string): Promise<User | null> {
  // For now, keep the hardcoded admin for simplicity
  // In production, you would query the database for user credentials
  if (email === 'tarek@admin.com' && password === 'tarek123') {
    return {
      id: 'admin-1',
      username: 'Admin Tarek',
      email: 'tarek@admin.com',
      roles: ['admin'],
      isAdmin: true
    };
  }
  return null;
}

export function generateToken(user: User): string {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      roles: user.roles,
      isAdmin: user.isAdmin 
    },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
    return {
      id: decoded.id,
      username: decoded.username || 'Admin',
      email: decoded.email,
      roles: decoded.roles || ['admin'],
      isAdmin: decoded.isAdmin || false
    };
  } catch (error) {
    return null;
  }
}

export function requireAuth(user: User | null) {
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}

export function requireAdmin(user: User | null) {
  const authUser = requireAuth(user);
  if (!authUser.isAdmin) {
    throw new Error('Admin access required');
  }
  return authUser;
}
