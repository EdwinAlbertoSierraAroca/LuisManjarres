import { NextResponse } from 'next/server';
import { ensureSeed } from '@/lib/gallery-seed';
import { readDb, uid, writeDb } from '@/lib/gallery-store';
import { adminSession, forbidden, unauthorized } from '../guard';

export async function GET() {
  const session = adminSession();
  if (!session) return unauthorized();
  ensureSeed();
  return NextResponse.json({ tags: readDb().tags });
}

export async function POST(req: Request) {
  const session = adminSession();
  if (!session) return unauthorized();
  if (session.role !== 'ADMIN' && session.role !== 'EDITOR') return forbidden();
  ensureSeed();
  const { name } = await req.json().catch(() => ({}));
  if (!name || !String(name).trim()) return NextResponse.json({ error: 'Nombre requerido.' }, { status: 400 });
  const db = readDb();
  if (db.tags.some((t) => t.name.toLowerCase() === String(name).trim().toLowerCase())) {
    return NextResponse.json({ error: 'La etiqueta ya existe.' }, { status: 409 });
  }
  const tag = { id: uid('tag'), name: String(name).trim() };
  db.tags.push(tag);
  writeDb(db);
  return NextResponse.json({ tag }, { status: 201 });
}
