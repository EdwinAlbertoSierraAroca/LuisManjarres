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
  if (!me || me.role !== 'ADMIN' || !me.active) redirect('/admin');
  return <Users />;
}
