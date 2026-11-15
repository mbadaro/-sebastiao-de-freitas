# Guia de Validação: Exposição Histórica Digital — MVP

**Funcionalidade**: `001-acervo-mvp` | **Data**: 2026-11-13

Roteiro para provar, de ponta a ponta, que o MVP atende à spec. Os comandos exatos dos scripts
serão definidos na implementação; aqui ficam os cenários e os resultados esperados.

## Pré-requisitos

- Node.js LTS e npm instalados.
- Repositório clonado.
- Dependências instaladas (`npm install`).
- Navegadores do Playwright instalados (`npx playwright install`).

## 1. Validar o conteúdo

```text
npm run validar
```

Esperado: nenhuma violação. Testes negativos (fazer e desfazer):

| Ação | Resultado esperado |
|---|---|
| Remover o marcador `:fonte` de um parágrafo de capítulo | Falha: parágrafo sem fonte |
| Usar `nat=fato` com `ref=sem-fonte` | Falha: origem desconhecida como fato (FR-007) |
| Citar referência inexistente | Falha: referência não existe |
| Criar pessoa nascida em 1950 sem óbito | Falha: regra dos 100 anos (FR-019, SC-009) |
| Retirar `alt` de uma imagem | Falha: metadado obrigatório (FR-021) |
| Retirar `descricao` de um capítulo | Falha: descrição obrigatória (FR-027) |

## 2. Gerar e visualizar o site

```text
npm run build
npm run preview
```

Esperado: build sem erros; site acessível no endereço local indicado.

## 3. Testes automáticos

```text
npm test
```

Cobre: acessibilidade (axe) em todas as páginas; ausência de rolagem horizontal a 360 px
(SC-007); navegação por teclado no mapa e na linha do tempo (FR-016); título, descrição e
canônica em todas as páginas (SC-010); links internos sem quebra.

## 4. Cenários manuais

| # | Cenário | Esperado | Requisito |
|---|---|---|---|
| 1 | Da página inicial, iniciar a exposição e seguir até o último capítulo | Navegação anterior/próximo contínua | US1, FR-003 |
| 2 | Abrir diretamente `/exposicao/<slug>/` de um capítulo do meio | Página abre sem passar pelos anteriores | FR-003 |
| 3 | Partir da página inicial e chegar à referência de uma afirmação qualquer | No máximo 3 ações | SC-003 |
| 4 | Conferir um capítulo com divergência | Versões lado a lado, cada uma com fonte | FR-009 |
| 5 | Na linha do tempo, abrir um acontecimento e ir ao capítulo e ao lugar | Ligações funcionam | FR-017 |
| 6 | No mapa, selecionar um lugar só pelo teclado | Painel abre com nomes, acontecimentos e fontes | FR-015, FR-016 |
| 7 | Conferir um trajeto presumido | Tracejado e rótulo "presumido" | FR-015 |
| 8 | Desativar JavaScript e abrir mapa e linha do tempo | Listas textuais completas | FR-016 |
| 9 | Navegar o site com leitor de tela (NVDA) | Conteúdo e controles anunciados corretamente | SC-006 |
| 10 | Rodar Lighthouse (modo celular) na página inicial, em um capítulo e no mapa | Metas do plano atingidas | Princípio VI |
| 11 | Compartilhar um link de capítulo em aplicativo de mensagem | Prévia com título, descrição e imagem | FR-028 |
| 12 | Acrescentar um acontecimento com lugar e fonte editando só `conteudo/` e publicar | Aparece na linha do tempo e no mapa sem mudar código | SC-008 |
| 13 | Teste com 3 leitores sem conhecimento prévio | Descrevem origem, chegada, atuação e família | SC-001 |

## 5. Publicação

Esperado após publicar: site no domínio definido, com HTTPS; `sitemap-index.xml` e `robots.txt`
acessíveis; páginas presentes na ferramenta de inspeção de URL do Google Search Console (após
indexação).
