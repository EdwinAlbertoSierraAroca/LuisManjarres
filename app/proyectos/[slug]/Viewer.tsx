'use client';
import { useState } from 'react';
export default function Viewer({ images, title }: { images: any[]; title: string }) {
  const [i, setI] = useState(0);
  if (!images?.length) return null;
  const prev = () => setI(v => (v - 1 + images.length) % images.length);
  const next = () => setI(v => (v + 1) % images.length);
  return (
    <div>
      <img src={images[i].url} alt={title} style={{ width: '100%', maxHeight: 520, objectFit: 'cover', borderRadius: 20 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
        <button onClick={prev} className="secondary-btn">← Anterior</button>
        <div style={{ display: 'flex', gap: 6 }}>{images.map((_, k) => <span key={k} onClick={() => setI(k)} style={{ width: 10, height: 10, borderRadius: 10, background: k === i ? '#0f766e' : '#cbd5e1', cursor: 'pointer' }} />)}</div>
        <button onClick={next} className="secondary-btn">Siguiente →</button>
      </div>
    </div>
  );
}
