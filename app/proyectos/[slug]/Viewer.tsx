'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type ViewerImage = { url: string; caption?: string };

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * Visor de fotos del proyecto.
 * - La imagen se muestra completa (object-fit: contain) sobre un fondo difuminado.
 * - Botón "Ampliar" o clic en la foto: pantalla completa con zoom (botones, rueda,
 *   doble clic, pellizco en celular) y arrastre para moverse por la imagen.
 */
export default function Viewer({ images, title }: { images: ViewerImage[]; title: string }) {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const count = images?.length ?? 0;

  const prev = useCallback(() => setI((v) => (v - 1 + count) % count), [count]);
  const next = useCallback(() => setI((v) => (v + 1) % count), [count]);

  if (!count) return null;
  const current = images[i];

  return (
    <div className="pv">
      <div className="pv-stage">
        <div className="pv-stage__backdrop" style={{ backgroundImage: `url("${current.url}")` }} aria-hidden="true" />
        <button type="button" className="pv-stage__img-btn" onClick={() => setOpen(true)} aria-label="Ampliar imagen">
          <img src={current.url} alt={current.caption || title} className="pv-stage__img" />
        </button>
        <button type="button" className="pv-zoom-btn" onClick={() => setOpen(true)}>
          <ZoomIcon /> Ampliar
        </button>
        {count > 1 ? (
          <>
            <button type="button" className="pv-arrow pv-arrow--prev" onClick={prev} aria-label="Imagen anterior">‹</button>
            <button type="button" className="pv-arrow pv-arrow--next" onClick={next} aria-label="Imagen siguiente">›</button>
          </>
        ) : null}
        <span className="pv-counter">{i + 1} / {count}</span>
      </div>

      {current.caption ? <p className="pv-caption">{current.caption}</p> : null}

      {count > 1 ? (
        <div className="pv-thumbs" role="tablist" aria-label="Fotos del proyecto">
          {images.map((img, k) => (
            <button
              key={`${img.url}-${k}`}
              type="button"
              role="tab"
              aria-selected={k === i}
              aria-label={`Ver imagen ${k + 1}`}
              className={`pv-thumb ${k === i ? 'is-active' : ''}`}
              onClick={() => setI(k)}
            >
              <img src={img.url} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      ) : null}

      {open && typeof document !== 'undefined' ? createPortal(
        <Lightbox
          images={images}
          index={i}
          title={title}
          onIndex={setI}
          onClose={() => setOpen(false)}
        />,
        document.body,
      ) : null}
    </div>
  );
}

function Lightbox({
  images,
  index,
  title,
  onIndex,
  onClose,
}: {
  images: ViewerImage[];
  index: number;
  title: string;
  onIndex: (n: number) => void;
  onClose: () => void;
}) {
  const count = images.length;
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const pinch = useRef<{ dist: number; zoom: number } | null>(null);

  const reset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const go = useCallback(
    (delta: number) => {
      onIndex((index + delta + count) % count);
      reset();
    },
    [count, index, onIndex, reset],
  );

  const setZoomSafe = useCallback((z: number) => {
    const nz = clamp(z, MIN_ZOOM, MAX_ZOOM);
    setZoom(nz);
    if (nz === 1) setPan({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === '+' || e.key === '=') setZoomSafe(zoom + 0.5);
      else if (e.key === '-') setZoomSafe(zoom - 0.5);
      else if (e.key === '0') reset();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [go, onClose, reset, setZoomSafe, zoom]);

  const current = images[index];

  const onWheel = (e: React.WheelEvent) => {
    setZoomSafe(zoom * (e.deltaY < 0 ? 1.15 : 1 / 1.15));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (zoom <= 1 || e.pointerType === 'touch') return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setPan({ x: drag.current.px + (e.clientX - drag.current.x) / zoom, y: drag.current.py + (e.clientY - drag.current.y) / zoom });
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  // Gestos táctiles: un dedo arrastra (con zoom) y dos dedos hacen pellizco.
  const touchDist = (t: React.TouchList) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      pinch.current = { dist: touchDist(e.touches), zoom };
      drag.current = null;
    } else if (e.touches.length === 1 && zoom > 1) {
      drag.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, px: pan.x, py: pan.y };
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinch.current) {
      setZoomSafe(pinch.current.zoom * (touchDist(e.touches) / pinch.current.dist));
    } else if (e.touches.length === 1 && drag.current) {
      const t = e.touches[0];
      setPan({ x: drag.current.px + (t.clientX - drag.current.x) / zoom, y: drag.current.py + (t.clientY - drag.current.y) / zoom });
    }
  };
  const onTouchEnd = () => {
    pinch.current = null;
    drag.current = null;
  };

  return (
    <div className="pv-lb" role="dialog" aria-modal="true" aria-label={`${title} — imagen ${index + 1} de ${count}`}>
      <div className="pv-lb__bar">
        <span className="pv-lb__title">{title} · {index + 1} / {count}</span>
        <div className="pv-lb__tools">
          <button type="button" onClick={() => setZoomSafe(zoom - 0.5)} disabled={zoom <= MIN_ZOOM} aria-label="Alejar">−</button>
          <span className="pv-lb__zoom">{Math.round(zoom * 100)}%</span>
          <button type="button" onClick={() => setZoomSafe(zoom + 0.5)} disabled={zoom >= MAX_ZOOM} aria-label="Acercar">+</button>
          <button type="button" onClick={reset} aria-label="Ajustar a pantalla">Ajustar</button>
          <a href={current.url} target="_blank" rel="noopener noreferrer" aria-label="Abrir original en otra pestaña">Original</a>
          <button type="button" className="pv-lb__close" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>
      </div>

      <div
        className={`pv-lb__canvas ${zoom > 1 ? 'is-zoomed' : ''}`}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onDoubleClick={() => (zoom > 1 ? reset() : setZoomSafe(2.5))}
        onClick={(e) => {
          if (e.target === e.currentTarget && zoom === 1) onClose();
        }}
      >
        <img
          src={current.url}
          alt={current.caption || title}
          draggable={false}
          className="pv-lb__img"
          style={{ transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)` }}
        />
      </div>

      {count > 1 ? (
        <>
          <button type="button" className="pv-arrow pv-arrow--prev pv-arrow--lb" onClick={() => go(-1)} aria-label="Imagen anterior">‹</button>
          <button type="button" className="pv-arrow pv-arrow--next pv-arrow--lb" onClick={() => go(1)} aria-label="Imagen siguiente">›</button>
        </>
      ) : null}

      <p className="pv-lb__hint">
        {current.caption ? <><b>{current.caption}</b> · </> : null}
        Rueda o pellizco para hacer zoom · doble clic para acercar · arrastra para moverte
      </p>
    </div>
  );
}

function ZoomIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
    </svg>
  );
}
