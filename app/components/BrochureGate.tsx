'use client';

import { useState } from 'react';

/** Botón "Descargar brochure" que pide el correo antes de entregar el PDF. */
export default function BrochureGate() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/brochure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: fd.get('email'), company: fd.get('company'), website: fd.get('website') }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setError(data.error || 'No pudimos procesar tu solicitud.');
        return;
      }
      setStatus('done');
      const a = document.createElement('a');
      a.href = data.url;
      a.download = 'PROSOINPEN_Brochure_Corporativo.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      setStatus('error');
      setError('Error de conexión. Intenta de nuevo.');
    }
  }

  if (!open) {
    return (
      <button type="button" className="brochure-btn" onClick={() => setOpen(true)}>
        <span aria-hidden="true">📄</span> Descargar brochure corporativo (PDF)
      </button>
    );
  }

  return (
    <div className="brochure-gate">
      {status === 'done' ? (
        <p className="brochure-gate__ok" role="status">
          ¡Listo! La descarga comenzó. Si no se abrió, <a href="/brochure/PROSOINPEN_Brochure_2026.pdf" download>haz clic aquí</a>.
        </p>
      ) : (
        <form onSubmit={submit}>
          <p className="brochure-gate__title">📄 Brochure corporativo PROSOINPEN</p>
          <p className="brochure-gate__text">Déjanos tu correo y descarga la presentación para compartirla con tu equipo o junta directiva.</p>
          <input name="email" type="email" required maxLength={160} placeholder="tu@empresa.com" autoComplete="email" aria-label="Correo electrónico" />
          <input name="company" type="text" maxLength={120} placeholder="Empresa (opcional)" autoComplete="organization" aria-label="Empresa" />
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="contact-form__trap" />
          <button type="submit" className="landing-button landing-button--primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Preparando…' : 'Descargar PDF'}
          </button>
          {status === 'error' ? <p className="brochure-gate__error" role="alert">{error}</p> : null}
          <p className="brochure-gate__legal">Usaremos tu correo solo para enviarte información de PROSOINPEN. Puedes pedir que lo eliminemos en cualquier momento.</p>
        </form>
      )}
    </div>
  );
}
