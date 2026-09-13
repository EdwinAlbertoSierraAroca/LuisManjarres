import { redirect } from 'next/navigation';
import { getSession } from '@/lib/gallery-session';
import Cats from './Cats';
export default function Page() {
  if (!getSession()) redirect('/admin/login');
  return <Cats />;
}
