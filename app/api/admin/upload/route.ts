import { NextResponse } from 'next/server';
import { adminSession, unauthorized } from '../guard';
import { withApiErrors } from '@/lib/api-errors';
import { deleteImages, isManagedImage, saveImage, storageReady } from '@/lib/media-store';
import { readDb } from '@/lib/gallery-store';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
// Vercel limita el cuerpo de la petición a ~4,5 MB; el panel comprime y sube de a una foto.
const MAX_BYTES = 4 * 1024 * 1024;

async function handlePOST(req: Request) {
  const session = adminSession();
  if (!session) return unauthorized();

  const ready = storageReady();
  if (!ready.ok) return NextResponse.json({ error: ready.error }, { status: 503 });

  const form = await req.formData();
  const files = form.getAll('files').filter((f): f is File => f instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ error: 'Selecciona al menos una imagen.' }, { status: 400 });
  }
  if (files.length > 20) {
    return NextResponse.json({ error: 'Máximo 20 imágenes por carga.' }, { status: 400 });
  }

  const urls: string[] = [];
  for (const file of files) {
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json({ error: `Tipo no permitido: ${file.type || file.name}. Usa JPG, PNG, WebP o AVIF.` }, { status: 400 });
    }
    const data = new Uint8Array(await file.arrayBuffer());
    if (data.length > MAX_BYTES) {
      return NextResponse.json({ error: `${file.name} supera 4 MB.` }, { status: 413 });
    }
    const ext = (file.type.split('/')[1] || 'jpg').replace('jpeg', 'jpg');
    urls.push(await saveImage(data, ext, file.type));
  }
  return NextResponse.json({ urls });
}

/** Borra una foto recién subida que se descartó antes de guardar el proyecto. */
async function handleDELETE(req: Request) {
  const session = adminSession();
  if (!session) return unauthorized();
  const body = (await req.json().catch(() => ({}))) as { url?: unknown };
  const url = String(body.url ?? '');
  if (!isManagedImage(url)) return NextResponse.json({ error: 'URL no válida.' }, { status: 400 });

  // No borrar si algún proyecto guardado todavía la usa.
  const db = await readDb();
  const inUse = db.projects.some((p) => p.coverImage === url || p.images?.some((i) => i.url === url));
  if (!inUse) await deleteImages([url]);
  return NextResponse.json({ ok: true, deleted: !inUse });
}

export const POST = withApiErrors(handlePOST);
export const DELETE = withApiErrors(handleDELETE);
