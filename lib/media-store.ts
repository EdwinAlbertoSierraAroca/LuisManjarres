import fs from 'fs';
import path from 'path';
import { put, del } from '@vercel/blob';

/**
 * Almacenamiento de imágenes de proyectos.
 *
 * - Producción (Vercel): Vercel Blob (variable BLOB_READ_WRITE_TOKEN, se crea al
 *   conectar un Blob Store al proyecto en Vercel → Storage).
 * - Local (npm run dev): carpeta public/uploads.
 */

const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const BLOB_HOST_SUFFIX = '.public.blob.vercel-storage.com';

export function storageReady(): { ok: true } | { ok: false; error: string } {
  if (useBlob || !process.env.VERCEL) return { ok: true };
  return {
    ok: false,
    error: 'No se pueden subir fotos: conecta un Blob Store al proyecto (Vercel → Storage → Blob) y vuelve a desplegar.',
  };
}

export async function saveImage(data: Uint8Array, ext: string, contentType: string): Promise<string> {
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  if (useBlob) {
    const blob = await put(`proyectos/${name}`, Buffer.from(data), {
      access: 'public',
      contentType,
      addRandomSuffix: false,
      cacheControlMaxAge: 60 * 60 * 24 * 365,
    });
    return blob.url;
  }
  const ready = storageReady();
  if (!ready.ok) throw new Error(ready.error);
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  fs.writeFileSync(path.join(UPLOAD_DIR, name), data);
  return `/uploads/${name}`;
}

/** Solo borramos archivos que subió la app (Blob propio o /uploads/), nunca URLs externas. */
export function isManagedImage(url: string): boolean {
  if (!url) return false;
  if (url.startsWith('/uploads/')) return true;
  try {
    return new URL(url).hostname.endsWith(BLOB_HOST_SUFFIX);
  } catch {
    return false;
  }
}

export async function deleteImages(urls: string[]): Promise<void> {
  const managed = Array.from(new Set(urls.filter(isManagedImage)));
  if (managed.length === 0) return;

  const blobUrls = managed.filter((u) => !u.startsWith('/uploads/'));
  const localUrls = managed.filter((u) => u.startsWith('/uploads/'));

  if (blobUrls.length > 0 && useBlob) {
    try {
      await del(blobUrls);
    } catch (e) {
      console.error('[media-store] No se pudieron borrar imágenes de Blob:', e);
    }
  }
  for (const u of localUrls) {
    const file = path.join(UPLOAD_DIR, path.basename(u));
    try {
      if (!process.env.VERCEL && fs.existsSync(file)) fs.unlinkSync(file);
    } catch (e) {
      console.error('[media-store] No se pudo borrar', file, e);
    }
  }
}

/** Todas las URLs de imagen que usa un proyecto (portada + galería). */
export function projectImageUrls(p: { coverImage?: string; images?: Array<{ url: string }> }): string[] {
  return [p.coverImage ?? '', ...(p.images ?? []).map((i) => i.url)].filter(Boolean);
}
