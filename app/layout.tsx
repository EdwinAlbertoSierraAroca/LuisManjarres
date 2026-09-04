import './globals.css';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { WhatsAppFloat } from './components/whatsapp-contact';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://solarstudio.com'),
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
    url: 'https://solarstudio.com',
    siteName: 'Solar Studio',
    locale: 'es_ES',
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
    <html lang="es">
      <body className={manrope.variable}>
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
