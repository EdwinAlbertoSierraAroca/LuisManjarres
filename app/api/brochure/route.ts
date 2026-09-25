import { NextResponse } from 'next/server';
import { rateLimit, clientKey } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Registra la descarga del brochure corporativo como un contacto (lead) y
 * devuelve el enlace del PDF. El aviso llega al correo de la empresa vía Resend.
 */
const TO = process.env.CONTACT_TO_EMAIL || 'ing.edwinsierra@gmail.com';
const FROM = process.env.CONTACT_FROM || 'PROSOINPEN Web <onboarding@resend.dev>';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const BROCHURE_URL = '/brochure/PROSOINPEN_Brochure_2026.pdf';

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

export async function POST(req: Request) {
  const rl = rateLimit(`brochure:${clientKey(req)}`, 5, 10 * 60 * 1000);
  if (!rl.ok) return NextResponse.json({ error: 'Demasiadas solicitudes. Intenta de nuevo en unos minutos.' }, { status: 429 });

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (String(body.website ?? '').trim()) return NextResponse.json({ ok: true, url: BROCHURE_URL });

  const email = String(body.email ?? '').trim().slice(0, 160);
  const company = String(body.company ?? '').trim().slice(0, 120);
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'Escribe un correo válido.' }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const text = `Nueva descarga del brochure corporativo.\n\nCorreo: ${email}\nEmpresa: ${company || '—'}\n\nResponde a este correo para contactar al interesado.`;
    const html = `<h2 style="font-family:sans-serif">Nueva descarga del brochure</h2>
      <p style="font-family:sans-serif;font-size:14px"><b>Correo:</b> ${esc(email)}<br><b>Empresa:</b> ${esc(company || '—')}</p>
      <p style="font-family:sans-serif;font-size:12px;color:#666">Responde a este correo para contactar al interesado.</p>`;
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: FROM, to: [TO], reply_to: email, subject: `Lead: descarga de brochure — ${company || email}`, text, html }),
        cache: 'no-store',
      });
      if (!res.ok) console.error('[api/brochure] Resend respondió', res.status, await res.text().catch(() => ''));
    } catch (e) {
      console.error('[api/brochure] Error enviando aviso:', e);
    }
  }
  // La descarga no se bloquea si falla el aviso por correo.
  return NextResponse.json({ ok: true, url: BROCHURE_URL });
}
