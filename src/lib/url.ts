/**
 * Monta endereços internos respeitando o prefixo do site (`base`).
 * Hoje o site roda em /sebastiao-de-freitas/; com domínio próprio, em /.
 * Uso: url('exposicao/') → '/sebastiao-de-freitas/exposicao/'
 */
export function url(caminho = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${caminho.replace(/^\//, '')}`;
}

/** Seções principais do site (rotas em specs/001-acervo-mvp/contracts/rotas.md). */
export const secoes = [
  { rotulo: 'Exposição', caminho: 'exposicao/' },
  { rotulo: 'Raízes sefarditas', caminho: 'sefarditas/' },
  { rotulo: 'Linha do tempo', caminho: 'linha-do-tempo/' },
  { rotulo: 'Mapa', caminho: 'mapa/' },
  { rotulo: 'Família', caminho: 'familia/' },
  { rotulo: 'Fontes', caminho: 'fontes/' },
] as const;
