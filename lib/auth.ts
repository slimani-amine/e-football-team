
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

export function parseReplitAuth(headers: any): User | null {
  // Handle both direct headers and Headers object
  const getUserHeader = (key: string) => {
    return headers.get ? headers.get(key) : headers[key];
  };

  const userId = getUserHeader('x-replit-user-id');
  const userName = getUserHeader('x-replit-user-name');
  const userRoles = getUserHeader('x-replit-user-roles');

  if (!userId || !userName) {
    return null;
  }

  // Check if user is admin (you can modify this logic as needed)
  const isAdmin = userRoles?.includes('admin') || 
                  userName === 'CAPTAIN WHITEBEARD' ||
                  userName.toLowerCase().includes('admin') ||
                  userId === 'your-admin-user-id'; // Replace with your actual admin user ID

  return {
    id: userId,
    username: userName,
    email: undefined,
    roles: userRoles ? userRoles.split(',') : [],
    isAdmin: isAdmin
  };
}

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
