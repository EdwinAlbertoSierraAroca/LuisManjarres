import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { adminSession, unauthorized } from '../guard';

const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
const MAX_BYTES = 5 * 1024 * 1024;

export async function POST(req: Request) {
  const session = adminSession();
  if (!session) return unauthorized();

  const form = await req.formData();
  const files = form.getAll('files').filter((f): f is File => f instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ error: 'Selecciona al menos una imagen.' }, { status: 400 });
  }
  if (files.length > 20) {
    return NextResponse.json({ error: 'Máximo 20 imágenes por carga.' }, { status: 400 });
  }

  const dir = path.join(process.cwd(), 'public', 'uploads');
  fs.mkdirSync(dir, { recursive: true });

  const urls: string[] = [];
  for (const file of files) {
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json({ error: `Tipo no permitido: ${file.type || file.name}. Usa JPG, PNG, WebP o AVIF.` }, { status: 400 });
    }
    const buf = Buffer.from(await file.arrayBuffer());
    if (buf.length > MAX_BYTES) {
      return NextResponse.json({ error: `${file.name} supera 5 MB.` }, { status: 400 });
    }
    const ext = (file.type.split('/')[1] || 'jpg').replace('jpeg', 'jpg');
    const safe = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    fs.writeFileSync(path.join(dir, safe), buf);
    urls.push(`/uploads/${safe}`);
  }
  return NextResponse.json({ urls });
}
