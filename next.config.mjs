/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';

const cspValue = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https://images.unsplash.com https://*.public.blob.vercel-storage.com",
  "font-src 'self' https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Next.js uses inline bootstrap scripts to hydrate the App Router in production.
  isDev ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'" : "script-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
  "upgrade-insecure-requests",
].join('; ');

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // El dominio de Vercel redirige al dominio oficial (evita contenido duplicado en Google).
      { source: '/:path*', has: [{ type: 'host', value: 'luis-manjarres.vercel.app' }], destination: 'https://www.prosoinpen.com/:path*', permanent: true },
    ];
  },
  async headers() {
    // En desarrollo (localhost) NO enviar headers de seguridad HTTPS
    // porque HSTS + upgrade-insecure-requests rompen http://localhost:3000
    // Páginas internas y de demostración: nunca se indexan en Google.
    const noindex = ['/admin', '/admin/:path*', '/dashboard', '/analytics', '/brand-studio', '/clientes', '/cotizaciones', '/leads', '/empresa', '/servicios', '/api/:path*'].map((source) => ({
      source,
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
    }));
    if (isDev) {
      return noindex;
    }
    return [
      ...noindex,
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
          { key: 'Origin-Agent-Cluster', value: '?1' },
          { key: 'Content-Security-Policy', value: cspValue },
        ],
      },
    ];
  },
};

export default nextConfig;
