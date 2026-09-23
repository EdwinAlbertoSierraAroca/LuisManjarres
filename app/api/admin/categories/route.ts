import { NextResponse } from 'next/server';
import { ensureSeed } from '@/lib/gallery-seed';
import { readDb, slugify, uid, writeDb } from '@/lib/gallery-store';
import { adminSession, forbidden, unauthorized } from '../guard';
import { withApiErrors } from '@/lib/api-errors';

async function handleGET() {
  const session = adminSession();
  if (!session) return unauthorized();
  await ensureSeed();
  return NextResponse.json({ categories: (await readDb()).categories, subcategories: (await readDb()).subcategories });
}

async function handlePOST(req: Request) {
  const session = adminSession();
  if (!session) return unauthorized();
  if (session.role !== 'ADMIN') return forbidden();
  await ensureSeed();
  const { name, icon } = await req.json().catch(() => ({}));
  if (!name || !String(name).trim()) return NextResponse.json({ error: 'Nombre requerido.' }, { status: 400 });
  const db = await readDb();
  const slug = slugify(String(name));
  if (db.categories.some((c) => c.slug === slug)) return NextResponse.json({ error: 'La categoría ya existe.' }, { status: 409 });
  const cat = { id: uid('cat'), name: String(name).trim(), slug, icon: String(icon ?? '☀'), active: true };
  db.categories.push(cat);
  await writeDb(db);
  return NextResponse.json({ category: cat }, { status: 201 });
}

export const GET = withApiErrors(handleGET);
export const POST = withApiErrors(handlePOST);
