import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySession } from './gallery-auth';
import type { SessionPayload } from './gallery-auth';

export function getSession(): SessionPayload | null {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

export function requireRole(session: SessionPayload | null, roles: Array<'ADMIN' | 'EDITOR'>) {
  if (!session) return false;
  return roles.includes(session.role);
}
