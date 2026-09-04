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
    default: 'Solar Studio | Energía solar premium',
    template: '%s | Solar Studio',
  },
  description: 'Plataforma premium para energía solar, proyectos, clientes y cotizaciones.',
  applicationName: 'Solar Studio',
  keywords: ['energía solar', 'paneles solares', 'proyectos solares', 'clientes solar', 'cotizaciones'],
  authors: [{ name: 'Solar Studio' }],
  creator: 'Solar Studio',
  publisher: 'Solar Studio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Solar Studio',
    description: 'Plataforma premium para energía solar, proyectos, clientes y cotizaciones.',
    url: 'https://solarstudio.com',
    siteName: 'Solar Studio',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar Studio',
    description: 'Plataforma premium para energía solar, proyectos, clientes y cotizaciones.',
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
