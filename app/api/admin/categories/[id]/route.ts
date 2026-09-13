import { NextResponse } from 'next/server';
import { ensureSeed } from '@/lib/gallery-seed';
import { readDb, writeDb } from '@/lib/gallery-store';
import { adminSession, forbidden, unauthorized } from '../../guard';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = adminSession();
  if (!session) return unauthorized();
  if (session.role !== 'ADMIN') return forbidden();
  ensureSeed();
  const body = await req.json().catch(() => ({}));
  const db = readDb();
  const cat = db.categories.find((c) => c.id === params.id);
  if (!cat) return NextResponse.json({ error: 'No encontrada.' }, { status: 404 });
  if (body.name !== undefined) cat.name = String(body.name);
  if (body.icon !== undefined) cat.icon = String(body.icon);
  if (body.active !== undefined) cat.active = Boolean(body.active);
  writeDb(db);
  return NextResponse.json({ category: cat });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = adminSession();
  if (!session) return unauthorized();
  if (session.role !== 'ADMIN') return forbidden();
  ensureSeed();
  const db = readDb();
  if (db.projects.some((p) => p.categoryId === params.id)) {
    return NextResponse.json({ error: 'No se puede eliminar: hay proyectos en esta categoría.' }, { status: 409 });
  }
  db.categories = db.categories.filter((c) => c.id !== params.id);
  writeDb(db);
  return NextResponse.json({ ok: true });
}
