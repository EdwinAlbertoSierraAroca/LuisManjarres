'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { WhatsAppIcon, whatsappUrl } from './components/whatsapp-contact';
import ProjectsGallery from './components/ProjectsGallery';
import ThemeToggle from './components/theme-toggle';
import ServiceTabs from './components/ServiceTabs';
import TestimonialsSlider from './components/TestimonialsSlider';
import BrochureGate from './components/BrochureGate';
import { testimonials as realTestimonials } from '@/lib/testimonials';
import { resources } from '@/lib/recursos';

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
      { name: 'Líneas de solución', href: '#nuestro-portafolio' },
    ],
  },
  {
    title: 'Proyectos',
    items: [
      { name: 'Proyectos realizados', href: '#galeria' },
      { name: 'Galería', href: '#galeria' },
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
  { label: 'Sistemas en Morales', value: '396' },
  { label: 'Departamentos con obras', value: '5' },
  { label: 'Líneas de servicio', value: '5' },
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
  { title: 'Ahorro garantizado', text: 'Reduce significativamente tus costos de energía desde el primer mes de operación.' },
  { title: 'Retorno de inversión', text: 'Recupera tu inversión mientras generas ahorros constantes durante más de 25 años.' },
  { title: 'Protección tarifaria', text: 'Blindaje financiero contra las alzas constantes de la red eléctrica tradicional.' },
  { title: 'Valorización de activos', text: 'Aumento del valor comercial y tasación real de tu infraestructura corporativa.' },
  { title: 'Energía sostenible', text: 'Transición limpia reduciendo de forma medible la huella de carbono.' },
  { title: 'Inversión inteligente', text: 'Transformación de un gasto fijo inevitable en un activo rentable y duradero.' },
];

const portfolioItems = [
  {
    title: 'Granjas solares',
    subtitle: 'Energía a gran escala',
    text: 'Desarrollamos proyectos fotovoltaicos de gran capacidad para maximizar la generación y la rentabilidad.',
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
    title: 'Insumos y equipos',
    subtitle: 'Suministros fotovoltaicos',
    text: 'Estructuras, cable solar, protecciones DC/AC, inversores y paneles seleccionados para proyectos de calidad.',
    icon: '⌁',
    image: '/images/sistema-solar-molino.jpg',
  },
  {
    title: 'Movilidad eléctrica',
    subtitle: 'Impulsamos el cambio',
    text: 'Soluciones de carga y movilidad eléctrica para un transporte más eficiente, moderno y sostenible.',
    icon: 'ϟ',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=85',
  },
];

// Los testimonios reales se cargan desde lib/testimonials.ts

const regulations = [
  { icon: '⚡', code: 'RETIE', name: 'Reglamento Técnico de Instalaciones Eléctricas',
    what: 'Norma obligatoria del Ministerio de Minas y Energía que garantiza que las instalaciones eléctricas sean seguras para las personas y los inmuebles.',
    message: 'Todas nuestras instalaciones cumplen con la certificación RETIE, garantizando la máxima seguridad eléctrica y el cumplimiento normativo exigido en Colombia.' },
  { icon: '🔌', code: 'CREG 174 de 2021', name: 'Autogeneración a pequeña escala (AGPE)',
    what: 'Resolución de la Comisión de Regulación de Energía y Gas que permite a hogares y empresas generar su propia energía solar y entregar sus excedentes a la red pública.',
    message: 'Aprovecha tus excedentes: la energía que no consumas puede venderse o intercambiarse con la red, reduciendo aún más tu factura.' },
  { icon: '🏛️', code: 'Ley 1715 de 2014 · Ley 2099 de 2021', name: 'Incentivos tributarios',
    what: 'Marco legal de la transición energética en Colombia que otorga beneficios fiscales a quienes invierten en energías renovables.',
    message: 'Exclusión de IVA, 0 % de aranceles y deducción de hasta el 50 % de la inversión en el impuesto de renta, previo registro del proyecto.' },
];

const warranties = [
  { icon: '☀️', item: 'Paneles solares', detail: 'Garantía de producto de 12 a 15 años y de potencia hasta 25 años, según el fabricante.' },
  { icon: '🔄', item: 'Inversores', detail: 'De 5 a 10 años, según el fabricante y el modelo.' },
  { icon: '🏗️', item: 'Montaje e ingeniería civil', detail: 'Garantía directa de PROSOINPEN sobre estructuras y sellado de cubiertas.' },
];

const brands = [
  { name: 'Jinko Solar', type: 'Paneles' },
  { name: 'LONGi', type: 'Paneles' },
  { name: 'Huawei', type: 'Inversores' },
  { name: 'Growatt', type: 'Inversores' },
];

const postSales = [
  { icon: '🧽', title: 'Limpieza de paneles', text: 'Limpieza periódica para mantener la máxima generación.' },
  { icon: '🌡️', title: 'Inspección termográfica', text: 'Detección temprana de puntos calientes (hotspots) en los módulos.' },
  { icon: '🛠️', title: 'Soporte técnico local', text: 'Atención preventiva y correctiva en la región.' },
];

type FaqCategory = 'instalacion' | 'ley';
const FAQ_TABS: Array<{ id: 'todos' | FaqCategory; label: string }> = [
  { id: 'todos', label: 'Todas' },
  { id: 'instalacion', label: 'Instalación y red' },
  { id: 'ley', label: 'Ley 1715 y financiación' },
];

const faqs: Array<{ category: FaqCategory; question: string; answer: string }> = [
  { category: 'instalacion', question: '¿Qué mantenimiento requieren los paneles?', answer: 'Recomendamos una revisión preventiva y limpieza técnica periódica. Nuestro equipo también puede monitorear el rendimiento de forma remota.' },
  { category: 'instalacion', question: '¿Qué garantía tienen los sistemas?', answer: 'La cobertura depende del equipo y del proyecto. Presentamos las garantías de componentes, instalación y rendimiento de forma clara en cada propuesta.' },
  { category: 'instalacion', question: '¿Ustedes gestionan los trámites con la red?', answer: 'Sí. Acompañamos la documentación, las validaciones y la coordinación necesarias para la conexión del sistema según la normativa aplicable.' },
  { category: 'ley', question: '¿Tienen opciones de financiación?', answer: 'Evaluamos alternativas de financiación con aliados y estructuramos la propuesta para que puedas comparar inversión, ahorro y retorno.' },
  { category: 'instalacion', question: '¿Qué pasa en los días lluviosos, nublados o durante la noche?', answer: 'Los paneles siguen generando energía en días nublados aprovechando la radiación difusa, aunque en menor cantidad. En la noche o ante picos de demanda, tu inmueble toma la energía de la red pública de forma automática (en sistemas On-Grid) o utiliza las baterías de respaldo (en sistemas Off-Grid e híbridos).' },
  { category: 'ley', question: '¿Cómo funcionan los beneficios tributarios en Colombia (Ley 1715)?', answer: 'Al invertir en tu sistema solar puedes deducir de tu impuesto de renta hasta el 50 % del valor de la inversión, acceder a la exclusión de IVA en equipos y servicios y a 0 % de aranceles en la importación de equipos. Te asesoramos con la documentación ante la UPME para hacerlos efectivos.' },
  { category: 'instalacion', question: '¿Qué pasa con la energía excedente que mis paneles producen y no consumo?', answer: 'Con la Resolución CREG 174 de 2021, los excedentes que no consumas se entregan a la red eléctrica y la comercializadora te los reconoce en tu factura mensual de energía, según las reglas de la resolución.' },
  { category: 'instalacion', question: '¿El sistema solar funciona si se va la luz en mi sector?', answer: 'En los sistemas conectados a la red (On-Grid) el inversor se apaga durante el corte por seguridad de los operarios de la red. Si necesitas energía ininterrumpida (fincas, empresas o clínicas), diseñamos sistemas híbridos con baterías que se activan al instante durante los cortes.' },
  { category: 'instalacion', question: '¿Cuánto tiempo toma la instalación y puesta en marcha del proyecto?', answer: 'El montaje físico en techo o estructura toma entre 2 y 5 días según el tamaño del sistema. El proceso completo, incluidos los trámites de legalización y conexión ante el operador de red, toma en promedio de 4 a 8 semanas.' },
];

type ShowcaseSlide = { title: string; subtitle: string; image: string; position?: string };

/** Máximo de fotos de la galería (subidas desde el panel) que se suman al slider. */
const MAX_UPLOADED_SLIDES = 20;

type GalleryApiProject = {
  title: string;
  location?: string;
  categoryName?: string;
  coverImage?: string;
  images?: Array<{ url: string; caption?: string }>;
  featured?: boolean;
};

function slidesFromProjects(projects: GalleryApiProject[]): ShowcaseSlide[] {
  // Intercala las fotos de cada proyecto (portada primero) para que el slider
  // muestre variedad y no solo las fotos del primer proyecto.
  const ordered = [...projects].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  const queues = ordered.map((project) => {
    const subtitle = [project.location, project.categoryName].filter(Boolean).join(' · ');
    const imgs = [...(project.coverImage ? [{ url: project.coverImage, caption: '' }] : []), ...(project.images ?? [])];
    return imgs.map((img) => ({ title: project.title, subtitle: img.caption?.trim() || subtitle, image: img.url?.trim() ?? '' }));
  });
  const seen = new Set<string>();
  const out: ShowcaseSlide[] = [];
  for (let round = 0; out.length < MAX_UPLOADED_SLIDES && queues.some((q) => q.length > round); round += 1) {
    for (const queue of queues) {
      const slide = queue[round];
      if (!slide || !slide.image || seen.has(slide.image) || !/^(https:\/\/|\/)/.test(slide.image)) continue;
      seen.add(slide.image);
      out.push(slide);
      if (out.length >= MAX_UPLOADED_SLIDES) break;
    }
  }
  return out;
}

const showcaseSlides: ShowcaseSlide[] = [
  {
    title: 'Instalación industrial',
    subtitle: 'Paneles y almacenamiento para alta demanda',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Energía inteligente',
    subtitle: 'Monitoreo y optimización en tiempo real',
    image:
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Diseño para hogares',
    subtitle: 'Soluciones elegantes y funcionales',
    image:
      '/images/sistema-solar-molino.jpg',
  },
  { title: 'Luz donde la red no llega', subtitle: 'Sistema aislado para vivienda rural en zona de montaña', image: '/images/web/cabana-noche.jpg', position: '60% center' },
  { title: 'Sistema aislado en poste', subtitle: 'Estructura metálica elevada para vivienda rural', image: '/images/web/poste-solar.jpg', position: 'center 58%' },
  { title: 'Energía en la cordillera', subtitle: 'Paneles instalados en terrenos de difícil acceso', image: '/images/web/panel-cordillera.jpg', position: 'center 55%' },
  { title: 'Vivienda rural en ladera', subtitle: 'Soluciones solares para comunidades apartadas', image: '/images/web/ladera-montana.jpg', position: 'center 62%' },
  { title: 'Autoconsumo residencial', subtitle: 'Sistemas sobre cubierta en conjuntos residenciales', image: '/images/web/conjunto-residencial.jpg', position: 'center 70%' },
  { title: 'Montaje en cubierta', subtitle: 'Nuestro equipo técnico instalando módulos en un proyecto residencial', image: '/images/web/montaje-cubierta.jpg', position: 'center 26%' },
  { title: 'Cubiertas que generan', subtitle: 'Módulos monocristalinos para hogares y empresas', image: '/images/web/cubierta-residencial.jpg', position: 'center 60%' },
];

const partnerLogos = ['PROSOINPEN S.A.S.', 'ENERGÍA FOTOVOLTAICA', 'INGENIERÍA', 'OBRAS CIVILES'];

// Datos históricos de ejemplo (la galería pública ahora usa /api/projects).
// Se conserva como referencia; `void` evita el error de variable sin uso en el build.
const legacyGalleryItems = [
  { id: 'g1', category: 'Instalaciones', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g2', category: 'Instalaciones', image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g3', category: 'Talleres', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g4', category: 'Talleres', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g5', category: 'Creaciones', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g6', category: 'Creaciones', image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80' },
  { id: 'g7', category: 'Instalaciones', image: '/images/sistema-solar-molino.jpg' },
  { id: 'g8', category: 'Talleres', image: 'https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?auto=format&fit=crop&w=1200&q=80' },
];

void legacyGalleryItems;

const aboutImages = [
  { src: '/about/instalacion-techo.jpg', alt: 'Equipo instalando paneles solares sobre el techo de una vivienda' },
  { src: '/about/instalacion-campo.jpg', alt: 'Sistema solar en estructura de piso junto a una cabaña en zona rural' },
];
const ABOUT_ROTATION_MS = 5000;

/** Íconos de línea para la franja de especialidades (heredan el color del texto). */
function PillIcon({ label }: { label: string }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const l = label.toLowerCase();
  let path: JSX.Element;
  if (l.includes('fotovolt')) path = <><rect x="3" y="4" width="18" height="11" rx="1" {...p} /><path d="M3 9.5h18M9 4v11M15 4v11M12 15v5M8 20h8" {...p} /></>;
  else if (l.includes('ingenier')) path = <><circle cx="12" cy="12" r="3" {...p} /><path d="M12 2.5v3M12 18.5v3M4.2 7l2.6 1.5M17.2 15.5l2.6 1.5M4.2 17l2.6-1.5M17.2 8.5l2.6-1.5" {...p} /></>;
  else if (l.includes('obras')) path = <><path d="M3 21h18M5 21V10l7-5 7 5v11" {...p} /><path d="M9 21v-5h6v5" {...p} /></>;
  else path = <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3z" {...p} /><path d="M12 12 4 7.5M12 12l8-4.5M12 12v9" {...p} /></>;
  return <svg className="logo-pill__icon" viewBox="0 0 24 24" aria-hidden="true">{path}</svg>;
}

type CalcProfileId = 'residencial' | 'rural' | 'comercial' | 'industrial';
type CostTier = [maxKwp: number, copPerKwp: number];

/**
 * Perfiles del estimador. Cada perfil ajusta: escala de costo por kWp, tarifa sugerida,
 * cobertura por defecto, respaldo con baterías y relevancia de los incentivos tributarios.
 * Todos los valores son REFERENCIAS comerciales; ajústalos con los precios reales de PROSOINPEN.
 */
const CALC_PROFILES: Array<{
  id: CalcProfileId; icon: string; label: string; tagline: string; scale: string;
  coverage: number; tariffFactor: number; costTiers: CostTier[]; battery: boolean; autonomyDays: number;
  taxFocus: boolean; note: string; kwhMax: number; kwhStep: number;
}> = [
  { id: 'residencial', icon: '🏠', label: 'Residencial', tagline: 'Ahorro en hogares', scale: 'Sistemas de 2 a 8 kWp',
    coverage: 80, tariffFactor: 1, costTiers: [[3, 4750000], [8, 4200000], [Infinity, 3800000]], battery: false, autonomyDays: 0, taxFocus: false,
    kwhMax: 3000, kwhStep: 25,
    note: 'Sistema conectado a la red para reducir la factura de tu hogar. A pequeña escala los costos fijos de logística, estructura e ingeniería pesan más por kWp.' },
  { id: 'rural', icon: '🌾', label: 'Rural / Fincas', tagline: 'Baterías e independencia', scale: 'Sistemas de 2 a 8 kWp + baterías',
    coverage: 100, tariffFactor: 1.05, costTiers: [[3, 4950000], [8, 4400000], [Infinity, 4000000]], battery: true, autonomyDays: 1, taxFocus: false,
    kwhMax: 3000, kwhStep: 25,
    note: 'En veredas y zonas rurales la continuidad del servicio es la prioridad: sistema híbrido con baterías de litio para tener energía día y noche, independencia de la red pública y bombeo de agua.' },
  { id: 'comercial', icon: '🏢', label: 'Comercial', tagline: 'Ahorro en horario diurno', scale: 'Sistemas de 15 a 100 kWp',
    coverage: 70, tariffFactor: 1.2, costTiers: [[15, 3700000], [50, 3300000], [Infinity, 3000000]], battery: false, autonomyDays: 0, taxFocus: true,
    kwhMax: 20000, kwhStep: 100,
    note: 'La generación solar coincide con el horario de operación del negocio. A mayor escala baja el costo por kWp y la inversión es más eficiente por unidad de energía.' },
  { id: 'industrial', icon: '🏭', label: 'Industrial', tagline: 'Gran escala y beneficios fiscales', scale: 'Sistemas de más de 100 kWp',
    coverage: 60, tariffFactor: 0.95, costTiers: [[50, 3200000], [100, 2900000], [Infinity, 2600000]], battery: false, autonomyDays: 0, taxFocus: true,
    kwhMax: 80000, kwhStep: 500,
    note: 'Proyectos de gran escala con economías de escala y acceso a los incentivos tributarios de la Ley 1715 de 2014 (modificada por la Ley 2099 de 2021).' },
];

/** Tarifa residencial de referencia (COP/kWh) por región; el perfil aplica su factor sectorial. */
const CALC_REGIONS = [
  { id: 'caribe', label: 'Región Caribe', tariff: 1050 },
  { id: 'antioquia', label: 'Antioquia', tariff: 850 },
  { id: 'bogota', label: 'Bogotá y Cundinamarca', tariff: 880 },
  { id: 'santanderes', label: 'Santanderes', tariff: 930 },
  { id: 'occidente', label: 'Eje Cafetero y Valle', tariff: 870 },
  { id: 'llanos', label: 'Llanos Orientales', tariff: 950 },
  { id: 'otra', label: 'Otra región', tariff: 900 },
] as const;
type CalcRegionId = (typeof CALC_REGIONS)[number]['id'];

const BATTERY_COST_PER_KWH = 1400000; // COP por kWh de almacenamiento en litio (referencia)
const GRID_CO2_KG_PER_KWH = 0.126;    // factor de emisión de referencia del sistema eléctrico colombiano
const TREE_CO2_KG_PER_YEAR = 19;      // absorción aproximada de un árbol al año
const CAR_CO2_KG_PER_KM = 0.19;       // emisión aproximada de un vehículo a gasolina
const CORPORATE_TAX_RATE = 0.35;      // tarifa general de renta para personas jurídicas

const suggestedTariff = (region: CalcRegionId, profileId: CalcProfileId) => {
  const base = CALC_REGIONS.find((r) => r.id === region)?.tariff ?? 900;
  const factor = CALC_PROFILES.find((p) => p.id === profileId)?.tariffFactor ?? 1;
  return Math.round((base * factor) / 10) * 10;
};

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [uploadedSlides, setUploadedSlides] = useState<ShowcaseSlide[]>([]);
  const allSlides = [...showcaseSlides, ...uploadedSlides];
  const slideCount = allSlides.length;
  const [aboutIndex, setAboutIndex] = useState(0);
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'sent' | 'mailto' | 'error'>('idle');
  const [contactError, setContactError] = useState('');

  useEffect(() => {
    if (aboutImages.length < 2) return;
    const timer = setInterval(() => {
      setAboutIndex((current) => (current + 1) % aboutImages.length);
    }, ABOUT_ROTATION_MS);
    return () => clearInterval(timer);
  }, []);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [logoOpen, setLogoOpen] = useState(false);
  const [openLandingGroup, setOpenLandingGroup] = useState('Inicio');
  const [calcMode, setCalcMode] = useState<'kwh' | 'cop'>('kwh');
  const [calcProfile, setCalcProfile] = useState<CalcProfileId>('residencial');
  const [monthlyKwh, setMonthlyKwh] = useState(450);
  const [monthlyBill, setMonthlyBill] = useState(380000);
  const [calcRegion, setCalcRegion] = useState<CalcRegionId>('caribe');
  const [energyRate, setEnergyRate] = useState(() => suggestedTariff('caribe', 'residencial'));
  const [withBattery, setWithBattery] = useState(false);
  const [solarCoverage, setSolarCoverage] = useState(80);
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0]?.question ?? null);
  const [faqTab, setFaqTab] = useState<'todos' | FaqCategory>('todos');
  const visibleFaqs = faqTab === 'todos' ? faqs : faqs.filter((f) => f.category === faqTab);

  // ---- Estimador solar ----
  const profile = CALC_PROFILES.find((p) => p.id === calcProfile) ?? CALC_PROFILES[0];
  const effectiveKwh = calcMode === 'kwh' ? monthlyKwh : Math.max(30, Math.round(monthlyBill / Math.max(energyRate, 1)));
  const effectiveBill = calcMode === 'cop' ? monthlyBill : Math.round(monthlyKwh * energyRate);
  const coveredKwh = effectiveKwh * (solarCoverage / 100);
  const suggestedKwp = Math.max(1, Number((coveredKwh / (4.5 * 30 * 0.8)).toFixed(1)));
  const estimatedPanels = Math.max(3, Math.ceil((suggestedKwp * 1000) / 550));
  const costPerKwp = (profile.costTiers.find(([max]) => suggestedKwp <= max) ?? profile.costTiers[profile.costTiers.length - 1])[1];
  const batteryKwh = withBattery ? Math.max(2.5, Number(((effectiveKwh / 30) * Math.max(profile.autonomyDays, 1)).toFixed(1))) : 0;
  const batteryCost = Math.round(batteryKwh * BATTERY_COST_PER_KWH);
  const estimatedInvestment = Math.round(suggestedKwp * costPerKwp + batteryCost);
  const estimatedMonthlySavings = Math.round(coveredKwh * energyRate);
  const estimatedAnnualSavings = estimatedMonthlySavings * 12;
  const estimatedPayback = estimatedAnnualSavings > 0 ? (estimatedInvestment / estimatedAnnualSavings).toFixed(1) : '0';
  // Impacto ambiental
  const annualKwh = Math.round(coveredKwh * 12);
  const co2Kg = annualKwh * GRID_CO2_KG_PER_KWH;
  const co2Tons = co2Kg / 1000;
  const treesEquivalent = Math.round(co2Kg / TREE_CO2_KG_PER_YEAR);
  const kmEquivalent = Math.round(co2Kg / CAR_CO2_KG_PER_KM);
  // Incentivos Ley 1715 / 2099
  const deductibleAmount = Math.round(estimatedInvestment * 0.5);
  const taxSavings = Math.round(deductibleAmount * CORPORATE_TAX_RATE);
  const netInvestment = estimatedInvestment - taxSavings;
  const netPayback = estimatedAnnualSavings > 0 ? (netInvestment / estimatedAnnualSavings).toFixed(1) : '0';

  function selectProfile(id: CalcProfileId) {
    const next = CALC_PROFILES.find((p) => p.id === id) ?? CALC_PROFILES[0];
    setCalcProfile(id);
    setSolarCoverage(next.coverage);
    setWithBattery(next.battery);
    setEnergyRate(suggestedTariff(calcRegion, id));
    setMonthlyKwh((v) => Math.min(v, next.kwhMax));
  }

  function selectRegion(id: CalcRegionId) {
    setCalcRegion(id);
    setEnergyRate(suggestedTariff(id, calcProfile));
  }

  function requestCalcStudy() {
    const msg = [
      'Hola, quiero un estudio personalizado.',
      `Perfil: ${profile.label} · ${CALC_REGIONS.find((r) => r.id === calcRegion)?.label ?? ''}`,
      `Consumo mensual: ${effectiveKwh.toLocaleString('es-CO')} kWh`,
      `Factura mensual aproximada: $${effectiveBill.toLocaleString('es-CO')}`,
      `Sistema estimado: ${suggestedKwp.toLocaleString('es-CO')} kWp (${estimatedPanels} paneles aprox.)${batteryKwh ? ` + ${batteryKwh.toLocaleString('es-CO')} kWh en baterías` : ''}`,
    ].join('\n');
    const field = document.querySelector<HTMLTextAreaElement>('#contacto textarea[name="message"]');
    if (field && !field.value.trim()) field.value = msg;
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Suma al slider las fotos cargadas desde el panel de administración (galería).
  useEffect(() => {
    let cancelled = false;
    fetch('/api/projects', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { projects?: GalleryApiProject[] } | null) => {
        if (!cancelled && data?.projects?.length) setUploadedSlides(slidesFromProjects(data.projects));
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % slideCount);
    }, 3000);

    return () => clearInterval(interval);
  }, [slideCount]);

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

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      message: String(formData.get('message') ?? ''),
      website: String(formData.get('website') ?? ''),
    };
    setContactStatus('sending');
    setContactError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setContactStatus('sent');
        form.reset();
        return;
      }
      if (!data.fallback) {
        setContactStatus('error');
        setContactError(data.error || 'No pudimos enviar tu solicitud.');
        return;
      }
    } catch {
      // Sin conexión con el servidor: usamos el correo del visitante como respaldo.
    }
    const subject = `Solicitud de información de ${payload.name}`;
    const body = [`Nombre: ${payload.name}`, `Correo: ${payload.email}`, `Teléfono: ${payload.phone}`, '', payload.message].join('\n');
    window.location.href = `mailto:proyectospentagonosas@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setContactStatus('mailto');
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
                <div className="brand-name brand-name--landing header-brand-name">S.A.S.<span className="header-brand-nit"> · NIT 901960765-2</span></div>
              </div>
            </div>

            <nav className="hidden" aria-label="Navegación principal" />

            <div className="flex items-center gap-3">
              <ThemeToggle />
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
              <Link href="/admin/login" className="landing-button landing-button--ghost hidden lg:inline-flex" aria-label="Iniciar sesión como administrador">
                🔐 Ingresar
              </Link>
              <a href="#contacto" className="landing-button landing-button--ghost hidden lg:inline-flex">Agendar</a>
              <a href="#contacto" className="landing-button landing-button--primary header-cta">
                <span className="header-cta__long">Solicitar propuesta</span>
                <span className="header-cta__short">Cotizar</span>
              </a>
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
                🔐 Acceso administración
              </Link>
              <ThemeToggle className="theme-toggle--block" />
            </div>
          </nav>
        ) : null}

        <div className="gallery-quick-tabs" aria-label="Accesos rápidos">
          <span className="gallery-quick-tabs__label">Explorar</span>
          <a href="#calculadora" className="gallery-quick-tab">Calculadora</a>
          <a href="#respaldo" className="gallery-quick-tab">Normativa y garantías</a>
          {realTestimonials.length > 0 ? <a href="#testimonios" className="gallery-quick-tab">Testimonios</a> : null}
          <a href="/recursos" className="gallery-quick-tab">Guías</a>
          <a href="#faq" className="gallery-quick-tab">Preguntas</a>
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
              {allSlides.map((slide, index) => (
                <article key={`${slide.image}-${index}`} className="showcase-slide">
                  <img src={slide.image} alt={slide.title} className="showcase-slide__image" style={slide.position ? { objectPosition: slide.position } : undefined} loading="lazy" />
                  <div className="showcase-slide__content">
                    <span className="showcase-slide__label">PROSOINPEN S.A.S.</span>
                    <h3>{slide.title}</h3>
                    <p>{slide.subtitle}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="showcase-dots" aria-label="Selector de imagen">
            {allSlides.map((slide, index) => (
              <button
                key={`${slide.image}-${index}-dot`}
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
                <span key={`${logo}-${index}`} className="logo-pill">
                  <PillIcon label={logo} />
                  {logo}
                </span>
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
                  <a href="#contacto" className="landing-button landing-button--primary">Contáctanos</a>
                  <a href="#valores" className="landing-button landing-button--ghost">Nuestra historia</a>
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
                    <span className="status-pill">NIT 901960765-2</span>
                  </div>

                  <div className="hero-panel-card__content">
                    <div className="big-stat-block">
                      <div className="panel-tag">Proyecto destacado</div>
                      <div className="big-stat" style={{ color: '#FFFFFF', opacity: 1 }}>396</div>
                      <div className="info-block__caption">sistemas fotovoltaicos · Municipio de Morales, Bolívar</div>
                    </div>

                    <div className="info-block" style={{ color: '#FFFFFF', opacity: 1 }}>
                      Diseñamos soluciones energéticas inteligentes para acompañar a clientes desde la estrategia hasta la operación, con rigor técnico y una experiencia de primer nivel en cada etapa.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          <section id="impacto" className="impact-band" aria-labelledby="impacto-titulo">
            <img src="/images/web/cabana-noche.jpg" alt="Vivienda rural iluminada con energía solar al anochecer" className="impact-band__bg" loading="lazy" />
            <figure className="impact-band__inset">
              <img src="/images/web/poste-solar.jpg" alt="Sistema solar aislado sobre estructura en poste" loading="lazy" />
              <figcaption><b>Sistema aislado</b> · Estructura en poste</figcaption>
            </figure>
            <div className="impact-band__content">
              <span className="section-badge">Nuestro impacto</span>
              <h2 id="impacto-titulo" className="impact-band__title">Llevamos luz donde la red <span>no llega.</span></h2>
              <p className="impact-band__lead">En las Zonas No Interconectadas de Colombia, un sistema solar bien diseñado cambia la vida de una familia: luz en la noche, equipos funcionando y energía propia, limpia y confiable.</p>
              <div className="impact-band__stats">
                <div><b>396</b><span>Sistemas solares</span><small>Municipio de Morales, Bolívar</small></div>
                <div><b>5</b><span>Departamentos</span><small>Guajira, Magdalena, Meta, Santander y Bolívar</small></div>
                <div><b>5</b><span>Líneas de servicio</span><small>De la ingeniería a la obra civil</small></div>
                <div><b>25<i>+</i></b><span>Años de ahorro</span><small>Vida útil de un sistema fotovoltaico</small></div>
              </div>
            </div>
          </section>

          {/* SECCIÓN 1: SOBRE NOSOTROS */}
          <section
            id="sobre-nosotros"
            className="mt-16 relative overflow-hidden rounded-[28px] border border-white/10"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(var(--ps-deep-rgb), 0.96) 0%, rgba(var(--ps-deep-rgb), 0.86) 42%, rgba(var(--ps-deep-rgb), 0.58) 100%), url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1800&q=85')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="relative z-10 p-6 sm:p-8 lg:p-10">
              <div className="landing-section-heading mb-8 max-w-4xl">
                <span className="section-badge">Sobre nosotros</span>
                <h2 className="section-title section-title--left">
                  Convertimos la energía en una inversión inteligente
                </h2>
                <p className="landing-section-description">
                  En PROSOINPEN S.A.S. ayudamos a empresas y hogares a convertir la energía en una oportunidad de inversión y rentabilidad autosostenible durante más de 25 años. Creemos que la transición energética no solo protege a las generaciones futuras, sino que hoy se convierte en una decisión financiera inteligente y altamente estratégica.
                </p>
              </div>

              <div className="benefits-grid">
                {investmentBenefits.map((benefit) => (
                  <article
                    key={benefit.title}
                    className="benefit-card"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      borderColor: 'rgba(255, 255, 255, 0.12)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <div
                      className="benefit-card__icon"
                      aria-hidden="true"
                      style={{ color: 'var(--ps-accent-2)' }}
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
              <span className="section-badge">Equipo</span>
              <h2 className="section-title section-title--left">Ingeniería detrás de cada proyecto.</h2>
              <p className="landing-section-description">Conoce al equipo y los principios que convierten cada proyecto solar en una decisión clara, rentable y sostenible.</p>
            </div>

            <div className="about-layout">
              <div className="about-image-frame">
                {aboutImages.map((image, index) => (
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    className={`about-image-slide ${index === aboutIndex ? 'is-active' : ''}`}
                    aria-hidden={index !== aboutIndex}
                  />
                ))}
                <span className="about-image-caption">Ingeniería que se ve en cada detalle</span>
              </div>
              <div className="value-grid">
                {valueCards.map((card, index) => (
                  <article id={card.id} key={card.title} tabIndex={0} className={`value-card ${index === 0 ? 'value-card--large' : ''}`}>
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
                <h2 className="section-title section-title--left">Nuestros servicios</h2>
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
          <section id="ingenieria" className="mt-12">
            <div className="landing-section-heading">
              <span className="section-badge">Portafolio integral</span>
              <h2 className="section-title section-title--left">Mucho más que paneles solares.</h2>
              <p className="landing-section-description">Explora nuestras líneas de ingeniería según el tipo de servicio que necesitas.</p>
            </div>
            <ServiceTabs />
          </section>

          <section id="nuestro-portafolio" className="mt-16">
            <div className="landing-section-heading mb-8 flex items-end justify-between gap-4">
              <div>
                <span className="section-badge">Soluciones</span>
                <h2 className="section-title section-title--left">Líneas de solución</h2>
                <p className="landing-section-description">
                  Soluciones inteligentes en energía solar y movilidad eléctrica para un futuro más rentable y sostenible.
                </p>
              </div>
              <span className="landing-section-index">SOL / 04</span>
            </div>

            <div className="portfolio-grid portfolio-grid--4-cards">
              {portfolioItems.slice(0, 4).map((item) => (
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

          <section id="respaldo" className="trust mt-12" aria-labelledby="respaldo-titulo">
            <div className="landing-section-heading">
              <span className="section-badge">Respaldo técnico y legal</span>
              <h2 id="respaldo-titulo" className="section-title section-title--left">Seguridad en cada etapa de tu proyecto.</h2>
              <p className="landing-section-description">Normativa colombiana, equipos de fabricantes reconocidos, monitoreo en tiempo real y soporte después de la instalación.</p>
            </div>

            {/* Marco regulatorio */}
            <h3 className="trust__title">Marco regulatorio en Colombia</h3>
            <div className="trust-reg">
              {regulations.map((r) => (
                <article key={r.code} className="trust-reg__card">
                  <span className="trust-reg__icon" aria-hidden="true">{r.icon}</span>
                  <span className="trust-reg__code">{r.code}</span>
                  <h4>{r.name}</h4>
                  <p className="trust-reg__what">{r.what}</p>
                  <p className="trust-reg__msg">{r.message}</p>
                </article>
              ))}
            </div>

            {/* Garantías y marcas */}
            <div className="trust-grid">
              <div className="trust-box">
                <h3 className="trust__title">Garantías y equipos de calidad</h3>
                <ul className="trust-warranty">
                  {warranties.map((w) => (
                    <li key={w.item}>
                      <span className="trust-warranty__icon" aria-hidden="true">{w.icon}</span>
                      <div><b>{w.item}</b><span>{w.detail}</span></div>
                    </li>
                  ))}
                </ul>
                <p className="trust-brands__label">Trabajamos con equipos de fabricantes reconocidos</p>
                <div className="trust-brands">
                  {brands.map((b) => (
                    <span key={b.name} className="trust-brand"><b>{b.name}</b><small>{b.type}</small></span>
                  ))}
                </div>
                <p className="trust-note">Las garantías de equipos corresponden a las de cada fabricante y se detallan en la propuesta de tu proyecto.</p>
              </div>

              {/* Monitoreo */}
              <div className="trust-box trust-box--monitor">
                <div>
                  <h3 className="trust__title">Monitoreo en tiempo real</h3>
                  <p className="trust-text">Después de la instalación sigues tu sistema desde el celular: energía generada, ahorro y alertas de mantenimiento.</p>
                  <ul className="trust-checks">
                    <li>Energía generada cada día en kWh</li>
                    <li>Ahorro económico estimado en COP</li>
                    <li>Diagnóstico y alertas automáticas</li>
                  </ul>
                </div>
                <div className="phone" aria-label="Ejemplo ilustrativo de la aplicación de monitoreo">
                  <div className="phone__screen">
                    <div className="phone__top"><span>Mi sistema solar</span><i>● En línea</i></div>
                    <div className="phone__big"><small>Generado hoy</small><b>18,6 <em>kWh</em></b></div>
                    <div className="phone__bars" aria-hidden="true">
                      {[20, 35, 55, 78, 92, 100, 88, 70, 48, 26].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}
                    </div>
                    <div className="phone__row"><span>Ahorro del mes</span><b>$412.300</b></div>
                    <div className="phone__row"><span>CO₂ evitado</span><b>70 kg</b></div>
                    <div className="phone__alert">✓ Sin alertas · próxima limpieza en 12 días</div>
                  </div>
                  <span className="phone__tag">Ejemplo ilustrativo</span>
                </div>
              </div>
            </div>

            {/* Postventa */}
            <h3 className="trust__title">Mantenimiento y soporte postventa</h3>
            <div className="trust-post">
              {postSales.map((s) => (
                <div key={s.title} className="trust-post__item">
                  <span aria-hidden="true">{s.icon}</span>
                  <b>{s.title}</b>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="calculadora" className="solar-calculator mt-12">
            <div className="landing-section-heading">
              <span className="section-badge">Estimador solar</span>
              <h2 className="section-title section-title--left">Calcula tu ahorro.</h2>
              <p className="landing-section-description">Elige tu perfil e ingresa tu consumo o el valor de tu factura. Obtén una referencia inmediata para Colombia.</p>
            </div>

            <div className="calc-profiles" role="radiogroup" aria-label="Perfil del proyecto">
              {CALC_PROFILES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={calcProfile === p.id}
                  className={`calc-profile ${calcProfile === p.id ? 'is-active' : ''}`}
                  onClick={() => selectProfile(p.id)}
                >
                  <span className="calc-profile__icon" aria-hidden="true">{p.icon}</span>
                  <span className="calc-profile__label">{p.label}</span>
                  <span className="calc-profile__tag">{p.tagline}</span>
                </button>
              ))}
            </div>
            <p className="calc-profile-note"><b>{profile.scale}.</b> {profile.note}</p>

            <div className="solar-calculator__body" aria-label="Calculadora de ahorro solar">
              <div className="solar-calculator__controls">
                <div className="calc-mode" role="tablist" aria-label="Forma de ingresar tu consumo">
                  <button type="button" role="tab" aria-selected={calcMode === 'kwh'} className={calcMode === 'kwh' ? 'is-active' : ''} onClick={() => setCalcMode('kwh')}><span className="calc-long">Por consumo (kWh)</span><span className="calc-short">Consumo kWh</span></button>
                  <button type="button" role="tab" aria-selected={calcMode === 'cop'} className={calcMode === 'cop' ? 'is-active' : ''} onClick={() => setCalcMode('cop')}><span className="calc-long">Por factura ($ COP)</span><span className="calc-short">Factura $</span></button>
                </div>

                {calcMode === 'kwh' ? (
                  <label className="solar-calculator__input">
                    <span>Consumo mensual: <strong>{monthlyKwh.toLocaleString('es-CO')} kWh</strong></span>
                    <input aria-label="Consumo mensual en kWh" type="range" min="50" max={profile.kwhMax} step={profile.kwhStep} value={monthlyKwh} onChange={(event) => setMonthlyKwh(Number(event.target.value))} />
                    <div className="solar-calculator__range"><span>50 kWh</span><span>{profile.kwhMax.toLocaleString('es-CO')} kWh</span></div>
                    <small className="calc-hint">Lo encuentras en tu factura como “consumo del mes” (≈ ${effectiveBill.toLocaleString('es-CO')} al mes).</small>
                  </label>
                ) : (
                  <label className="solar-calculator__input">
                    <span>Valor de tu factura mensual</span>
                    <div className="calc-money">
                      <span aria-hidden="true">$</span>
                      <input
                        aria-label="Valor de la factura mensual en pesos colombianos"
                        inputMode="numeric"
                        value={monthlyBill ? monthlyBill.toLocaleString('es-CO') : ''}
                        onChange={(event) => setMonthlyBill(Math.min(500000000, Number(event.target.value.replace(/\D/g, '')) || 0))}
                        placeholder="380.000"
                      />
                      <span className="calc-money__unit">COP</span>
                    </div>
                    <small className="calc-hint">Equivale a ≈ {effectiveKwh.toLocaleString('es-CO')} kWh al mes con la tarifa indicada abajo.</small>
                  </label>
                )}

                <label className="solar-calculator__input">
                  <span>Región</span>
                  <select className="calc-select" value={calcRegion} onChange={(event) => selectRegion(event.target.value as CalcRegionId)} aria-label="Región del proyecto">
                    {CALC_REGIONS.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
                  </select>
                  <small className="calc-hint">Sugerimos una tarifa de referencia para tu región y tipo de cliente. Puedes ajustarla con el valor de tu factura.</small>
                </label>
                <label className="solar-calculator__input">
                  <span>Tarifa de energía: <strong>${energyRate.toLocaleString('es-CO')} / kWh</strong> <em className="calc-suggested">{energyRate === suggestedTariff(calcRegion, calcProfile) ? 'sugerida' : 'ajustada'}</em></span>
                  <input aria-label="Tarifa de energía en pesos colombianos" type="range" min="400" max="1600" step="10" value={energyRate} onChange={(event) => setEnergyRate(Number(event.target.value))} />
                  <div className="solar-calculator__range"><span>$400</span><span>$1.600</span></div>
                </label>
                <label className="solar-calculator__input">
                  <span>Cobertura solar estimada: <strong>{solarCoverage}%</strong></span>
                  <input aria-label="Cobertura solar estimada" type="range" min="30" max="100" step="5" value={solarCoverage} onChange={(event) => setSolarCoverage(Number(event.target.value))} />
                  <div className="solar-calculator__range"><span>30%</span><span>100%</span></div>
                </label>
                <label className="calc-switch">
                  <input type="checkbox" checked={withBattery} onChange={(event) => setWithBattery(event.target.checked)} />
                  <span className="calc-switch__track" aria-hidden="true" />
                  <span><b>Respaldo con baterías de litio</b><small>{profile.id === 'rural' ? 'Recomendado en zonas rurales: energía aun cuando falla la red.' : 'Opcional: energía de respaldo ante cortes.'}</small></span>
                </label>
              </div>

              <div className="solar-calculator__results">
                <div><span>Sistema sugerido</span><strong>{suggestedKwp.toLocaleString('es-CO')} kWp</strong><small>≈ {estimatedPanels} paneles</small></div>
                <div>
                  {batteryKwh ? (<><span>Almacenamiento</span><strong>{batteryKwh.toLocaleString('es-CO')} kWh</strong><small>Baterías de litio · {profile.autonomyDays} día de autonomía</small></>)
                    : (<><span>Consumo cubierto</span><strong>{Math.round(coveredKwh).toLocaleString('es-CO')} kWh</strong><small>de {effectiveKwh.toLocaleString('es-CO')} kWh al mes</small></>)}
                </div>
                <div className="solar-calculator__investment"><span>Inversión estimada llave en mano</span><strong>${estimatedInvestment.toLocaleString('es-CO')}</strong><small>Incluye equipos, instalación y puesta en marcha{batteryKwh ? ', con baterías' : ''}</small></div>
                <div><span>Ahorro mensual estimado</span><strong>${estimatedMonthlySavings.toLocaleString('es-CO')}</strong></div>
                <div><span>Ahorro anual estimado</span><strong>${estimatedAnnualSavings.toLocaleString('es-CO')}</strong></div>
                <div><span>Retorno aproximado</span><strong>{estimatedPayback.replace('.', ',')} años</strong></div>
                <div><span>Costo promedio instalado</span><strong>${costPerKwp.toLocaleString('es-CO')} / kWp</strong></div>
                <div className="calc-eco">
                  <span>🌱 Impacto ambiental</span>
                  <strong>{co2Tons.toLocaleString('es-CO', { maximumFractionDigits: 1 })} t de CO₂ evitadas al año</strong>
                  <ul>
                    <li>🌳 Equivale a sembrar <b>{treesEquivalent.toLocaleString('es-CO')} árboles</b> cada año.</li>
                    <li>🚗 Equivale a no recorrer <b>{kmEquivalent.toLocaleString('es-CO')} km</b> en vehículo.</li>
                  </ul>
                  <small>Basado en {annualKwh.toLocaleString('es-CO')} kWh generados al año × {GRID_CO2_KG_PER_KWH.toLocaleString('es-CO')} kg CO₂/kWh.</small>
                </div>

                <details className={`calc-tax ${profile.taxFocus ? 'is-focus' : ''}`} open={profile.taxFocus} key={profile.taxFocus ? 'tax-open' : 'tax-closed'}>
                  <summary>
                    <span>📜 Beneficio tributario · Ley 1715 de 2014 y Ley 2099 de 2021</span>
                    {profile.taxFocus ? (
                      <strong>Costo neto estimado: ${netInvestment.toLocaleString('es-CO')}</strong>
                    ) : (
                      <strong className="calc-tax__small">¿Declaras renta? También puedes aplicar</strong>
                    )}
                  </summary>
                  <div className="calc-tax__rows">
                    <div><span>Deducción en renta (hasta 50 % de la inversión, hasta 15 años)</span><b>${deductibleAmount.toLocaleString('es-CO')}</b></div>
                    <div><span>Ahorro estimado en impuesto (tarifa del {Math.round(CORPORATE_TAX_RATE * 100)} %)</span><b>${taxSavings.toLocaleString('es-CO')}</b></div>
                    <div><span>Retorno considerando el beneficio</span><b>{netPayback.replace('.', ',')} años</b></div>
                  </div>
                  <ul className="calc-tax__list">
                    <li><b>Depreciación acelerada:</b> hasta 33,33 % anual de los activos.</li>
                    <li><b>Exclusión de IVA (19 %)</b> en equipos, elementos y servicios del proyecto.</li>
                    <li><b>0 % de arancel</b> en la importación de maquinaria y equipos.</li>
                  </ul>
                  <small>Aplica a declarantes de renta, personas jurídicas y naturales. Requiere certificación del proyecto ante la UPME y la ANLA según corresponda. Los valores son estimaciones: valida con tu contador.</small>
                </details>
                <button type="button" onClick={requestCalcStudy} className="landing-button landing-button--primary">Solicitar estudio técnico y fiscal</button>
              </div>
            </div>
            <p className="solar-calculator__note">Referencia orientativa para Colombia. La tarifa, la radiación, el tipo de techo, los excedentes y las condiciones del proyecto pueden cambiar el resultado final. No constituye una cotización.</p>
          </section>

          <section id="galeria" className="mt-12">
            <div className="gallery-shell">
              <div className="gallery-heading">
                <span className="section-badge">Proyectos</span>
                <h2 className="section-title section-title--left">Nuestro portafolio</h2>
                <p className="landing-section-description">Explora soluciones, instalaciones y equipos que convierten la energía en resultados reales.</p>
              </div>

              <div className="gallery-toolbar">
                <Link href="/proyectos" className="landing-button landing-button--primary">Ver galería completa</Link>
              </div>

              <ProjectsGallery />
            </div>
          </section>


          {realTestimonials.length > 0 ? (
          <section id="testimonios" className="mt-12">
            <div className="landing-section-heading">
              <span className="section-badge">Clientes</span>
              <h2 className="section-title section-title--left">Lo que dicen nuestros clientes.</h2>
            </div>
            <TestimonialsSlider items={realTestimonials} />
          </section>
          ) : null}

          <section id="recursos" className="mt-12">
            <div className="landing-section-heading">
              <span className="section-badge">Centro de recursos</span>
              <h2 className="section-title section-title--left">Aprende antes de invertir.</h2>
              <p className="landing-section-description">Guías prácticas sobre energía solar en Colombia.</p>
            </div>
            <div className="rs-home">
              {resources.map((r) => (
                <Link key={r.slug} href={`/recursos/${r.slug}`} className="rs-home__card">
                  <span>{r.tag} · {r.minutes} min</span>
                  <b>{r.title}</b>
                  <em>Leer guía →</em>
                </Link>
              ))}
            </div>
            <Link href="/recursos" className="rs-home__all">Ver todas las guías →</Link>
          </section>

          <section id="faq" className="landing-faq mt-12">
            <div className="landing-section-heading">
              <span className="section-badge">Preguntas frecuentes</span>
              <h2 className="section-title section-title--left">Todo más claro.</h2>
              <p className="landing-section-description">Resolvemos las dudas más comunes antes de comenzar tu proyecto.</p>
            </div>
            <div className="faq-tabs" role="tablist" aria-label="Filtrar preguntas por categoría">
              {FAQ_TABS.map((tab) => (
                <button key={tab.id} type="button" role="tab" aria-selected={faqTab === tab.id} className={faqTab === tab.id ? 'is-active' : ''} onClick={() => setFaqTab(tab.id)}>
                  {tab.label}
                  <span>{tab.id === 'todos' ? faqs.length : faqs.filter((f) => f.category === tab.id).length}</span>
                </button>
              ))}
            </div>
            <div className="faq-list">
              {visibleFaqs.map((faq) => {
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
            <div className="faq-cta">
              <div><b>¿Tienes alguna pregunta específica sobre tu proyecto?</b><p>Un ingeniero de PROSOINPEN te responde directamente.</p></div>
              <a className="whatsapp-button" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="whatsapp-button__icon" />
                Hablar con un ingeniero por WhatsApp
              </a>
            </div>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }) }}
            />

          </section>

          <section className="legal-card mt-12" aria-labelledby="legal-titulo">
            <header className="legal-card__head">
              <span className="section-badge">Marco regulatorio y legal</span>
              <h2 id="legal-titulo">Garantizamos la legalización y certificación de tu proyecto</h2>
            </header>
            <div className="legal-card__grid">
              <div className="legal-card__item"><span className="legal-card__icon" aria-hidden="true">⚡</span><b>RETIE</b><p>Diseño y montaje bajo la norma de seguridad eléctrica.</p></div>
              <div className="legal-card__item"><span className="legal-card__icon" aria-hidden="true">🔌</span><b>CREG 174 de 2021</b><p>Venta e inyección de excedentes a la red pública.</p></div>
              <div className="legal-card__item"><span className="legal-card__icon" aria-hidden="true">🏛️</span><b>Ley 1715 / 2099</b><p>Beneficios tributarios: deducción de hasta el 50 % en renta y exclusión de IVA.</p></div>
            </div>
            <div className="legal-card__foot">
              <span className="legal-card__icon" aria-hidden="true">📜</span>
              <div><b>Gestión integral con la UPME y el operador de red</b><p>Nos encargamos de todo el papeleo legal con tu operador de red local.</p></div>
            </div>
          </section>

          <section id="contacto" className="mt-12 pb-10">
            <div className="cta-panel">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                <div className="landing-section-heading landing-section-heading--contact">
                  <span className="section-badge">Contacto</span>
                  <h2 className="section-title section-title--left">Hablemos de tu próximo proyecto.</h2>
                  <p className="cta-copy">
                    Te acompañamos desde el diagnóstico inicial hasta la puesta en marcha, con un equipo humano, técnico y responsable en cada etapa.
                  </p>
                  <a className="whatsapp-button" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="whatsapp-button__icon" />
                    Conversar por WhatsApp
                  </a>
                  <BrochureGate />
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
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="contact-form__trap" />
                  <button type="submit" className="landing-button landing-button--primary" disabled={contactStatus === 'sending'}>
                    {contactStatus === 'sending' ? 'Enviando...' : 'Solicitar información'}
                  </button>
                  {contactStatus === 'sent' ? (
                    <p className="contact-form__notice" role="status">
                      ¡Gracias! Recibimos tu solicitud y te contactaremos muy pronto.
                    </p>
                  ) : null}
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


        <style jsx global>{`
          :root {
            --solar-green: var(--ps-accent-2);
            --solar-green-soft: rgba(var(--ps-accent-rgb), 0.16);
            --solar-dark: var(--ps-deep);
            --solar-card: rgba(var(--ps-deep-2-rgb), 0.78);
          }

          html { scroll-behavior: smooth; }

          .investment-section {
            position: relative;
            overflow: hidden;
            min-height: 570px;
            border: 1px solid rgba(var(--ps-glow-rgb), 0.14);
            border-radius: 22px;
            isolation: isolate;
            background: var(--ps-deep);
          }

          .investment-section__backdrop {
            position: absolute;
            inset: 0;
            z-index: -2;
            background:
              linear-gradient(90deg, rgba(var(--ps-deep-rgb), .94) 0%, rgba(var(--ps-deep-rgb), .76) 38%, rgba(var(--ps-deep-rgb), .42) 100%),
              url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1800&q=90') center/cover;
            transform: scale(1.02);
          }

          .investment-section::after {
            content: '';
            position: absolute;
            inset: 0;
            z-index: -1;
            background: radial-gradient(circle at 75% 50%, rgba(var(--ps-glow-rgb), .10), transparent 38%);
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
            text-shadow: 0 0 28px rgba(var(--ps-glow-rgb), .08);
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
            background: rgba(var(--ps-deep-2-rgb), .58);
            backdrop-filter: blur(10px);
            box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 12px 35px rgba(0,0,0,.14);
            transition: transform .28s ease, border-color .28s ease, background .28s ease, box-shadow .28s ease;
          }

          .benefit-card:hover {
            transform: translateY(-4px);
            border-color: rgba(var(--ps-glow-rgb), .48);
            background: rgba(var(--ps-deep-2-rgb), .76);
            box-shadow: 0 14px 45px rgba(0,0,0,.28), 0 0 25px rgba(var(--ps-glow-rgb), .07);
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
            border: 1px solid rgba(var(--ps-glow-rgb), .38);
            border-radius: 8px;
            color: var(--solar-green);
            background: rgba(var(--ps-glow-rgb), .09);
            box-shadow: 0 0 18px rgba(var(--ps-glow-rgb), .10);
          }

          .benefit-card__number {
            font-size: 12px;
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
            font-size: 13.5px;
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
            background: var(--ps-surface) !important;
            box-shadow: 0 10px 30px rgba(0,0,0,.20);
            transition: transform .28s ease, border-color .28s ease, box-shadow .28s ease;
          }

          .portfolio-card--4-card:hover {
            transform: translateY(-5px);
            border-color: rgba(var(--ps-glow-rgb), .50) !important;
            box-shadow: 0 18px 45px rgba(0,0,0,.34), 0 0 24px rgba(var(--ps-glow-rgb), .08);
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
            background: linear-gradient(to bottom, rgba(0,0,0,0) 42%, rgba(var(--ps-deep-rgb), .72) 100%);
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
            border: 1px solid rgba(var(--ps-glow-rgb), .62);
            border-radius: 8px;
            color: var(--ps-accent-2);
            background: rgba(var(--ps-accent-rgb), 0.12);
            box-shadow: 0 0 18px rgba(var(--ps-glow-rgb), .14);
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
            color: var(--ps-accent-2);
            font-size: 9px;
          }

          .portfolio-card--4-card__arrow {
            color: var(--ps-accent-2);
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
            font-size: 12px;
            line-height: 1.55;
          }

          .portfolio-card--4-card__content a {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            color: #fff;
            font-size: 12px;
            font-weight: 600;
            text-decoration: none;
            transition: color .2s ease, gap .2s ease;
          }

          .portfolio-card--4-card__content a:hover {
            color: var(--ps-accent-2);
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
            background: rgba(var(--ps-deep-2-rgb), .88) !important;
            box-shadow: 0 14px 40px rgba(0,0,0,.18);
            transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease;
          }

          .portfolio-card--visual:hover {
            transform: translateY(-7px);
            border-color: rgba(var(--ps-glow-rgb), .55) !important;
            box-shadow: 0 20px 55px rgba(0,0,0,.35), 0 0 28px rgba(var(--ps-glow-rgb), .08);
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
            background: linear-gradient(180deg, rgba(0,0,0,.05), rgba(var(--ps-deep-rgb), .82));
          }

          .portfolio-card__icon {
            position: absolute;
            left: 14px;
            bottom: 14px;
            display: grid;
            place-items: center;
            width: 38px;
            height: 38px;
            border: 1px solid rgba(var(--ps-glow-rgb), .5);
            border-radius: 9px;
            color: var(--solar-green);
            background: rgba(var(--ps-deep-rgb), .78);
            backdrop-filter: blur(7px);
            font-size: 19px;
            box-shadow: 0 0 20px rgba(var(--ps-glow-rgb), .12);
          }

          .portfolio-card__counter {
            position: absolute;
            right: 15px;
            bottom: 16px;
            font-size: 12px;
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
            font-size: 12px;
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
            font-size: 13.5px;
            line-height: 1.6;
          }

          .portfolio-card__link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #fff;
            font-size: 13.5px;
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
                <li>PROSOINPEN S.A.S.</li>
                <li>NIT: 901960765-2</li>
                <li><a href="mailto:proyectospentagonosas@gmail.com">proyectospentagonosas@gmail.com</a></li>
                <li>Proyectos y Soluciones de Ingeniería El Pentágono S.A.S.</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom footer-bottom--theme">
            <span>© {new Date().getFullYear()} PROSOINPEN S.A.S. · NIT 901960765-2. Todos los derechos reservados.</span>
            <ThemeToggle />
          </div>
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
              <p className="logo-lightbox__hint">Haz clic fuera o en ✕ para cerrar</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}