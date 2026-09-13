import { redirect } from 'next/navigation';
import { getSession } from '@/lib/gallery-session';
import Tags from './Tags';
export default function Page() {
  if (!getSession()) redirect('/admin/login');
  return <Tags />;
}
