'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { WhatsAppIcon, whatsappUrl } from './components/whatsapp-contact';
import ProjectsGallery from './components/ProjectsGallery';

const landingNavGroups = [
  {
    title: 'Inicio',
    items: [{ name: 'Inicio', href: '#top' }],
  },
  {
    title: 'Empresa',
    items: [
      { name: 'Quiénes somos', href: '#empresa' },
      { name: 'Misión', href: '#mision' },
      { name: 'Visión', href: '#vision' },
      { name: 'Valores', href: '#valores' },
      { name: 'Nuestro enfoque', href: '#enfoque' },
      { name: 'Sobre nosotros', href: '#sobre-nosotros' },
    ],
  },
  {
    title: 'Soluciones',
    items: [
      { name: 'Energía solar residencial', href: '#soluciones' },
      { name: 'Energía solar empresarial', href: '#soluciones' },
      { name: 'Sistemas fotovoltaicos', href: '#soluciones' },
      { name: 'Almacenamiento de energía', href: '#soluciones' },
      { name: 'Consultoría energética', href: '#soluciones' },
      { name: 'Calculadora de ahorro', href: '#calculadora' },
      { name: 'Nuestro portafolio', href: '#nuestro-portafolio' },
    ],
  },
  {
    title: 'Proyectos',
    items: [
      { name: 'Proyectos realizados', href: '#proyectos' },
      { name: 'Casos de éxito', href: '#proyectos' },
      { name: 'Galería', href: '#galeria' },
      { name: 'Testimonios', href: '#testimonios' },
    ],
  },
  {
    title: 'Contacto',
    items: [
      { name: 'Solicitar propuesta', href: '#contacto' },
      { name: 'Agenda una asesoría', href: '#contacto' },
      { name: 'Ubicación', href: '#contacto' },
      { name: 'WhatsApp', href: whatsappUrl },
      { name: 'Preguntas frecuentes', href: '#faq' },
    ],
  },
];

const stats = [
  { label: 'Clientes', value: '240+' },
  { label: 'Ahorro', value: '38%' },
  { label: 'Proyectos', value: '1.2K' },
];

const valueCards = [
  { id: 'mision', title: 'Misión', text: 'Proveer soluciones integrales en energía solar fotovoltaica mediante el diseño, instalación y mantenimiento de sistemas eficientes y sostenibles, generando valor económico y ambiental para nuestros clientes.' },
  { id: 'vision', title: 'Visión', text: 'Ser una empresa líder en el sector de energías renovables a nivel nacional e internacional, reconocida por la calidad de nuestros proyectos, innovación tecnológica y compromiso con el desarrollo sostenible.' },
  {
    id: 'quienes-somos',
    title: 'Quiénes somos',
    text: 'Somos una empresa de ingeniería especializada en el diseño, desarrollo e implementación de proyectos de energía fotovoltaica y obras civiles. Nos enfocamos en brindar soluciones sostenibles, eficientes y adaptadas a las necesidades de nuestros clientes, contribuyendo a la transición hacia energías limpias.\nNuestro equipo está conformado por profesionales altamente capacitados en ingeniería eléctrica, energías renovables y gestión de proyectos, comprometidos con la innovación y la excelencia técnica.',
  },
];

const landingServices = [
  { title: 'Implementación de sistemas de energía fotovoltaica', description: 'Proyectos solares a medida para hogares, empresas y comunidades.', icon: '01' },
  { title: 'Montajes, pruebas y puesta en marcha de sistemas eléctricos', description: 'Instalaciones eléctricas industriales y residenciales con respaldo técnico.', icon: '02' },
  { title: 'Mantenimiento preventivo y correctivo', description: 'Soporte técnico y cuidado operativo para mantener tus sistemas funcionando.', icon: '03' },
  { title: 'Ingeniería civil estructural', description: 'Obras civiles y construcciones con soluciones técnicas confiables.', icon: '04' },
  { title: 'Parques y urbanismo', description: 'Desarrollo e infraestructura para espacios públicos y cubiertas.', icon: '05' },
];

const investmentBenefits = [
  { title: 'Ahorro Garantizado', text: 'Reduce significativamente tus costos de energía desde el primer mes de operación.' },
  { title: 'Retorno de Inversión', text: 'Recupera tu inversión mientras generas ahorros constantes durante más de 25 años.' },
  { title: 'Protección Tarifaria', text: 'Blindaje financiero contra las alzas constantes de la red eléctrica tradicional.' },
  { title: 'Valorización de Activos', text: 'Aumento del valor comercial y tasación real de tu infraestructura corporativa.' },
  { title: 'Energía Sostenible', text: 'Transición limpia reduciendo de forma medible la huella de carbono.' },
  { title: 'Inversión Inteligente', text: 'Transformación de un gasto fijo inevitable en un activo rentable y duradero.' },
];

const portfolioItems = [
  {
    title: 'Granjas Solares',
    subtitle: 'Energía a gran escala',
    text: 'Desarrollamos proyectos fotovoltaicos de gran capacidad para maximizar la generación y rentabilidad.',
    icon: '☀',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Autoconsumo',
    subtitle: 'Energía para tu hogar y empresa',
    text: 'Sistemas solares que te permiten ahorrar desde el primer día y avanzar hacia la independencia energética.',
    icon: '⌂',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Insumos & Equipos',
    subtitle: 'Suministros fotovoltaicos',
    text: 'Estructuras, cable solar, protecciones DC/AC, inversores y paneles seleccionados para proyectos de calidad.',
    icon: '⌁',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Movilidad Eléctrica',
    subtitle: 'Impulsamos el cambio',
    text: 'Soluciones de carga y movilidad eléctrica para un transporte más eficiente, moderno y sostenible.',
    icon: 'ϟ',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=85',
  },
];

const projects = [
  { name: 'Proyecto Fotovoltaico Municipio de Morales', city: 'Morales, Bolívar', value: '396 sistemas', tag: 'Completado', co2: 'Proyecto solar municipal', roi: 'Instalación ejecutada' },
];

const testimonials = [
  { quote: 'Solar Studio convirtió un proyecto técnico complejo en una decisión clara y rentable.', name: 'Laura M.', role: 'Directora de Operaciones, EcoMax' },
  { quote: 'El acompañamiento fue preciso desde el diagnóstico hasta el monitoreo de nuestra instalación.', name: 'Andrés R.', role: 'Gerente, Campus Verde' },
];

const faqs = [
  { question: '¿Qué mantenimiento requieren los paneles?', answer: 'Recomendamos una revisión preventiva y limpieza técnica periódica. Nuestro equipo también puede monitorear el rendimiento de forma remota.' },
  { question: '¿Qué garantía tienen los sistemas?', answer: 'La cobertura depende del equipo y del proyecto. Presentamos las garantías de componentes, instalación y rendimiento de forma clara en cada propuesta.' },
  { question: '¿Ustedes gestionan los trámites con la red?', answer: 'Sí. Acompañamos la documentación, validaciones y coordinación necesaria para la conexión del sistema según la normativa aplicable.' },
  { question: '¿Tienen opciones de financiación?', answer: 'Evaluamos alternativas de financiación con aliados y estructuramos la propuesta para que puedas comparar inversión, ahorro y retorno.' },
];

const showcaseSlides = [
  {
    title: 'Instalación industrial',
    subtitle: 'Paneles y almacenamiento para alta demanda',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Energia inteligente',
    subtitle: 'Monitoreo y optimización en tiempo real',
    image:
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Diseño para hogares',
    subtitle: 'Soluciones elegantes y funcionales',
    image:
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
  },
];

const partnerLogos = ['PROSOINPENSAS.', 'ENERGÍA FOTOVOLTAICA', 'INGENIERÍA', 'OBRAS CIVILES'];

// Datos históricos de ejemplo (la galería pública ahora usa /api/projects).
// Se conserva como referencia; `void` evita el error de variable sin uso en el build.
const legacyGalleryItems = [
  { id: 'g1', category: 'Instalaciones', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g2', category: 'Instalaciones', image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g3', category: 'Talleres', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g4', category: 'Talleres', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g5', category: 'Creaciones', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g6', category: 'Creaciones', image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g7', category: 'Instalaciones', image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g8', category: 'Talleres', image: 'https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?auto=format&fit=crop&w=1200&q=80' },
];

void legacyGalleryItems;

const aboutImage = 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85';

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [logoOpen, setLogoOpen] = useState(false);
  const [openLandingGroup, setOpenLandingGroup] = useState('Inicio');
  const [monthlyKwh, setMonthlyKwh] = useState(450);
  const [energyRate, setEnergyRate] = useState(850);
  const [solarCoverage, setSolarCoverage] = useState(80);
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0]?.question ?? null);

  const suggestedKwp = Math.max(1, Number((monthlyKwh / (4.5 * 30 * 0.8)).toFixed(1)));
  const estimatedMonthlySavings = Math.round(monthlyKwh * energyRate * (solarCoverage / 100));
  const estimatedAnnualSavings = estimatedMonthlySavings * 12;
  const costPerKwp = suggestedKwp <= 3 ? 4750000 : suggestedKwp <= 8 ? 4050000 : suggestedKwp <= 20 ? 3550000 : 3000000;
  const estimatedInvestment = Math.round(suggestedKwp * costPerKwp);
  const estimatedPanels = Math.max(3, Math.ceil((suggestedKwp * 1000) / 550));
  const estimatedPayback = estimatedAnnualSavings > 0 ? (estimatedInvestment / estimatedAnnualSavings).toFixed(1) : '0';

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % showcaseSlides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!logoOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLogoOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [logoOpen]);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = `Solicitud de información de ${String(formData.get('name') ?? '')}`;
    const body = [
      `Nombre: ${String(formData.get('name') ?? '')}`,
      `Correo: ${String(formData.get('email') ?? '')}`,
      `Teléfono: ${String(formData.get('phone') ?? '')}`,
      '',
      String(formData.get('message') ?? ''),
    ].join('\n');

    window.location.href = `mailto:ing.edwinsierra@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="landing-shell" id="top">
      <div className="landing-bg" />

      <div className="landing-content mx-auto max-w-[1280px] px-4 py-5 lg:px-8">
        <header className="landing-header">
          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="brand-logo-wrap"
                title="PROSOINPEN S.A.S. — NIT: 901960765-2 · clic para ampliar"
                aria-label="Ampliar logo de PROSOINPEN S.A.S."
                aria-haspopup="dialog"
                onClick={() => setLogoOpen(true)}
              >
                <img
                  src="/logo-prosoinpen.svg"
                  alt="Logo de PROSOINPEN S.A.S. — Proyectos y Soluciones de Ingeniería El Pentágono, NIT 901960765-2"
                  className="brand-logo"
                  width={400}
                  height={430}
                />
                <span className="brand-logo-zoom" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M16.5 16.5 21 21M11 8.5v5M8.5 11h5" />
                  </svg>
                </span>
              </button>
              <div>
                <div className="brand-kicker">PROSOINPEN</div>
                <div className="brand-name brand-name--landing">S.A.S. · NIT 901960765-2</div>
              </div>
            </div>

            <nav className="hidden" aria-label="Navegación principal" />

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="landing-menu-toggle"
                aria-label="Abrir menú de navegación"
                aria-expanded={mobileNavOpen}
                aria-controls="landing-mobile-nav"
                onClick={() => setMobileNavOpen((value) => !value)}
              >
                {mobileNavOpen ? 'Cerrar' : 'Menú'}
              </button>
              <Link href="/admin/login" className="landing-button landing-button--ghost hidden md:inline-flex" aria-label="Iniciar sesión como administrador">
                🔐 Login
              </Link>
              <button className="landing-button landing-button--ghost hidden md:inline-flex">Agenda</button>
              <button className="landing-button landing-button--primary">Solicitar propuesta</button>
            </div>
          </div>
        </header>

        {mobileNavOpen ? (
          <nav id="landing-mobile-nav" className="landing-nav-accordion" aria-label="Navegación por secciones">
            {landingNavGroups.map((group) => {
              const isOpen = openLandingGroup === group.title;
              return (
                <div key={group.title} className="landing-nav-group">
                  <button
                    type="button"
                    className="landing-nav-group__trigger"
                    aria-expanded={isOpen}
                    onClick={() => setOpenLandingGroup(isOpen ? '' : group.title)}
                  >
                    <span>{group.title}</span>
                    <span className={`landing-nav-group__caret ${isOpen ? 'open' : ''}`}>⌃</span>
                  </button>
                  {isOpen ? (
                    <div className="landing-nav-group__items">
                      {group.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="landing-nav-link landing-nav-link--mobile"
                          onClick={() => setMobileNavOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}

            <div className="landing-nav-group">
              <Link
                href="/admin/login"
                className="landing-nav-link landing-nav-link--mobile"
                onClick={() => setMobileNavOpen(false)}
              >
                🔐 Login administración
              </Link>
            </div>
          </nav>
        ) : null}

        <div className="gallery-quick-tabs" aria-label="Accesos rápidos">
          <span className="gallery-quick-tabs__label">Explorar</span>
          <a href="#calculadora" className="gallery-quick-tab">Calculadora</a>
          <a href="#testimonios" className="gallery-quick-tab">Testimonios</a>
          <a href="#faq" className="gallery-quick-tab">FAQ</a>
          <a href="/proyectos" className="gallery-quick-tab">Galería completa</a>
        </div>

        <section className="mt-4">
          <div className="landing-section-heading showcase-header">
            <div>
              <span className="section-badge">Portada</span>
              <h2 className="section-title section-title--left">Energía con presencia real.</h2>
              <p className="landing-section-description">Una mirada a los proyectos y soluciones que impulsan una nueva era energética.</p>
            </div>
          </div>

          <div className="showcase-slider">
            <div
              className="showcase-track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {showcaseSlides.map((slide) => (
                <article key={slide.title} className="showcase-slide">
                  <img src={slide.image} alt={slide.title} className="showcase-slide__image" />
                  <div className="showcase-slide__content">
                    <span className="showcase-slide__label">PROSOINPENSAS.</span>
                    <h3>{slide.title}</h3>
                    <p>{slide.subtitle}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="showcase-dots" aria-label="Selector de imagen">
            {showcaseSlides.map((slide, index) => (
              <button
                key={`${slide.title}-dot`}
                type="button"
                aria-label={`Ver imagen ${index + 1}`}
                className={`showcase-dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          <div className="logo-marquee" aria-label="Logos de socios">
            <div className="logo-track">
              {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                <span key={`${logo}-${index}`} className="logo-pill">{logo}</span>
              ))}
            </div>
          </div>
        </section>

        <main id="empresa" className="pt-8">
          <section id="enfoque" className="landing-hero">
            <div className="landing-section-heading landing-section-heading--hero">
              <span className="section-badge">Empresa</span>
              <p className="landing-section-description">Una compañía solar enfocada en transformar la energía en una ventaja estratégica.</p>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
              <div className="relative z-10">
                <h1 className="hero-title">
                  <span>Ingeniería y energía</span>
                  <span className="hero-title--muted">para una nueva era.</span>
                </h1>

                <p className="hero-copy">
                  Ofrecemos soluciones de ingeniería y energía fotovoltaica para proyectos que requieren precisión técnica, eficiencia y compromiso con el desarrollo sostenible.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button className="landing-button landing-button--primary">Contáctanos</button>
                  <button className="landing-button landing-button--ghost">Nuestra historia</button>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="mini-metric">
                      <div className="mini-metric__label">{stat.label}</div>
                      <div className="mini-metric__value" style={{ color: '#FFFFFF', opacity: 1 }}>{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="hero-panel-card">
                  <div className="hero-panel-card__header">
                    <div>
                      <div className="panel-tag">Perfil</div>
                      <div className="hero-panel-title" style={{ color: '#FFFFFF', opacity: 1 }}>PROSOINPEN S.A.S.</div>
                    </div>
                    <span className="status-pill">Desde 2013</span>
                  </div>

                  <div className="hero-panel-card__content">
                    <div className="big-stat-block">
                      <div className="panel-tag">Eficiencia</div>
                      <div className="big-stat" style={{ color: '#FFFFFF', opacity: 1 }}>38%</div>
                    </div>

                    <div className="info-block" style={{ color: '#FFFFFF', opacity: 1 }}>
                      Diseñamos soluciones energéticas inteligentes para acompañar a clientes desde la estrategia hasta la operación, con rigor técnico y una experiencia premium en cada etapa.
                    </div>
                  </div>
                </div>

                <div className="floating-badge">
                  <div className="panel-tag">Confianza</div>
                  <div className="floating-badge__value">98%</div>
                </div>
              </div>
            </div>
          </section>

          {/* SECCIÓN 1: SOBRE NOSOTROS */}
          <section
            id="sobre-nosotros"
            className="mt-16 relative overflow-hidden rounded-[28px] border border-white/10"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(8, 12, 11, 0.96) 0%, rgba(8, 12, 11, 0.86) 42%, rgba(8, 12, 11, 0.58) 100%), url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1800&q=85')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="relative z-10 p-6 sm:p-8 lg:p-10">
              <div className="landing-section-heading mb-8 max-w-4xl">
                <span className="section-badge">SOBRE NOSOTROS</span>
                <h2 className="section-title section-title--left">
                  Convertimos la energía en una inversión inteligente
                </h2>
                <p className="landing-section-description">
                  En PROSOINPEN S.A.S. ayudamos a empresas y hogares a convertir la energía en una oportunidad de inversión y rentabilidad auto-sostenible hasta por 30 años. Creemos que la transición energética no solo protege las generaciones futuras, sino que hoy se convierte en una decisión financiera inteligente y altamente estratégica.
                </p>
              </div>

              <div className="benefits-grid">
                {investmentBenefits.map((benefit) => (
                  <article
                    key={benefit.title}
                    className="benefit-card"
                    style={{
                      background: 'rgba(10, 20, 18, 0.48)',
                      borderColor: 'rgba(52, 211, 153, 0.24)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <div
                      className="benefit-card__icon"
                      aria-hidden="true"
                      style={{ color: '#34d399' }}
                    >
                      ✦
                    </div>
                    <h3 className="benefit-card__title" style={{ color: '#FFFFFF', opacity: 1 }}>{benefit.title}</h3>
                    <p className="benefit-card__text" style={{ color: '#FFFFFF', opacity: 1 }}>{benefit.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="valores" className="mt-12">
            <div className="landing-section-heading mb-7">
              <span className="section-badge">Sobre nosotros</span>
              <h2 className="section-title section-title--left">Ingeniería detrás de cada proyecto.</h2>
              <p className="landing-section-description">Conoce al equipo y los principios que convierten cada proyecto solar en una decisión clara, rentable y sostenible.</p>
            </div>

            <div className="about-layout">
              <div className="about-image-frame">
                <img src={aboutImage} alt="Equipo revisando una instalación de energía solar" />
                <span className="about-image-caption">Ingeniería que se ve en cada detalle</span>
              </div>
              <div className="value-grid">
                {valueCards.map((card, index) => (
                  <article id={card.id} key={card.title} className={`value-card ${index === 0 ? 'value-card--large' : ''}`}>
                    <div className="value-card__icon">{card.title[0]}</div>
                    <h3 style={{ color: '#FFFFFF', opacity: 1 }}>{card.title}</h3>
                    <p style={{ color: '#FFFFFF', opacity: 1 }}>{card.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="soluciones" className="landing-services-section mt-12">
            <div className="landing-section-heading mb-7 flex items-end justify-between gap-4">
              <div>
                <span className="section-badge">Soluciones</span>
                <h2 className="section-title section-title--left">NUESTROS SERVICIOS</h2>
              </div>
              <span className="landing-section-index">SOL / 05</span>
            </div>

            <div className="landing-services-grid">
              {landingServices.map((service) => (
                <article
                  key={service.title}
                  className="landing-service-card"
                  
                >
                  <span className="landing-service-card__index">{service.icon}</span>
                  <h3 style={{ color: '#FFFFFF', opacity: 1 }}>{service.title}</h3>
                  <p style={{ color: '#FFFFFF', opacity: 1 }}>{service.description}</p>
                  <a href="#contacto" aria-label={`Solicitar información sobre ${service.title}`}>Explorar <span aria-hidden="true">↗</span></a>
                </article>
              ))}
            </div>
          </section>

          {/* SECCIÓN 2: NUESTRO PORTAFOLIO */}
          <section id="nuestro-portafolio" className="mt-16">
            <div className="landing-section-heading mb-8 flex items-end justify-between gap-4">
              <div>
                <span className="section-badge">SOLUCIONES</span>
                <h2 className="section-title section-title--left">Nuestro Portafolio</h2>
                <p className="landing-section-description">
                  Soluciones inteligentes en energía solar y movilidad eléctrica para un futuro más rentable y sostenible.
                </p>
              </div>
              <span className="landing-section-index">SOL / 04</span>
            </div>

            <div className="portfolio-grid portfolio-grid--4-cards">
              {portfolioItems.slice(0, 4).map((item, index) => (
                <article key={item.title} className="portfolio-card portfolio-card--4-card">
                  <div className="portfolio-card--4-card__media">
                    <img src={item.image} alt={item.title} className="portfolio-card--4-card__image" />
                    <div className="portfolio-card--4-card__gradient" />
                    <span className="portfolio-card--4-card__icon">{item.icon}</span>
                  </div>

                  <div className="portfolio-card--4-card__content">
                    <div className="portfolio-card--4-card__title-row">
                      <div>
                        <h3 style={{ color: '#FFFFFF', opacity: 1 }}>{item.title}</h3>
                        <span>{item.subtitle}</span>
                      </div>
                      <span className="portfolio-card--4-card__arrow">↗</span>
                    </div>

                    <p style={{ color: '#FFFFFF', opacity: 1 }}>{item.text}</p>

                    <a href="#contacto" aria-label={`Explorar solución ${item.title}`}>
                      Explorar solución <span>→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="calculadora" className="solar-calculator mt-12">
            <div className="landing-section-heading">
              <span className="section-badge">Estimador solar</span>
              <h2 className="section-title section-title--left">Calcula tu ahorro.</h2>
              <p className="landing-section-description">Ingresa tu consumo mensual promedio y obtén una referencia inmediata.</p>
            </div>
            <div className="solar-calculator__body" aria-label="Calculadora de ahorro solar">
              <div className="solar-calculator__controls">
                <label className="solar-calculator__input">
                  <span>Consumo mensual: <strong>{monthlyKwh} kWh</strong></span>
                  <input aria-label="Consumo mensual en kWh" type="range" min="50" max="3000" step="50" value={monthlyKwh} onChange={(event) => setMonthlyKwh(Number(event.target.value))} />
                  <div className="solar-calculator__range"><span>50 kWh</span><span>3.000 kWh</span></div>
                </label>
                <label className="solar-calculator__input">
                  <span>Tarifa de energía: <strong>${energyRate.toLocaleString('es-CO')} / kWh</strong></span>
                  <input aria-label="Tarifa de energía en pesos colombianos" type="range" min="400" max="1400" step="50" value={energyRate} onChange={(event) => setEnergyRate(Number(event.target.value))} />
                  <div className="solar-calculator__range"><span>$400</span><span>$1.400</span></div>
                </label>
                <label className="solar-calculator__input">
                  <span>Cobertura solar estimada: <strong>{solarCoverage}%</strong></span>
                  <input aria-label="Cobertura solar estimada" type="range" min="30" max="100" step="5" value={solarCoverage} onChange={(event) => setSolarCoverage(Number(event.target.value))} />
                  <div className="solar-calculator__range"><span>30%</span><span>100%</span></div>
                </label>
              </div>
              <div className="solar-calculator__results">
                <div><span>Sistema sugerido</span><strong>{suggestedKwp} kWp</strong><small>≈ {estimatedPanels} paneles</small></div>
                <div className="solar-calculator__investment"><span>Inversión estimada llave en mano</span><strong>${estimatedInvestment.toLocaleString('es-CO')}</strong><small>Incluye equipos, instalación y puesta en marcha</small></div>
                <div><span>Ahorro mensual estimado</span><strong>${estimatedMonthlySavings.toLocaleString('es-CO')}</strong></div>
                <div><span>Ahorro anual estimado</span><strong>${estimatedAnnualSavings.toLocaleString('es-CO')}</strong></div>
                <div><span>Retorno aproximado</span><strong>{estimatedPayback} años</strong></div>
                <div><span>Costo promedio instalado</span><strong>${costPerKwp.toLocaleString('es-CO')} / kWp</strong></div>
                <a href="#contacto" className="landing-button landing-button--primary">Solicitar estudio real</a>
              </div>
            </div>
            <p className="solar-calculator__note">Referencia orientativa para Colombia. La tarifa, radiación, tipo de techo, excedentes y condiciones del proyecto pueden cambiar el resultado final.</p>
          </section>

          <section id="galeria" className="mt-12">
            <div className="gallery-shell">
              <div className="gallery-heading">
                <span className="section-badge">Proyectos</span>
                <h2 className="section-title section-title--left">NUESTRO PORTAFOLIO</h2>
                <p className="landing-section-description">Explora soluciones, instalaciones y equipos que convierten la energía en resultados reales.</p>
              </div>

              <div className="gallery-toolbar">
                <Link href="/proyectos" className="landing-button landing-button--primary">Ver galería completa</Link>
              </div>

              <ProjectsGallery />
            </div>
          </section>

          <section id="proyectos" className="mt-12">
              <div className="landing-section-heading mb-6 flex items-center justify-between gap-4">
              <div>
                <span className="section-badge">Proyectos</span>
                <h2 className="section-title section-title--left">Casos con presencia.</h2>
              </div>
              <button className="landing-button landing-button--ghost hidden sm:inline-flex">Ver más</button>
            </div>

            <div className="project-grid">
              {projects.map((project) => (
                <article key={project.name} className="project-card">
                  <div className="project-card__visual" />
                  <div className="project-card__body">
                    <div>
                      <h3 style={{ color: '#FFFFFF', opacity: 1 }}>{project.name}</h3>
                      <p style={{ color: '#FFFFFF', opacity: 1 }}>{project.city}</p>
                    </div>
                    <span className="project-tag">{project.tag}</span>
                  </div>
                  <div className="project-card__value" style={{ color: '#FFFFFF', opacity: 1 }}>{project.value}</div>
                  <div className="project-card__specs">
                    <span style={{ color: '#FFFFFF', opacity: 1 }}><b>CO2 evitado</b>{project.co2}</span>
                    <span style={{ color: '#FFFFFF', opacity: 1 }}><b>Retorno</b>{project.roi}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="testimonios" className="landing-testimonials mt-12">
            <div className="landing-section-heading">
              <span className="section-badge">Confianza</span>
              <h2 className="section-title section-title--left">Lo que dicen nuestros clientes.</h2>
            </div>
            <div className="landing-testimonials__grid">
              {testimonials.map((testimonial) => (
                <blockquote key={testimonial.name} className="testimonial-card">
                  <span className="testimonial-card__mark">“</span>
                  <p style={{ color: '#FFFFFF', opacity: 1 }}>{testimonial.quote}</p>
                  <footer><strong>{testimonial.name}</strong><span style={{ color: '#FFFFFF', opacity: 1 }}>{testimonial.role}</span></footer>
                </blockquote>
              ))}
              <div className="trust-strip"><span>DISEÑO A MEDIDA</span><span>MONITOREO</span><span>SOPORTE TÉCNICO</span><span>ENERGÍA LIMPIA</span></div>
            </div>
          </section>

          <section id="faq" className="landing-faq mt-12">
            <div className="landing-section-heading">
              <span className="section-badge">Preguntas frecuentes</span>
              <h2 className="section-title section-title--left">Todo más claro.</h2>
              <p className="landing-section-description">Resolvemos las dudas más comunes antes de comenzar tu proyecto.</p>
            </div>
            <div className="faq-list">
              {faqs.map((faq) => {
                const isOpen = openFaq === faq.question;
                return (
                  <div key={faq.question} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button type="button" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? null : faq.question)}>
                      <span>{faq.question}</span><span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen ? <p>{faq.answer}</p> : null}
                  </div>
                );
              })}
            </div>
          </section>

          <section id="contacto" className="mt-12 pb-10">
            <div className="cta-panel">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                <div className="landing-section-heading landing-section-heading--contact">
                  <span className="section-badge">Contacto</span>
                  <h2 className="section-title section-title--left">Hablemos de tu próximo proyecto.</h2>
                  <p className="cta-copy">
                    Te acompañamos desde el diagnóstico inicial hasta la puesta en marcha, con acompañamiento humano, técnico y responsable en cada etapa.
                  </p>
                  <a className="whatsapp-button" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="whatsapp-button__icon" />
                    Conversar por WhatsApp
                  </a>
                </div>

                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <label>
                    <span>Nombre</span>
                    <input name="name" type="text" autoComplete="name" required maxLength={100} />
                  </label>
                  <label>
                    <span>Correo electrónico</span>
                    <input name="email" type="email" autoComplete="email" required maxLength={160} />
                  </label>
                  <label>
                    <span>Teléfono</span>
                    <input name="phone" type="tel" autoComplete="tel" maxLength={30} />
                  </label>
                  <label className="contact-form__message">
                    <span>¿En qué podemos ayudarte?</span>
                    <textarea name="message" required maxLength={1200} rows={4} />
                  </label>
                  <button type="submit" className="landing-button landing-button--primary">Solicitar información</button>
                </form>
              </div>
            </div>
          </section>
        </main>


        <style jsx global>{`
          :root {
            --solar-green: #36d98a;
            --solar-green-soft: rgba(54, 217, 138, 0.18);
            --solar-dark: #07100d;
            --solar-card: rgba(14, 25, 21, 0.78);
          }

          html { scroll-behavior: smooth; }

          .investment-section {
            position: relative;
            overflow: hidden;
            min-height: 570px;
            border: 1px solid rgba(54, 217, 138, 0.14);
            border-radius: 22px;
            isolation: isolate;
            background: #07100d;
          }

          .investment-section__backdrop {
            position: absolute;
            inset: 0;
            z-index: -2;
            background:
              linear-gradient(90deg, rgba(3, 10, 8, .94) 0%, rgba(3, 10, 8, .76) 38%, rgba(3, 10, 8, .42) 100%),
              url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1800&q=90') center/cover;
            transform: scale(1.02);
          }

          .investment-section::after {
            content: '';
            position: absolute;
            inset: 0;
            z-index: -1;
            background: radial-gradient(circle at 75% 50%, rgba(54,217,138,.10), transparent 38%);
            pointer-events: none;
          }

          .investment-section__content {
            position: relative;
            padding: 64px 38px;
          }

          .investment-intro {
            max-width: 690px;
            margin-bottom: 34px;
          }

          .investment-intro .section-title {
            max-width: 650px;
            margin-top: 14px;
            text-shadow: 0 0 28px rgba(54,217,138,.08);
          }

          .investment-intro .landing-section-description {
            max-width: 700px;
          }

          .benefits-grid {
            position: relative;
            z-index: 2;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .benefit-card {
            min-height: 125px;
            padding: 18px 20px;
            border: 1px solid rgba(255,255,255,.16);
            border-radius: 15px;
            background: rgba(10, 19, 16, .58);
            backdrop-filter: blur(10px);
            box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 12px 35px rgba(0,0,0,.14);
            transition: transform .28s ease, border-color .28s ease, background .28s ease, box-shadow .28s ease;
          }

          .benefit-card:hover {
            transform: translateY(-4px);
            border-color: rgba(54,217,138,.48);
            background: rgba(13, 29, 23, .76);
            box-shadow: 0 14px 45px rgba(0,0,0,.28), 0 0 25px rgba(54,217,138,.07);
          }

          .benefit-card__top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
          }

          .benefit-card__icon {
            display: grid;
            place-items: center;
            width: 31px;
            height: 31px;
            border: 1px solid rgba(54,217,138,.38);
            border-radius: 8px;
            color: var(--solar-green);
            background: rgba(54,217,138,.09);
            box-shadow: 0 0 18px rgba(54,217,138,.10);
          }

          .benefit-card__number {
            font-size: 10px;
            letter-spacing: .16em;
            color: rgba(255,255,255,.38);
          }

          .benefit-card__title {
            margin: 0 0 6px;
            font-size: 15px;
            color: #fff;
          }

          .benefit-card__text {
            margin: 0;
            color: rgba(255,255,255,.63);
            font-size: 11px;
            line-height: 1.55;
          }

          /* PORTAFOLIO: 4 tarjetas, cuadrícula 2 x 2 */
          .portfolio-grid--4-cards {
            width: min(100%, 900px);
            margin: 0 auto;
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            grid-template-rows: repeat(2, auto);
            gap: 16px !important;
            align-items: stretch;
          }

          .portfolio-card--4-card {
            min-width: 0;
            overflow: hidden;
            padding: 0 !important;
            border: 1px solid rgba(255,255,255,.12) !important;
            border-radius: 14px;
            background: #191919 !important;
            box-shadow: 0 10px 30px rgba(0,0,0,.20);
            transition: transform .28s ease, border-color .28s ease, box-shadow .28s ease;
          }

          .portfolio-card--4-card:hover {
            transform: translateY(-5px);
            border-color: rgba(54,217,138,.50) !important;
            box-shadow: 0 18px 45px rgba(0,0,0,.34), 0 0 24px rgba(54,217,138,.08);
          }

          .portfolio-card--4-card__media {
            position: relative;
            width: 100%;
            height: 165px;
            overflow: hidden;
          }

          .portfolio-card--4-card__image {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            transition: transform .5s ease;
          }

          .portfolio-card--4-card:hover .portfolio-card--4-card__image {
            transform: scale(1.06);
          }

          .portfolio-card--4-card__gradient {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, rgba(0,0,0,0) 42%, rgba(5,10,8,.72) 100%);
          }

          .portfolio-card--4-card__icon {
            position: absolute;
            left: 13px;
            bottom: -1px;
            transform: translateY(50%);
            width: 34px;
            height: 34px;
            display: grid;
            place-items: center;
            border: 1px solid rgba(54,217,138,.62);
            border-radius: 8px;
            color: #36d98a;
            background: #101814;
            box-shadow: 0 0 18px rgba(54,217,138,.14);
            font-size: 16px;
            z-index: 2;
          }

          .portfolio-card--4-card__content {
            padding: 22px 14px 15px;
          }

          .portfolio-card--4-card__title-row {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 10px;
          }

          .portfolio-card--4-card__title-row h3 {
            margin: 0;
            color: #fff;
            font-size: 15px;
            line-height: 1.2;
          }

          .portfolio-card--4-card__title-row span:not(.portfolio-card--4-card__arrow) {
            display: block;
            margin-top: 5px;
            color: #36d98a;
            font-size: 9px;
          }

          .portfolio-card--4-card__arrow {
            color: #36d98a;
            font-size: 17px;
            transition: transform .25s ease;
          }

          .portfolio-card--4-card:hover .portfolio-card--4-card__arrow {
            transform: translate(3px, -3px);
          }

          .portfolio-card--4-card__content p {
            min-height: 43px;
            margin: 12px 0 12px;
            color: rgba(255,255,255,.58);
            font-size: 10px;
            line-height: 1.55;
          }

          .portfolio-card--4-card__content a {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            color: #fff;
            font-size: 10px;
            font-weight: 600;
            text-decoration: none;
            transition: color .2s ease, gap .2s ease;
          }

          .portfolio-card--4-card__content a:hover {
            color: #36d98a;
            gap: 10px;
          }

          .portfolio-heading {
            max-width: 760px;
          }

          .portfolio-card--visual {
            overflow: hidden;
            padding: 0 !important;
            border: 1px solid rgba(255,255,255,.13) !important;
            border-radius: 15px;
            background: rgba(13, 22, 19, .88) !important;
            box-shadow: 0 14px 40px rgba(0,0,0,.18);
            transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease;
          }

          .portfolio-card--visual:hover {
            transform: translateY(-7px);
            border-color: rgba(54,217,138,.55) !important;
            box-shadow: 0 20px 55px rgba(0,0,0,.35), 0 0 28px rgba(54,217,138,.08);
          }

          .portfolio-card__image-wrap {
            position: relative;
            height: 185px;
            overflow: hidden;
          }

          .portfolio-card__image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform .55s ease, filter .55s ease;
          }

          .portfolio-card--visual:hover .portfolio-card__image {
            transform: scale(1.07);
            filter: saturate(1.08);
          }

          .portfolio-card__image-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(0,0,0,.05), rgba(4,10,8,.82));
          }

          .portfolio-card__icon {
            position: absolute;
            left: 14px;
            bottom: 14px;
            display: grid;
            place-items: center;
            width: 38px;
            height: 38px;
            border: 1px solid rgba(54,217,138,.5);
            border-radius: 9px;
            color: var(--solar-green);
            background: rgba(5,18,13,.78);
            backdrop-filter: blur(7px);
            font-size: 19px;
            box-shadow: 0 0 20px rgba(54,217,138,.12);
          }

          .portfolio-card__counter {
            position: absolute;
            right: 15px;
            bottom: 16px;
            font-size: 10px;
            letter-spacing: .18em;
            color: rgba(255,255,255,.58);
          }

          .portfolio-card__body {
            padding: 18px 19px 19px;
          }

          .portfolio-card__header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 15px;
          }

          .portfolio-card__title {
            margin: 0;
            font-size: 17px;
            line-height: 1.2;
            color: #fff;
          }

          .portfolio-card__subtitle {
            margin-top: 5px;
            color: var(--solar-green);
            font-size: 10px;
            letter-spacing: .04em;
          }

          .portfolio-card__arrow {
            color: var(--solar-green);
            font-size: 19px;
            transition: transform .25s ease;
          }

          .portfolio-card--visual:hover .portfolio-card__arrow {
            transform: translate(3px, -3px);
          }

          .portfolio-card__text {
            margin: 13px 0 15px;
            color: rgba(255,255,255,.58);
            font-size: 11px;
            line-height: 1.6;
          }

          .portfolio-card__link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #fff;
            font-size: 11px;
            font-weight: 600;
            text-decoration: none;
            transition: color .25s ease, gap .25s ease;
          }

          .portfolio-card__link:hover {
            color: var(--solar-green);
            gap: 12px;
          }

          /* Máxima legibilidad: blanco puro 100% en TODAS las cards (sobrescribe jsx con hash) */
          .value-card h3, .value-card p,
          .benefit-card__title, .benefit-card__text,
          .portfolio-card--4-card__title-row h3, .portfolio-card--4-card__content p,
          .portfolio-card__title, .portfolio-card__text {
            color: #FFFFFF !important;
            opacity: 1 !important;
          }

          @media (max-width: 760px) {
            .investment-section__content { padding: 42px 20px; }
            .investment-section { min-height: auto; }
            .benefits-grid { grid-template-columns: 1fr; }
            .portfolio-grid--4-cards {
              grid-template-columns: 1fr !important;
              grid-template-rows: none;
              width: 100%;
            }
            .portfolio-card--4-card__media {
              height: 190px;
            }
          }
        `}</style>

        <footer className="footer-panel">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="brand-logo-wrap"
                  title="PROSOINPEN S.A.S. — NIT: 901960765-2 · clic para ampliar"
                  aria-label="Ampliar logo de PROSOINPEN S.A.S."
                  aria-haspopup="dialog"
                  onClick={() => setLogoOpen(true)}
                >
                  <img
                    src="/logo-prosoinpen.svg"
                    alt="Logo de PROSOINPEN S.A.S. — NIT 901960765-2"
                    className="brand-logo"
                    width={400}
                    height={430}
                    loading="lazy"
                  />
                  <span className="brand-logo-zoom" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M16.5 16.5 21 21M11 8.5v5M8.5 11h5" />
                    </svg>
                  </span>
                </button>
                <div>
                  <div className="brand-kicker">PROSOINPEN</div>
                  <div className="brand-name brand-name--landing">S.A.S. · NIT 901960765-2</div>
                </div>
              </div>
              <p className="footer-copy">
                Proyectos y soluciones de ingeniería, energía fotovoltaica, sistemas eléctricos y obras civiles.
              </p>
            </div>

            <div>
              <div className="footer-title">Navegación</div>
              <ul className="footer-list">
                <li><Link href="#empresa">Empresa</Link></li>
                <li><Link href="#valores">Valores</Link></li>
                <li><Link href="#contacto">Contacto</Link></li>
              </ul>
            </div>

            <div>
              <div className="footer-title">Contacto</div>
              <ul className="footer-list">
                <li>PROSOINPENSAS</li>
                <li>NIT: 901960765-2</li>
                <li>Proyectos y Soluciones de Ingeniería El Pentágono S.A.S.</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">© 2026 Edwin Sierra. Todos los derechos reservados.</div>
        </footer>

        {logoOpen ? (
          <div
            className="logo-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Logo de PROSOINPEN S.A.S. ampliado"
            onClick={() => setLogoOpen(false)}
          >
            <div className="logo-lightbox__backdrop" aria-hidden="true" />
            <div
              className="logo-lightbox__panel"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="logo-lightbox__close"
                aria-label="Cerrar logo ampliado"
                autoFocus
                onClick={() => setLogoOpen(false)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') setLogoOpen(false);
                }}
              >
                ✕
              </button>
              <div className="logo-lightbox__media">
                <img
                  src="/logo-prosoinpen.svg"
                  alt="Logo completo de PROSOINPEN S.A.S. — Proyectos y Soluciones de Ingeniería El Pentágono, NIT 901960765-2"
                  width={520}
                  height={560}
                />
              </div>
              <div className="logo-lightbox__title">PROSOINPEN S.A.S.</div>
              <div className="logo-lightbox__subtitle">NIT 901960765-2</div>
              <p className="logo-lightbox__text">
                Proyectos y Soluciones de Ingeniería El Pentágono S.A.S.
              </p>
              <p className="logo-lightbox__hint">Clic fuera o ✕ para cerrar</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}