'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const next = useSearchParams().get('next') || '/admin';
  const [email, setEmail] = useState('admin@prosoinpen.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'No se pudo iniciar sesión.');
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError('Error de red. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'radial-gradient(circle at top, #0f766e33, transparent 60%), #0b1220', padding: 16 }}>
      <form onSubmit={onSubmit} style={{ width: '100%', maxWidth: 380, background: '#fff', borderRadius: 20, padding: '2rem', color: '#0f172a' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: 12, letterSpacing: '0.32em', color: '#0f766e', fontWeight: 800 }}>JD GROUP SOLAR</div>
          <h1 style={{ fontSize: 22, fontWeight: 900, marginTop: 6 }}>Panel de administración</h1>
          <p style={{ fontSize: 13, color: '#64748b' }}>Acceso restringido a personal autorizado.</p>
        </div>
        <label style={labelStyle}>
          Usuario
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required autoComplete="username" style={inputStyle} placeholder="admin@prosoinpen.com" />
        </label>
        <label style={labelStyle}>
          Contraseña
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required autoComplete="current-password" style={inputStyle} placeholder="••••••••" />
        </label>
        {error ? <p style={{ color: '#dc2626', fontSize: 13, marginTop: 8 }}>{error}</p> : null}
        <button disabled={loading} type="submit" style={{ marginTop: 16, width: '100%', padding: '0.8rem', borderRadius: 12, background: '#0f766e', color: '#fff', fontWeight: 800 }}>
          {loading ? 'Verificando…' : 'Iniciar sesión'}
        </button>
        <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 12, textAlign: 'center' }}>
          Usuario inicial: configura ADMIN_EMAIL / ADMIN_PASSWORD en .env.local
        </p>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 700, marginTop: 12 };
const inputStyle: React.CSSProperties = { display: 'block', width: '100%', marginTop: 6, border: '1px solid #e2e8f0', borderRadius: 12, padding: '0.7rem 0.85rem', fontSize: 14 };
