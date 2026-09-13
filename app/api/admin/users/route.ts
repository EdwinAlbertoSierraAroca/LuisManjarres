import { NextResponse } from 'next/server';
import { ensureSeed } from '@/lib/gallery-seed';
import { readDb, uid, writeDb } from '@/lib/gallery-store';
import { emailError, hashPassword, passwordPolicyError } from '@/lib/gallery-auth';
import type { Role } from '@/lib/gallery-types';
import { adminSession, forbidden, unauthorized } from '../guard';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function publicUser(u: { id: string; name: string; email: string; role: Role; active: boolean; createdAt?: string }) {
  return { id: u.id, name: u.name, email: u.email, role: u.role, active: u.active, createdAt: u.createdAt ?? null };
}

/** El rol efectivo se lee de la BD (no solo del JWT) para que desactivar/degradar aplique de inmediato. */
function requireAdmin() {
  const session = adminSession();
  if (!session) return { error: unauthorized() as NextResponse };
  ensureSeed();
  const db = readDb();
  const me = db.users.find((u) => u.id === session.sub);
  if (!me || !me.active || me.role !== 'ADMIN') {
    return { error: (me ? forbidden() : unauthorized()) as NextResponse };
  }
  return { db, me };
}

export async function GET() {
  try {
    const auth = requireAdmin();
    if ('error' in auth) return auth.error;
    return NextResponse.json({ users: auth.db.users.map(publicUser) });
  } catch (e) {
    console.error('[api/admin/users] GET falló:', e);
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error interno al cargar usuarios.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const auth = requireAdmin();
    if ('error' in auth) return auth.error;
    const { db } = auth;

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Cuerpo JSON inválido.' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim().slice(0, 80);
  const email = String(body.email ?? '').trim().toLowerCase().slice(0, 254);
  const password = String(body.password ?? '').slice(0, 256);
  const role: Role = body.role === 'EDITOR' ? 'EDITOR' : 'ADMIN';

  if (!name || name.length < 2) return NextResponse.json({ error: 'El nombre es obligatorio (mín. 2 caracteres).' }, { status: 400 });
  const mailErr = emailError(email);
  if (mailErr) return NextResponse.json({ error: mailErr }, { status: 400 });
  const passErr = passwordPolicyError(password);
  if (passErr) return NextResponse.json({ error: passErr }, { status: 400 });
  if (db.users.some((u) => u.email.toLowerCase() === email)) {
    return NextResponse.json({ error: 'Ese correo ya está registrado.' }, { status: 409 });
  }

  const { hash, salt } = hashPassword(password);
  const now = new Date().toISOString();
  const user = { id: uid('usr'), name, email, passwordHash: hash, passwordSalt: salt, role, active: true, createdAt: now };
  db.users.push(user);
  writeDb(db);
  return NextResponse.json({ user: publicUser(user) }, { status: 201 });
  } catch (e) {
    console.error('[api/admin/users] POST falló:', e);
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error interno al crear usuario.' }, { status: 500 });
  }
}
