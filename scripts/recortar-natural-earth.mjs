// Recorte único do Natural Earth 1:10m para a vista "sao-vicente" (terra + rios).
// Uso: node recortar.mjs <land.geojson> <rios.geojson> <saida.geojson>
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { geoIdentity, geoStream } = require('d3-geo');
const [, , landF, riosF, saida] = process.argv;
const caixa = [[-47.8, -24.6], [-45.4, -22.6]];
const dentro = (b) => !(b[2] < caixa[0][0] || b[0] > caixa[1][0] || b[3] < caixa[0][1] || b[1] > caixa[1][1]);
const bbox = (g) => { let a=[180,90,-180,-90]; const v=(c)=>{ if (typeof c[0]==='number'){a[0]=Math.min(a[0],c[0]);a[1]=Math.min(a[1],c[1]);a[2]=Math.max(a[2],c[0]);a[3]=Math.max(a[3],c[1]);} else c.forEach(v);}; v(g.coordinates); return a; };
const r6 = (n) => Math.round(n * 1e4) / 1e4;
function recortar(geom) {
  const out = []; let anel = null, poligono = null, emPoligono = false;
  const sink = {
    polygonStart() { emPoligono = true; poligono = []; },
    polygonEnd() { if (poligono.length) out.push({ type: 'Polygon', coordinates: poligono }); emPoligono = false; },
    lineStart() { anel = []; },
    lineEnd() { if (anel.length > 1) { if (emPoligono) { anel.push(anel[0]); poligono.push(anel); } else out.push({ type: 'LineString', coordinates: anel }); } anel = null; },
    point(x, y) { anel && anel.push([r6(x), r6(y)]); },
    sphere() {},
  };
  const proj = geoIdentity().clipExtent(caixa);
  geoStream(geom, proj.stream(sink));
  return out;
}
const feats = [];
for (const [arq, tipo] of [[landF, 'terra'], [riosF, 'rio']]) {
  for (const f of JSON.parse(readFileSync(arq, 'utf8')).features) {
    if (!f.geometry || !dentro(bbox(f.geometry))) continue;
    for (const g of recortar(f.geometry)) feats.push({ type: 'Feature', properties: { tipo, nome: f.properties.name ?? null }, geometry: g });
  }
}
writeFileSync(saida, JSON.stringify({ type: 'FeatureCollection', fonte: 'Natural Earth 1:10m (domínio público), recortado para a vista sao-vicente', features: feats }));
console.log(feats.length, 'feições', feats.map(f=>f.properties.tipo+':'+f.properties.nome).join(', '));
