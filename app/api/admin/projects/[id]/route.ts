import { NextResponse } from 'next/server';
import { ensureSeed } from '@/lib/gallery-seed';
import { readDb, writeDb } from '@/lib/gallery-store';
import { adminSession, forbidden, unauthorized } from '../../guard';
import { withApiErrors } from '@/lib/api-errors';
import { deleteImages, projectImageUrls } from '@/lib/media-store';

type ImageInput = { id?: unknown; url?: unknown; caption?: unknown };
function cleanImages(list: unknown[]) {
  return list
    .slice(0, 30)
    .map((img, i) => {
      const x = (img ?? {}) as ImageInput;
      return { id: String(x.id ?? `img_${Date.now()}_${i}`), url: String(x.url ?? '').trim(), caption: String(x.caption ?? '').slice(0, 140) };
    })
    .filter((img) => img.url);
}

/** URLs que dejó de usar este proyecto y que ningún otro proyecto usa. */
function orphanedUrls(before: string[], after: string[], others: Array<{ coverImage?: string; images?: Array<{ url: string }> }>) {
  const keep = new Set([...after, ...others.flatMap(projectImageUrls)]);
  return before.filter((u) => !keep.has(u));
}

async function handleGET(_req: Request, { params }: { params: { id: string } }) {
  const session = adminSession();
  if (!session) return unauthorized();
  await ensureSeed();
  const db = await readDb();
  const project = db.projects.find((p) => p.id === params.id);
  if (!project) return NextResponse.json({ error: 'No encontrado.' }, { status: 404 });
  return NextResponse.json({ project, categories: db.categories, tags: db.tags });
}

async function handlePUT(req: Request, { params }: { params: { id: string } }) {
  const session = adminSession();
  if (!session) return unauthorized();
  if (session.role !== 'ADMIN' && session.role !== 'EDITOR') return forbidden();
  await ensureSeed();
  const body = await req.json().catch(() => ({}));
  const db = await readDb();
  const idx = db.projects.findIndex((p) => p.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'No encontrado.' }, { status: 404 });
  const current = db.projects[idx];
  const next = {
    ...current,
    title: body.title !== undefined ? String(body.title) : current.title,
    categoryId: body.categoryId !== undefined ? String(body.categoryId) : current.categoryId,
    subcategory: body.subcategory !== undefined ? String(body.subcategory) : current.subcategory,
    location: body.location !== undefined ? String(body.location) : current.location,
    year: body.year !== undefined ? Number(body.year) || current.year : current.year,
    powerKwp: body.powerKwp !== undefined ? Number(body.powerKwp) || 0 : current.powerKwp,
    solutionType: body.solutionType !== undefined ? String(body.solutionType) : current.solutionType,
    description: body.description !== undefined ? String(body.description) : current.description,
    coverImage: body.coverImage !== undefined ? String(body.coverImage) : current.coverImage,
    images: Array.isArray(body.images) ? cleanImages(body.images) : current.images,
    tagIds: Array.isArray(body.tagIds) ? body.tagIds.map(String) : current.tagIds,
    featured: body.featured !== undefined ? Boolean(body.featured) : current.featured,
    active: body.active !== undefined ? Boolean(body.active) : current.active,
    updatedAt: new Date().toISOString(),
  };
  if (!next.title) return NextResponse.json({ error: 'El título es obligatorio.' }, { status: 400 });
  if (!next.coverImage && next.images.length > 0) next.coverImage = next.images[0].url;
  db.projects[idx] = next;
  await writeDb(db);
  const others = db.projects.filter((p) => p.id !== next.id);
  await deleteImages(orphanedUrls(projectImageUrls(current), projectImageUrls(next), others));
  return NextResponse.json({ project: next });
}

async function handleDELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = adminSession();
  if (!session) return unauthorized();
  if (session.role !== 'ADMIN') return forbidden();
  await ensureSeed();
  const db = await readDb();
  const removed = db.projects.find((p) => p.id === params.id);
  if (!removed) return NextResponse.json({ error: 'No encontrado.' }, { status: 404 });
  db.projects = db.projects.filter((p) => p.id !== params.id);
  await writeDb(db);
  await deleteImages(orphanedUrls(projectImageUrls(removed), [], db.projects));
  return NextResponse.json({ ok: true });
}

export const GET = withApiErrors(handleGET);
export const PUT = withApiErrors(handlePUT);
export const DELETE = withApiErrors(handleDELETE);
