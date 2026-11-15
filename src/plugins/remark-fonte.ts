/**
 * Marcadores de afirmação (T042; FR-006, FR-007, FR-009; D4).
 *
 *   :fonte{nat=historiografia ref=silva-leme-v7 p=168}   → selo de natureza + chamada numerada
 *   ::divergencia{id=numero-de-filhos}                   → ponto onde o bloco de divergência entra
 *
 * Regras que interrompem a geração do site:
 * - natureza fora de fato | historiografia | tradicao | hipotese;
 * - marcador sem ref;
 * - parágrafo de capítulo (ou da página "sefarditas") sem nenhum :fonte
 *   (citação de transcrição em blockquote fica isenta).
 * A existência das referências e a regra "fato nunca com fonte informal" são conferidas na página,
 * que consulta a coleção de referências (src/pages/exposicao/[slug].astro).
 */
type No = { type: string; name?: string; attributes?: Record<string, string>; children?: No[]; value?: string; data?: Record<string, unknown> };

const naturezas = ['fato', 'historiografia', 'tradicao', 'hipotese'] as const;
const rotulos: Record<string, string> = {
  fato: 'Fato documentado',
  historiografia: 'Informação historiográfica',
  tradicao: 'Tradição genealógica',
  hipotese: 'Hipótese',
};

export interface CitacaoUsada {
  n: number;
  natureza: string;
  refs: string[];
  p?: string;
  /** Página de cada referência, quando p traz uma por fonte separadas por ";" (mesma ordem de ref). */
  paginas?: (string | undefined)[];
}

/** "d. Francisco" e "D. Francisco" nunca quebram de linha entre o "d." e o nome. */
export function semQuebraDom(texto: string): string {
  return texto.replace(/(^|[^\p{L}])([dD])\. (?=\p{Lu})/gu, '$1$2.\u00A0');
}

function exigeFonte(caminho: string): boolean {
  const c = caminho.split('\\').join('/');
  return /\/capitulos\/[^/]+\.md$/.test(c) || /\/paginas\/sefarditas\.md$/.test(c);
}

function temFonte(no: No): boolean {
  if (no.type === 'textDirective' && no.name === 'fonte') return true;
  return (no.children ?? []).some(temFonte);
}

function escapar(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

export default function remarkFonte() {
  return (arvore: No, arquivo: { path?: string; data: { astro?: { frontmatter?: Record<string, unknown> } } }) => {
    const caminho = arquivo.path ?? '';
    const nomeArquivo = caminho.split(/[\\/]/).slice(-2).join('/');
    const citacoes: CitacaoUsada[] = [];
    const divergencias: string[] = [];

    if (exigeFonte(caminho)) {
      for (const no of arvore.children ?? []) {
        if (no.type === 'paragraph' && !temFonte(no)) {
          const trecho = (no.children ?? []).map((f) => f.value ?? '').join('').slice(0, 60);
          throw new Error(`${nomeArquivo} › parágrafo sem fonte: "${trecho}…" — inclua :fonte{nat=… ref=…}`);
        }
      }
    }

    const percorrer = (no: No) => {
      const filhos = no.children ?? [];
      for (let i = 0; i < filhos.length; i++) {
        const f = filhos[i];
        if (f.type === 'textDirective' && f.name === 'fonte') {
          const { nat = '', ref = '', p } = f.attributes ?? {};
          if (!(naturezas as readonly string[]).includes(nat)) {
            throw new Error(`${nomeArquivo} › natureza inválida "${nat}" — use fato, historiografia, tradicao ou hipotese`);
          }
          if (!ref.trim()) throw new Error(`${nomeArquivo} › :fonte sem ref`);
          if (nat === 'fato' && ref.split(/\s+/).includes('sem-fonte')) {
            throw new Error(`${nomeArquivo} › informação sem fonte não pode ser "fato" (FR-007)`);
          }
          const n = citacoes.length + 1;
          const refs = ref.trim().split(/\s+/);
          const partes = p?.split(';').map((x) => x.trim());
          const paginas = refs.length > 1 && partes && partes.length === refs.length ? partes : undefined;
          citacoes.push({ n, natureza: nat, refs, p: paginas ? undefined : p, paginas });
          filhos[i] = {
            type: 'html',
            value:
              // Nota discreta no texto (revisão de 2026-11-15): só o número. A natureza aparece no
              // rótulo acessível, na dica ao passar o mouse e, por extenso, em "Notas e fontes".
              `<sup class="marcador marcador--${nat}">` +
              `<a class="marcador__chamada" href="#citacao-${n}" id="chamada-${n}" ` +
              `aria-label="Nota ${n}: ${rotulos[nat]}" title="${rotulos[nat]} — ver fonte">${n}</a>` +
              `</sup>`,
          };
          // Tipografia de nota: "texto :fonte{}." vira "texto.¹" (sem espaço, nota após a pontuação).
          const antes = filhos[i - 1];
          if (antes?.type === 'text' && antes.value) antes.value = antes.value.replace(/\s+$/, '');
          const depois = filhos[i + 1];
          const pont = depois?.type === 'text' ? /^[.,;:!?]/.exec(depois.value ?? '') : null;
          if (pont && antes?.type === 'text' && depois) {
            antes.value += pont[0];
            depois.value = (depois.value ?? '').slice(1);
          }
        } else if ((f.type === 'leafDirective' || f.type === 'containerDirective') && f.name === 'divergencia') {
          const id = f.attributes?.id ?? '';
          if (!id) throw new Error(`${nomeArquivo} › ::divergencia sem id`);
          divergencias.push(id);
          filhos[i] = { type: 'html', value: `<div class="divergencia-ancora" data-divergencia="${escapar(id)}"></div>` };
        } else if (f.type === 'textDirective' || f.type === 'leafDirective' || f.type === 'containerDirective') {
          throw new Error(`${nomeArquivo} › diretiva desconhecida "${f.name}" — use :fonte ou ::divergencia`);
        } else {
          percorrer(f);
        }
      }
    };
    percorrer(arvore);

    // Tipografia: espaço inseparável depois de "d."/"D." antes de nome próprio.
    const tipografia = (no: No) => {
      if (no.type === 'text' && no.value) no.value = semQuebraDom(no.value);
      (no.children ?? []).forEach(tipografia);
    };
    tipografia(arvore);

    arquivo.data.astro ??= {};
    arquivo.data.astro.frontmatter ??= {};
    arquivo.data.astro.frontmatter.citacoes = citacoes;
    arquivo.data.astro.frontmatter.divergencias = divergencias;
  };
}
