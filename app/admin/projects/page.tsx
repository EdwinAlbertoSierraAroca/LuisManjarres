import { redirect } from 'next/navigation';
import { getSession } from '@/lib/gallery-session';
import ProjectsTable from './ProjectsTable';

export default function ProjectsPage() {
  if (!getSession()) redirect('/admin/login');
  return (
    <div>
      <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 22 }}>Proyectos</h1>
      <ProjectsTable />
    </div>
  );
}
