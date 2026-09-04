import { DashboardShell } from '../components/dashboard-shell';

const metrics = [
  { label: 'Generación', value: '15.2 GWh', delta: '+18.2%' },
  { label: 'Ahorro', value: '$1.28M', delta: '+22.6%' },
  { label: 'Utilización', value: '86%', delta: '+9.4%' },
  { label: 'CO₂ evitado', value: '1.2k t', delta: '+12.1%' },
];

export default function AnalyticsPage() {
  return (
    <DashboardShell
      title="Analytics"
      subtitle="Indicadores clave para medir rendimiento energético, ahorro y evolución del negocio solar."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="glass-card rounded-3xl p-5">
            <div className="text-sm text-slate-400">{metric.label}</div>
            <div className="mt-5 text-3xl font-black text-white">{metric.value}</div>
            <div className="mt-3 text-sm text-emerald-300">{metric.delta}</div>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-card rounded-3xl p-6">
          <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Producción</div>
          <h2 className="mt-2 text-xl font-bold text-white">Evolución mensual</h2>
          <div className="mt-6 flex h-60 items-end gap-3">
            {[34, 42, 38, 56, 60, 72, 68, 85, 92, 88, 98, 102].map((height, index) => (
              <div key={index} className="flex-1 rounded-t-2xl bg-gradient-to-t from-emerald-400 to-cyan-400" style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Resumen</div>
          <h2 className="mt-2 text-xl font-bold text-white">Principales KPIs</h2>
          <div className="mt-6 space-y-4">
            {[
              { label: 'Satisfacción', value: '98%' },
              { label: 'Tiempo medio de cierre', value: '17 días' },
              { label: 'Retorno estimado', value: '4.1 años' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <div className="text-sm text-slate-400">{item.label}</div>
                <div className="mt-2 text-2xl font-black text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
