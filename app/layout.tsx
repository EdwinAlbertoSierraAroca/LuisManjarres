import './globals.css';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { WhatsAppFloat } from './components/whatsapp-contact';
import { OG_IMAGE, SEO_DESCRIPTION, SEO_KEYWORDS, SITE_URL, organizationJsonLd } from '@/lib/seo';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

const themeInitScript =
  "try{var t=localStorage.getItem('ps-theme');if(t==='solar'||t==='marca'||t==='terracota'){document.documentElement.dataset.theme=t}}catch(e){}";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'PROSOINPEN S.A.S. | Energía solar e ingeniería en Colombia',
    template: '%s | PROSOINPEN S.A.S.',
  },
  description: SEO_DESCRIPTION,
  applicationName: 'PROSOINPEN S.A.S.',
  keywords: SEO_KEYWORDS,
  authors: [{ name: 'PROSOINPEN S.A.S.' }],
  creator: 'PROSOINPEN S.A.S.',
  publisher: 'PROSOINPEN S.A.S.',
  category: 'Energía solar e ingeniería',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    title: 'PROSOINPEN S.A.S. | Energía solar e ingeniería en Colombia',
    description: SEO_DESCRIPTION,
    url: '/',
    siteName: 'PROSOINPEN S.A.S.',
    locale: 'es_CO',
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'PROSOINPEN S.A.S. — Energía solar e ingeniería en Colombia' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PROSOINPEN S.A.S. | Energía solar e ingeniería en Colombia',
    description: SEO_DESCRIPTION,
    images: [OG_IMAGE],
  },
  referrer: 'origin-when-cross-origin',
  formatDetection: { telephone: true, email: true },
  // Solo la portada usa este canonical; cada página define el suyo.
  alternates: { canonical: '/' },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="marca" suppressHydrationWarning>
      <head>
        {/* Aplica el tema guardado antes de pintar, para evitar parpadeo. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />
      </head>
      <body className={manrope.variable}>
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
