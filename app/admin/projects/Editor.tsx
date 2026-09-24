'use client';
import { useEffect, useState } from 'react';
export default function Editor({ initial, projectId }: any) {
  const [cats, setCats] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [f, setF] = useState(initial ?? { title: '', categoryId: '', subcategory: 'Casa', location: '', year: 2026, powerKwp: 0, solutionType: 'Autoconsumo', description: '', coverImage: '', images: [], tagIds: [], featured: false, active: true });
  const [msg, setMsg] = useState('');
  const set = (k: string, v: any) => setF((s: any) => ({ ...s, [k]: v }));
  useEffect(() => {
    fetch('/api/admin/projects')
      .then(async (r) => {
        const t = await r.text();
        if (!t) return { categories: [], tags: [] };
        try { return JSON.parse(t); } catch { return { categories: [], tags: [] }; }
      })
      .then(d => { setCats(d.categories ?? []); setTags(d.tags ?? []); if (!initial && d.categories?.[0]) set('categoryId', d.categories[0].id); })
      .catch(() => {});
  }, []);
  const [uploading, setUploading] = useState(false);
  const [sessionUploads, setSessionUploads] = useState<string[]>([]);
  async function up(files: FileList | null) {
    if (!files?.length) return;
    const list = Array.from(files).slice(0, 20);
    setUploading(true);
    const uploaded: string[] = [];
    try {
      for (let i = 0; i < list.length; i++) {
        setMsg(`Subiendo foto ${i + 1} de ${list.length}...`);
        const file = await compressImage(list[i]);
        const fd = new FormData();
        fd.append('files', file);
        const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
        const t = await r.text();
        let d: any = {};
        try { d = t ? JSON.parse(t) : {}; } catch { d = {}; }
        if (!r.ok) {
          setMsg((d.error || ('Error al subir (HTTP ' + r.status + ')')) + (uploaded.length ? ` Se subieron ${uploaded.length} de ${list.length}.` : ''));
          break;
        }
        uploaded.push(...(d.urls ?? []));
      }
      if (uploaded.length) {
        const ni = uploaded.map((url: string, k: number) => ({ id: 'img' + Date.now() + k, url, caption: '' }));
        setSessionUploads((s) => [...s, ...uploaded]);
        setF((s: any) => ({ ...s, images: [...s.images, ...ni].slice(0, 30), coverImage: s.coverImage || ni[0]?.url }));
        setMsg((m) => (m.startsWith('Subiendo') ? `${uploaded.length} foto(s) subida(s). Recuerda guardar el proyecto.` : m));
      }
    } catch (err: any) {
      setMsg('Error de red al subir: ' + (err?.message ?? err));
    } finally {
      setUploading(false);
    }
  }
  function removeImage(id: string) {
    const img = f.images.find((x: any) => x.id === id);
    setF((s: any) => {
      const images = s.images.filter((x: any) => x.id !== id);
      const coverImage = s.coverImage === img?.url ? (images[0]?.url ?? '') : s.coverImage;
      return { ...s, images, coverImage };
    });
    // Si la foto se subió en esta sesión y aún no está guardada, se borra de una vez del almacenamiento.
    if (img && sessionUploads.includes(img.url)) {
      fetch('/api/admin/upload', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: img.url }) }).catch(() => {});
      setSessionUploads((s) => s.filter((u) => u !== img.url));
    }
  }
  function moveImage(id: string, dir: -1 | 1) {
    setF((s: any) => {
      const images = [...s.images];
      const k = images.findIndex((x: any) => x.id === id);
      const n = k + dir;
      if (k < 0 || n < 0 || n >= images.length) return s;
      [images[k], images[n]] = [images[n], images[k]];
      return { ...s, images };
    });
  }
  function setCaption(id: string, caption: string) {
    setF((s: any) => ({ ...s, images: s.images.map((x: any) => (x.id === id ? { ...x, caption } : x)) }));
  }
  async function save(e: any) {
    e.preventDefault();
    setMsg('Guardando...');
    try {
      const url = projectId ? '/api/admin/projects/' + projectId : '/api/admin/projects';
      const r = await fetch(url, { method: projectId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
      const t = await r.text();
      let d: any = {};
      try { d = t ? JSON.parse(t) : {}; } catch { d = {}; }
      if (!r.ok) { setMsg(d.error || ('No se pudo guardar (HTTP ' + r.status + '). Revisa título, categoría e imagen principal.')); return; }
      if (!d.project && !projectId) {
        // El proyecto puede haberse guardado aunque la respuesta venga vacía (proxy/dev). Verificar lista.
        try {
          const chk = await fetch('/api/admin/projects').then(x => x.text()).then(x => (x ? JSON.parse(x) : {}));
          const found = (chk.projects ?? []).find((p: any) => p.title === f.title);
          if (found) { location.href = '/admin/projects'; return; }
        } catch {}
        setMsg('Respuesta vacía del servidor. Revisa la lista de proyectos: es posible que sí se haya guardado.');
        return;
      }
      location.href = '/admin/projects';
    } catch (err: any) {
      setMsg('Error de red al guardar: ' + (err?.message ?? err));
    }
  }
  return (
    <form onSubmit={save} style={{ display: 'grid', gap: 12, background: '#fff', color: '#0f172a', borderRadius: 16, padding: 20 }}>
      <label style={L}>Nombre del proyecto<input value={f.title} onChange={e => set('title', e.target.value)} required style={I} placeholder="Casa El Prado" /></label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <label style={L}>Categoría<select value={f.categoryId} onChange={e => set('categoryId', e.target.value)} required style={I}><option value="">Seleccionar</option>{cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
        <label style={L}>Subcategoría<input value={f.subcategory} onChange={e => set('subcategory', e.target.value)} style={I} /></label>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <label style={L}>Ubicación<input value={f.location} onChange={e => set('location', e.target.value)} style={I} placeholder="Barranquilla, Atlántico" /></label>
        <label style={L}>Solución<select value={f.solutionType} onChange={e => set('solutionType', e.target.value)} style={I}>{['Autoconsumo', 'Híbrido', 'On-Grid', 'Off-Grid', 'Gran escala'].map(o => <option key={o}>{o}</option>)}</select></label>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <label style={L}>Potencia kWp<input type="number" step="0.1" value={f.powerKwp} onChange={e => set('powerKwp', Number(e.target.value))} style={I} /></label>
        <label style={L}>Año<input type="number" value={f.year} onChange={e => set('year', Number(e.target.value))} style={I} /></label>
      </div>
      <label style={L}>Descripción<textarea value={f.description} onChange={e => set('description', e.target.value)} rows={3} style={I} /></label>
      <label style={L}>Imagen principal<input value={f.coverImage} onChange={e => set('coverImage', e.target.value)} style={I} placeholder="https://... o sube abajo" /></label>
      {f.coverImage ? <img src={f.coverImage} alt="" style={{ maxHeight: 180, objectFit: 'cover', borderRadius: 10 }} /> : null}
      <div><b style={{ fontSize: 13 }}>Galería ({f.images.length}/30)</b><br />
        <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple disabled={uploading} onChange={e => { up(e.target.files); e.target.value = ''; }} />
        <p style={{ fontSize: 11, color: '#64748b', margin: '4px 0 0' }}>Las fotos se optimizan automáticamente antes de subirlas. Los cambios se aplican al guardar el proyecto.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 10, marginTop: 8 }}>
          {f.images.map((im: any, k: number) => (
            <div key={im.id} style={{ border: f.coverImage === im.url ? '2px solid #0f766e' : '1px solid #e2e8f0', borderRadius: 10, padding: 6 }}>
              <img src={im.url} alt={im.caption || ''} style={{ width: '100%', height: 90, objectFit: 'cover', borderRadius: 8 }} />
              <input value={im.caption ?? ''} onChange={e => setCaption(im.id, e.target.value)} placeholder="Descripción (opcional)" maxLength={140} style={{ ...I, fontSize: 11, padding: 4 }} />
              <div style={{ display: 'flex', gap: 4, marginTop: 4, flexWrap: 'wrap' }}>
                <button type="button" onClick={() => set('coverImage', im.url)} style={B} disabled={f.coverImage === im.url}>{f.coverImage === im.url ? 'Portada ✓' : 'Portada'}</button>
                <button type="button" onClick={() => moveImage(im.id, -1)} style={B} disabled={k === 0} aria-label="Mover a la izquierda">←</button>
                <button type="button" onClick={() => moveImage(im.id, 1)} style={B} disabled={k === f.images.length - 1} aria-label="Mover a la derecha">→</button>
                <button type="button" onClick={() => removeImage(im.id)} style={{ ...B, background: '#fee2e2', color: '#b91c1c' }} aria-label="Quitar foto">Quitar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div><b style={{ fontSize: 13 }}>Etiquetas</b><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>{tags.map(t => <button type="button" key={t.id} onClick={() => set('tagIds', f.tagIds.includes(t.id) ? f.tagIds.filter((x: string) => x !== t.id) : [...f.tagIds, t.id])} style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, background: f.tagIds.includes(t.id) ? '#0f766e' : '#eee', color: f.tagIds.includes(t.id) ? '#fff' : '#000' }}>{t.name}</button>)}</div></div>
      <div style={{ display: 'flex', gap: 14, fontSize: 13 }}><label><input type="checkbox" checked={f.featured} onChange={e => set('featured', e.target.checked)} /> Destacado</label><label><input type="checkbox" checked={f.active} onChange={e => set('active', e.target.checked)} /> Visible</label></div>
      {msg ? <p style={{ color: /error|no se|supera|no permitido|conecta/i.test(msg) ? '#b91c1c' : '#0f766e', fontSize: 13 }}>{msg}</p> : null}
      <button disabled={uploading} style={{ padding: 12, borderRadius: 10, background: uploading ? '#94a3b8' : '#0f766e', color: '#fff', fontWeight: 800 }}>{uploading ? 'Subiendo fotos...' : 'Guardar proyecto'}</button>
    </form>
  );
}
const L: any = { fontSize: 13, fontWeight: 800 };
const I: any = { display: 'block', width: '100%', marginTop: 4, border: '1px solid #ddd', borderRadius: 8, padding: 8 };
const B: any = { fontSize: 11, background: '#eee', borderRadius: 6, padding: '2px 6px' };

/** Reduce la foto a máx. 2000 px y la recomprime (JPEG/WebP) para subir rápido y bajo el límite de Vercel. */
async function compressImage(file: File, maxSide = 2000, quality = 0.85): Promise<File> {
  if (!file.type.startsWith('image/') || file.type === 'image/avif') return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size < 1.5 * 1024 * 1024) { bitmap.close(); return file; }
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext('2d');
    if (!ctx) { bitmap.close(); return file; }
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const type = file.type === 'image/png' ? 'image/webp' : 'image/jpeg';
    const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, type, quality));
    if (!blob || blob.size >= file.size) return file;
    const name = file.name.replace(/\.[^.]+$/, '') + (type === 'image/webp' ? '.webp' : '.jpg');
    return new File([blob], name, { type });
  } catch {
    return file;
  }
}
