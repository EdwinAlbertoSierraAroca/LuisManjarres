import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getResource, resources } from '@/lib/recursos';
import '../../recursos.css';

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = getResource(params.slug);
  if (!r) return {};
  return { title: r.title, description: r.description, openGraph: { title: r.title, description: r.description, type: 'article' } };
}

export default function RecursoPage({ params }: { params: { slug: string } }) {
  const r = getResource(params.slug);
  if (!r) notFound();
  const others = resources.filter((x) => x.slug !== r.slug);
  return (
    <div className="landing-shell rs-shell">
      <div className="landing-bg" />
      <main className="rs-wrap rs-article">
        <Link href="/recursos" className="rs-back">← Centro de recursos</Link>
        <span className="section-badge">{r.tag}</span>
        <h1 className="rs-h1">{r.title}</h1>
        <p className="rs-meta">{r.minutes} min de lectura · Actualizado: {r.updated}</p>
        <div className="rs-body">
          {r.body.map((b, i) => {
            if (b.h) return <h2 key={i}>{b.h}</h2>;
            if (b.p) return <p key={i}>{b.p}</p>;
            if (b.list) return <ul key={i}>{b.list.map((li) => <li key={li}>{li}</li>)}</ul>;
            if (b.note) return <aside key={i} className="rs-note">{b.note}</aside>;
            if (b.table) return (
              <div key={i} className="rs-table"><table>
                <thead><tr>{b.table[0].map((c, j) => <th key={j}>{c}</th>)}</tr></thead>
                <tbody>{b.table.slice(1).map((row, k) => <tr key={k}>{row.map((c, j) => (j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>))}</tr>)}</tbody>
              </table></div>
            );
            return null;
          })}
        </div>
        <div className="rs-cta">
          <div><b>¿Quieres un estudio para tu proyecto?</b><p>Calcula tu ahorro o habla con un asesor de PROSOINPEN.</p></div>
          <div className="rs-cta__actions">
            <Link href="/#calculadora" className="landing-button landing-button--ghost">Usar la calculadora</Link>
            <Link href="/#contacto" className="landing-button landing-button--primary">Solicitar asesoría</Link>
          </div>
        </div>
        <h2 className="rs-more">Otras guías</h2>
        <div className="rs-grid">
          {others.map((o) => (
            <Link key={o.slug} href={`/recursos/${o.slug}`} className="rs-card">
              <span className="rs-card__tag">{o.tag}</span>
              <h2>{o.title}</h2>
              <span className="rs-card__link">Leer guía →</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
