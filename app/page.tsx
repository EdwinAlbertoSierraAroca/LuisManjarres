'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { WhatsAppIcon, whatsappUrl } from './components/whatsapp-contact';

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
  { id: 'mision', title: 'Misión', text: 'Acompañamos a familias y empresas con soluciones solares seguras, estables y realmente rentables.' },
  { id: 'vision', title: 'Visión', text: 'Ser la marca solar de referencia por innovación, calidad técnica y confianza en cada etapa.' },
  { id: 'quienes-somos', title: 'Quiénes somos', text: 'Un equipo especializado en estrategia, instalación y acompañamiento energético de alto nivel.' },
];

const landingServices = [
  { title: 'Energía solar residencial', description: 'Sistemas pensados para reducir tu consumo y convertir tu hogar en una fuente de ahorro.', icon: '01' },
  { title: 'Energía solar empresarial', description: 'Infraestructura solar escalable para operaciones más eficientes, rentables y sostenibles.', icon: '02' },
  { title: 'Sistemas fotovoltaicos', description: 'Diseño, instalación y monitoreo de soluciones fotovoltaicas a la medida.', icon: '03' },
  { title: 'Almacenamiento de energía', description: 'Baterías inteligentes para respaldo, continuidad y control de tus picos de demanda.', icon: '04' },
  { title: 'Consultoría energética', description: 'Diagnóstico y estrategia para tomar mejores decisiones energéticas.', icon: '05' },
];

const projects = [
  { name: 'Residencial Solar Norte', city: 'Bogotá', value: '42 kW', tag: 'Completado', co2: '18.6 t CO2/año', roi: '4.8 años' },
  { name: 'Industria EcoMax', city: 'Medellín', value: '180 kW', tag: 'Ejecutando', co2: '74.2 t CO2/año', roi: '3.9 años' },
  { name: 'Campus Verde', city: 'Cali', value: '96 kW', tag: 'Activo', co2: '41.8 t CO2/año', roi: '4.2 años' },
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

const partnerLogos = ['Edwin Sierra', 'GREENCORE', 'NEXA', 'VOLTIA', 'SUREN', 'SUNLINK'];

const initialGalleryItems = [
  { id: 'g1', category: 'Instalaciones', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g2', category: 'Instalaciones', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g3', category: 'Talleres', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g4', category: 'Talleres', image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g5', category: 'Creaciones', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g6', category: 'Creaciones', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g7', category: 'Instalaciones', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g8', category: 'Talleres', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80' },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState(initialGalleryItems);
  const [adminMode, setAdminMode] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState('Todas');
  const [newCategory, setNewCategory] = useState('');
  const [newImage, setNewImage] = useState('');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState('');
  const [editingImage, setEditingImage] = useState('');
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

  const galleryTabs = ['Todas', ...Array.from(new Set(galleryItems.map((item) => item.category)))];

  const filteredGalleryItems =
    activeGalleryTab === 'Todas'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeGalleryTab);

  useEffect(() => {
    if (galleryItems.length > 0 && !galleryTabs.includes(activeGalleryTab)) {
      setActiveGalleryTab('Todas');
    }
  }, [galleryItems, galleryTabs, activeGalleryTab]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      if (editingItemId) {
        setEditingImage(result);
      } else {
        setNewImage(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddGalleryItem = () => {
    const category = newCategory.trim();
    const image = newImage.trim();

    if (!category || !image) return;

    setGalleryItems((current) => [
      ...current,
      {
        id: `gallery-${Date.now()}`,
        category,
        image,
      },
    ]);

    setNewCategory('');
    setNewImage('');
    setActiveGalleryTab(category);
  };

  const handleEditStart = (item: { id: string; category: string; image: string }) => {
    setEditingItemId(item.id);
    setEditingCategory(item.category);
    setEditingImage(item.image);
  };

  const handleSaveEdit = () => {
    if (!editingItemId) return;

    setGalleryItems((current) =>
      current.map((item) =>
        item.id === editingItemId
          ? { ...item, category: editingCategory.trim() || item.category, image: editingImage.trim() || item.image }
          : item,
      ),
    );

    setEditingItemId(null);
    setEditingCategory('');
    setEditingImage('');
  };

  const handleDeleteItem = (id: string) => {
    setGalleryItems((current) => current.filter((item) => item.id !== id));
    if (editingItemId === id) {
      setEditingItemId(null);
      setEditingCategory('');
      setEditingImage('');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % showcaseSlides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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

      <div className="mx-auto max-w-[1280px] px-4 py-5 lg:px-8">
        <header className="landing-header">
          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="brand-mark brand-mark--landing">S</div>
              <div>
                <div className="brand-kicker">Solar</div>
                <div className="brand-name brand-name--landing">STUDIO</div>
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
          </nav>
        ) : null}

        <div className="gallery-quick-tabs" aria-label="Accesos rápidos">
          <span className="gallery-quick-tabs__label">Explorar</span>
          <a href="#calculadora" className="gallery-quick-tab">Calculadora</a>
          <a href="#testimonios" className="gallery-quick-tab">Testimonios</a>
          <a href="#faq" className="gallery-quick-tab">FAQ</a>
          <span className="gallery-quick-tabs__label gallery-quick-tabs__label--gallery">Galería</span>
          {['Todas', 'Instalaciones', 'Talleres', 'Creaciones'].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`gallery-quick-tab ${activeGalleryTab === tab ? 'active' : ''}`}
              onClick={() => {
                setActiveGalleryTab(tab);
                document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {tab}
            </button>
          ))}
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
                    <span className="showcase-slide__label">Solar Studio</span>
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
                  <span>Energía solar</span>
                  <span className="hero-title--muted">para una nueva era.</span>
                </h1>

                <p className="hero-copy">
                  Somos una compañía enfocada en transformar la energía en una ventaja estratégica para hogares, negocios y organizaciones que buscan eficiencia, ahorro y sostenibilidad sin comprometer la calidad ni el diseño.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button className="landing-button landing-button--primary">Contáctanos</button>
                  <button className="landing-button landing-button--ghost">Nuestra historia</button>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="mini-metric">
                      <div className="mini-metric__label">{stat.label}</div>
                      <div className="mini-metric__value">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="hero-panel-card">
                  <div className="hero-panel-card__header">
                    <div>
                      <div className="panel-tag">Perfil</div>
                      <div className="hero-panel-title">Solar Studio</div>
                    </div>
                    <span className="status-pill">Desde 2013</span>
                  </div>

                  <div className="hero-panel-card__content">
                    <div className="big-stat-block">
                      <div className="panel-tag">Eficiencia</div>
                      <div className="big-stat">38%</div>
                    </div>

                    <div className="info-block">
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

          <section id="valores" className="mt-12">
            <div className="landing-section-heading mb-7">
              <span className="section-badge">Empresa</span>
              <h2 className="section-title section-title--left">NUESTRA EMPRESA</h2>
              <p className="landing-section-description">Conoce la misión, visión y el equipo que da forma a Solar Studio.</p>
            </div>

            <div className="value-grid">
              {valueCards.map((card, index) => (
                <article id={card.id} key={card.title} className={`value-card ${index === 0 ? 'value-card--large' : ''}`}>
                  <div className="value-card__icon">{card.title[0]}</div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
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
                  style={{ backgroundColor: '#211713', borderColor: 'rgba(255, 112, 66, 0.42)', opacity: 1, visibility: 'visible' }}
                >
                  <span className="landing-service-card__index">{service.icon}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a href="#contacto" aria-label={`Solicitar información sobre ${service.title}`}>Explorar <span aria-hidden="true">↗</span></a>
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
                <h2 className="section-title section-title--left">GALERÍA DE PROYECTOS</h2>
                <p className="landing-section-description">Explora instalaciones, talleres y creaciones que convierten la energía en resultados reales.</p>
              </div>

              <div className="gallery-toolbar">
                <div className="gallery-tabs" aria-label="Categorías de galería">
                  {galleryTabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      aria-pressed={activeGalleryTab === tab}
                      className={`gallery-tab ${activeGalleryTab === tab ? 'active' : ''}`}
                      onClick={() => setActiveGalleryTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <button type="button" className="gallery-admin-toggle" onClick={() => setAdminMode((value) => !value)}>
                  {adminMode ? 'Cerrar admin' : 'Admin galería'}
                </button>
              </div>

              {adminMode ? (
                <div className="gallery-admin-panel">
                  <div className="gallery-admin-form">
                    <label>
                      <span>Categoría</span>
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(event) => setNewCategory(event.target.value)}
                        placeholder="Ej: Instalaciones"
                      />
                    </label>

                    <label>
                      <span>Imagen</span>
                      <input type="url" value={newImage} onChange={(event) => setNewImage(event.target.value)} placeholder="https://..." />
                    </label>

                    <label>
                      <span>Subir archivo</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} />
                    </label>

                    <button type="button" className="gallery-save-button" onClick={handleAddGalleryItem}>
                      Cargar foto
                    </button>
                  </div>

                  {editingItemId ? (
                    <div className="gallery-admin-form gallery-admin-form--edit">
                      <label>
                        <span>Editar categoría</span>
                        <input value={editingCategory} onChange={(event) => setEditingCategory(event.target.value)} />
                      </label>

                      <label>
                        <span>Editar URL</span>
                        <input value={editingImage} onChange={(event) => setEditingImage(event.target.value)} />
                      </label>

                      <label>
                        <span>Actualizar archivo</span>
                        <input type="file" accept="image/*" onChange={handleFileUpload} />
                      </label>

                      <div className="gallery-edit-actions">
                        <button type="button" className="gallery-save-button" onClick={handleSaveEdit}>
                          Guardar cambios
                        </button>
                        <button type="button" className="gallery-cancel-button" onClick={() => {
                          setEditingItemId(null);
                          setEditingCategory('');
                          setEditingImage('');
                        }}>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className="gallery-grid">
                {filteredGalleryItems.map((item, index) => (
                  <article key={`${item.category}-${item.id}`} className="gallery-item">
                    <img src={item.image} alt={item.category} />
                    {adminMode ? (
                      <div className="gallery-actions">
                        <button type="button" onClick={() => handleEditStart(item)}>Editar</button>
                        <button type="button" onClick={() => handleDeleteItem(item.id)}>Eliminar</button>
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
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
                      <h3>{project.name}</h3>
                      <p>{project.city}</p>
                    </div>
                    <span className="project-tag">{project.tag}</span>
                  </div>
                  <div className="project-card__value">{project.value}</div>
                  <div className="project-card__specs">
                    <span><b>CO2 evitado</b>{project.co2}</span>
                    <span><b>Retorno</b>{project.roi}</span>
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
                  <p>{testimonial.quote}</p>
                  <footer><strong>{testimonial.name}</strong><span>{testimonial.role}</span></footer>
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

        <footer className="footer-panel">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <div>
              <div className="flex items-center gap-3">
                <div className="brand-mark brand-mark--landing">S</div>
                <div>
                  <div className="brand-kicker">Solar</div>
                  <div className="brand-name brand-name--landing">STUDIO</div>
                </div>
              </div>
              <p className="footer-copy">
                Soluciones energéticas de alto nivel para quienes valoran eficiencia, sostenibilidad y una experiencia premium.
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
                <li>hola@manjarres.com</li>
                <li>+57 31364617947</li>
                <li>Barranquilla, Colombia</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">© 2026 Edwin Sierra. Todos los derechos reservados.</div>
        </footer>
      </div>
    </div>
  );
}
