import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// Páginas internas o de demostración que no deben aparecer en Google.
const PRIVATE_PATHS = ['/admin', '/dashboard', '/analytics', '/brand-studio', '/clientes', '/cotizaciones', '/leads', '/empresa', '/servicios'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/projects'],
        // /api/projects queda permitido: Google lo necesita para ver la galería y el slider.
        disallow: [...PRIVATE_PATHS, '/api/admin', '/api/contact', '/api/brochure'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
