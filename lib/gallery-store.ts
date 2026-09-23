import fs from 'fs';
import path from 'path';
import type { DbShape } from './gallery-types';

/**
 * Almacenamiento de la "base de datos" del panel.
 *
 * - Producción (Vercel): el disco es de solo lectura, así que los datos se guardan
 *   en Upstash Redis (integración de Vercel Marketplace). Se detecta con las
 *   variables KV_REST_API_URL / KV_REST_API_TOKEN (o UPSTASH_REDIS_REST_URL / _TOKEN).
 *   La primera vez se importa automáticamente el contenido de data/db.json.
 * - Local (npm run dev): si no hay Redis configurado, se usa data/db.json.
 */

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';
const REDIS_KEY = process.env.DB_REDIS_KEY || 'prosoinpen:db';
const useRedis = Boolean(REDIS_URL && REDIS_TOKEN);

const emptyDb = (): DbShape => ({ users: [], categories: [], subcategories: [], tags: [], projects: [] });

async function redis<T = unknown>(command: Array<string | number>): Promise<T> {
  const res = await fetch(REDIS_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
    cache: 'no-store',
  });
  const data = (await res.json().catch(() => ({}))) as { result?: T; error?: string };
  if (!res.ok || data.error) {
    throw new Error(`Redis respondió con error: ${data.error ?? res.status}`);
  }
  return data.result as T;
}

function readFileDb(): DbShape {
  try {
    if (!fs.existsSync(DB_PATH)) return emptyDb();
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8')) as DbShape;
  } catch {
    return emptyDb();
  }
}

function writeFileDb(db: DbShape) {
  if (process.env.VERCEL) {
    throw new Error(
      'No se puede guardar: en Vercel el disco es de solo lectura. Conecta Upstash Redis al proyecto (Vercel → Storage) y vuelve a desplegar.'
    );
  }
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const payload = JSON.stringify(db, null, 2);
  const tmp = `${DB_PATH}.tmp`;
  try {
    fs.writeFileSync(tmp, payload, 'utf8');
    try {
      fs.renameSync(tmp, DB_PATH);
    } catch {
      // Windows: si el destino está bloqueado, reintenta tras borrarlo.
      try { fs.copyFileSync(tmp, DB_PATH); fs.unlinkSync(tmp); }
      catch { fs.writeFileSync(DB_PATH, payload, 'utf8'); }
    }
  } catch (err) {
    console.error('[gallery-store] No se pudo escribir db.json:', err);
    throw new Error('No se pudo guardar la base de datos (revisa permisos de la carpeta data/).');
  }
}

export async function readDb(): Promise<DbShape> {
  if (!useRedis) return readFileDb();
  const raw = await redis<string | null>(['GET', REDIS_KEY]);
  if (raw) {
    try {
      return JSON.parse(raw) as DbShape;
    } catch {
      console.error('[gallery-store] El contenido en Redis no es JSON válido.');
      return emptyDb();
    }
  }
  // Primera vez: importar data/db.json (incluido en el despliegue) a Redis.
  const initial = readFileDb();
  await redis(['SET', REDIS_KEY, JSON.stringify(initial), 'NX']);
  return initial;
}

export async function writeDb(db: DbShape): Promise<void> {
  if (!useRedis) {
    writeFileDb(db);
    return;
  }
  await redis(['SET', REDIS_KEY, JSON.stringify(db)]);
}

export function uid(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 80) || `item-${Date.now()}`;
}
