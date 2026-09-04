import { DashboardShell } from '../components/dashboard-shell';

const services = [
  { title: 'Diseño y dimensionado', description: 'Estudios de consumo, simulación solar y propuesta técnica para cada propiedad.', icon: '☀️' },
  { title: 'Instalación total', description: 'Montaje, integración, conexión y puesta en marcha con equipos premium.', icon: '🔧' },
  { title: 'Monitoreo inteligente', description: 'Supervisión remota, optimización energética y soporte técnico permanente.', icon: '📊' },
  { title: 'Baterías y storage', description: 'Diseño de almacenamiento para continuidad y ahorro en picos de demanda.', icon: '🔋' },
  { title: 'Mantenimiento', description: 'Inspecciones, limpieza, diagnóstico y reingeniería de rendimiento.', icon: '🛠️' },
  { title: 'Consultoría', description: 'Estrategia energética para empresas, desarrolladores y propietarios.', icon: '📈' },
];

export default function ServiciosPage() {
  return (
    <DashboardShell
      title="Servicios"
      subtitle="Cada servicio está pensado para acompañar a clientes con soluciones escalables, técnicas y orientadas a resultados."
    >
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <div key={service.title} className="glass-card rounded-3xl p-6">
            <div className="text-4xl">{service.icon}</div>
            <h2 className="mt-5 text-2xl font-bold text-white">{service.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{service.description}</p>
          </div>
        ))}
      </section>
    </DashboardShell>
  );
}
