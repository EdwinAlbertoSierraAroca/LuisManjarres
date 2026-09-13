'use client';
import { useEffect, useState } from 'react';
import EditModal from './EditModal';
export type AUser = { id: string; name: string; email: string; role: 'ADMIN' | 'EDITOR'; active: boolean };
async function parseJsonSafe(r: Response): Promise<any> {
  const text = await r.text();
  if (!text) return {};
  try { return JSON.parse(text); } catch { return { error: `Respuesta no-JSON del servidor (HTTP ${r.status}).` }; }
}
export default function Users() {
  const [items, setItems] = useState<AUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'EDITOR'>('EDITOR');
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<AUser | null>(null);
  async function load() {
    setLoading(true); setError('');
    try {
      const r = await fetch('/api/admin/users', { cache: 'no-store' });
      const d = await parseJsonSafe(r);
      if (!r.ok) { setError(d.error || `No se pudo cargar (HTTP ${r.status}).`); setItems([]); return; }
      setItems(d.users ?? []);
    } catch { setError('Error de red.'); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);
  async function create(e: React.FormEvent) {
    e.preventDefault(); setError(''); setSaving(true);
    try {
      const r = await fetch('/api/admin/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password, role }) });
      const d = await parseJsonSafe(r);
      if (!r.ok) { setError(d.error || `No se pudo crear (HTTP ${r.status}).`); return; }
      setName(''); setEmail(''); setPassword(''); setRole('EDITOR'); load();
    } catch { setError('Error de red al crear.'); }
    finally { setSaving(false); }
  }
  async function toggle(u: AUser) {
    try {
      const r = await fetch('/api/admin/users/' + u.id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: !u.active }) });
      const d = await parseJsonSafe(r);
      if (!r.ok) { alert(d.error || `No se pudo actualizar (HTTP ${r.status}).`); return; }
      load();
    } catch { alert('Error de red.'); }
  }
  async function remove(u: AUser) {
    if (!confirm('Eliminar a "' + u.name + '"? No se puede deshacer.')) return;
    try {
      const r = await fetch('/api/admin/users/' + u.id, { method: 'DELETE' });
      const d = await parseJsonSafe(r);
      if (!r.ok) { alert(d.error || `No se pudo eliminar (HTTP ${r.status}).`); return; }
      load();
    } catch { alert('Error de red.'); }
  }
  return (
    <div>
      <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 22 }}>Usuarios del login</h1>
      <p style={{ color: '#9ca3af', fontSize: 13, marginTop: 4 }}>Solo ADMIN. Crea, edita, activa o elimina cuentas.</p>
      {error ? <p role="alert" style={{ background: '#fef2f2', color: '#b91c1c', borderRadius: 10, padding: '10px 14px', fontSize: 13, marginTop: 12 }}>{error}</p> : null}
      <form onSubmit={create} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 16, padding: 16, marginTop: 12 }}>
        <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>Nuevo usuario</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required minLength={2} maxLength={80} autoComplete="off" style={inputStyle} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo@empresa.com" required type="email" maxLength={254} autoComplete="off" style={inputStyle} />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Clave (min 10 + numero/simbolo)" required type="password" minLength={10} autoComplete="new-password" style={inputStyle} />
          <select value={role} onChange={(e) => setRole(e.target.value as 'ADMIN' | 'EDITOR')} style={inputStyle} aria-label="Rol">
            <option value="EDITOR">EDITOR</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <button disabled={saving} style={{ marginTop: 12, background: '#0f766e', color: '#fff', borderRadius: 10, padding: '10px 16px', fontWeight: 800 }}>{saving ? 'Guardando...' : 'Crear usuario'}</button>
      </form>
      <div style={{ background: '#fff', borderRadius: 14, padding: 6, marginTop: 12, color: '#0f172a' }}>
        {loading ? <p style={{ padding: 14, fontSize: 13, color: '#64748b' }}>Cargando...</p> : null}
        {items.map((u) => (
          <div key={u.id} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 12px', borderTop: '1px solid #eef2f7', fontSize: 13, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 220 }}><b>{u.name}</b> <span style={{ color: '#64748b' }}>{u.email}</span>
              <div style={{ marginTop: 2, display: 'flex', gap: 6 }}>
                <span style={pill}>{u.role}</span>
                <span style={pill}>{u.active ? 'Activo' : 'Inactivo'}</span>
              </div>
            </div>
            <button onClick={() => setEditing(u)} style={btn}>Editar</button>
            <button onClick={() => toggle(u)} style={btn}>{u.active ? 'Desactivar' : 'Activar'}</button>
            <button onClick={() => remove(u)} style={{ ...btn, color: '#dc2626' }}>Eliminar</button>
          </div>
        ))}
      </div>
      {editing ? <EditModal user={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); load(); }} /> : null}
    </div>
  );
}
const inputStyle: React.CSSProperties = { borderRadius: 10, padding: '10px 12px', border: '1px solid #334155', background: '#0b1220', color: '#fff', fontSize: 13 };
const btn: React.CSSProperties = { fontSize: 12, fontWeight: 700, background: '#f1f5f9', borderRadius: 8, padding: '7px 12px', color: '#0f172a' };
const pill: React.CSSProperties = { fontSize: 11, fontWeight: 800, borderRadius: 20, padding: '2px 10px', background: '#f1f5f9' };
