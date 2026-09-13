import { NextResponse } from 'next/server';
import { ensureSeed } from '@/lib/gallery-seed';
import { readDb, writeDb } from '@/lib/gallery-store';
import { emailError, hashPassword, passwordPolicyError } from '@/lib/gallery-auth';
import type { Role } from '@/lib/gallery-types';
import { adminSession, forbidden, unauthorized } from '../../guard';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function publicUser(u: { id: string; name: string; email: string; role: Role; active: boolean; createdAt?: string }) {
  return { id: u.id, name: u.name, email: u.email, role: u.role, active: u.active, createdAt: u.createdAt ?? null };
}

function requireAdmin() {
  const session = adminSession();
  if (!session) return { error: unauthorized() as NextResponse };
  ensureSeed();
  const db = readDb();
  const me = db.users.find((u) => u.id === session.sub);
  if (!me || !me.active || me.role !== 'ADMIN') {
    return { error: (me ? forbidden() : unauthorized()) as NextResponse };
  }
  return { db, me, session };
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const auth = requireAdmin();
  if ('error' in auth) return auth.error;
  const { db, me } = auth;

  const target = db.users.find((u) => u.id === params.id);
  if (!target) return NextResponse.json({ error: 'Usuario no encontrado.' }, { status: 404 });

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Cuerpo JSON inválido.' }, { status: 400 });
  }

  // Campos permitidos (lista blanca) — nunca se acepta passwordHash/passwordSalt del cliente.
  if (body.name !== undefined) {
    const name = String(body.name ?? '').trim().slice(0, 80);
    if (!name || name.length < 2) return NextResponse.json({ error: 'Nombre inválido.' }, { status: 400 });
    target.name = name;
  }
  if (body.email !== undefined) {
    const email = String(body.email ?? '').trim().toLowerCase().slice(0, 254);
    const mailErr = emailError(email);
    if (mailErr) return NextResponse.json({ error: mailErr }, { status: 400 });
    if (db.users.some((u) => u.id !== target.id && u.email.toLowerCase() === email)) {
      return NextResponse.json({ error: 'Ese correo ya está en uso.' }, { status: 409 });
    }
    target.email = email;
  }
  if (body.role !== undefined) {
    const role: Role = body.role === 'EDITOR' ? 'EDITOR' : 'ADMIN';
    // No degradarse a sí mismo si es el único ADMIN activo.
    if (target.id === me.id && role !== 'ADMIN') {
      const otherAdmins = db.users.filter((u) => u.id !== me.id && u.role === 'ADMIN' && u.active);
      if (otherAdmins.length === 0) {
        return NextResponse.json({ error: 'No puedes quitarte el rol ADMIN: eres el único administrador activo.' }, { status: 400 });
      }
    }
    target.role = role;
  }
  if (body.active !== undefined) {
    const active = Boolean(body.active);
    if (target.id === me.id && !active) {
      return NextResponse.json({ error: 'No puedes desactivar tu propio usuario.' }, { status: 400 });
    }
    if (!active && target.role === 'ADMIN') {
      const otherAdmins = db.users.filter((u) => u.id !== target.id && u.role === 'ADMIN' && u.active);
      if (otherAdmins.length === 0) {
        return NextResponse.json({ error: 'No puedes desactivar al único administrador activo.' }, { status: 400 });
      }
    }
    target.active = active;
  }
  if (body.password !== undefined && String(body.password).length > 0) {
    const password = String(body.password).slice(0, 256);
    const passErr = passwordPolicyError(password);
    if (passErr) return NextResponse.json({ error: passErr }, { status: 400 });
    const { hash, salt } = hashPassword(password);
    target.passwordHash = hash;
    target.passwordSalt = salt;
  }

  writeDb(db);
  return NextResponse.json({ user: publicUser(target) });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const auth = requireAdmin();
  if ('error' in auth) return auth.error;
  const { db, me } = auth;

  const idx = db.users.findIndex((u) => u.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Usuario no encontrado.' }, { status: 404 });
  const target = db.users[idx];
  if (target.id === me.id) {
    return NextResponse.json({ error: 'No puedes eliminar tu propio usuario.' }, { status: 400 });
  }
  if (target.role === 'ADMIN' && target.active) {
    const otherAdmins = db.users.filter((u) => u.id !== target.id && u.role === 'ADMIN' && u.active);
    if (otherAdmins.length === 0) {
      return NextResponse.json({ error: 'No puedes eliminar al único administrador activo.' }, { status: 400 });
    }
  }
  db.users.splice(idx, 1);
  writeDb(db);
  return NextResponse.json({ ok: true });
}
