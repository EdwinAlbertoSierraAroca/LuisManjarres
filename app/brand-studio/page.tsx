import { DashboardShell } from '../components/dashboard-shell';

const brandItems = [
  { label: 'Logo', value: 'Solar Platform' },
  { label: 'Paleta', value: 'Verde / Cian / Slate' },
  { label: 'Tono', value: 'Premium / tecnológico' },
  { label: 'Mensaje', value: 'Energía inteligente para un futuro sostenible' },
];

export default function BrandStudioPage() {
  return (
    <DashboardShell
      title="Brand Studio"
      subtitle="Sistema de identidad visual y narrativa para reforzar la presencia premium de la marca en todos los puntos de contacto."
    >
      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="glass-card rounded-3xl p-6">
          <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Identidad visual</div>
          <div className="mt-5 flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-400 via-emerald-300 to-cyan-500 font-black text-2xl text-slate-950 shadow-glow">
              S
            </div>
            <div>
              <div className="text-2xl font-black text-white">Solar Platform</div>
              <div className="text-sm text-slate-400">Energy Intelligence</div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {brandItems.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
                <div className="mt-2 text-base font-semibold text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Paleta</div>
          <div className="mt-6 space-y-4">
            {[
              { color: 'bg-emerald-400', text: 'Emerald #34d399' },
              { color: 'bg-cyan-400', text: 'Cyan #22d3ee' },
              { color: 'bg-slate-800', text: 'Slate #0f172a' },
              { color: 'bg-white', text: 'White #f8fafc' },
            ].map((swatch) => (
              <div key={swatch.text} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-3">
                <div className={`h-12 w-12 rounded-2xl ${swatch.color}`} />
                <span className="text-white">{swatch.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
