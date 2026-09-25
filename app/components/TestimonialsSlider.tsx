'use client';

import { useEffect, useState } from 'react';
import type { Testimonial } from '@/lib/testimonials';

const ROTATE_MS = 7000;

export default function TestimonialsSlider({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (items.length < 2 || paused) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % items.length), ROTATE_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, items.length]);

  if (items.length === 0) return null;
  const t = items[index];
  const initials = t.name.split(' ').map((w) => w[0]).slice(0, 2).join('');

  return (
    <div className="tst" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <article className="tst__card" key={index} aria-live="polite">
        <div className="tst__media">
          {t.photo ? <img src={t.photo} alt={`Foto de ${t.name}`} /> : <span className="tst__initials" aria-hidden="true">{initials}</span>}
        </div>
        <div className="tst__body">
          <div className="tst__stars" aria-label={`${t.rating} de 5 estrellas`}>
            {Array.from({ length: 5 }, (_, i) => <span key={i} className={i < t.rating ? 'is-on' : ''}>★</span>)}
          </div>
          <p className="tst__result">“{t.result}”</p>
          <p className="tst__quote">{t.quote}</p>
          <footer className="tst__footer">
            <div>
              <b>{t.name}</b>
              <span>{t.role}{t.place ? ` · ${t.place}` : ''}</span>
            </div>
            {t.verified ? <span className="tst__verified">✓ Cliente verificado</span> : null}
          </footer>
          {t.videoUrl ? <a className="tst__video" href={t.videoUrl} target="_blank" rel="noopener noreferrer">▶ Ver testimonio en video</a> : null}
        </div>
      </article>
      {items.length > 1 ? (
        <div className="tst__nav">
          <button type="button" aria-label="Testimonio anterior" onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}>←</button>
          <div className="tst__dots">
            {items.map((it, i) => (
              <button key={it.name + i} type="button" aria-label={`Ver testimonio de ${it.name}`} className={i === index ? 'is-active' : ''} onClick={() => setIndex(i)} />
            ))}
          </div>
          <button type="button" aria-label="Testimonio siguiente" onClick={() => setIndex((i) => (i + 1) % items.length)}>→</button>
        </div>
      ) : null}
    </div>
  );
}
