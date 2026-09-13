'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function ProjectsGallery() {
  const [projects, setProjects] = useState<any[]>([]);
  const [cats, setCats] = useState<any[]>([]);
  const [tab, setTab] = useState('todos');
  useEffect(() => {
    fetch('/api/projects?category=' + tab).then(r => r.json()).then(d => {
      setProjects(d.projects ?? []); if (d.categories) setCats(d.categories);
    });
  }, [tab]);
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        <button onClick={() => setTab('todos')} className={tab === 'todos' ? 'gallery-tab active' : 'gallery-tab'}>Todos</button>
        {cats.map(c => <button key={c.id} onClick={() => setTab(c.slug)} className={tab === c.slug ? 'gallery-tab active' : 'gallery-tab'}>{c.name}</button>)}
      </div>
      <div className="project-grid">
        {projects.map(p => (
          <Link key={p.id} href={'/proyectos/' + p.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
            <article className="project-card">
              <div className="project-card__visual" style={p.coverImage ? { backgroundImage: 'url(' + p.coverImage + ')', backgroundSize: 'cover', backgroundPosition: 'center' } : {}} />
              <div className="project-card__body">
                <div><h3 style={{ color: '#FFFFFF', opacity: 1 }}>{p.title}</h3><p style={{ color: '#FFFFFF', opacity: 1 }}>{p.location} - {p.year}</p></div>
                <span className="project-tag">{p.categoryName}</span>
              </div>
              <div className="project-card__value" style={{ color: '#FFFFFF', opacity: 1 }}>{p.powerKwp} kWp</div>
              <div className="project-card__specs"><span style={{ color: '#FFFFFF', opacity: 1 }}><b>Solucion</b>{p.solutionType}</span><span style={{ color: '#FFFFFF', opacity: 1 }}><b>Fotos</b>{p.images?.length ?? 0}</span></div>
            </article>
          </Link>
        ))}
      </div>
      {projects.length === 0 ? <p style={{ color: '#64748b', marginTop: 12 }}>No hay proyectos en esta categoria todavia.</p> : null}
    </div>
  );
}
