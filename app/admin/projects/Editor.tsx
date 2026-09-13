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
  async function up(files: FileList | null) {
    if (!files?.length) return;
    const fd = new FormData();
    Array.from(files).slice(0, 20).forEach(x => fd.append('files', x));
    const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const t = await r.text();
    let d: any = {};
    try { d = t ? JSON.parse(t) : {}; } catch { d = {}; }
    if (!r.ok) { setMsg(d.error || ('Error al subir (HTTP ' + r.status + ')')); return; }
    const ni = (d.urls ?? []).map((url: string, i: number) => ({ id: 'img' + Date.now() + i, url, caption: 'Foto' }));
    if (!ni.length) { setMsg('El servidor no devolvió URLs. Intenta de nuevo.'); return; }
    setF((s: any) => ({ ...s, images: [...s.images, ...ni].slice(0, 30), coverImage: s.coverImage || ni[0]?.url }));
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
        <label style={L}>Categoria<select value={f.categoryId} onChange={e => set('categoryId', e.target.value)} required style={I}><option value="">Seleccionar</option>{cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
        <label style={L}>Subcategoria<input value={f.subcategory} onChange={e => set('subcategory', e.target.value)} style={I} /></label>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <label style={L}>Ubicacion<input value={f.location} onChange={e => set('location', e.target.value)} style={I} placeholder="Barranquilla, Atlantico" /></label>
        <label style={L}>Solucion<select value={f.solutionType} onChange={e => set('solutionType', e.target.value)} style={I}>{['Autoconsumo', 'Hibrido', 'On-Grid', 'Off-Grid', 'Gran escala'].map(o => <option key={o}>{o}</option>)}</select></label>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <label style={L}>Potencia kWp<input type="number" step="0.1" value={f.powerKwp} onChange={e => set('powerKwp', Number(e.target.value))} style={I} /></label>
        <label style={L}>Ano<input type="number" value={f.year} onChange={e => set('year', Number(e.target.value))} style={I} /></label>
      </div>
      <label style={L}>Descripcion<textarea value={f.description} onChange={e => set('description', e.target.value)} rows={3} style={I} /></label>
      <label style={L}>Imagen principal<input value={f.coverImage} onChange={e => set('coverImage', e.target.value)} style={I} placeholder="https://... o sube abajo" /></label>
      {f.coverImage ? <img src={f.coverImage} alt="" style={{ maxHeight: 180, objectFit: 'cover', borderRadius: 10 }} /> : null}
      <div><b style={{ fontSize: 13 }}>Galeria</b><br /><input type="file" accept="image/*" multiple onChange={e => up(e.target.files)} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginTop: 8 }}>
          {f.images.map((im: any) => <div key={im.id}><img src={im.url} alt="" style={{ width: '100%', height: 70, objectFit: 'cover', borderRadius: 8 }} /><div style={{ display: 'flex', gap: 4 }}><button type="button" onClick={() => set('coverImage', im.url)} style={B}>Portada</button><button type="button" onClick={() => set('images', f.images.filter((x: any) => x.id !== im.id))} style={B}>X</button></div></div>)}
        </div>
      </div>
      <div><b style={{ fontSize: 13 }}>Etiquetas</b><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>{tags.map(t => <button type="button" key={t.id} onClick={() => set('tagIds', f.tagIds.includes(t.id) ? f.tagIds.filter((x: string) => x !== t.id) : [...f.tagIds, t.id])} style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, background: f.tagIds.includes(t.id) ? '#0f766e' : '#eee', color: f.tagIds.includes(t.id) ? '#fff' : '#000' }}>{t.name}</button>)}</div></div>
      <div style={{ display: 'flex', gap: 14, fontSize: 13 }}><label><input type="checkbox" checked={f.featured} onChange={e => set('featured', e.target.checked)} /> Destacado</label><label><input type="checkbox" checked={f.active} onChange={e => set('active', e.target.checked)} /> Visible</label></div>
      {msg ? <p style={{ color: 'red', fontSize: 13 }}>{msg}</p> : null}
      <button style={{ padding: 12, borderRadius: 10, background: '#0f766e', color: '#fff', fontWeight: 800 }}>Guardar proyecto</button>
    </form>
  );
}
const L: any = { fontSize: 13, fontWeight: 800 };
const I: any = { display: 'block', width: '100%', marginTop: 4, border: '1px solid #ddd', borderRadius: 8, padding: 8 };
const B: any = { fontSize: 11, background: '#eee', borderRadius: 6, padding: '2px 6px' };
