import { NextResponse } from 'next/server';
import { ensureSeed } from '@/lib/gallery-seed';
import { readDb, slugify, uid, writeDb } from '@/lib/gallery-store';
import { adminSession, forbidden, unauthorized } from '../guard';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function clean(body: any) {
  const title = String(body.title ?? '').trim();
  const categoryId = String(body.categoryId ?? '').trim();
  const subcategory = String(body.subcategory ?? '').trim() || 'General';
  const location = String(body.location ?? '').trim();
  const year = Number(body.year) || new Date().getFullYear();
  const powerKwp = Number(body.powerKwp) || 0;
  const solutionType = String(body.solutionType ?? '').trim() || 'Autoconsumo';
  const description = String(body.description ?? '').trim();
  const coverImage = String(body.coverImage ?? '').trim();
  const images = Array.isArray(body.images) ? body.images.slice(0, 30).map((img: any, i: number) => ({
    id: String(img.id ?? uid('img')),
    url: String(img.url ?? ''),
    caption: String(img.caption ?? `Foto ${i + 1}`),
  })).filter((i: { url: string }) => i.url) : [];
  const tagIds = Array.isArray(body.tagIds) ? body.tagIds.map(String) : [];
  const featured = Boolean(body.featured);
  const active = body.active === undefined ? true : Boolean(body.active);
  return { title, categoryId, subcategory, location, year, powerKwp, solutionType, description, coverImage, images, tagIds, featured, active };
}

export async function GET() {
  try {
    const session = adminSession();
    if (!session) return unauthorized();
    ensureSeed();
    const db = readDb();
    return NextResponse.json({ projects: db.projects, categories: db.categories, tags: db.tags });
  } catch (e: any) {
    console.error('GET /api/admin/projects failed:', e);
    return NextResponse.json({ error: 'Error interno al cargar: ' + (e?.message ?? e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = adminSession();
    if (!session) return unauthorized();
    if (session.role !== 'ADMIN' && session.role !== 'EDITOR') return forbidden();
    ensureSeed();
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Cuerpo JSON inválido.' }, { status: 400 });
    }
    const data = clean(body);
    if (!data.title) return NextResponse.json({ error: 'El título es obligatorio.' }, { status: 400 });
    if (!data.categoryId) return NextResponse.json({ error: 'La categoría es obligatoria.' }, { status: 400 });
    if (!data.coverImage && data.images.length > 0) data.coverImage = data.images[0].url;
    if (!data.coverImage) return NextResponse.json({ error: 'Agrega una imagen principal.' }, { status: 400 });

    const db = readDb();
    const now = new Date().toISOString();
    let slug = slugify(data.title);
    if (db.projects.some((p) => p.slug === slug)) slug = `${slug}-${Date.now().toString(36)}`;
    const project = { id: uid('prj'), slug, createdAt: now, updatedAt: now, ...data };
    db.projects.unshift(project);
    writeDb(db);
    return NextResponse.json({ project }, { status: 201 });
  } catch (e: any) {
    console.error('POST /api/admin/projects failed:', e);
    return NextResponse.json({ error: 'Error interno al guardar: ' + (e?.message ?? e) }, { status: 500 });
  }
}
