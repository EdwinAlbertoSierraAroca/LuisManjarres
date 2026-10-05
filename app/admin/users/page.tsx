import { redirect } from 'next/navigation';
import { getSession } from '@/lib/gallery-session';
import { ensureSeed } from '@/lib/gallery-seed';
import { readDb } from '@/lib/gallery-store';
import Users from './Users';
export default async function Page() {
  const s = getSession();
  if (!s) redirect('/admin/login');
  await ensureSeed();
  const me = (await readDb()).users.find((u) => u.id === s.sub);
  if (!me || !me.active) redirect('/admin/login');
  if (me.role !== 'ADMIN') {
    // Antes redirigía en silencio al dashboard y parecía que el enlace "no abría".
    return (
      <div style={{ maxWidth: 560 }}>
        <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 22 }}>Usuarios del login</h1>
        <div role="alert" style={{ marginTop: 14, background: '#111827', border: '1px solid #92400e', borderRadius: 14, padding: '16px 18px', color: '#fde68a', fontSize: 14, lineHeight: 1.6 }}>
          <b>Tu cuenta ({me.email}) tiene rol EDITOR.</b> La administración de usuarios es solo para cuentas con rol <b>ADMIN</b>.
          <br />
          Para entrar, cierra sesión e ingresa con una cuenta ADMIN; desde allí puedes cambiar tu rol a ADMIN en “Editar”.
        </div>
      </div>
    );
  }
  return <Users />;
}
