# Contrato de Rotas (endereços públicos)

**Funcionalidade**: `001-acervo-mvp` | **Data**: 2026-11-13

Os endereços abaixo são a interface pública do site. Uma vez publicados, são **permanentes**
(FR-003, SC-010). Se um endereço precisar mudar, o antigo DEVE redirecionar para o novo.

Regras gerais:

- Minúsculas, sem acentos, palavras separadas por hífen, barra final.
- O trecho variável vem do `slug` ou do `id` do conteúdo (ver [conteudo.md](conteudo.md)).
- Toda página tem `<title>`, `meta description`, URL canônica, Open Graph e o dado estruturado
  indicado.

| Rota | Conteúdo | Origem dos dados | Dado estruturado (schema.org) |
|---|---|---|---|
| `/` | Apresentação de Sebastião, destaque do vínculo sefardita, acesso à exposição e às seções (FR-001, US2-3) | Página temática `inicio` + dados de capítulos | `WebSite`, `Person` (Sebastião) |
| `/exposicao/` | Sumário da exposição: todos os capítulos, acesso direto | Capítulos | `ItemList` |
| `/exposicao/<slug-capitulo>/` | Capítulo, com anterior/próximo e sumário | Capítulo | `Article`, `BreadcrumbList` |
| `/sefarditas/` | Introdução aos judeus sefarditas e cristãos-novos (FR-005) | Página temática | `Article` |
| `/linha-do-tempo/` | Linha do tempo (lista ordenada, filtro opcional) | Acontecimentos | `ItemList` |
| `/linha-do-tempo/#<id-acontecimento>` | Âncora de acontecimento | Acontecimento | — |
| `/mapa/` | Mapa (duas vistas) + lista textual de lugares e trajetos | Lugares, trajetos | `ItemList` |
| `/lugares/<id-lugar>/` | Página do lugar: nomes, acontecimentos, fontes | Lugar | `Place` |
| `/familia/` | Família de Sebastião | Pessoas | `ItemList` |
| `/familia/<id-pessoa>/` | Página da pessoa | Pessoa | `Person` |
| `/familia/vinculos-notaveis/` | Vínculos notáveis (FR-018a) | Pessoas `notavel` | `ItemList` |
| `/fontes/` | Todas as referências (ABNT), primárias, secundárias e informais, com "onde é usada" | Referências | `ItemList` |
| `/fontes/#<id-referencia>` | Âncora de referência | Referência | — |
| `/sobre/` | Sobre o projeto, método e legenda das naturezas | Página temática | `AboutPage` |
| `/sobre/historico-de-revisoes/` | Registro de alterações relevantes (FR-011) | Alterações | — |
| `/sitemap-index.xml` | Sitemap para buscadores | Gerado | — |
| `/robots.txt` | Instruções para robôs | Estático | — |
| `/404.html` | Página não encontrada, com links para as seções | Estático | — |

Notas:

- Divergências não têm página própria: aparecem no capítulo, no acontecimento ou na pessoa a
  que se referem, evitando duplicação.
- Acontecimentos e referências usam âncoras dentro das páginas de lista, não páginas próprias.
- Exemplos de rota: `/exposicao/chegada-ao-brasil/`, `/lugares/juqueri/`,
  `/familia/maria-pedroso/`. Os slugs definitivos saem do conteúdo.
