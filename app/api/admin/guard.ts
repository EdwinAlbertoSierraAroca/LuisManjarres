import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySession } from '@/lib/gallery-auth';

export function adminSession() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

export function unauthorized() {
  return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
}

export function forbidden() {
  return NextResponse.json({ error: 'Sin permisos suficientes.' }, { status: 403 });
}
