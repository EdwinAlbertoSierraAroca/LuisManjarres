import { redirect } from 'next/navigation';
import { getSession } from '@/lib/gallery-session';
import Editor from '../Editor';

export default function NewProjectPage() {
  if (!getSession()) redirect('/admin/login');
  return (
    <div>
      <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 22 }}>Nuevo proyecto</h1>
      <p style={{ color: '#9ca3af', fontSize: 13, margin: '6px 0 16px' }}>Sube portada + galeria de fotos.</p>
      <Editor />
    </div>
  );
}
