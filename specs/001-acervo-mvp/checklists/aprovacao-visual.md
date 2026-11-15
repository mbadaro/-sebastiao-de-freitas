# Aprovação Visual — Página Inicial (T036–T038)

**Data da verificação técnica**: 2026-11-15
**Página**: `/` (página inicial, prévia com conteúdo provisório)

## Verificação técnica (T036)

| Critério | Meta | Resultado |
|---|---|---|
| axe (WCAG 2.2 AA, incl. contraste) | sem falhas | ✅ sem falhas |
| Sem rolagem horizontal | 360, 768 e 1280 px | ✅ |
| Título, descrição, canônica, `lang="pt-BR"` | presentes | ✅ |
| Requisições a domínios externos | nenhuma | ✅ nenhuma |
| Lighthouse Desempenho (celular) | ≥ 90 | ✅ 95 (1ª execução, a frio: 70 por ruído de inicialização do navegador) |
| Lighthouse Acessibilidade | 100 | ✅ 100 |
| Lighthouse SEO | ≥ 95 | ✅ 100 |
| Lighthouse Boas práticas | — | 100 |
| LCP | ≤ 2,5 s | ✅ 1,6 s |
| CLS | ≤ 0,1 | ✅ 0 |
| Peso total da página | — | 108 KB |
| Fontes | ≤ 4 arquivos, ≤ 150 KB | ✅ 3 arquivos, ~96 KB |
| Movimento reduzido | nenhuma animação | ✅ |
| Navegação por teclado (menu, links, botões) | operável | ✅ verificada no código; conferir na revisão |
| Leitor de tela (NVDA) | conteúdo anunciado corretamente | ⏳ pendente — revisão manual |

## Ajustes feitos durante a verificação

- Animações de entrada não começam com atraso quando o movimento reduzido está ativo.
- Nota de fonte do quadro "Raízes sefarditas" passou para marfim (o azul acinzentado ficava com
  contraste 3,97 sobre aquele fundo).
- Bordas do mapa da abertura esmaecidas; rótulos do mapa de lugares ampliados para o celular.

## Revisão do responsável (T038)

- [ ] Paleta e aplicação das superfícies claras e escuras
- [ ] Tipografia, hierarquia e espaçamentos
- [ ] Composição das cinco seções
- [ ] Mapa da abertura e mapa de lugares
- [ ] Componentes (selos de natureza, cartões de documento, botões, navegação)
- [ ] Experiência no celular
- [ ] Coerência com a proposta "Museu Digital Imersivo"

**Decisão**: _aguardando_

**Ajustes pedidos**: _aguardando_
