/**
 * TESTIMONIOS REALES DE CLIENTES
 *
 * Agrega aquí solo testimonios reales y con autorización escrita del cliente.
 * Mientras la lista esté vacía, la sección de testimonios no se muestra.
 * La foto va en /public/testimonios/ (por ejemplo: /testimonios/hotel-caribe.jpg).
 * Si tienes video, sube el enlace de YouTube en "videoUrl".
 *
 * Ejemplo de estructura (NO es un testimonio real):
 * {
 *   name: 'Nombre y apellido',
 *   role: 'Gerente — Nombre de la empresa',
 *   place: 'Municipio, Departamento',
 *   photo: '/testimonios/foto.jpg',
 *   result: 'Resultado medible en una frase',
 *   quote: 'Opinión del cliente con sus palabras.',
 *   rating: 5,
 *   verified: true,
 *   videoUrl: 'https://www.youtube.com/watch?v=...',
 * }
 */
export type Testimonial = {
  name: string;
  role: string;
  place?: string;
  photo?: string;
  result: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  verified: boolean;
  videoUrl?: string;
};

export const testimonials: Testimonial[] = [];
