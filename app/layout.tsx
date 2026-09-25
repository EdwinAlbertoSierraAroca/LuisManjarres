import './globals.css';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { WhatsAppFloat } from './components/whatsapp-contact';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

const themeInitScript =
  "try{var t=localStorage.getItem('ps-theme');if(t==='solar'||t==='marca'||t==='terracota'){document.documentElement.dataset.theme=t}}catch(e){}";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://luis-manjarres.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'PROSOINPEN S.A.S. | Ingeniería y energía fotovoltaica',
    template: '%s | PROSOINPEN S.A.S.',
  },
  description: 'Proyectos y soluciones de ingeniería, energía fotovoltaica, sistemas eléctricos, obras civiles y urbanismo.',
  applicationName: 'PROSOINPEN S.A.S.',
  keywords: ['PROSOINPEN', 'energía fotovoltaica', 'ingeniería eléctrica', 'obras civiles', 'Morales Bolívar'],
  authors: [{ name: 'PROSOINPEN S.A.S.' }],
  creator: 'PROSOINPEN S.A.S.',
  publisher: 'PROSOINPEN S.A.S.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'PROSOINPEN S.A.S.',
    description: 'Ofrecemos soluciones de ingeniería y energía fotovoltaica.',
    url: siteUrl,
    siteName: 'PROSOINPEN S.A.S.',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PROSOINPEN S.A.S.',
    description: 'Ofrecemos soluciones de ingeniería y energía fotovoltaica.',
  },
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="marca" suppressHydrationWarning>
      <head>
        {/* Aplica el tema guardado antes de pintar, para evitar parpadeo. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={manrope.variable}>
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
