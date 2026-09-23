import { hashPassword } from './gallery-auth';
import { readDb, writeDb, uid } from './gallery-store';

let seeded = false;

export async function ensureSeed() {
  if (seeded) return;
  const db = await readDb();
  if (db.users.length > 0 && db.categories.length > 0) {
    seeded = true;
    return;
  }

  if (db.categories.length === 0) {
    const cats: Array<[string, string, string]> = [
      ['Residencial', 'residencial', '⌂'],
      ['Comercial', 'comercial', '◧'],
      ['Industrial', 'industrial', '⬢'],
      ['Rural & Agro', 'rural-agro', '❦'],
      ['Granjas Solares', 'granjas-solares', '☀'],
      ['Institucional', 'institucional', '▣'],
      ['Movilidad Eléctrica', 'movilidad-electrica', 'ϟ'],
    ];
    for (const [name, slug, icon] of cats) {
      db.categories.push({ id: uid('cat'), name, slug, icon, active: true });
    }
    const residencial = db.categories.find((c) => c.slug === 'residencial')!;
    db.subcategories.push(
      { id: uid('sub'), categoryId: residencial.id, name: 'Casa', slug: 'casa' },
      { id: uid('sub'), categoryId: residencial.id, name: 'Apartamento', slug: 'apartamento' },
    );
  }

  if (db.tags.length === 0) {
    for (const name of ['Autoconsumo', 'On-Grid', 'Híbrido', 'Con baterías', 'Gran escala']) {
      db.tags.push({ id: uid('tag'), name });
    }
  }

  if (db.users.length === 0) {
    const email = process.env.ADMIN_EMAIL || 'admin@prosoinpen.com';
    const password = process.env.ADMIN_PASSWORD || 'AdminSolar2026*';
    const { hash, salt } = hashPassword(password);
    const now = new Date().toISOString();
    db.users.push({
      id: uid('usr'),
      name: 'Administrador',
      email,
      passwordHash: hash,
      passwordSalt: salt,
      role: 'ADMIN',
      active: true,
      createdAt: now,
    });
  }

  // Sin proyectos de demostración: los proyectos reales se crean desde el panel admin.

  await writeDb(db);
  seeded = true;
}
