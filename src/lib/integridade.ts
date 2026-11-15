/**
 * Integridade do acervo (T044) — regras que os esquemas sozinhos não verificam:
 * - toda ligação entre conteúdos aponta para um item existente (o reference() do Astro só confere
 *   ao consultar o item);
 * - "fato" nunca sustentado só por referência informal ou "sem-fonte" (FR-007);
 * - trajeto "documentado" exige ao menos uma referência que não seja informal (FR-015);
 * - ordem dos capítulos sem repetição.
 * É executada uma vez por geração do site, a partir da página inicial. Falha → build interrompido.
 */
import { getCollection, type CollectionKey } from 'astro:content';

type Ligacao = { collection: string; id: string };
let verificado: Promise<void> | undefined;

export function verificarIntegridade(): Promise<void> {
  verificado ??= executar();
  return verificado;
}

async function executar() {
  const nomes: CollectionKey[] = [
    'referencias', 'capitulos', 'paginas', 'acontecimentos', 'lugares',
    'trajetos', 'pessoas', 'divergencias', 'imagens', 'alteracoes',
  ];
  const colecoes = Object.fromEntries(
    await Promise.all(nomes.map(async (n) => [n, await getCollection(n)] as const)),
  ) as Record<string, { id: string; data: unknown }[]>;
  const ids = new Map(Object.entries(colecoes).map(([n, itens]) => [n, new Set(itens.map((i) => i.id))]));
  const tipoRef = new Map(colecoes.referencias.map((r) => [r.id, (r.data as { tipo: string }).tipo]));
  const erros: string[] = [];

  // Percorre os dados procurando ligações { collection, id } geradas por reference().
  const conferir = (origem: string, valor: unknown) => {
    if (Array.isArray(valor)) return valor.forEach((v) => conferir(origem, v));
    if (valor && typeof valor === 'object') {
      const v = valor as Ligacao;
      if (typeof v.collection === 'string' && typeof v.id === 'string' && Object.keys(v).length === 2) {
        if (!ids.get(v.collection)?.has(v.id)) erros.push(`${origem}: "${v.id}" não existe em ${v.collection}.yaml`);
        return;
      }
      Object.values(valor).forEach((x) => conferir(origem, x));
    }
  };

  const soInformal = (refs: { ref: Ligacao }[]) => refs.every((c) => tipoRef.get(c.ref.id) === 'informal');

  for (const [nome, itens] of Object.entries(colecoes)) {
    for (const item of itens) {
      const origem = `${nome} › ${item.id}`;
      conferir(origem, item.data);
      const d = item.data as Record<string, any>;
      if (d.natureza === 'fato' && Array.isArray(d.referencias) && soInformal(d.referencias)) {
        erros.push(`${origem}: "fato" não pode ser sustentado só por fonte informal ou sem-fonte (FR-007)`);
      }
      if (nome === 'trajetos' && d.comprovacao === 'documentado' && soInformal(d.referencias)) {
        erros.push(`${origem}: trajeto documentado exige referência que não seja informal (FR-015)`);
      }
    }
  }

  // Marcadores :fonte nos textos (registrados pelo plugin remark-fonte).
  for (const nome of ['capitulos', 'paginas'] as const) {
    for (const item of colecoes[nome] as { id: string; rendered?: { metadata?: { frontmatter?: any } } }[]) {
      const citacoes = item.rendered?.metadata?.frontmatter?.citacoes ?? [];
      for (const c of citacoes as { natureza: string; refs: string[] }[]) {
        for (const r of c.refs) if (!tipoRef.has(r)) erros.push(`${nome} › ${item.id}: referência "${r}" não existe`);
        if (c.natureza === 'fato' && c.refs.every((r) => tipoRef.get(r) === 'informal')) {
          erros.push(`${nome} › ${item.id}: "fato" sustentado só por fonte informal (FR-007)`);
        }
      }
      for (const div of (item.rendered?.metadata?.frontmatter?.divergencias ?? []) as string[]) {
        if (!ids.get('divergencias')?.has(div)) erros.push(`${nome} › ${item.id}: divergência "${div}" não existe`);
      }
    }
  }

  const ordens = colecoes.capitulos.map((c) => (c.data as { ordem: number }).ordem);
  if (new Set(ordens).size !== ordens.length) erros.push('capitulos: há capítulos com a mesma "ordem"');

  if (erros.length) throw new Error(`Acervo com problemas:\n- ${erros.join('\n- ')}`);
}
