import { NextResponse } from 'next/server';
import { ensureSeed } from '@/lib/gallery-seed';
import { readDb } from '@/lib/gallery-store';
import type { PublicProject } from '@/lib/gallery-types';

export async function GET(req: Request) {
  ensureSeed();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') ?? 'todos';
  const db = readDb();
  const cats = new Map(db.categories.map((c) => [c.id, c]));
  const projects: PublicProject[] = db.projects
    .filter((p) => p.active)
    .filter((p) => (category === 'todos' ? true : cats.get(p.categoryId)?.slug === category))
    .map((p) => ({
      ...p,
      categoryName: cats.get(p.categoryId)?.name ?? 'General',
      categorySlug: cats.get(p.categoryId)?.slug ?? 'general',
    }))
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  const categories = db.categories.filter((c) => c.active);
  return NextResponse.json({ projects, categories });
}
