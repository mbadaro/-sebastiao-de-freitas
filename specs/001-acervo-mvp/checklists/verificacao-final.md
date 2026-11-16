# Verificação final — MVP 001-acervo-mvp

**Data**: 2026-11-15 | Roteiro: `quickstart.md`, seções 1 a 4 (T083).

## 1. Validação do conteúdo

`npm run validar`: 0 erros. Os seis casos negativos do roteiro são automáticos em
`tests/validacao/validar-conteudo.test.ts` (7 testes, todos passam): parágrafo sem fonte,
`fato` com `sem-fonte`, referência inexistente, pessoa nascida em 1950 sem óbito, imagem sem
`alt`, capítulo sem descrição — cada um interrompe a geração do site.

## 2 e 3. Build e testes automáticos

Build sem erros. `npx playwright test`: 214 testes passam (acessibilidade axe, 360/768/1280 px
sem rolagem horizontal, título/descrição/canônica, nenhuma requisição externa, fluxos das
histórias US1–US6, mapa e linha do tempo por teclado e sem JavaScript).

## 4. Cenários

| # | Cenário | Resultado | Como |
|---|---|---|---|
| 1 | Exposição do início ao último capítulo | ✅ | e2e `exposicao.spec.ts` |
| 2 | Capítulo do meio pelo endereço | ✅ | e2e |
| 3 | Da inicial à referência em ≤ 3 ações | ✅ | e2e |
| 4 | Divergência com versões e fontes | ✅ | e2e (capítulos e família) |
| 5 | Linha do tempo → capítulo e lugar | ✅ | links gerados e testados em `fontes/` (status 200) |
| 6 | Lugar do mapa pelo teclado | ✅ | e2e; o "painel" é a ficha na lista, alcançada pelo link do mapa (sem JavaScript) |
| 7 | Trajeto presumido tracejado e rotulado | ✅ | e2e |
| 8 | Sem JavaScript: listas completas | ✅ | e2e |
| 9 | Leitor de tela (NVDA) | Dispensado por ora (decisão do responsável, 2026-11-16) | axe sem violações em todas as páginas |
| 10 | Lighthouse celular: início, capítulo, mapa | ✅ | ver tabela abaixo |
| 11 | Prévia de link compartilhado | ✅ | `og:title`, `og:description`, `og:image` por seção |
| 12 | Novo acontecimento só em `conteudo/` | ✅ | acontecimento de teste em Santos apareceu na linha do tempo, no mapa e em `/lugares/santos/`; removido em seguida |
| 13 | Teste com 3 leitores | ✅ (2026-11-16) | Responsável e outros leitores revisaram o site e aprovaram; ajustes futuros conforme surgirem |

### Lighthouse (modo celular, 12.6.1, servidor local)

| Página | Desempenho | Acessibilidade | Boas práticas | SEO | LCP | CLS | JS | Fontes |
|---|---|---|---|---|---|---|---|---|
| Início | 100 | 100 | 100 | 100 | 1,5 s | 0 | 0 KB externo | 3 arquivos, 94 KB |
| Capítulo 2 | 100 | 100 | 100 | 100 | 1,5 s | 0 | 0 KB externo | 3 arquivos, 94 KB |
| Mapa | 100 | 100 | 100 | 100 | 1,5 s | 0 | 0 KB externo | 3 arquivos, 94 KB |

Metas do plano (≥ 90 / 100 / ≥ 95; LCP ≤ 2,5 s; CLS ≤ 0,1; ≤ 4 WOFF2 e ≤ 150 KB) atingidas.
O pouco JavaScript do site (menu e filtro da linha do tempo) vai embutido no HTML.
