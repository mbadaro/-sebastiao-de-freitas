/**
 * Montagem do texto dos capítulos (US1): encaixa os blocos de divergência (FR-009) no HTML gerado
 * pelo plugin remark-fonte e prepara a lista "Referências deste capítulo" (US1-2).
 * Tudo acontece na geração do site; nada depende de JavaScript no navegador.
 */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { semQuebraDom } from '../plugins/remark-fonte';

export interface Citacao {
  n: number;
  natureza: string;
  refs: string[];
  p?: string;
  paginas?: (string | undefined)[];
}

const rotulos: Record<string, string> = {
  fato: 'Fato documentado',
  historiografia: 'Informação historiográfica',
  tradicao: 'Tradição genealógica',
  hipotese: 'Hipótese',
};

export function escapar(s: string): string {
  return semQuebraDom(s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'));
}

/** Converte o itálico em Markdown (*título*) da referência ABNT em <cite>. */
export function abntHtml(abnt: string): string {
  return escapar(abnt).replace(/\*([^*]+)\*/g, '<cite>$1</cite>');
}

/** Localizador da citação: "p. 65", ou "fl. 316" quando a fonte é numerada por folhas. */
export function localizador(p: string | number): string {
  const t = String(p).trim();
  return /^(fl|fls|f)\.?\s/i.test(t) ? escapar(t) : `p. ${escapar(t)}`;
}

/** Referência ABNT com a página citada: "..., 2005, p. 65." (sem ponto duplicado). */
export function abntComPagina(abnt: string, p?: string | number): string {
  const html = abntHtml(abnt);
  return p === undefined || p === '' ? html : `${html.replace(/\.\s*$/, '')}, ${localizador(p)}.`;
}

export async function capitulosOrdenados() {
  return (await getCollection('capitulos')).sort((a, b) => a.data.ordem - b.data.ordem);
}

export async function htmlDivergencia(id: string): Promise<string> {
  const div = await getEntry('divergencias', id);
  if (!div) throw new Error(`divergência "${id}" não existe`);
  const versoes = await Promise.all(
    div.data.versoes.map(async (v) => {
      const fontes = await Promise.all(
        v.referencias.map(async (c) => {
          const ref = await getEntry(c.ref);
          return ref ? `<span class="divergencia__ref">${abntComPagina(ref.data.abnt, c.p)}</span>` : '';
        }),
      );
      return `<li class="divergencia__versao"><p>${escapar(v.texto)}</p><p class="divergencia__fonte">${fontes.length > 1 ? 'Fontes' : 'Fonte'}: ${fontes.join(' ')}</p></li>`;
    }),
  );
  const obs = div.data.observacao ? `<p class="divergencia__obs">${escapar(div.data.observacao)}</p>` : '';
  return (
    `<details class="divergencia" id="divergencia-${escapar(id)}">` +
    `<summary>As fontes divergem: <span class="divergencia__tema">${escapar(div.data.tema.toLowerCase())}</span></summary>` +
    `<ol class="divergencia__versoes">${versoes.join('')}</ol>${obs}</details>`
  );
}

/** HTML final do capítulo e lista de citações com as referências completas. */
export async function montarCapitulo(entrada: CollectionEntry<'capitulos'> | CollectionEntry<'paginas'>) {
  let html = entrada.rendered?.html ?? '';
  const fm = (entrada.rendered?.metadata?.frontmatter ?? {}) as { citacoes?: Citacao[]; divergencias?: string[] };

  for (const id of fm.divergencias ?? []) {
    const marcador = `<div class="divergencia-ancora" data-divergencia="${escapar(id)}"></div>`;
    html = html.replace(marcador, await htmlDivergencia(id));
  }

  // Notas: referência completa na 1.ª ocorrência do capítulo; forma curta (campo "curta") nas seguintes.
  const jaCitadas = new Set<string>();
  const citacoes = [];
  for (const c of fm.citacoes ?? []) {
    const refs = await Promise.all(c.refs.map((id) => getEntry('referencias', id)));
    citacoes.push({
      ...c,
      rotulo: rotulos[c.natureza],
      fontes: refs.map((r, i) => {
        if (!r) throw new Error(`capítulo ${entrada.id}: referência "${c.refs[i]}" não existe`);
        const pagina = c.paginas?.[i] ?? c.p;
        const repetida = jaCitadas.has(r.id) && r.data.curta;
        jaCitadas.add(r.id);
        const html = repetida
          ? `${escapar(r.data.curta!)}${pagina ? `, ${localizador(pagina)}` : ''}.`
          : abntComPagina(r.data.abnt, pagina);
        return { id: r.id, html, tipo: r.data.tipo, url: repetida ? undefined : r.data.url };
      }),
    });
  }
  return { html, citacoes };
}
