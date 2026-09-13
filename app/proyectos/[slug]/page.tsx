import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ensureSeed } from '@/lib/gallery-seed';
import { readDb } from '@/lib/gallery-store';
import Viewer from './Viewer';

export function generateStaticParams() {
  return [];
}

export const dynamicParams = true;

export default function Page({ params }: { params: { slug: string } }) {
  ensureSeed();
  const db = readDb();
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
