import Link from 'next/link';
import type { Metadata } from 'next';
import Viewer from '../proyectos/[slug]/Viewer';
import '../recursos.css';

export const metadata: Metadata = {
  title: 'Video y brochure corporativo',
  description: 'Mira el video corporativo de PROSOINPEN S.A.S., hojea el brochure 2026 página por página y descárgalos para compartir.',
};

const BROCHURE_PDF = '/brochure/PROSOINPEN_Brochure_2026.pdf';
const VIDEO_FULL = '/media/PROSOINPEN_Video_Vertical.mp4';
const VIDEO_WEB = '/media/prosoinpen-video-web.mp4';
const VIDEO_H = '/media/PROSOINPEN_Video_Horizontal.mp4';
const VIDEO_H_WEB = '/media/prosoinpen-video-horizontal-web.mp4';

const brochurePages = [
  'Portada',
  'Quiénes somos',
  'Nuestro impacto',
  'Servicios',
  'Por qué energía solar',
  'Líneas de solución',
  'Zonas no interconectadas',
  'Proyectos y obras',
  'Cómo trabajamos',
  'Contacto',
].map((caption, i) => ({ url: `/media/brochure/p-${String(i + 1).padStart(2, '0')}.jpg`, caption: `Página ${i + 1} · ${caption}` }));

const files = [
  { name: 'Brochure corporativo 2026', detail: 'PDF · 10 páginas · 5,5 MB', href: BROCHURE_PDF, download: 'PROSOINPEN_Brochure_2026.pdf' },
  { name: 'Video horizontal 16:9 (computador, TV, YouTube)', detail: 'MP4 1920×1080 · 45 s', href: VIDEO_H, download: 'PROSOINPEN_Video_Horizontal.mp4' },
  { name: 'Video vertical 9:16 (celular, WhatsApp, redes)', detail: 'MP4 vertical 1080×1920 · 45 s · 18 MB', href: VIDEO_FULL, download: 'PROSOINPEN_Video_Corporativo.mp4' },
  { name: 'Video corporativo (versión liviana)', detail: 'MP4 vertical 540×960 · 45 s · 3 MB · ideal para WhatsApp', href: VIDEO_WEB, download: 'PROSOINPEN_Video_Corporativo_liviano.mp4' },
];

export default function MaterialPage() {
  return (
    <div className="landing-shell rs-shell">
      <div className="landing-bg" />
      <main className="rs-wrap mt-wrap">
        <Link href="/" className="rs-back">← Volver al inicio</Link>
        <span className="section-badge">Material corporativo</span>
        <h1 className="rs-h1">Video y brochure de PROSOINPEN</h1>
        <p className="rs-lead">Míralos aquí mismo o descárgalos para compartirlos con tu equipo, junta directiva o comunidad.</p>

        <nav className="mt-tabs" aria-label="Secciones del material">
          <a href="#video">🎬 Video</a>
          <a href="#brochure">📄 Brochure</a>
          <a href="#archivos">⬇️ Descargas</a>
        </nav>

        <section id="video" className="mt-block" aria-labelledby="mt-video">
          <div className="mt-video-h">
            <video controls playsInline preload="metadata" poster="/media/video-poster-h.jpg" aria-label="Video corporativo horizontal de PROSOINPEN S.A.S.">
              <source src={VIDEO_H_WEB} type="video/mp4" />
            </video>
            <div className="mt-video-h__bar">
              <span className="dl-card__tag">Video · 45 s · versión horizontal para computador y TV</span>
              <div className="dl-card__actions">
                <a className="landing-button landing-button--primary" href={VIDEO_H} download="PROSOINPEN_Video_Horizontal.mp4">Descargar horizontal</a>
                <a className="landing-button landing-button--ghost" href={VIDEO_FULL} download="PROSOINPEN_Video_Corporativo.mp4">Descargar vertical</a>
              </div>
            </div>
          </div>
          <div className="mt-video">
            <div className="mt-video__player">
              <video controls playsInline preload="metadata" poster="/media/video-poster.jpg" aria-label="Video corporativo de PROSOINPEN S.A.S.">
                <source src={VIDEO_WEB} type="video/mp4" />
                Tu navegador no puede reproducir el video. <a href={VIDEO_FULL}>Descárgalo aquí</a>.
              </video>
            </div>
            <div className="mt-video__info">
              <span className="dl-card__tag">Video · 45 s · formato vertical</span>
              <h2 id="mt-video">Video corporativo</h2>
              <p>Energía solar, ingeniería eléctrica y obra civil: nuestros proyectos y nuestro equipo en campo en menos de un minuto. Formato vertical, listo para WhatsApp, Instagram o TikTok.</p>
              <div className="dl-card__actions">
                <a className="landing-button landing-button--primary" href={VIDEO_FULL} download="PROSOINPEN_Video_Corporativo.mp4">Descargar video (18 MB)</a>
                <a className="landing-button landing-button--ghost" href={VIDEO_WEB} download="PROSOINPEN_Video_Corporativo_liviano.mp4">Versión liviana (3 MB)</a>
              </div>
            </div>
          </div>
        </section>

        <section id="brochure" className="mt-block" aria-labelledby="mt-brochure">
          <div className="mt-head">
            <div>
              <span className="dl-card__tag">PDF · 10 páginas</span>
              <h2 id="mt-brochure">Brochure corporativo 2026</h2>
              <p>Hojea el brochure página por página. Usa <b>Ampliar</b> para verlo en pantalla completa y hacer zoom.</p>
            </div>
            <div className="dl-card__actions">
              <a className="landing-button landing-button--primary" href={BROCHURE_PDF} download="PROSOINPEN_Brochure_2026.pdf">Descargar PDF (5,5 MB)</a>
              <a className="landing-button landing-button--ghost" href={BROCHURE_PDF} target="_blank" rel="noopener noreferrer">Abrir PDF ↗</a>
            </div>
          </div>
          <div className="mt-viewer">
            <Viewer images={brochurePages} title="Brochure PROSOINPEN 2026" />
          </div>
        </section>

        <section id="archivos" className="mt-block" aria-labelledby="mt-files">
          <h2 id="mt-files">Descargas</h2>
          <ul className="mt-files">
            {files.map((f) => (
              <li key={f.href}>
                <div><b>{f.name}</b><span>{f.detail}</span></div>
                <a className="landing-button landing-button--primary" href={f.href} download={f.download}>Descargar</a>
              </li>
            ))}
          </ul>
          <p className="dl-share">
            ¿Quieres compartirlos?{' '}
            <a href={`https://wa.me/?text=${encodeURIComponent('Conoce a PROSOINPEN S.A.S. — video y brochure: https://www.prosoinpen.com/material')}`} target="_blank" rel="noopener noreferrer">Enviar enlace por WhatsApp →</a>
          </p>
        </section>
      </main>
    </div>
  );
}
