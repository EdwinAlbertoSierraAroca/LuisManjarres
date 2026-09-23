import { NextResponse } from 'next/server';
import { rateLimit, clientKey } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Envía la "Solicitud de información" del sitio al correo de la empresa usando Resend.
 * Variables (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY   (obligatoria)  clave de https://resend.com
 *   CONTACT_TO_EMAIL (opcional)     destino; por defecto ing.edwinsierra@gmail.com
 *   CONTACT_FROM     (opcional)     remitente; por defecto onboarding@resend.dev
 */
const TO = process.env.CONTACT_TO_EMAIL || 'ing.edwinsierra@gmail.com';
const FROM = process.env.CONTACT_FROM || 'PROSOINPEN Web <onboarding@resend.dev>';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

export async function POST(req: Request) {
  const rl = rateLimit(`contact:${clientKey(req)}`, 5, 10 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json({ error: 'Has enviado varias solicitudes seguidas. Intenta de nuevo en unos minutos.' }, { status: 429 });
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  // Campo trampa para bots: si viene lleno, respondemos OK sin enviar nada.
  if (String(body.website ?? '').trim()) return NextResponse.json({ ok: true });

  const name = String(body.name ?? '').trim().slice(0, 100);
  const email = String(body.email ?? '').trim().slice(0, 160);
  const phone = String(body.phone ?? '').trim().slice(0, 40);
  const message = String(body.message ?? '').trim().slice(0, 1200);

  if (name.length < 2) return NextResponse.json({ error: 'Escribe tu nombre.' }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'Escribe un correo válido.' }, { status: 400 });
  if (message.length < 5) return NextResponse.json({ error: 'Cuéntanos en qué podemos ayudarte.' }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'El envío de correos no está configurado.', fallback: true }, { status: 503 });
  }

  const text = [`Nombre: ${name}`, `Correo: ${email}`, `Teléfono: ${phone || '—'}`, '', message].join('\n');
  const html = `
    <h2 style="font-family:sans-serif">Nueva solicitud de información</h2>
    <table style="font-family:sans-serif;font-size:14px">
      <tr><td><b>Nombre</b></td><td>${esc(name)}</td></tr>
      <tr><td><b>Correo</b></td><td>${esc(email)}</td></tr>
      <tr><td><b>Teléfono</b></td><td>${esc(phone || '—')}</td></tr>
    </table>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-line">${esc(message)}</p>
    <p style="font-family:sans-serif;font-size:12px;color:#666">Enviado desde el formulario del sitio web. Responde a este correo para contestarle directamente.</p>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to: [TO], reply_to: email, subject: `Solicitud de información — ${name}`, text, html }),
    cache: 'no-store',
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('[api/contact] Resend respondió', res.status, detail);
    return NextResponse.json({ error: 'No pudimos enviar tu solicitud en este momento.', fallback: true }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
