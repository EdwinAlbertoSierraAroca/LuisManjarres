import fs from 'fs';
import path from 'path';
import type { DbShape } from './gallery-types';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

function ensureDir() {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
}

export function readDb(): DbShape {
  ensureDir();
  if (!fs.existsSync(DB_PATH)) {
    // El seed se crea en runtime vía ensureSeed() para no duplicar datos.
    const empty: DbShape = { users: [], categories: [], subcategories: [], tags: [], projects: [] };
    fs.writeFileSync(DB_PATH, JSON.stringify(empty, null, 2), 'utf8');
    return empty;
  }
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw) as DbShape;
  } catch {
    return { users: [], categories: [], subcategories: [], tags: [], projects: [] };
  }
}

export function writeDb(db: DbShape) {
  ensureDir();
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

export function uid(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 80) || `item-${Date.now()}`;
}
