import { NextResponse } from 'next/server';
import { ensureSeed } from '@/lib/gallery-seed';
import { readDb } from '@/lib/gallery-store';

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  ensureSeed();
  const db = readDb();
  const project = db.projects.find((p) => p.slug === params.slug && p.active);
  if (!project) return NextResponse.json({ error: 'No encontrado.' }, { status: 404 });
  const category = db.categories.find((c) => c.id === project.categoryId);
  const tags = db.tags.filter((t) => project.tagIds.includes(t.id));
  const related = db.projects
    .filter((p) => p.active && p.id !== project.id && p.categoryId === project.categoryId)
    .slice(0, 3)
    .map((p) => ({ title: p.title, slug: p.slug, coverImage: p.coverImage, location: p.location }));
  return NextResponse.json({ project, category, tags, related });
}
