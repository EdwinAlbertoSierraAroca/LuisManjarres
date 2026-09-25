import Link from 'next/link';
import type { Metadata } from 'next';
import { resources } from '@/lib/recursos';
import '../recursos.css';

export const metadata: Metadata = {
  title: 'Centro de recursos de energía solar',
  description: 'Guías prácticas sobre energía solar en Colombia: cómo leer tu factura, beneficios de la Ley 1715 y tipos de sistemas solares.',
};

export default function RecursosPage() {
  return (
    <div className="landing-shell rs-shell">
      <div className="landing-bg" />
      <main className="rs-wrap">
        <Link href="/" className="rs-back">← Volver al inicio</Link>
        <span className="section-badge">Centro de recursos</span>
        <h1 className="rs-h1">Aprende sobre energía solar en Colombia</h1>
        <p className="rs-lead">Guías breves y prácticas para tomar mejores decisiones antes de invertir.</p>
        <div className="rs-grid">
          {resources.map((r) => (
            <Link key={r.slug} href={`/recursos/${r.slug}`} className="rs-card">
              <span className="rs-card__tag">{r.tag} · {r.minutes} min de lectura</span>
              <h2>{r.title}</h2>
              <p>{r.description}</p>
              <span className="rs-card__link">Leer guía →</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
