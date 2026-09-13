import { NextResponse } from 'next/server';
import { signSession, SESSION_COOKIE, verifyPassword } from '@/lib/gallery-auth';
import { ensureSeed } from '@/lib/gallery-seed';
import { readDb } from '@/lib/gallery-store';
import { rateLimit, clientKey } from '@/lib/rate-limit';

export async function POST(req: Request) {
  // Límite anti fuerza-bruta: 8 intentos / 10 min por IP.
  const key = `login:${clientKey(req)}`;
  const rl = rateLimit(key, 8, 10 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Intenta de nuevo en unos minutos.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } },
    );
  }

  let parsed: any = {};
  try {
    parsed = await req.json();
  } catch {
    return NextResponse.json({ error: 'Cuerpo JSON inválido.' }, { status: 400 });
  }
  const email = String(parsed.email ?? '').trim().slice(0, 254);
  const password = String(parsed.password ?? '').slice(0, 256);
  if (!email || !password) {
    return NextResponse.json({ error: 'Usuario y contraseña requeridos.' }, { status: 400 });
  }

  ensureSeed();
  const db = readDb();
  const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  // Respuesta genérica para no revelar si el usuario existe o está inactivo.
  if (!user || !user.active) {
    return NextResponse.json({ error: 'Credenciales inválidas.' }, { status: 401 });
  }
  const ok = verifyPassword(password, user.passwordHash, user.passwordSalt);
  if (!ok) {
    return NextResponse.json({ error: 'Credenciales inválidas.' }, { status: 401 });
  }
  const token = signSession({ sub: user.id, email: user.email, name: user.name, role: user.role });
  const res = NextResponse.json({ ok: true, user: { name: user.name, email: user.email, role: user.role } });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 12 * 3600,
  });
  return res;
}

