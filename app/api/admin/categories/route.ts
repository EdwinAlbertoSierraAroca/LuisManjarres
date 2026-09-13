import { NextResponse } from 'next/server';
import { ensureSeed } from '@/lib/gallery-seed';
import { readDb, slugify, uid, writeDb } from '@/lib/gallery-store';
import { adminSession, forbidden, unauthorized } from '../guard';

export async function GET() {
  const session = adminSession();
  if (!session) return unauthorized();
  ensureSeed();
  return NextResponse.json({ categories: readDb().categories, subcategories: readDb().subcategories });
}

export async function POST(req: Request) {
  const session = adminSession();
  if (!session) return unauthorized();
  if (session.role !== 'ADMIN') return forbidden();
  ensureSeed();
  const { name, icon } = await req.json().catch(() => ({}));
  if (!name || !String(name).trim()) return NextResponse.json({ error: 'Nombre requerido.' }, { status: 400 });
  const db = readDb();
  const slug = slugify(String(name));
  if (db.categories.some((c) => c.slug === slug)) return NextResponse.json({ error: 'La categoría ya existe.' }, { status: 409 });
  const cat = { id: uid('cat'), name: String(name).trim(), slug, icon: String(icon ?? '☀'), active: true };
  db.categories.push(cat);
  writeDb(db);
  return NextResponse.json({ category: cat }, { status: 201 });
}
