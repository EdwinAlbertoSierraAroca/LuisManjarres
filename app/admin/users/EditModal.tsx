'use client';
import { useState } from 'react';
import type { AUser } from './Users';
export default function EditModal({ user, onClose, onSaved }: { user: AUser; onClose: () => void; onSaved: () => void }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState<'ADMIN' | 'EDITOR'>(user.role);
  const [active, setActive] = useState(user.active);
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [saving, setSaving] = useState(false);
  async function save(e: React.FormEvent) {
    e.preventDefault(); setErr(''); setSaving(true);
    try {
      const r = await fetch('/api/admin/users/' + user.id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, role, active, ...(password ? { password } : {}) }) });
      const text = await r.text();
      let d: any = {};
      try { d = text ? JSON.parse(text) : {}; } catch { d = { error: `Respuesta no-JSON (HTTP ${r.status}).` }; }
      if (!r.ok) { setErr(d.error || `No se pudo guardar (HTTP ${r.status}).`); return; }
      onSaved();
    } catch { setErr('Error de red al guardar.'); }
    finally { setSaving(false); }
  }
  return (
    <div role="dialog" aria-modal="true" aria-label="Editar usuario" style={ov} onClick={onClose}>
      <form onSubmit={save} onClick={(e) => e.stopPropagation()} style={card}>
        <h2 style={{ fontWeight: 900, fontSize: 16 }}>Editar usuario</h2>
        {err ? <p role="alert" style={{ color: '#b91c1c', fontSize: 13 }}>{err}</p> : null}
        <label style={lb}>Nombre<input value={name} onChange={(e) => setName(e.target.value)} required minLength={2} maxLength={80} style={inp} /></label>
        <label style={lb}>Correo<input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" maxLength={254} style={inp} /></label>
        <label style={lb}>Rol<select value={role} onChange={(e) => setRole(e.target.value as 'ADMIN' | 'EDITOR')} style={inp}><option value="EDITOR">EDITOR</option><option value="ADMIN">ADMIN</option></select></label>
        <label style={lb}>Estado<select value={active ? '1' : '0'} onChange={(e) => setActive(e.target.value === '1')} style={inp}><option value="1">Activo</option><option value="0">Inactivo</option></select></label>
        <label style={lb}>Nueva clave (opcional)<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="new-password" placeholder="Dejar vacia para no cambiar" style={inp} /></label>
        <div style={{ display: 'flex', gap: 8, marginTop: 14, justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose} style={btn}>Cancelar</button>
          <button disabled={saving} type="submit" style={primary}>{saving ? 'Guardando...' : 'Guardar'}</button>
        </div>
      </form>
    </div>
  );
}
const ov: React.CSSProperties = { position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.6)', display: 'grid', placeItems: 'center', padding: 16, zIndex: 50 };
const card: React.CSSProperties = { width: '100%', maxWidth: 460, background: '#fff', color: '#0f172a', borderRadius: 16, padding: 20 };
const lb: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 700, marginTop: 10 };
const inp: React.CSSProperties = { display: 'block', width: '100%', marginTop: 4, border: '1px solid #e2e8f0', borderRadius: 10, padding: '9px 12px', fontSize: 13 };
const btn: React.CSSProperties = { background: '#f1f5f9', borderRadius: 10, padding: '10px 16px', fontWeight: 700, fontSize: 13 };
const primary: React.CSSProperties = { background: '#0f766e', color: '#fff', borderRadius: 10, padding: '10px 16px', fontWeight: 800, fontSize: 13 };
