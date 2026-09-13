import Link from 'next/link';
import { getSession } from '@/lib/gallery-session';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = getSession();

  // /admin/login se renderiza sin sidebar (sin sesión todavía).
  if (!session) return <>{children}</>;

  async function logout() {
    'use server';
    const { cookies } = await import('next/headers');
    const { redirect } = await import('next/navigation');
    cookies().delete('ps_admin');
    redirect('/admin/login');
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0b1220', color: '#e5e7eb' }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <aside style={{ width: 250, background: '#111827', borderRight: '1px solid #1f2937', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.3em', color: '#6ee7b7' }}>JD GROUP SOLAR</div>
            <div style={{ fontWeight: 900, fontSize: 18, color: '#fff' }}>Panel de administración</div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>{session.name} · {session.role}</div>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 14 }}>
            <Link href="/admin" style={linkStyle}>📊 Dashboard</Link>
            <Link href="/admin/projects" style={linkStyle}>📁 Proyectos</Link>
            <Link href="/admin/projects/new" style={linkStyle}>＋ Nuevo proyecto</Link>
            <Link href="/admin/categories" style={linkStyle}>📂 Categorías</Link>
            <Link href="/admin/tags" style={linkStyle}>🏷️ Etiquetas</Link>
            <Link href="/admin/users" style={linkStyle}>👥 Usuarios</Link>
            <Link href="/proyectos" style={linkStyle}>🌐 Ver galería pública</Link>
            <Link href="/" style={linkStyle}>← Volver al sitio</Link>
          </nav>
          <form action={logout} style={{ marginTop: 'auto' }}>
            <button type="submit" style={{ width: '100%', padding: '0.65rem', borderRadius: 10, background: '#1f2937', color: '#fff', fontWeight: 700 }}>
              Cerrar sesión
            </button>
          </form>
        </aside>
        <main style={{ flex: 1, padding: '2rem', maxWidth: 1100 }}>{children}</main>
      </div>
    </div>
  );
}

const linkStyle: React.CSSProperties = {
  padding: '0.6rem 0.8rem',
  borderRadius: 10,
  color: '#e5e7eb',
  textDecoration: 'none',
};

