
export interface User {
  id: string;
  username: string;
  email?: string;
  roles: string[];
  isAdmin: boolean;
}

// Hardcoded admin credentials (in production, use a proper database with hashed passwords)
const ADMIN_CREDENTIALS = {
  email: 'tarek@admin.com',
  password: 'tarek123',
  user: {
    id: 'admin-1',
    username: 'Admin Tarek',
    email: 'tarek@admin.com',
    roles: ['admin'],
    isAdmin: true
  }
};



export function validateEmailPassword(email: string, password: string): User | null {
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    return ADMIN_CREDENTIALS.user;
  }
  return null;
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
