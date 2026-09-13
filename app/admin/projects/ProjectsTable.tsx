'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function ProjectsTable() {
  const [items, setItems] = useState<any[]>([]);
  const [cats, setCats] = useState<any[]>([]);
  async function load() {
    const r = await fetch('/api/admin/projects');
    const d = await r.json();
    setItems(d.projects ?? []); setCats(d.categories ?? []);
  }
  useEffect(() => { load(); }, []);
  const name = (id: string) => cats.find(c => c.id === id)?.name ?? '-';
  async function toggle(p: any) {
    await fetch('/api/admin/projects/' + p.id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: !p.active }) });
    load();
  }
  async function remove(p: any) {
    if (!confirm('Eliminar "' + p.title + '"?')) return;
    const r = await fetch('/api/admin/projects/' + p.id, { method: 'DELETE' });
    const d = await r.json();
    if (!r.ok) { alert(d.error); return; }
    load();
  }
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: 14, color: '#0f172a', marginTop: 12 }}>
      <div style={{ marginBottom: 10 }}><Link href="/admin/projects/new" style={{ background: '#0f766e', color: '#fff', padding: '8px 14px', borderRadius: 10, textDecoration: 'none', fontWeight: 800, fontSize: 13 }}>Nuevo proyecto</Link></div>
      {items.map(p => (
        <div key={p.id} style={{ display: 'flex', gap: 10, alignItems: 'center', borderTop: '1px solid #eee', padding: '10px 0', fontSize: 13 }}>
          <img src={p.coverImage} alt="" style={{ width: 64, height: 44, objectFit: 'cover', borderRadius: 8 }} />
          <div style={{ flex: 1 }}><b>{p.title}</b><br /><span style={{ color: '#64748b' }}>{name(p.categoryId)} - {p.location} - {p.year} - {p.powerKwp} kWp</span></div>
          <span style={{ fontSize: 12 }}>{p.active ? 'Activo' : 'Oculto'}</span>
          <Link href={'/admin/projects/' + p.id + '/edit'} style={{ fontSize: 12 }}>Editar</Link>
          <button onClick={() => toggle(p)} style={{ fontSize: 12 }}>{p.active ? 'Ocultar' : 'Activar'}</button>
          <button onClick={() => remove(p)} style={{ fontSize: 12, color: 'red' }}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
