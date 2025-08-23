
export interface User {
  id: string;
  username: string;
  roles: string[];
  isAdmin: boolean;
}

export function parseReplitAuth(headers: any): User | null {
  const userId = headers['x-replit-user-id'];
  const userName = headers['x-replit-user-name'];
  const userRoles = headers['x-replit-user-roles'];

  if (!userId || !userName) {
    return null;
  }

  return {
    id: userId,
    username: userName,
    roles: userRoles ? userRoles.split(',') : [],
    isAdmin: userRoles?.includes('admin') || userName === 'CAPTAIN WHITEBEARD'
  };
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
