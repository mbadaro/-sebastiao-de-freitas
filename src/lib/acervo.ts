/**
 * Ligações entre os conteúdos do acervo (T043): forma curta das fontes, acontecimentos por lugar
 * e por pessoa, e "onde é usada" cada referência. Tudo calculado no build.
 */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { escapar, localizador } from './capitulo';
import { chaveData } from './datas';
import { url } from './url';

type Cit = { ref: { id: string }; p?: string | number };

/** Fonte em forma curta ("SILVA LEME, 1905, v. 7, p. 169"), com link para a página de fontes. */
export async function fontesCurtas(citacoes: Cit[]) {
  return Promise.all(
    citacoes.map(async (c) => {
      const r = await getEntry('referencias', c.ref.id);
      if (!r) throw new Error(`referência "${c.ref.id}" não existe`);
      const nome = r.data.curta ?? r.data.abnt.replace(/\*/g, '');
      const html = `${escapar(nome.replace(/\.\s*$/, ''))}${c.p !== undefined && c.p !== '' ? `, ${localizador(c.p)}` : ''}`;
      return { id: r.id, html, href: url(`fontes/#${r.id}`) };
    }),
  );
}

export async function acontecimentosOrdenados() {
  const todos = await getCollection('acontecimentos');
  return todos.sort((a, b) => chaveData(a.data.data) - chaveData(b.data.data));
}

export async function acontecimentosDoLugar(id: string) {
  return (await acontecimentosOrdenados()).filter((a) => a.data.lugares.some((l) => l.id === id));
}

export async function acontecimentosDaPessoa(id: string) {
  return (await acontecimentosOrdenados()).filter((a) => a.data.pessoas.some((p) => p.id === id));
}

export interface Uso {
  rotulo: string;
  href: string;
}

/** Para cada referência, a lista de páginas que a citam (página de fontes, US6). */
export async function usosDasReferencias(): Promise<Map<string, Uso[]>> {
  const usos = new Map<string, Uso[]>();
  const add = (id: string, uso: Uso) => {
    const lista = usos.get(id) ?? [];
    if (!lista.some((u) => u.href === uso.href)) lista.push(uso);
    usos.set(id, lista);
  };
  const refsDoTexto = (e: CollectionEntry<'capitulos'> | CollectionEntry<'paginas'>) =>
    ((e.rendered?.metadata?.frontmatter as { citacoes?: { refs: string[] }[] })?.citacoes ?? []).flatMap((c) => c.refs);

  const capitulos = (await getCollection('capitulos')).sort((a, b) => a.data.ordem - b.data.ordem);
  for (const c of capitulos) {
    for (const id of refsDoTexto(c)) add(id, { rotulo: `Capítulo ${c.data.ordem}: ${c.data.titulo}`, href: url(`exposicao/${c.data.slug}/`) });
  }
  for (const p of await getCollection('paginas')) {
    if (p.id === 'inicio') continue;
    for (const id of refsDoTexto(p)) add(id, { rotulo: p.data.titulo as string, href: url(`${p.id}/`) });
  }
  for (const a of await acontecimentosOrdenados()) {
    for (const c of a.data.referencias) add(c.ref.id, { rotulo: 'Linha do tempo', href: url('linha-do-tempo/') });
  }
  for (const l of await getCollection('lugares')) {
    for (const c of l.data.referencias) add(c.ref.id, { rotulo: `Lugar: ${l.data.nome_historico}`, href: url(`lugares/${l.id}/`) });
  }
  for (const t of await getCollection('trajetos')) {
    for (const c of t.data.referencias) add(c.ref.id, { rotulo: 'Mapa', href: url('mapa/') });
  }
  for (const p of await getCollection('pessoas')) {
    const cits = [...p.data.referencias, ...(p.data.ligacao_notavel?.referencias ?? [])];
    for (const c of cits) add(c.ref.id, { rotulo: `Família: ${p.data.nome}`, href: url(`familia/${p.id}/`) });
  }
  for (const d of await getCollection('divergencias')) {
    for (const v of d.data.versoes) for (const c of v.referencias) add(c.ref.id, { rotulo: `Divergência: ${d.data.tema}`, href: url('fontes/#divergencias') });
  }
  return usos;
}

/** Rótulos por extenso da natureza (mesmos do selo). */
export const naturezas: Record<string, string> = {
  fato: 'Fato documentado',
  historiografia: 'Informação historiográfica',
  tradicao: 'Tradição genealógica',
  hipotese: 'Hipótese',
};
