'use client';
import { useEffect, useState } from 'react';
export default function Cats() {
  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState('');
  async function load() { const r = await fetch('/api/admin/categories'); const d = await r.json(); setItems(d.categories ?? []); }
  useEffect(() => { load(); }, []);
  async function add(e: any) {
    e.preventDefault();
    const r = await fetch('/api/admin/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) });
    const d = await r.json();
    if (!r.ok) { alert(d.error); return; }
    setName(''); load();
  }
  async function toggle(c: any) {
    await fetch('/api/admin/categories/' + c.id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: !c.active }) });
    load();
  }
  async function remove(c: any) {
    if (!confirm('Eliminar categoria?')) return;
    const r = await fetch('/api/admin/categories/' + c.id, { method: 'DELETE' });
    const d = await r.json();
    if (!r.ok) { alert(d.error); return; }
    load();
  }
  return (
    <div>
      <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 22 }}>Categorias</h1>
      <form onSubmit={add} style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nueva categoria" style={{ flex: 1, borderRadius: 10, padding: 10 }} />
        <button style={{ background: '#0f766e', color: '#fff', borderRadius: 10, padding: '10px 16px', fontWeight: 800 }}>Agregar</button>
      </form>
      <div style={{ background: '#fff', borderRadius: 14, padding: 14, marginTop: 12, color: '#0f172a' }}>
        {items.map(c => <div key={c.id} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: '1px solid #eee', fontSize: 14 }}><span style={{ flex: 1 }}>{c.icon} {c.name} <small style={{ color: '#888' }}>/{c.slug}</small></span><span>{c.active ? 'Activa' : 'Oculta'}</span><button onClick={() => toggle(c)} style={{ fontSize: 12 }}>Cambiar</button><button onClick={() => remove(c)} style={{ fontSize: 12, color: 'red' }}>Eliminar</button></div>)}
      </div>
    </div>
  );
}
