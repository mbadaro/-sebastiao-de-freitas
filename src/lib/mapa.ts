/**
 * Geração dos mapas (T065; D6). Projeta contornos (Natural Earth, domínio público; vista sao-vicente recortada por scripts/recortar-natural-earth.mjs), lugares e
 * trajetos em SVG durante o build. Nenhum código de mapa vai para o navegador.
 * Valida que cada lugar está dentro dos limites da vista declarada em lugares.yaml.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { geoMercator, geoPath, geoGraticule } from 'd3-geo';
import { getCollection } from 'astro:content';
import { chaveData } from './datas';

export type Vista = 'atlantico' | 'sao-vicente';

const vistas: Record<Vista, { titulo: string; dados: string; limites: [[number, number], [number, number]]; largura: number; altura: number; grade: number }> = {
  atlantico: {
    titulo: 'Portugal e Brasil',
    dados: 'land110.geojson',
    limites: [[-60, -32], [6, 46]],
    largura: 800,
    altura: 760,
    grade: 10,
  },
  'sao-vicente': {
    titulo: 'Capitania de São Vicente',
    dados: 'sao-vicente-10m.geojson',
    limites: [[-47.3, -24.25], [-45.9, -22.95]],
    largura: 800,
    altura: 740,
    grade: 0.5,
  },
};

const cacheTerra = new Map<string, unknown>();
function terra(arquivo: string) {
  if (!cacheTerra.has(arquivo)) cacheTerra.set(arquivo, JSON.parse(readFileSync(join(process.cwd(), 'dados-geo', arquivo), 'utf8')));
  return cacheTerra.get(arquivo) as { features: any[] };
}

export interface PontoMapa {
  id: string;
  n: number;
  nome: string;
  x: number;
  y: number;
  /** Posição do marcador, deslocada quando dois lugares ficam colados. */
  mx: number;
  my: number;
  raio?: number;
  precisao: string;
}
export interface TrajetoMapa {
  id: string;
  d: string;
  presumido: boolean;
  rotulo: { x: number; y: number; angulo: number };
}

export async function gerarMapa(vista: Vista) {
  const v = vistas[vista];
  const area = { type: 'Feature', properties: {}, geometry: { type: 'MultiPoint', coordinates: v.limites } } as any;
  const proj = geoMercator()
    .fitExtent([[0, 0], [v.largura, v.altura]], area)
    .clipExtent([[0, 0], [v.largura, v.altura]]);
  const caminho = geoPath(proj).digits(1);
  const feicoes = terra(v.dados).features;
  const contorno = feicoes.filter((f: any) => f.properties?.tipo !== 'rio').map((f: any) => caminho(f)).filter(Boolean).join('');
  const rios = feicoes.filter((f: any) => f.properties?.tipo === 'rio').map((f: any) => caminho(f)).filter(Boolean).join('');
  const grade = caminho(geoGraticule().step([v.grade, v.grade])()) ?? '';

  // Ordem dos números: a do primeiro acontecimento ligado ao lugar (cronologia da vida).
  const eventos = (await getCollection('acontecimentos')).filter((a) => a.data.tipo === 'trajetoria');
  const primeiro = (id: string) =>
    Math.min(...eventos.filter((a) => a.data.lugares.some((l) => l.id === id)).map((a) => chaveData(a.data.data)), Infinity);
  const lugares = (await getCollection('lugares'))
    .filter((l) => l.data.vista.includes(vista))
    .sort((a, b) => primeiro(a.id) - primeiro(b.id) || a.id.localeCompare(b.id));
  const pontos: PontoMapa[] = [];
  for (const l of lugares) {
    const [lat, lon] = l.data.coordenadas;
    const [[lo1, la1], [lo2, la2]] = v.limites;
    if (lon < lo1 || lon > lo2 || lat < la1 || lat > la2) {
      throw new Error(`lugares › ${l.id}: coordenadas fora dos limites da vista "${vista}"`);
    }
    const [x, y] = proj([lon, lat])!;
    let raio: number | undefined;
    if (l.data.raio_km) raio = Math.abs(proj([lon, lat + l.data.raio_km / 111])![1] - y);
    // Desloca o marcador se cair sobre outro (ex.: Alagoa e Silves na vista do Atlântico).
    let [mx, my] = [x, y];
    while (pontos.some((p) => Math.hypot(p.mx - mx, p.my - my) < 24)) my += 26;
    pontos.push({ id: l.id, n: pontos.length + 1, nome: l.data.nome_historico, x, y, mx, my, raio, precisao: l.data.precisao });
  }

  const trajetos: TrajetoMapa[] = [];
  for (const t of await getCollection('trajetos')) {
    const a = pontos.find((p) => p.id === t.data.de.id);
    const b = pontos.find((p) => p.id === t.data.para.id);
    if (!a || !b) continue;
    // Curva suave: ponto de controle deslocado para o lado do oceano.
    const [mx, my] = [(a.x + b.x) / 2, (a.y + b.y) / 2];
    const [dx, dy] = [b.x - a.x, b.y - a.y];
    const [cx, cy] = [mx + dy * 0.18, my - dx * 0.18];
    const angulo = (Math.atan2(dy, dx) * 180) / Math.PI;
    trajetos.push({
      id: t.id,
      d: `M${a.x.toFixed(1)},${a.y.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)}`,
      presumido: t.data.comprovacao === 'presumido',
      rotulo: { x: (mx + cx) / 2, y: (my + cy) / 2, angulo: Math.abs(angulo) > 90 ? angulo + 180 : angulo },
    });
  }

  return { titulo: v.titulo, largura: v.largura, altura: v.altura, contorno, rios, grade, pontos, trajetos };
}
