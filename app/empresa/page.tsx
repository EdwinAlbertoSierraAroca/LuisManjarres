import { DashboardShell } from '../components/dashboard-shell';

const pillars = [
  { title: 'Misión', text: 'Acompañar a personas y empresas para acelerar su transición energética con soluciones fiables y rentables.', emoji: 'M' },
  { title: 'Visión', text: 'Ser el referente regional en innovación solar, integridad técnica y acompañamiento estratégico.', emoji: 'V' },
  { title: 'Valores', text: 'Transparencia, rigor técnico, sostenibilidad real y confianza en cada etapa del proyecto.', emoji: 'Q' },
];

export default function EmpresaPage() {
  return (
    <DashboardShell title="Empresa" subtitle="Una organización enfocada en ingeniería solar, ejecución impecable y acompañamiento estratégico para cada cliente.">
      <section className="hero-panel rounded-[32px] p-6 md:p-8 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="relative z-10">
            <div className="section-tag">Empresa</div>

            <h1 className="luxury-title mt-5 max-w-[680px] text-5xl leading-[0.9] text-[#1f1b17] md:text-7xl lg:text-[5.2rem]">
              Elegancia solar para una nueva era.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-[#52433d] md:text-lg">
              Somos una compañía enfocada en transformar la energía en una ventaja estratégica para hogares, negocios y organizaciones que buscan eficiencia, ahorro y sostenibilidad sin comprometer la calidad ni el diseño.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="primary-btn">Contáctanos</button>
              <button className="secondary-btn">Nuestra historia</button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Clientes', value: '240+' },
                { label: 'Ahorro', value: '38%' },
                { label: 'Proyectos', value: '1.2K' },
              ].map((stat) => (
                <div key={stat.label} className="metric-card">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#7b5a40]">{stat.label}</div>
                  <div className="mt-2 text-2xl font-black text-[#1f1b17]">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="hero-visual">
              <div className="flex items-center justify-between gap-3 border-b border-[#b79977]/40 pb-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.26em] text-[#7b5a40]">Perfil</div>
                  <div className="mt-2 text-3xl font-black text-[#201a17]">Solar Studio</div>
                </div>
                <span className="stat-pill">Desde 2013</span>
              </div>

              <div className="mt-6 grid gap-4">
                <div className="rounded-[22px] border border-[#d9bf8e]/30 bg-[#1d1917]/90 p-4">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-[#d9bf8e]">Eficiencia</div>
                  <div className="mt-2 text-4xl font-black text-[#f8f1e8]">38%</div>
                </div>

                <div className="rounded-[22px] border border-[#d9bf8e]/25 bg-[#1d1917]/90 p-4 text-sm leading-7 text-[#d7cabd]">
                  Diseñamos soluciones energéticas inteligentes para acompañar a clientes desde la estrategia hasta la operación, con rigor técnico y una experiencia premium en cada etapa.
                </div>
              </div>
            </div>

            <div className="floating-panel top-[-12px] right-[-10px]">
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#7b5a40]">Confianza</div>
              <div className="mt-2 text-2xl font-black text-[#201a17]">98%</div>
            </div>
          </div>
        </div>
      </section>

      <section id="valores" className="mt-12">
        <div className="mb-6 text-center">
          <div className="section-tag mx-auto">Nuestra esencia</div>
          <h2 className="luxury-subtitle mt-4 text-4xl text-[#1b1714] md:text-6xl">Información de la empresa.</h2>
        </div>

        <div className="bento-grid">
          {pillars.map((card, index) => (
            <article key={card.title} className={`spotlight-card p-6 ${index === 0 ? 'bento-large' : ''}`}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f3d7a5] via-[#d9bf8e] to-[#a57a52] text-lg font-black text-[#120f0d]">{card.emoji}</div>
              <h3 className="text-2xl font-black text-[#1f1b17] md:text-[2rem]">{card.title}</h3>
              <p className="mt-4 text-base leading-7 text-[#4b3d36]">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contacto" className="mt-12 pb-10">
        <div className="cta-panel rounded-[32px] p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="section-tag">Contacto</div>
              <h2 className="luxury-subtitle mt-4 text-4xl text-[#1b1714] md:text-6xl">Hablemos de tu próximo proyecto.</h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-[#584b45]">
                Te acompañamos desde el diagnóstico inicial hasta la puesta en marcha, con acompañamiento humano, técnico y responsable en cada etapa.
              </p>
            </div>

            <button className="primary-btn">Agendar reunión</button>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
