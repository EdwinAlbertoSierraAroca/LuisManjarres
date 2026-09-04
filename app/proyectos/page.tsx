import { DashboardShell } from '../components/dashboard-shell';

const projects = [
  { name: 'Residencial Solar Norte', location: 'Bogotá', power: '42 kW', status: 'Completado', value: '98%' },
  { name: 'Industria EcoMax', location: 'Medellín', power: '180 kW', status: 'Ejecutando', value: '74%' },
  { name: 'Campus Verde', location: 'Cali', power: '96 kW', status: 'Activa', value: '88%' },
  { name: 'Plaza de la Luz', location: 'Barranquilla', power: '132 kW', status: 'Planificada', value: '52%' },
];

export default function ProyectosPage() {
  return (
    <DashboardShell
      title="Proyectos"
      subtitle="Portafolio con proyectos ejecutados, activos y en evolución para distintos tipos de clientes."
    >
      <section className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <div key={project.name} className="glass-card overflow-hidden rounded-3xl">
            <div className="h-40 bg-gradient-to-br from-emerald-500/25 via-slate-800 to-cyan-500/20" />
            <div className="p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-white">{project.name}</h2>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-200">
                  {project.status}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <div>📍 {project.location}</div>
                <div>⚡ {project.power}</div>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>Avance</span>
                  <span className="text-white">{project.value}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: project.value }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </DashboardShell>
  );
}
