// Datos centrales de SEO de PROSOINPEN S.A.S. (usados en metadatos y datos estructurados).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.prosoinpen.com').replace(/\/$/, '');
export const OG_IMAGE = '/og-prosoinpen.jpg';

export const SEO_DESCRIPTION =
  'PROSOINPEN S.A.S.: empresa colombiana de ingeniería y energía solar fotovoltaica. Diseño, instalación y mantenimiento de paneles solares para hogares, empresas y zonas rurales, montajes eléctricos bajo RETIE, obras civiles y asesoría en beneficios de la Ley 1715.';

export const SEO_KEYWORDS = [
  'PROSOINPEN',
  'PROSOINPEN S.A.S.',
  'Proyectos y Soluciones de Ingeniería El Pentágono',
  'energía solar Colombia',
  'paneles solares Colombia',
  'sistemas fotovoltaicos',
  'instalación de paneles solares',
  'energía solar para empresas',
  'energía solar residencial',
  'sistemas solares zonas no interconectadas',
  'sistemas solares aislados',
  'baterías de litio solares',
  'Ley 1715 beneficios tributarios',
  'CREG 174 excedentes',
  'montajes eléctricos RETIE',
  'mantenimiento de paneles solares',
  'obras civiles',
  'ingeniería eléctrica',
];

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'PROSOINPEN S.A.S.',
        legalName: 'Proyectos y Soluciones de Ingeniería El Pentágono S.A.S.',
        alternateName: ['PROSOINPEN', 'Prosoinpen'],
        taxID: '901960765-2',
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo-prosoinpen.png`, width: 640, height: 651 },
        image: `${SITE_URL}${OG_IMAGE}`,
        description: SEO_DESCRIPTION,
        email: 'proyectospentagonosas@gmail.com',
        telephone: '+57 311 216 7711',
        areaServed: { '@type': 'Country', name: 'Colombia' },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            telephone: '+57-311-216-7711',
            email: 'proyectospentagonosas@gmail.com',
            areaServed: 'CO',
            availableLanguage: ['Spanish'],
          },
        ],
        knowsAbout: ['Energía solar fotovoltaica', 'Paneles solares', 'Sistemas solares aislados', 'Ingeniería eléctrica', 'Obras civiles', 'RETIE', 'Ley 1715'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios de PROSOINPEN S.A.S.',
          itemListElement: [
            'Implementación de sistemas de energía solar fotovoltaica',
            'Montajes, pruebas y puesta en marcha de sistemas eléctricos',
            'Mantenimiento preventivo y correctivo de sistemas solares',
            'Ingeniería civil estructural',
            'Parques y urbanismo',
          ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, areaServed: 'Colombia', provider: { '@id': `${SITE_URL}/#organization` } } })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'PROSOINPEN S.A.S.',
        inLanguage: 'es-CO',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  };
}
