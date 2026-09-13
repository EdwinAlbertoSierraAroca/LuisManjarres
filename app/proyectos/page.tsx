import Link from 'next/link';
import ProjectsGallery from '../components/ProjectsGallery';

export const metadata = { title: 'Nuestros proyectos' };

// Datos históricos (la galería pública usa /api/projects).
// `void` evita error de variable sin uso en el build.
const legacyProjects = [
  { name: 'Residencial Solar Norte', location: 'Bogotá', power: '42 kW', status: 'Completado', value: '98%' },
  { name: 'Industria EcoMax', location: 'Medellín', power: '180 kW', status: 'Ejecutando', value: '74%' },
  { name: 'Campus Verde', location: 'Cali', power: '96 kW', status: 'Activa', value: '88%' },
  { name: 'Plaza de la Luz', location: 'Barranquilla', power: '132 kW', status: 'Planificada', value: '52%' },
];

void legacyProjects;

export default function ProyectosPage() {
  return (
    <div className="landing-shell">
      <div className="landing-content mx-auto max-w-[1280px] px-4 py-8 lg:px-8">
        <Link href="/" style={{ fontSize: 13, color: '#0f766e', fontWeight: 800 }}>Volver al inicio</Link>
        <h1 className="section-title" style={{ marginTop: 8 }}>Nuestros proyectos</h1>
        <p className="landing-section-description">Filtra por categoria y abre cada proyecto.</p>
        <div style={{ marginTop: 18 }}><ProjectsGallery /></div>
      </div>
    </div>
  );
}
