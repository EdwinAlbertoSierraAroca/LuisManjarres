import { DashboardShell } from '../components/dashboard-shell';

const leads = [
  { name: 'Daniel Álvarez', source: 'Formulario web', stage: 'Calificado', value: '$18.500' },
  { name: 'Paula Gómez', source: 'LinkedIn', stage: 'Contacto', value: '$12.900' },
  { name: 'Felipe Ramos', source: 'Referido', stage: 'Propuesta', value: '$24.600' },
  { name: 'Valentina Cruz', source: 'Campaña', stage: 'Nuevo', value: '$9.700' },
];

export default function LeadsPage() {
  return (
    <DashboardShell
      title="Leads"
      subtitle="Control del pipeline de captación, prioridad de clientes y etapas de conversión." 
    >
      <section className="grid gap-6 md:grid-cols-2">
        {leads.map((lead) => (
          <div key={lead.name} className="glass-card rounded-3xl p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-lg font-bold text-white">{lead.name}</div>
                <div className="text-sm text-slate-400">{lead.source}</div>
              </div>
              <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-200">
                {lead.stage}
              </span>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <div className="text-sm text-slate-400">Potencial estimado</div>
              <div className="mt-2 text-2xl font-black text-white">{lead.value}</div>
            </div>
          </div>
        ))}
      </section>
    </DashboardShell>
  );
}
