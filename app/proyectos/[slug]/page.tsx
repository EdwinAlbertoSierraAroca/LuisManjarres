import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ensureSeed } from '@/lib/gallery-seed';
import { readDb } from '@/lib/gallery-store';
import Viewer from './Viewer';

// Los proyectos se leen de la base (Redis) en cada visita: la página debe ser dinámica.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    await ensureSeed();
    const db = await readDb();
    const p = db.projects.find((x) => x.slug === params.slug && x.active);
    if (!p) return { title: 'Proyecto no encontrado', robots: { index: false } };
    const cat = db.categories.find((c) => c.id === p.categoryId);
    const bits = [cat?.name, p.location, p.year ? String(p.year) : '', p.powerKwp ? `${p.powerKwp} kWp` : ''].filter(Boolean).join(' · ');
    const description = (p.description?.trim() || `Proyecto de PROSOINPEN S.A.S.: ${p.title}. ${bits}.`).slice(0, 300);
    const img = p.coverImage || p.images?.[0]?.url;
    return {
      title: p.title,
      description,
      alternates: { canonical: `/proyectos/${p.slug}` },
      openGraph: { title: `${p.title} | PROSOINPEN S.A.S.`, description, url: `/proyectos/${p.slug}`, type: 'article', images: img ? [img] : ['/og-prosoinpen.jpg'] },
    };
  } catch {
    return { title: 'Proyecto', alternates: { canonical: `/proyectos/${params.slug}` } };
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  await ensureSeed();
  const db = await readDb();
  const p = db.projects.find((x) => x.slug === params.slug && x.active);
  if (!p) notFound();
  const project = p as NonNullable<typeof p>;
  const cat = db.categories.find((c) => c.id === project.categoryId);
  const related = db.projects.filter((x) => x.active && x.id !== project.id && x.categoryId === project.categoryId).slice(0, 3);
  return (
    <div className="landing-shell">
      <div className="landing-content mx-auto max-w-[1100px] px-4 py-8 lg:px-8">
        <Link href="/proyectos" style={{ fontSize: 13, color: '#0f766e', fontWeight: 800 }}>Todos los proyectos</Link>
        <h1 className="section-title" style={{ marginTop: 8 }}>{project.title}</h1>
        <p className="landing-section-description">{cat?.name ?? ''}{project.subcategory ? ' · ' + project.subcategory : ''} — {project.location} · {project.year} · {project.powerKwp} kWp · {project.solutionType}</p>
        <div style={{ marginTop: 16 }}><Viewer images={project.images} title={project.title} /></div>
        {project.description ? <p style={{ marginTop: 16, color: '#334155' }}>{project.description}</p> : null}
        {related.length ? (
          <div style={{ marginTop: 24 }}>
            <h2 style={{ fontWeight: 800 }}>Relacionados</h2>
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              {related.map(r => <Link key={r.id} href={'/proyectos/' + r.slug} style={{ fontSize: 13 }}>{r.title}</Link>)}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
