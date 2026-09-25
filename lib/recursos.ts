/**
 * Centro de recursos / guías de educación solar (SEO local).
 * Para agregar un artículo, añade un objeto a la lista. "body" admite bloques:
 * { h: 'Subtítulo' }, { p: 'Párrafo' }, { list: ['a', 'b'] }, { table: [['Col', 'Col'], ['v', 'v']] }, { note: 'Aviso' }
 */
export type Block = { h?: string; p?: string; list?: string[]; table?: string[][]; note?: string };
export type Resource = { slug: string; title: string; description: string; tag: string; minutes: number; updated: string; body: Block[] };

export const resources: Resource[] = [
  {
    slug: 'como-leer-factura-air-e-afinia-cuantos-paneles',
    title: '¿Cómo leer tu factura de energía de Air-e o Afinia para saber cuántos paneles necesitas?',
    description: 'Aprende a identificar tu consumo en kWh y el valor del kilovatio en la factura para estimar el tamaño de tu sistema solar en la región Caribe.',
    tag: 'Guía práctica',
    minutes: 5,
    updated: 'Septiembre de 2026',
    body: [
      { p: 'Antes de cotizar un sistema solar necesitas dos datos que ya están en tu factura de energía: cuánta energía consumes y cuánto pagas por cada kilovatio hora (kWh). Con ellos puedes estimar cuántos paneles necesitas.' },
      { h: '1. Encuentra tu consumo mensual en kWh' },
      { p: 'En la factura busca el apartado de consumo, normalmente junto a la lectura del medidor. Allí aparece la energía consumida en el periodo, expresada en kWh.' },
      { list: [
        'Revisa también el historial de consumo de los últimos meses (suele aparecer como una gráfica de barras).',
        'Calcula el promedio de esos meses: así evitas dimensionar el sistema con un mes atípico.',
        'Si tienes varias facturas, suma los consumos y divide entre el número de meses.',
      ] },
      { h: '2. Identifica el valor del kWh' },
      { p: 'La factura muestra el costo unitario de la energía (valor por kWh). En hogares puede variar según el estrato por subsidios o contribuciones; en comercios suele incluir una contribución adicional.' },
      { h: '3. Estima el tamaño del sistema' },
      { p: 'Una fórmula de referencia es: potencia (kWp) = consumo mensual ÷ (horas de sol pico × 30 días × 0,8). En la región Caribe se suelen considerar entre 4,5 y 5,5 horas de sol pico al día.' },
      { table: [
        ['Consumo mensual', 'Sistema aproximado', 'Paneles de 550 W'],
        ['200 kWh', '1,7 kWp', '3 paneles'],
        ['400 kWh', '3,3 kWp', '6 paneles'],
        ['800 kWh', '6,7 kWp', '13 paneles'],
        ['1.500 kWh', '12,5 kWp', '23 paneles'],
      ] },
      { note: 'Estos valores son una referencia con 5 horas de sol pico. El tamaño final depende de la orientación del techo, las sombras, el espacio disponible y tus objetivos de ahorro. Usa nuestra calculadora o solicita un estudio personalizado.' },
    ],
  },
  {
    slug: 'guia-beneficios-ley-1715-empresas',
    title: 'Guía para aplicar a los beneficios de la Ley 1715 en tu empresa',
    description: 'Qué incentivos tributarios existen para proyectos de energía solar en Colombia, quién puede acceder y cuáles son los pasos generales.',
    tag: 'Beneficios tributarios',
    minutes: 6,
    updated: 'Septiembre de 2026',
    body: [
      { p: 'La Ley 1715 de 2014, modificada por la Ley 2099 de 2021, establece incentivos para quienes invierten en fuentes no convencionales de energía como la solar. Bien aprovechados, reducen de forma importante el costo real del proyecto.' },
      { h: 'Incentivos disponibles' },
      { list: [
        'Deducción en el impuesto de renta de hasta el 50 % del valor de la inversión, que puede tomarse en un periodo de hasta 15 años.',
        'Exclusión de IVA en la compra de equipos, elementos y servicios destinados al proyecto.',
        'Exención de aranceles en la importación de maquinaria y equipos.',
        'Depreciación acelerada de los activos del proyecto.',
      ] },
      { h: '¿Quién puede acceder?' },
      { p: 'Personas jurídicas y personas naturales declarantes del impuesto de renta que realicen inversiones en proyectos de energía renovable, según los requisitos vigentes.' },
      { h: 'Pasos generales' },
      { list: [
        'Definir el proyecto con su ingeniería, presupuesto y lista de equipos.',
        'Solicitar ante la UPME la evaluación y certificación del proyecto para acceder a los incentivos.',
        'Con la certificación, aplicar la exclusión de IVA con los proveedores y la exención arancelaria en la importación, según corresponda.',
        'Incluir la deducción y la depreciación en la declaración de renta, con el acompañamiento de tu contador.',
      ] },
      { note: 'Esta guía es informativa y no reemplaza la asesoría tributaria. Los requisitos y procedimientos pueden cambiar; verifica siempre la normativa vigente con la UPME, la DIAN y tu contador.' },
    ],
  },
  {
    slug: 'diferencias-on-grid-off-grid-colombia',
    title: 'Diferencias entre sistemas solares On-Grid y Off-Grid en Colombia',
    description: 'Compara los sistemas conectados a la red, aislados con baterías e híbridos: cómo funcionan, cuándo conviene cada uno y sus costos relativos.',
    tag: 'Tecnología',
    minutes: 4,
    updated: 'Septiembre de 2026',
    body: [
      { p: 'No todos los sistemas solares son iguales. La elección depende de si tienes acceso a la red eléctrica, de la continuidad del servicio en tu zona y de si necesitas energía durante la noche o los cortes.' },
      { table: [
        ['', 'On-Grid', 'Off-Grid', 'Híbrido'],
        ['Conexión a la red', 'Sí', 'No', 'Sí'],
        ['Baterías', 'No', 'Sí', 'Sí'],
        ['Energía en cortes', 'No', 'Sí', 'Sí'],
        ['Excedentes a la red', 'Sí (CREG 174)', 'No', 'Sí'],
        ['Inversión relativa', 'Menor', 'Mayor', 'Media-alta'],
        ['Ideal para', 'Hogares y empresas urbanas', 'Fincas y zonas sin red', 'Zonas con cortes frecuentes'],
      ] },
      { h: 'On-Grid: conectado a la red' },
      { p: 'Genera energía durante el día y la consume en tu inmueble; lo que no uses puede entregarse a la red bajo la Resolución CREG 174 de 2021. Es la opción de menor inversión y mayor retorno cuando hay buen servicio eléctrico.' },
      { h: 'Off-Grid: aislado con baterías' },
      { p: 'Almacena la energía en baterías para usarla de noche. Es la solución para fincas, veredas y zonas no interconectadas donde no llega la red.' },
      { h: 'Híbrido: lo mejor de ambos' },
      { p: 'Está conectado a la red y además tiene baterías de respaldo. Es ideal donde hay cortes frecuentes y se necesita continuidad del servicio.' },
      { note: '¿No sabes cuál te conviene? Usa la calculadora de la página principal o escríbenos para un diagnóstico de tu proyecto.' },
    ],
  },
];

export const getResource = (slug: string) => resources.find((r) => r.slug === slug);
