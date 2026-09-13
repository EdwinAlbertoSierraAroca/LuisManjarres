import { redirect } from 'next/navigation';
import { getSession } from '@/lib/gallery-session';
import { ensureSeed } from '@/lib/gallery-seed';
import { readDb } from '@/lib/gallery-store';
import Editor from '../../Editor';

export default function EditPage({ params }: { params: { id: string } }) {
  if (!getSession()) redirect('/admin/login');
  ensureSeed();
  const p = readDb().projects.find(x => x.id === params.id);
  if (!p) redirect('/admin/projects');
  return (
    <div>
      <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 22 }}>Editar: {p.title}</h1>
      <div style={{ marginTop: 12 }}><Editor projectId={p.id} initial={{ title: p.title, categoryId: p.categoryId, subcategory: p.subcategory, location: p.location, year: p.year, powerKwp: p.powerKwp, solutionType: p.solutionType, description: p.description, coverImage: p.coverImage, images: p.images, tagIds: p.tagIds, featured: p.featured, active: p.active }} /></div>
    </div>
  );
}
