'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { WhatsAppIcon, whatsappUrl } from './components/whatsapp-contact';
import ThemeToggle from './components/theme-toggle';
import './landing-v2.css';

/* ==========================================================
   CONTENIDO
   Solo datos confirmados. Para agregar cifras, proyectos, marcas
   o testimonios reales, edita estas listas.
   ========================================================== */

const navLinks = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Calculadora', href: '#calculadora' },
  { label: 'Contacto', href: '#contacto' },
];

/** Cifras confirmadas. Agrega kWp instalados, proyectos o municipios cuando estén verificados. */
const stats = [
  { value: '396', suffix: '+', label: 'Sistemas fotovoltaicos', detail: 'instalados en Morales, Bolívar' },
  { value: '5', suffix: '', label: 'Departamentos con obras', detail: 'La Guajira, Magdalena, Meta, Santander y Bolívar' },
];

type IconName = 'sun' | 'bolt' | 'build' | 'wrench' | 'chart' | 'medal' | 'layers' | 'chip' | 'hand' | 'pin' | 'tool';

const services: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: 'sun', title: 'Energía fotovoltaica', text: 'Diseño e implementación de sistemas solares para diferentes necesidades de consumo.' },
  { icon: 'bolt', title: 'Sistemas eléctricos', text: 'Diseño, instalación y adecuación de sistemas eléctricos para proyectos residenciales, comerciales e industriales.' },
  { icon: 'build', title: 'Obras e infraestructura', text: 'Obras civiles, adecuaciones e infraestructura necesarias para la ejecución de proyectos energéticos y espacios públicos.' },
  { icon: 'wrench', title: 'Operación y mantenimiento', text: 'Mantenimiento preventivo y correctivo para conservar el desempeño de las instalaciones.' },
];

const solutions = [
  { title: 'Granjas solares', text: 'Proyectos fotovoltaicos de generación a mayor escala.', image: '/images/sistema-solar-molino.jpg' },
  { title: 'Autoconsumo', text: 'Reduce el consumo de energía de la red mediante generación solar propia.', image: '/about/instalacion-techo.jpg' },
  { title: 'Sistemas híbridos', text: 'Integración de diferentes fuentes y tecnologías de generación.', image: '/images/web/tablero-inversor.jpg' },
  { title: 'Almacenamiento', text: 'Soluciones con baterías para gestionar y aprovechar mejor la energía.', image: '/images/web/tablero-litio.jpg' },
  { title: 'Movilidad eléctrica', text: 'Infraestructura de carga y soluciones asociadas a la movilidad eléctrica.', image: '' },
  { title: 'Equipos e insumos', text: 'Suministro de módulos, inversores, estructuras, protecciones y cable solar.', image: '/images/web/modulos.jpg' },
];

/** Proyectos destacados con fotografías reales (enlazan a su página en la galería). */
const featuredProjects = [
  {
    title: 'Energía solar en zonas no interconectadas',
    place: 'La Guajira y Meta',
    solution: 'Sistemas fotovoltaicos aislados con baterías de litio',
    detail: 'Viviendas rurales sin acceso a la red eléctrica',
    image: '/images/web/zni-comunidad.jpg',
    href: '/proyectos/obra-civiles-en-ingenieria-electrica',
  },
  {
    title: 'Polideportivo El Llanito',
    place: 'Barrancabermeja, Santander',
    solution: 'Obra civil, estructura metálica y cubiertas',
    detail: 'Infraestructura deportiva para la comunidad',
    image: '/images/web/polideportivo.jpg',
    href: '/proyectos/polideportivo-el-llanito-barrancabermeja',
  },
  {
    title: 'Baterías sanitarias en colegios',
    place: 'Magdalena',
    solution: 'Infraestructura institucional',
    detail: 'Capacidad instalada: 4,9 kWp',
    image: '/images/web/baterias-sanitarias.jpg',
    href: '/proyectos/baterias-sanitarias-en-colegios-del-magdalena',
  },
];

const processSteps = [
  { title: 'Diagnóstico', text: 'Conocemos tus necesidades, tu consumo y las condiciones del proyecto.' },
  { title: 'Diseño', text: 'Nuestros especialistas desarrollan una solución adaptada.' },
  { title: 'Propuesta', text: 'Presentamos el alcance, la solución técnica y la inversión.' },
  { title: 'Ejecución', text: 'Instalamos y ponemos en marcha el proyecto.' },
  { title: 'Acompañamiento', text: 'Brindamos soporte y mantenimiento después de la instalación.' },
];

const reasons: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: 'chart', title: 'Ingeniería', text: 'Cada proyecto parte de un análisis técnico.' },
  { icon: 'medal', title: 'Experiencia', text: 'Proyectos de energía e infraestructura ejecutados en campo.' },
  { icon: 'layers', title: 'Solución integral', text: 'Integramos diferentes disciplinas para desarrollar el proyecto.' },
  { icon: 'chip', title: 'Tecnología', text: 'Usamos tecnologías actuales para mejorar el desempeño de las soluciones.' },
  { icon: 'hand', title: 'Acompañamiento', text: 'Nuestro trabajo no termina con la instalación.' },
];

// Agrega aquí testimonios REALES de clientes (con su autorización). Si la lista está vacía, la sección no se muestra.
const testimonials: Array<{ quote: string; name: string; role: string }> = [];

const faqs = [
  { q: '¿Cuánto cuesta instalar paneles solares?', a: 'El costo depende del consumo, la ubicación, el tipo de instalación, los equipos y las características del proyecto. Realizamos un análisis para determinar la solución adecuada y presentarte una propuesta clara.' },
  { q: '¿Cuánto puedo ahorrar con energía solar?', a: 'Depende principalmente de tu consumo, la tarifa eléctrica, la radiación disponible y el tamaño del sistema. Puedes hacer una estimación inicial con nuestra calculadora y luego solicitar un estudio personalizado.' },
  { q: '¿PROSOINPEN realiza las instalaciones?', a: 'Sí. Acompañamos el proyecto desde la ingeniería hasta la instalación y la puesta en marcha, según el alcance contratado.' },
  { q: '¿Trabajan con empresas?', a: 'Sí. Desarrollamos soluciones para hogares, empresas, industrias, instituciones y comunidades.' },
  { q: '¿Realizan mantenimiento?', a: 'Sí. Ofrecemos mantenimiento preventivo y correctivo: revisión técnica, limpieza de los módulos y verificación del rendimiento del sistema. Nuestro equipo también puede monitorear el rendimiento de forma remota.' },
  { q: '¿Gestionan los trámites con el operador de red?', a: 'Sí. Acompañamos la documentación, las validaciones y la coordinación necesarias para la conexión del sistema según la normativa aplicable.' },
];

const PROJECT_TYPES = [
  { id: 'hogar', label: 'Hogar', hint: 'Residencial' },
  { id: 'empresa', label: 'Empresa', hint: 'Comercial' },
  { id: 'industria', label: 'Industria', hint: 'Gran consumo' },
] as const;
type ProjectType = (typeof PROJECT_TYPES)[number]['id'];

const cop = (n: number) => '$' + Math.round(n).toLocaleString('es-CO');

/* ==========================================================
   ÍCONOS (trazos simples, heredan el color del tema)
   ========================================================== */
function Icon({ name }: { name: IconName }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const paths: Record<IconName, JSX.Element> = {
    sun: <><circle cx="12" cy="12" r="4" {...p} /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" {...p} /></>,
    bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" {...p} />,
    build: <><path d="M3 21h18M5 21V8l7-5 7 5v13" {...p} /><path d="M9 21v-6h6v6M9 10h.01M15 10h.01" {...p} /></>,
    wrench: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8V21h3.2l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.5 2.5-2.5-.5-.5-2.5 2.5-2.5z" {...p} />,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" {...p} /></>,
    medal: <><circle cx="12" cy="9" r="6" {...p} /><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" {...p} /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5z" {...p} /><path d="m3 13 9 5 9-5" {...p} /></>,
    chip: <><rect x="6" y="6" width="12" height="12" rx="2" {...p} /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" {...p} /></>,
    hand: <><path d="M7 11V6a2 2 0 1 1 4 0v4M11 10V4a2 2 0 1 1 4 0v6M15 9a2 2 0 1 1 4 0v5a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.4L3 14.5a2 2 0 0 1 3.3-2.3L7 13" {...p} /></>,
    pin: <><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" {...p} /><circle cx="12" cy="10" r="2.5" {...p} /></>,
    tool: <path d="M4 20 20 4M14 4h6v6" {...p} />,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoOpen, setLogoOpen] = useState(false);

  // Calculadora
  const [monthlyKwh, setMonthlyKwh] = useState(450);
  const [monthlyBill, setMonthlyBill] = useState(380000);
  const [projectType, setProjectType] = useState<ProjectType>('hogar');

  // Contacto
  const [contactMessage, setContactMessage] = useState('');
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'sent' | 'mailto' | 'error'>('idle');
  const [contactError, setContactError] = useState('');

  // Estimación (mismas fórmulas de referencia de la versión anterior; cobertura solar del 80 %)
  const SOLAR_COVERAGE = 0.8;
  const tariff = Math.min(2500, Math.max(200, monthlyBill / Math.max(monthlyKwh, 1)));
  const suggestedKwp = Math.max(1, Number((monthlyKwh / (4.5 * 30 * 0.8)).toFixed(1)));
  const estimatedPanels = Math.max(3, Math.ceil((suggestedKwp * 1000) / 550));
  const monthlySavings = Math.round(monthlyKwh * tariff * SOLAR_COVERAGE);
  const costPerKwp = suggestedKwp <= 3 ? 4750000 : suggestedKwp <= 8 ? 4050000 : suggestedKwp <= 20 ? 3550000 : 3000000;
  const referenceInvestment = Math.round(suggestedKwp * costPerKwp);
  const paybackYears = monthlySavings > 0 ? (referenceInvestment / (monthlySavings * 12)).toFixed(1) : '0';
  const typeLabel = PROJECT_TYPES.find((t) => t.id === projectType)?.label ?? 'Hogar';

  useEffect(() => {
    if (!logoOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLogoOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [logoOpen]);

  function requestStudy() {
    setContactMessage(
      `Hola, quiero un estudio personalizado.\nTipo de proyecto: ${typeLabel}\nConsumo mensual: ${monthlyKwh} kWh\nPago mensual aproximado: ${cop(monthlyBill)}\nSistema estimado en la calculadora: ${suggestedKwp} kWp (${estimatedPanels} paneles aprox.)`,
    );
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => document.getElementById('contact-name')?.focus({ preventScroll: true }), 600);
  }

  async function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      message: String(fd.get('message') ?? ''),
      website: String(fd.get('website') ?? ''),
    };
    setContactStatus('sending');
    setContactError('');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setContactStatus('sent');
        form.reset();
        setContactMessage('');
        return;
      }
      if (!data.fallback) {
        setContactStatus('error');
        setContactError(data.error || 'No pudimos enviar tu solicitud.');
        return;
      }
    } catch {
      // Sin conexión con el servidor: se usa el correo del visitante como respaldo.
    }
    const subject = `Solicitud de información de ${payload.name}`;
    const body = [`Nombre: ${payload.name}`, `Correo: ${payload.email}`, `Teléfono: ${payload.phone}`, '', payload.message].join('\n');
    window.location.href = `mailto:ing.edwinsierra@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setContactStatus('mailto');
  }

  return (
    <div className="landing-shell v2" id="top">
      <div className="landing-bg" />

      {/* ================= ENCABEZADO ================= */}
      <header className="v2-header">
        <div className="v2-wrap">
          <div className="v2-header__bar">
            <div className="v2-brand">
              <button
                type="button"
                className="brand-logo-wrap"
                aria-label="Ampliar logo de PROSOINPEN S.A.S."
                aria-haspopup="dialog"
                onClick={() => setLogoOpen(true)}
              >
                <img src="/logo-prosoinpen.svg" alt="Logo de PROSOINPEN S.A.S." className="brand-logo" width={400} height={430} />
              </button>
              <a href="#top" className="min-w-0">
                <div className="v2-brand__name">PROSOINPEN</div>
                <div className="v2-brand__tag">Ingeniería · Energía · Infraestructura</div>
              </a>
            </div>

            <nav className="v2-nav" aria-label="Navegación principal">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href}>{l.label}</a>
              ))}
            </nav>

            <div className="v2-header__actions">
              <ThemeToggle className="theme-toggle--header" />
              <a href="#contacto" className="v2-btn v2-btn--primary">
                <span className="v2-cta-long">Solicitar cotización</span>
                <span className="v2-cta-short">Cotizar</span>
              </a>
              <button
                type="button"
                className="v2-burger"
                aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={menuOpen}
                aria-controls="v2-mobile-nav"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span /><span /><span />
              </button>
            </div>
          </div>

          {menuOpen ? (
            <nav id="v2-mobile-nav" className="v2-mobile-nav" aria-label="Navegación móvil">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
              ))}
              <ThemeToggle className="theme-toggle--block" />
            </nav>
          ) : null}
        </div>
      </header>

      <main className="landing-content">
        {/* ================= 1. HERO ================= */}
        <section className="v2-hero">
          <div className="v2-wrap v2-hero__grid">
            <div>
              <span className="v2-kicker">PROSOINPEN S.A.S. · Colombia</span>
              <h1 className="v2-h1">
                Ingeniería y energía para proyectos que <span className="v2-hl">generan resultados.</span>
              </h1>
              <p className="v2-lead">
                Diseñamos e implementamos soluciones de energía solar, sistemas eléctricos e infraestructura para hogares, empresas y proyectos de gran escala.
              </p>
              <div className="v2-hero__actions">
                <a href="#contacto" className="v2-btn v2-btn--primary">Solicitar cotización</a>
                <a href="#proyectos" className="v2-btn v2-btn--ghost">Conocer nuestros proyectos</a>
              </div>
              <div className="v2-hero__trust">
                <span>Diseño a la medida</span>
                <span>Instalación en campo</span>
                <span>Soporte y mantenimiento</span>
              </div>
            </div>

            <div className="v2-hero__media">
              <div className="v2-hero__photo">
                <img src="/images/web/hero-tecnico.jpg" alt="Técnico de PROSOINPEN instalando módulos solares en Cubarral, Meta" />
                <div className="v2-hero__caption">
                  <div>
                    <b>Montaje de sistema solar</b>
                    <span>Cubarral, Meta</span>
                  </div>
                  <span className="v2-tag-real">Proyecto real</span>
                </div>
              </div>
              <div className="v2-hero__inset">
                <img src="/images/web/zni-guajira.jpg" alt="Sistema solar aislado junto a una vivienda rural en La Guajira" />
              </div>
            </div>
          </div>
        </section>

        {/* ================= 2. CIFRAS ================= */}
        <section className="v2-stats" aria-label="Nuestra experiencia en números">
          <div className="v2-wrap v2-stats__grid">
            {stats.map((s) => (
              <div key={s.label} className="v2-stat">
                <div className="v2-stat__n">{s.value}<small>{s.suffix}</small></div>
                <div className="v2-stat__l">{s.label}</div>
                <div className="v2-stat__d">{s.detail}</div>
              </div>
            ))}
            <p className="v2-stats__claim"><span>Experiencia que se construye <b>proyecto a proyecto.</b></span></p>
          </div>
        </section>

        {/* ================= 3. QUIÉNES SOMOS ================= */}
        <section id="nosotros" className="v2-section">
          <div className="v2-wrap">
            <div className="v2-about">
              <div>
                <span className="v2-kicker">Quiénes somos</span>
                <h2 className="v2-h2">Ingeniería para transformar la energía en oportunidades</h2>
                <p className="v2-p">
                  PROSOINPEN S.A.S. es una empresa colombiana orientada al desarrollo de soluciones de ingeniería en energía, sistemas eléctricos e infraestructura.
                </p>
                <p className="v2-p">
                  Integramos conocimiento técnico, tecnología y experiencia en campo para desarrollar proyectos que respondan a las necesidades específicas de cada cliente.
                </p>
                <div className="v2-pillars">
                  <div className="v2-pillar"><b>Diseño</b><span>Ingeniería adaptada a cada proyecto.</span></div>
                  <div className="v2-pillar"><b>Ejecución</b><span>Instalación y puesta en marcha.</span></div>
                  <div className="v2-pillar"><b>Acompañamiento</b><span>Soporte durante todo el ciclo del proyecto.</span></div>
                </div>
              </div>
              <div className="v2-about__photo">
                <img src="/images/web/equipo-montaje.jpg" alt="Equipo de PROSOINPEN montando módulos fotovoltaicos en campo" />
              </div>
            </div>
            <div className="v2-mv">
              <div><b>Misión</b><p>Proveer soluciones integrales en energía solar fotovoltaica mediante el diseño, la instalación y el mantenimiento de sistemas eficientes y sostenibles, generando valor económico y ambiental para nuestros clientes.</p></div>
              <div><b>Visión</b><p>Ser una empresa líder en el sector de energías renovables a nivel nacional e internacional, reconocida por la calidad de nuestros proyectos, la innovación tecnológica y el compromiso con el desarrollo sostenible.</p></div>
            </div>
          </div>
        </section>

        {/* ================= 4. SERVICIOS ================= */}
        <section id="servicios" className="v2-section v2-section--alt">
          <div className="v2-wrap">
            <div className="v2-head">
              <span className="v2-kicker">Servicios</span>
              <h2 className="v2-h2">¿Qué hacemos?</h2>
              <p className="v2-lead">Acompañamos cada proyecto con ingeniería, ejecución y soporte técnico.</p>
            </div>
            <div className="v2-services">
              {services.map((s) => (
                <article key={s.title} className="v2-service">
                  <div className="v2-icon"><Icon name={s.icon} /></div>
                  <h3 className="v2-h3">{s.title}</h3>
                  <p className="v2-p">{s.text}</p>
                  <a href="#soluciones" className="v2-link">Ver soluciones <span aria-hidden="true">→</span></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 5. SOLUCIONES ================= */}
        <section id="soluciones" className="v2-section">
          <div className="v2-wrap">
            <div className="v2-head">
              <span className="v2-kicker">Soluciones</span>
              <h2 className="v2-h2">Soluciones para diferentes necesidades</h2>
              <p className="v2-lead">Tecnologías que podemos implementar según el consumo, el sitio y los objetivos de cada cliente.</p>
            </div>
            <div className="v2-solutions">
              {solutions.map((s, i) => (
                <article key={s.title} className={`v2-solution ${s.image ? '' : 'v2-solution--solid'}`}>
                  {s.image ? <img src={s.image} alt="" loading="lazy" /> : <span className="v2-solution__glyph" aria-hidden="true">ϟ</span>}
                  <span className="v2-solution__n">{String(i + 1).padStart(2, '0')}</span>
                  <div className="v2-solution__body">
                    <h3 className="v2-h3">{s.title}</h3>
                    <p className="v2-p">{s.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 6. PROYECTOS ================= */}
        <section id="proyectos" className="v2-section v2-section--alt">
          <div className="v2-wrap">
            <div className="v2-head">
              <span className="v2-kicker">Proyectos</span>
              <h2 className="v2-h2">Proyectos que hablan por nosotros</h2>
              <p className="v2-lead">Conoce algunos de los proyectos en los que hemos participado y las soluciones implementadas por nuestro equipo.</p>
            </div>
            <div className="v2-projects">
              {featuredProjects.map((p, i) => (
                <Link key={p.title} href={p.href} className="v2-project">
                  <div className="v2-project__img">
                    <img src={p.image} alt={p.title} loading="lazy" />
                    <span className="v2-project__num">PROYECTO {String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="v2-project__body">
                    <h3 className="v2-h3">{p.title}</h3>
                    <div className="v2-meta">
                      <span><i aria-hidden="true">📍</i>{p.place}</span>
                      <span><i aria-hidden="true">⚡</i>{p.solution}</span>
                      <span><i aria-hidden="true">📊</i>{p.detail}</span>
                    </div>
                    <span className="v2-link">Ver proyecto <span aria-hidden="true">→</span></span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="v2-projects__more">
              <Link href="/proyectos" className="v2-btn v2-btn--ghost">Ver todos los proyectos y fotografías</Link>
            </div>
          </div>
        </section>

        {/* ================= 7. CASO DE ÉXITO ================= */}
        <section className="v2-section" aria-labelledby="caso-titulo">
          <div className="v2-wrap">
            <div className="v2-head">
              <span className="v2-kicker">Caso de éxito</span>
              <h2 id="caso-titulo" className="v2-h2">De la necesidad al resultado</h2>
            </div>
            <div className="v2-case">
              <div className="v2-case__hero">
                <span className="v2-kicker">Proyecto fotovoltaico</span>
                <div className="v2-case__big">396<small>sistemas fotovoltaicos instalados</small></div>
                <div className="v2-case__place">📍 Municipio de Morales, Bolívar</div>
              </div>
              <div className="v2-case__steps">
                <div className="v2-case__step"><b>El desafío</b><p>Llevar generación fotovoltaica a múltiples usuarios del municipio.</p></div>
                <div className="v2-case__step"><b>La solución</b><p>Implementación de sistemas fotovoltaicos adaptados a las condiciones del proyecto.</p></div>
                <div className="v2-case__step"><b>El resultado</b><p>396 sistemas fotovoltaicos instalados y en funcionamiento.</p></div>
                <div className="v2-case__step"><b>¿Tu proyecto?</b><a href="#contacto" className="v2-btn v2-btn--primary">Hablemos de tu proyecto</a></div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 8. CALCULADORA ================= */}
        <section id="calculadora" className="v2-section v2-section--alt">
          <div className="v2-wrap">
            <div className="v2-head v2-head--center">
              <span className="v2-kicker">Calculadora solar</span>
              <h2 className="v2-h2">¿Cuánto podrías ahorrar con energía solar?</h2>
              <p className="v2-lead">Realiza una estimación inicial de la solución que podría adaptarse a tu consumo.</p>
            </div>

            <div className="v2-calc">
              <div className="v2-calc__steps">
                <div className="v2-step">
                  <div className="v2-step__head">
                    <span className="v2-step__label"><i>1</i>¿Cuánto consumes al mes?</span>
                    <span className="v2-step__value">{monthlyKwh.toLocaleString('es-CO')} kWh</span>
                  </div>
                  <input className="v2-range" type="range" min={50} max={3000} step={10} value={monthlyKwh} onChange={(e) => setMonthlyKwh(Number(e.target.value))} aria-label="Consumo mensual en kWh" />
                  <div className="v2-range__ends"><span>50 kWh</span><span>3.000 kWh</span></div>
                </div>

                <div className="v2-step">
                  <div className="v2-step__head">
                    <span className="v2-step__label"><i>2</i>¿Cuánto pagas aproximadamente?</span>
                    <span className="v2-step__value">{cop(monthlyBill)}</span>
                  </div>
                  <input className="v2-range" type="range" min={50000} max={6000000} step={10000} value={monthlyBill} onChange={(e) => setMonthlyBill(Number(e.target.value))} aria-label="Pago mensual aproximado en pesos" />
                  <div className="v2-range__ends"><span>$50.000</span><span>$6.000.000</span></div>
                </div>

                <div className="v2-step">
                  <div className="v2-step__head">
                    <span className="v2-step__label"><i>3</i>¿Qué tipo de proyecto tienes?</span>
                  </div>
                  <div className="v2-types" role="radiogroup" aria-label="Tipo de proyecto">
                    {PROJECT_TYPES.map((t) => (
                      <label key={t.id} className="v2-type">
                        <input type="radio" name="project-type" value={t.id} checked={projectType === t.id} onChange={() => setProjectType(t.id)} />
                        <span>{t.label}<small>{t.hint}</small></span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="v2-result" aria-live="polite">
                <span className="v2-kicker">Tu sistema estimado</span>
                <div className="v2-result__main"><b>{suggestedKwp.toLocaleString('es-CO')}</b><span>kWp</span></div>
                <p className="v2-p">≈ {estimatedPanels} paneles · proyecto tipo {typeLabel.toLowerCase()}</p>
                <div className="v2-result__rows">
                  <div><span>Ahorro estimado</span><strong>{cop(monthlySavings)} / mes</strong></div>
                  <div><span>Retorno estimado</span><strong>{paybackYears.replace('.', ',')} años</strong></div>
                  <div><span>Inversión de referencia</span><strong>{cop(referenceInvestment)}</strong></div>
                </div>
                <p className="v2-result__ask">¿Quieres conocer el valor real de tu proyecto?</p>
                <button type="button" className="v2-btn v2-btn--primary" onClick={requestStudy}>Solicitar estudio personalizado</button>
                <p className="v2-disclaimer">
                  Los resultados son estimaciones y pueden variar según la ubicación, el consumo, la tarifa eléctrica, las condiciones del sitio y las características del proyecto. No constituyen una cotización.
                </p>
              </aside>
            </div>
          </div>
        </section>

        {/* ================= 9. PROCESO ================= */}
        <section id="proceso" className="v2-section">
          <div className="v2-wrap">
            <div className="v2-head">
              <span className="v2-kicker">Nuestro proceso</span>
              <h2 className="v2-h2">Así desarrollamos tu proyecto</h2>
            </div>
            <ol className="v2-process">
              {processSteps.map((s, i) => (
                <li key={s.title} className="v2-pstep">
                  <span className="v2-pstep__n">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="v2-h3">{s.title}</h3>
                  <p className="v2-p">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ================= 10. POR QUÉ PROSOINPEN ================= */}
        <section className="v2-section v2-section--alt" aria-labelledby="porque-titulo">
          <div className="v2-wrap">
            <div className="v2-head">
              <span className="v2-kicker">¿Por qué PROSOINPEN?</span>
              <h2 id="porque-titulo" className="v2-h2">Una solución integral, de principio a fin</h2>
            </div>
            <div className="v2-why">
              {reasons.map((r) => (
                <div key={r.title} className="v2-why__item">
                  <div className="v2-icon"><Icon name={r.icon} /></div>
                  <h3 className="v2-h3">{r.title}</h3>
                  <p className="v2-p">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 12. TESTIMONIOS (solo si hay reales) ================= */}
        {testimonials.length > 0 ? (
          <section id="testimonios" className="v2-section">
            <div className="v2-wrap">
              <div className="v2-head"><span className="v2-kicker">Testimonios</span><h2 className="v2-h2">Lo que dicen nuestros clientes</h2></div>
              <div className="v2-why">
                {testimonials.map((t) => (
                  <blockquote key={t.name} className="v2-why__item">
                    <p className="v2-p">“{t.quote}”</p>
                    <footer className="v2-p" style={{ marginTop: '1rem' }}><b>{t.name}</b><br />{t.role}</footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* ================= 13. PREGUNTAS FRECUENTES ================= */}
        <section id="faq" className="v2-section">
          <div className="v2-wrap">
            <div className="v2-head v2-head--center">
              <span className="v2-kicker">Preguntas frecuentes</span>
              <h2 className="v2-h2">Resolvemos tus dudas</h2>
            </div>
            <div className="v2-faq">
              {faqs.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 14. CTA FINAL + CONTACTO ================= */}
        <section id="contacto" className="v2-section" style={{ paddingTop: 0 }}>
          <div className="v2-wrap">
            <div className="v2-cta">
              <div>
                <span className="v2-kicker">Contacto</span>
                <h2 className="v2-h2">¿Tienes un proyecto energético?</h2>
                <p className="v2-lead">Cuéntanos qué necesitas. Nuestro equipo puede ayudarte a evaluar la solución más adecuada para tu proyecto.</p>
                <div className="v2-cta__actions">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="v2-btn v2-btn--wa">
                    <WhatsAppIcon className="whatsapp-button__icon" /> Hablar con un asesor
                  </a>
                  <a href="#contact-form" className="v2-btn v2-btn--ghost">Solicitar cotización</a>
                </div>
                <div className="v2-cta__contact">
                  <span>📱 WhatsApp: <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">+57 311 216 7711</a></span>
                  <span>📧 Correo: <a href="mailto:ing.edwinsierra@gmail.com">ing.edwinsierra@gmail.com</a></span>
                  <span>📍 Colombia</span>
                </div>
              </div>

              <form id="contact-form" className="v2-form" onSubmit={handleContactSubmit}>
                <label>Nombre<input id="contact-name" name="name" type="text" autoComplete="name" required maxLength={100} /></label>
                <label>Teléfono<input name="phone" type="tel" autoComplete="tel" maxLength={30} /></label>
                <label className="full">Correo electrónico<input name="email" type="email" autoComplete="email" required maxLength={160} /></label>
                <label className="full">¿En qué podemos ayudarte?
                  <textarea name="message" required maxLength={1200} rows={5} value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} placeholder="Cuéntanos sobre tu proyecto: tipo, ubicación y consumo aproximado." />
                </label>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="contact-form__trap" />
                <button type="submit" className="v2-btn v2-btn--primary" disabled={contactStatus === 'sending'}>
                  {contactStatus === 'sending' ? 'Enviando…' : 'Solicitar cotización'}
                </button>
                {contactStatus === 'sent' ? <p className="contact-form__notice" role="status">¡Gracias! Recibimos tu solicitud y te contactaremos muy pronto.</p> : null}
                {contactStatus === 'mailto' ? (
                  <p className="contact-form__notice" role="status">
                    Abrimos tu aplicación de correo con el mensaje listo. Si no se abrió, escríbenos por{' '}
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
                  </p>
                ) : null}
                {contactStatus === 'error' ? (
                  <p className="contact-form__notice contact-form__notice--error" role="alert">
                    {contactError} También puedes escribirnos por{' '}
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ================= 15. FOOTER ================= */}
      <footer className="v2-footer">
        <div className="v2-wrap">
          <div className="v2-footer__grid">
            <div>
              <div className="v2-brand">
                <button type="button" className="brand-logo-wrap" aria-label="Ampliar logo de PROSOINPEN S.A.S." onClick={() => setLogoOpen(true)}>
                  <img src="/logo-prosoinpen.svg" alt="Logo de PROSOINPEN S.A.S." className="brand-logo" width={400} height={430} />
                </button>
                <div>
                  <div className="v2-brand__name">PROSOINPEN S.A.S.</div>
                  <div className="v2-brand__tag">Ingeniería · Energía · Infraestructura</div>
                </div>
              </div>
              <p className="v2-p" style={{ marginTop: '1.2rem', maxWidth: '26rem' }}>
                Proyectos y Soluciones de Ingeniería El Pentágono S.A.S. · NIT 901960765-2
              </p>
            </div>
            <div>
              <h4>Navegación</h4>
              <ul>
                <li><a href="#top">Inicio</a></li>
                {navLinks.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
              </ul>
            </div>
            <div>
              <h4>Contacto</h4>
              <ul>
                <li><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">📱 WhatsApp +57 311 216 7711</a></li>
                <li><a href="mailto:ing.edwinsierra@gmail.com">📧 ing.edwinsierra@gmail.com</a></li>
                <li>📍 Colombia</li>
              </ul>
            </div>
          </div>
          <div className="v2-footer__bottom">
            <span>© {new Date().getFullYear()} PROSOINPEN S.A.S. Todos los derechos reservados.</span>
            <span style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/admin/login">Acceso administración</Link>
              <ThemeToggle />
            </span>
          </div>
        </div>
      </footer>

      {/* Logo ampliado */}
      {logoOpen ? (
        <div className="logo-lightbox" role="dialog" aria-modal="true" aria-label="Logo de PROSOINPEN S.A.S. ampliado" onClick={() => setLogoOpen(false)}>
          <div className="logo-lightbox__backdrop" aria-hidden="true" />
          <div className="logo-lightbox__panel" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="logo-lightbox__close" aria-label="Cerrar logo ampliado" autoFocus onClick={() => setLogoOpen(false)}>✕</button>
            <div className="logo-lightbox__media">
              <img src="/logo-prosoinpen.svg" alt="Logo completo de PROSOINPEN S.A.S., NIT 901960765-2" width={520} height={560} />
            </div>
            <div className="logo-lightbox__title">PROSOINPEN S.A.S.</div>
            <div className="logo-lightbox__subtitle">NIT 901960765-2</div>
            <p className="logo-lightbox__text">Proyectos y Soluciones de Ingeniería El Pentágono S.A.S.</p>
            <p className="logo-lightbox__hint">Haz clic fuera o en ✕ para cerrar</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
