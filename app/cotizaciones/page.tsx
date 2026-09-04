import { DashboardShell } from '../components/dashboard-shell';

const quotes = [
  { client: 'María López', project: 'Residencial Solar Norte', amount: '$28.400', status: 'Pendiente' },
  { client: 'Carlos Ruiz', project: 'EcoMax Industries', amount: '$94.800', status: 'Aprobada' },
  { client: 'Andrea Peña', project: 'Campus Verde', amount: '$41.300', status: 'Revision' },
  { client: 'Javier Soto', project: 'Apex Retail', amount: '$63.200', status: 'Enviada' },
];

export default function CotizacionesPage() {
  return (
    <DashboardShell
      title="Cotizaciones"
      subtitle="Seguimiento del pipeline comercial con propuestas, estados y montos por proyecto."
    >
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {quotes.map((quote) => (
          <div key={`${quote.client}-${quote.project}`} className="glass-card rounded-3xl p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-bold text-white">{quote.client}</div>
                <div className="mt-1 text-sm text-slate-400">{quote.project}</div>
              </div>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-200">
                {quote.status}
              </span>
            </div>

            <div className="mt-6 text-2xl font-black text-white">{quote.amount}</div>
          </div>
        ))}
      </section>
    </DashboardShell>
  );
}
