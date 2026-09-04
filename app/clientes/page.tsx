import { DashboardShell } from '../components/dashboard-shell';

const clients = [
  { name: 'Maria López', company: 'Residencial Los Pinos', segment: 'Residencial', value: '23% ahorro' },
  { name: 'Carlos Ruiz', company: 'EcoMax Industries', segment: 'Industrial', value: '31% ahorro' },
  { name: 'Andrea Peña', company: 'Campus Verde', segment: 'Institucional', value: '27% ahorro' },
  { name: 'Javier Soto', company: 'Apex Retail', segment: 'Comercial', value: '18% ahorro' },
];

export default function ClientesPage() {
  return (
    <DashboardShell
      title="Clientes"
      subtitle="Un portafolio diverso de clientes residenciales, comerciales e institucionales con resultados medibles."
    >
      <section className="grid gap-6 md:grid-cols-2">
        {clients.map((client) => (
          <div key={client.name} className="glass-card rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-white">{client.name}</div>
                <div className="text-sm text-slate-400">{client.company}</div>
              </div>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-200">
                {client.segment}
              </span>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <div className="text-sm text-slate-400">Ahorro estimado</div>
              <div className="mt-2 text-2xl font-black text-white">{client.value}</div>
            </div>
          </div>
        ))}
      </section>
    </DashboardShell>
  );
}
