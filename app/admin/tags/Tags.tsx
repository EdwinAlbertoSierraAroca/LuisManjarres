'use client';
import { useEffect, useState } from 'react';
export default function Tags() {
  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState('');
  async function load() { const r = await fetch('/api/admin/tags'); const d = await r.json(); setItems(d.tags ?? []); }
  useEffect(() => { load(); }, []);
  async function add(e: any) {
    e.preventDefault();
    const r = await fetch('/api/admin/tags', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) });
    const d = await r.json();
    if (!r.ok) { alert(d.error); return; }
    setName(''); load();
  }
  return (
    <div>
      <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 22 }}>Etiquetas</h1>
      <form onSubmit={add} style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nueva etiqueta" style={{ flex: 1, borderRadius: 10, padding: 10 }} />
        <button style={{ background: '#0f766e', color: '#fff', borderRadius: 10, padding: '10px 16px', fontWeight: 800 }}>Agregar</button>
      </form>
      <div style={{ background: '#fff', borderRadius: 14, padding: 14, marginTop: 12, color: '#0f172a', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {items.map(t => <span key={t.id} style={{ background: '#f1f5f9', borderRadius: 20, padding: '6px 12px', fontSize: 13 }}>{t.name}</span>)}
      </div>
    </div>
  );
}
