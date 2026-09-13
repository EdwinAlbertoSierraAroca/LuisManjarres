import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSession } from '@/lib/gallery-session';
import { ensureSeed } from '@/lib/gallery-seed';
import { readDb } from '@/lib/gallery-store';

export default function AdminDashboard() {
  const session = getSession();
  if (!session) redirect('/admin/login');
  ensureSeed();
  const db = readDb();
  const recent = [...db.projects].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 6);
  const catName = (id: string) => db.categories.find((c) => c.id === id)?.name ?? '—';

  const cards = [
    { value: db.projects.length, label: 'Proyectos' },
    { value: db.categories.length, label: 'Categorías' },
    { value: db.users.filter((u) => u.active).length, label: 'Usuarios activos' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 900, color: '#fff' }}>Administración</h1>
      <p style={{ color: '#9ca3af', marginTop: 4 }}>Bienvenido, {session.name}. Gestiona el portafolio solar.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 20 }}>
        {cards.map((c) => (
          <div key={c.label} style={{ background: '#fff', color: '#0f172a', borderRadius: 16, padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 900 }}>{c.value}</div>
            <div style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b' }}>{c.label}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, background: '#111827', border: '1px solid #1f2937', borderRadius: 16, padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontWeight: 800, color: '#fff' }}>Proyectos recientes</h2>
          <Link href="/admin/projects/new" style={{ background: '#0f766e', color: '#fff', padding: '0.5rem 1rem', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>
            ＋ Nuevo proyecto
          </Link>
        </div>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column' }}>
          {recent.map((p) => (
            <Link key={p.id} href={`/admin/projects/${p.id}/edit`} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.7rem 0.25rem', borderTop: '1px solid #1f2937', color: '#e5e7eb', textDecoration: 'none', fontSize: 14 }}>
              <span><strong>{p.title}</strong> <span style={{ color: '#9ca3af' }}>· {catName(p.categoryId)} · {p.year}</span></span>
              <span style={{ color: p.active ? '#6ee7b7' : '#fbbf24' }}>{p.active ? 'Activo' : 'Oculto'}</span>
            </Link>
          ))}
          {recent.length === 0 ? <p style={{ color: '#9ca3af' }}>Aún no hay proyectos.</p> : null}
        </div>
      </div>
    </div>
  );
}
