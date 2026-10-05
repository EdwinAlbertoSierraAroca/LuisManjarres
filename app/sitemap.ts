import type { MetadataRoute } from 'next';
import { resources } from '@/lib/recursos';
import { readDb } from '@/lib/gallery-store';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.prosoinpen.com';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/proyectos`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/recursos`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    ...resources.map((r) => ({ url: `${siteUrl}/recursos/${r.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 })),
  ];
  try {
    const db = await readDb();
    for (const p of db.projects.filter((x) => x.active)) {
      pages.push({ url: `${siteUrl}/proyectos/${p.slug}`, lastModified: new Date(p.updatedAt || p.createdAt), changeFrequency: 'monthly', priority: 0.6 });
    }
  } catch {
    // Si la base no responde, el sitemap igual sale con las páginas fijas.
  }
  return pages;
}
