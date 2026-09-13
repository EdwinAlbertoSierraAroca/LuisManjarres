import { hashPassword } from './gallery-auth';
import { readDb, writeDb, uid } from './gallery-store';

let seeded = false;

export function ensureSeed() {
  if (seeded) return;
  seeded = true;
  const db = readDb();
  if (db.users.length > 0 && db.categories.length > 0) return;

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

  if (db.projects.length === 0) {
    const pick = (slug: string) => db.categories.find((c) => c.slug === slug)?.id ?? db.categories[0].id;
    const demo: Array<{ title: string; cat: string; img: string; loc: string; kwp: number }> = [
      { title: 'Casa El Prado', cat: 'residencial', loc: 'Barranquilla, Atlántico', kwp: 12.5, img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80' },
      { title: 'Finca Santa Ana', cat: 'rural-agro', loc: 'Morales, Bolívar', kwp: 25, img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80' },
      { title: 'Bodega Industrial Norte', cat: 'industrial', loc: 'Cartagena, Bolívar', kwp: 120, img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80' },
      { title: 'Estación de Carga EV', cat: 'movilidad-electrica', loc: 'Medellín, Antioquia', kwp: 30, img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80' },
    ];
    const now = new Date().toISOString();
    demo.forEach((d, i) => {
      db.projects.push({
        id: uid('prj'),
        title: d.title,
        slug: `${d.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-')}`,
        categoryId: pick(d.cat),
        subcategory: i === 0 ? 'Casa' : 'General',
        location: d.loc,
        year: 2026,
        powerKwp: d.kwp,
        solutionType: i % 2 === 0 ? 'Autoconsumo' : 'Híbrido',
        description: 'Proyecto fotovoltaico diseñado e instalado por PROSOINPEN S.A.S. con monitoreo y soporte técnico.',
        coverImage: d.img,
        images: [{ id: uid('img'), url: d.img, caption: 'Vista principal' }],
        tagIds: [],
        featured: i < 2,
        active: true,
        createdAt: now,
        updatedAt: now,
      });
    });
  }

  writeDb(db);
}
