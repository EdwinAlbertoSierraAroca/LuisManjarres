import { NextResponse } from 'next/server';
import { ensureSeed } from '@/lib/gallery-seed';
import { readDb, writeDb } from '@/lib/gallery-store';
import { adminSession, forbidden, unauthorized } from '../../guard';
import { withApiErrors } from '@/lib/api-errors';

async function handlePUT(req: Request, { params }: { params: { id: string } }) {
  const session = adminSession();
  if (!session) return unauthorized();
  if (session.role !== 'ADMIN') return forbidden();
  await ensureSeed();
  const body = await req.json().catch(() => ({}));
  const db = await readDb();
  const cat = db.categories.find((c) => c.id === params.id);
  if (!cat) return NextResponse.json({ error: 'No encontrada.' }, { status: 404 });
  if (body.name !== undefined) cat.name = String(body.name);
  if (body.icon !== undefined) cat.icon = String(body.icon);
  if (body.active !== undefined) cat.active = Boolean(body.active);
  await writeDb(db);
  return NextResponse.json({ category: cat });
}

async function handleDELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = adminSession();
  if (!session) return unauthorized();
  if (session.role !== 'ADMIN') return forbidden();
  await ensureSeed();
  const db = await readDb();
  if (db.projects.some((p) => p.categoryId === params.id)) {
    return NextResponse.json({ error: 'No se puede eliminar: hay proyectos en esta categoría.' }, { status: 409 });
  }
  db.categories = db.categories.filter((c) => c.id !== params.id);
  await writeDb(db);
  return NextResponse.json({ ok: true });
}

export const PUT = withApiErrors(handlePUT);
export const DELETE = withApiErrors(handleDELETE);
