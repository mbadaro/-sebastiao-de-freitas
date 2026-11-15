---
description: "Lista de tarefas da implementação do MVP — Exposição Histórica Digital"
---

# Tarefas: Exposição Histórica Digital — MVP

**Status**: aprovado pelo responsável em 2026-11-14

**Entrada**: documentos de design em `specs/001-acervo-mvp/`

**Pré-requisitos**: [plan.md](plan.md) (v3), [spec.md](spec.md), [research.md](research.md),
[data-model.md](data-model.md), [contracts/](contracts/), [quickstart.md](quickstart.md);
Constituição v1.3.0 em `.specify/memory/constitution.md`.

**Testes**: incluídos porque o plano os define (D11): validação de conteúdo no build e testes
ponta a ponta com Playwright + axe. Não é TDD estrito: o teste de cada história é escrito junto
com ela e precisa passar no fechamento da fase.

**Organização**: tarefas agrupadas por história de usuário (US1–US6 da spec), precedidas de
preparação, levantamento do acervo, fundação visual, **marco de aprovação da página inicial** e
fundação de conteúdo.

## Formato: `[ID] [P?] [História] Descrição`

- **[P]**: pode rodar em paralelo (arquivos diferentes, sem dependência pendente).
- **[USn]**: história de usuário da spec.
- 🛑 indica ponto de parada que exige aprovação do responsável.
- ⏳ indica tarefa que depende de material, acesso ou decisão ainda não fornecidos (ver
  [Dependências externas](#dependências-externas-materiais-acessos-e-decisões)).

## Regra editorial (vale para toda tarefa que produz conteúdo)

- Conteúdo histórico só entra no acervo **a partir do fichamento** (`pesquisa/fichamento.md`), com a
  origem de cada informação indicada conforme a regra de atribuição (aprovada em 2026-11-15, ver
  `pesquisa/catalogo-de-fontes.md`). O site reúne e atribui; não retira conteúdo por falta de
  verificação.
- Informação não confirmada **nunca** é apresentada como fato: entra como `historiografia`,
  `tradicao` ou `hipotese`, atribuída à sua origem.
- **Origem e vínculo sefardita**: cada afirmação traz sua origem explícita (ex.: "segundo José
  Gonçalves Salvador"; "conforme certificado da Comunidade Israelita de Lisboa") e a natureza
  correspondente. `fato` só com documento primário consultado. Isso vale também para frases de
  apresentação curtas, como a da abertura da página inicial.

## Convenções de caminho

Projeto único na raiz do repositório (ver [plan.md](plan.md#estrutura-do-projeto)):
`conteudo/` (acervo), `src/` (aplicação), `scripts/`, `dados-geo/`, `public/`, `tests/`,
e `pesquisa/` (levantamento de fontes; documentação de trabalho, não é publicada).

---

## Fase 1: Preparação do ambiente

**Objetivo**: máquina, repositório e projeto Astro prontos; publicação automática funcionando.

- [X] T001 ⏳ Instalar Node.js LTS na máquina do responsável (via `winget install OpenJS.NodeJS.LTS`, executado ou autorizado por ele) e confirmar `node -v` e `npm -v`; registrar a versão em `README.md`
- [X] T002 Inicializar Git na raiz do projeto, criar `.gitignore` (`node_modules/`, `dist/`, `.astro/`) e fazer o primeiro commit com `.specify/`, `.claude/` e `specs/` (repositório local; nada é publicado)
- [X] T003 ⏳ 🛑 Criar o repositório **público** no GitHub na conta do responsável e enviar o ramo principal (`git remote add origin` + `git push`). Decisão aprovada no plano (Q-1), mas **a execução exige confirmação explícita do responsável no momento**, porque torna público todo o conteúdo do repositório; antes do envio, revisar com ele a lista de arquivos versionados
- [X] T004 Criar projeto Astro mínimo na raiz, com TypeScript estrito: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro` provisório
- [X] T005 [P] Criar a estrutura de pastas do plano: `conteudo/capitulos/`, `conteudo/paginas/`, `conteudo/imagens/`, `src/layouts/`, `src/components/`, `src/plugins/`, `src/lib/`, `src/styles/`, `scripts/`, `dados-geo/`, `public/`, `tests/e2e/`, `tests/validacao/`, `pesquisa/`
- [X] T006 Instalar somente as dependências previstas no plano (`astro`, `remark-directive`, `@astrojs/sitemap`; desenvolvimento: `d3-geo`, `@playwright/test`, `@axe-core/playwright`) e criar os scripts `dev`, `build`, `preview`, `validar` e `test` em `package.json`
- [X] T007 [P] Criar `.github/workflows/ci.yml`: `npm ci`, `npm audit --audit-level=high` (falha em alto/crítico), `npm run validar`, `npm run build`, `npm test`
- [X] T008 [P] ⏳ 🛑 Criar `.github/workflows/publicar.yml`: publicação no GitHub Pages a partir do ramo principal, com permissões mínimas; endereço provisório `*.github.io` serve de prévia. **Ativar o GitHub Pages só após confirmação explícita do responsável** (o site fica acessível publicamente); até lá, a prévia é local (`npm run preview`)
- [X] T009 [P] Criar `.github/dependabot.yml` com atualização semanal de npm e GitHub Actions

**Ponto de verificação**: `npm run build` gera `dist/`; após as confirmações de T003 e T008, um
push publica a página provisória no endereço `*.github.io`.

---

## Fase 2: Levantamento e organização do acervo (prioritária; em paralelo com as fases 1, 3, 4 e 5)

**Objetivo**: catálogo organizado de fontes e materiais e fichamento das informações, base de
todo o conteúdo. Pode começar imediatamente. Não depende de código.

**Regras** (Constituição II e III; plano D8): não inventar informação; distinguir documento
primário, referência secundária, origem informal e hipótese; distinguir **acesso** à informação
de **autorização de reprodução** de textos, documentos e imagens.

**Status de cada material no catálogo** (obrigatório):

| Status | Significado |
|---|---|
| `catalogado` | Registrado (existe, onde está), mas ainda não consultado |
| `consultado` | Aberto e lido; o que ele diz e o que ele cita foram registrados, mas suas informações **não** foram conferidas na fonte original |
| `verificada` | Informação conferida na própria obra ou documento original (ou em reprodução fiel dele), com página |
| `pendente` | Precisa de acesso, material ou decisão que ainda não temos (indicar qual) |

Natureza conforme a regra de atribuição aprovada em 2026-11-15 (obra lida → `historiografia` atribuída ao autor; transcrição de terceiros → atribuída a quem transcreveu; informal → `tradicao`). Nada é retirado por falta de verificação.

- [X] T010 Criar `pesquisa/catalogo-de-fontes.md` com uma ficha por material contendo: id, identificação, link ou localização, tipo de material, procedência (custodiante), descrição e resumo, classificação (`primaria`, `secundaria`, `informal`), **status** (`catalogado`, `consultado`, `verificada`, `pendente`), relevância para o projeto, direitos (acesso × reprodução de texto/imagem, licença conhecida) e pendências de verificação
- [X] T011 Registrar em `pesquisa/catalogo-de-fontes.md` os materiais já abertos em 2026-11-12, **com status `consultado`** (lidos, mas sem conferência na obra original), e o que cada um cita: arvore.net.br (transcrição on-line de Silva Leme, *Genealogia Paulistana*, v. 7, p. 168–223, que cita Pedro Taques — a conferência com a obra impressa ou digitalizada fica pendente), genearc.net (id 7956; cita Silva Leme vols. II, III, V, VII, VIII e Sillos, *Revista da ASBRAP* n. 26, p. 237–246), amorese.com.br (ps25_085; cita Silva Leme e José Gonçalves Salvador, p. 138), moyarte.com.br (sem fonte); com status `pendente`: FamilySearch LZ21-H7Q (não carregou; requer login); com status `consultado` e classificação `informal`: YouTube MGY870A2SMM e Instagram DHZY6mvxulB (sem fonte)
- [ ] T012 Pesquisa ampla de fontes ainda não consideradas, registrando em `pesquisa/catalogo-de-fontes.md` onde estão e se são acessíveis on-line: obras citadas pelas fontes (Pedro Taques, *Nobiliarquia Paulistana*; obra de José Gonçalves Salvador sobre cristãos-novos, título a confirmar; artigo de Sillos na ASBRAP), documentação paulista publicada (atas e registro geral da Câmara de São Paulo, cartas de sesmaria, inventários e testamentos), processos da Inquisição de Lisboa (Arquivo Nacional Torre do Tombo) e acervos digitais (Biblioteca Nacional Digital, Brasiliana USP, Internet Archive, Arquivo Público do Estado de São Paulo); verificar, sem presumir, se há registros sobre Sebastião em cada um; cada item entra como `catalogado` e só muda de status quando efetivamente consultado ou conferido; obras sem acesso on-line ficam `pendente` (acesso físico ou cópia fornecida pelo responsável)
- [ ] T013 [P] Levantar iconografia e fotografias candidatas em `pesquisa/catalogo-de-fontes.md` (seção "Imagens"): mapas históricos da capitania de São Vicente e do Algarve, gravuras de época, fotografias atuais de lugares da trajetória (Silves, Lagoa, centro de São Paulo, Mairiporã), em acervos de domínio público ou licença aberta (ex.: Wikimedia Commons, Biblioteca Nacional Digital), com licença e condição de reprodução de cada uma
- [X] T014 ⏳ Receber os documentos do FamilySearch enviados pelo responsável (imagens em `pesquisa/familysearch/`), transcrever os trechos relevantes e catalogar cada um com coleção, custodiante original e condição de reprodução da imagem (regra D8: na dúvida, só referência, sem imagem)
- [X] T015 Criar `pesquisa/fichamento.md`: cada informação extraída com fonte e página, **status da fonte** (do catálogo), natureza (`fato`, `historiografia`, `tradicao`, `hipotese`) e divergências; informação vinda de fonte apenas `consultado` ou `informal` fica marcada "a confirmar" e não pode receber `fato`; afirmações sobre origem e vínculo sefardita registram exatamente quem afirma e com que base; incluir as divergências já conhecidas (patente de 1606; jornada de 1595 × 1596; 7 × 8 filhos; cargos na Câmara; denúncia à Inquisição; época séc. XVII–XVIII do post) e os vínculos com Raposo Tavares (convivência na bandeira de 1628; casamento de Mécia da Cunha Lobo com Francisco Vieira Tavares, fonte pendente)
- [X] T016 🛑 Revisar catálogo e fichamento com o responsável e registrar as pendências aceitas em `pesquisa/catalogo-de-fontes.md`

**Ponto de verificação**: catálogo e fichamento aprovados; o conteúdo das fases 6–11 sai daqui.

---

## Fase 3: Fundação visual

**Objetivo**: tokens, tipografia, layout base e componentes compartilhados da identidade
"Museu Digital Imersivo" (plano, seção Identidade visual; research D14–D16).

- [X] T017 [P] Criar `src/styles/tokens.css`: as seis cores do briefing (`#142638`, `#244760`, `#F3F0E8`, `#B69A70`, `#8296A6`, `#202A33`), variantes escurecidas de dourado e azul acinzentado para fundo claro com contraste ≥ 4,5:1, escala tipográfica, espaçamentos, raios e durações; comentar as combinações permitidas e reprovadas conforme a tabela de contraste do plano
- [X] T018 [P] Adicionar Playfair Display e Source Sans 3 (SIL OFL), versões variáveis WOFF2 com subconjunto latino, em `public/fontes/` com os arquivos de licença; declarar `@font-face` com `font-display: swap` em `src/styles/fontes.css`; limite "≤ 4 arquivos WOFF2, ≤ 150 KB no total"
- [X] T019 Criar `src/styles/global.css`: base tipográfica (Playfair Display só em títulos e destaques "≥ 24 px"), foco visível, superfícies `clara` e `escura` que redefinem os tokens de texto, link e destaque, transições de página por CSS (`@view-transition`) e desativação de toda animação com `prefers-reduced-motion: reduce`
- [X] T020 Criar `src/layouts/LayoutBase.astro`: `lang="pt-BR"`, `<title>`, `meta description`, URL canônica, Open Graph e Twitter Card como propriedades obrigatórias, CSP via `<meta>` (só recursos do próprio domínio), link "Pular para o conteúdo", pré-carregamento da fonte de texto
- [X] T021 [P] Criar `src/components/Cabecalho.astro` e `src/components/Navegacao.astro`: links para exposição, sefarditas, linha do tempo, mapa, família e fontes; menu móvel com botão `aria-expanded` operável por teclado
- [X] T022 [P] Criar `src/components/Rodape.astro` (links das seções e "Sobre")
- [X] T023 [P] Criar `src/components/Secao.astro` com a propriedade `superficie` (`clara` | `escura`)
- [X] T024 [P] Criar `src/components/Figura.astro`: imagem otimizada (AVIF/WebP, tamanhos responsivos, carregamento tardio abaixo da dobra), `alt`, legenda, crédito e selo junto à legenda conforme o tipo — `ilustracao` → "Ilustração", `fotografia-atual` → "Fotografia atual" (com data quando houver), `historica` → identificada pela legenda e referência
- [X] T025 [P] Criar `src/components/SeloNatureza.astro` com os rótulos: `fato` → "Fato documentado", `historiografia` → "Informação historiográfica", `tradicao` → "Tradição genealógica", `hipotese` → "Hipótese" (distinção não depende só de cor)
- [X] T026 Criar `playwright.config.ts` e `tests/e2e/base.spec.ts`: para cada rota gerada, axe sem violações, ausência de rolagem horizontal a 360, 768 e 1280 px, presença de `<title>`, `meta description` e canônica, e nenhuma requisição a domínio externo

**Ponto de verificação**: página provisória usando `LayoutBase` passa em `tests/e2e/base.spec.ts`.

---

## Fase 4: Página inicial — primeira entrega e aprovação visual 🛑

**Objetivo**: página inicial funcional em Astro, com qualidade de referência, para validar
paleta, tipografia, hierarquia, composição, imagens, componentes, navegação e responsividade
(plano, "Página inicial" e "Validação da identidade visual").

**Teste independente**: abrir a prévia publicada em celular e computador, percorrer as cinco
seções e verificar critérios técnicos (T036) e aprovação do responsável (T038).

**Regra de conteúdo**: só informações do fichamento com a origem indicada (ex.: "segundo Silva
Leme, v. 7, p. 168–169") ou texto marcado como provisório, que não vai para a publicação final.

**Limite de escopo desta fase**: entrega visual completa, mas **sem mecanismos**: nada de
coleções, validação, plugin de marcadores, geração automática de mapas ou interação de mapa.
Esses mecanismos chegam nas fases 5 e 9 e são ligados à página depois (T053, T069).

- [X] T027 Obter um SVG estático da vista "Portugal–Brasil" a partir de base de domínio público (Natural Earth), recortado uma única vez, e salvá-lo em `src/assets/mapas/atlantico.svg` com os pontos principais desenhados à mão; **sem script de geração e sem interação** (a geração automatizada fica para T065)
- [X] T028 Criar `conteudo/paginas/inicio.md` com o conteúdo da página inicial: apresentação, vínculo sefardita, marcos da trajetória e destaques de fontes, cada informação com sua origem explícita e natureza indicadas em texto, conforme a [regra editorial](#regra-editorial-vale-para-toda-tarefa-que-produz-conteúdo) (os marcadores `:fonte` só existem a partir da Fase 5)
- [X] T029 [US1] Criar `src/components/Hero.astro` (superfície escura): nome, período, frase de apresentação **com o vínculo sefardita** (US2-3) redigida com a origem da afirmação (ex.: "apontado como cristão-novo por José Gonçalves Salvador"), nunca como fato sem documento primário, chamada "Comece a exposição" para `/exposicao/`; fundo tipográfico sobre o contorno do mapa, sem depender de imagem
- [X] T030 [P] [US1] Criar `src/components/PreviaTrajetoria.astro` (superfície clara): marcos principais com data e `SeloNatureza`, ligação para a exposição e a linha do tempo
- [X] T031 [P] [US1] Criar `src/components/PreviaLugares.astro` (superfície escura): SVG "Portugal–Brasil" de T027 com os lugares principais e ligação para `/mapa/`
- [X] T032 [P] [US1] Criar `src/components/DestaqueDocumento.astro` e a seção "Documentos e evidências" (superfície clara): 2–3 fontes em destaque com natureza, usando `Figura` quando houver imagem com direitos de reprodução, e ligação para `/fontes/`
- [X] T033 [P] [US1] Criar `src/components/DescubraAHistoria.astro` (superfície escura): acesso a exposição, sefarditas, linha do tempo, mapa, família e fontes
- [X] T034 [US1] Compor `src/pages/index.astro` com `LayoutBase` e as cinco seções, título e descrição próprios e imagem padrão de compartilhamento em `public/og/padrao.png` (composição tipográfica, sem rosto de Sebastião)
- [X] T035 [US1] Aplicar animações discretas de entrada em CSS nas seções da página inicial, todas desativadas com `prefers-reduced-motion: reduce`
- [X] T036 [US1] Verificar a página inicial e registrar os resultados em `specs/001-acervo-mvp/checklists/aprovacao-visual.md`: axe sem falhas, 360/768/1280 px, teclado, NVDA, Lighthouse em modo celular (Desempenho ≥ 90, Acessibilidade 100, SEO ≥ 95, LCP ≤ 2,5 s, CLS ≤ 0,1)
- [X] T037 [US1] Disponibilizar a prévia ao responsável: no GitHub Pages (endereço `*.github.io`), se T008 já tiver sido confirmada, ou localmente com `npm run preview`
- [X] T038 🛑 [US1] **Revisão e aprovação da direção visual com o responsável**; registrar decisões e ajustes em `specs/001-acervo-mvp/checklists/aprovacao-visual.md`. **Nenhuma outra página é implementada antes desta aprovação**
- [X] T039 [US1] Incorporar os ajustes aprovados aos tokens e componentes reutilizáveis (`src/styles/tokens.css`, `src/styles/global.css`, `src/components/`), não apenas à página inicial

**Ponto de verificação**: direção visual aprovada; tokens e componentes viram padrão do site.

---

## Fase 5: Fundação de conteúdo (bloqueia todas as histórias)

**Objetivo**: modelo de conteúdo, marcadores de afirmação e validação automática das regras da
Constituição ([data-model.md](data-model.md), [contracts/conteudo.md](contracts/conteudo.md)).

**Proporcionalidade** (revisão de 2026-11-14):

| Indispensável no MVP | Simplificação adotada |
|---|---|
| Esquemas das coleções com os campos obrigatórios e valores fixos | Usar o recurso nativo `reference()` das coleções do Astro para validar ids cruzados, em vez de código próprio |
| Marcador `:fonte` com natureza e referência válidas | A checagem "parágrafo sem fonte" e "`fato` com `sem-fonte`/`informal`" fica **dentro do plugin** que já percorre o texto |
| Regra dos 100 anos, trajeto documentado, mínimo de 2 versões | Regras como refinamentos do próprio esquema (`refine`), sem script separado |
| Metadados obrigatórios de imagem e SEO | Já cobertos pelo esquema |
| — | `scripts/validar-conteudo.ts` só é criado se sobrar regra que não caiba no esquema ou no plugin; `npm run validar` executa a verificação do Astro (`astro check` + build) |
| — | Ligações inversas como funções simples de filtro, sem camada própria |

- [X] T040 Criar `src/content.config.ts` com as coleções `capitulos`, `paginas`, `acontecimentos`, `lugares`, `trajetos`, `pessoas`, `referencias`, `divergencias`, `imagens` e `alteracoes`, lendo de `conteudo/`, com esquemas que exijam: `id` "minúsculas, sem acentos, palavras separadas por hífen"; natureza em `fato | historiografia | tradicao | hipotese`; data com `ano` inteiro e `precisao` em `exata | aproximada | antes-de | depois-de | intervalo` (`ate` quando `intervalo`); capítulo com `titulo`, `slug`, `ordem` e `descricao` de "50–160 caracteres"; referência com `abnt` não vazio e `tipo` em `primaria | secundaria | informal`; lugar com `pais` em `portugal | brasil`, `coordenadas`, `precisao` em `exata | aproximada | regiao` e `vista` em `atlantico | sao-vicente`; trajeto com `comprovacao` em `documentado | presumido`; pessoa com `vinculo` em `protagonista | pai | mae | conjuge | sogro | sogra | filho | filha | conjuge-de-filho | notavel` e `ligacao_notavel.tipo` em `descendencia | casamento | convivencia`; divergência com "mínimo 2" versões; imagem com `alt`, `legenda`, `credito`, `origem`, `licenca` e `tipo` em `historica | fotografia-atual | ilustracao`; alteração com `data`, `afeta`, `descricao` e `motivo`; ids cruzados via `reference()`; regras como `refine` do esquema: pessoa "só é publicada se cumprir ao menos uma condição: tem `obito`; ou `nascimento.ano` ≤ (ano atual − 100); ou tem `evidencia_historica`", trajeto `documentado` "exige ao menos uma referência que não seja `informal` nem `sem-fonte`", nenhum id de pessoa igual a `vinculos-notaveis`
- [X] T041 [P] Criar `src/lib/datas.ts`: ordenação por `ano` e formatação `exata` → "1600", `aproximada` → "c. 1565", `antes-de` → "antes de 1632", `depois-de` → "depois de 1600", `intervalo` → "1599–1605"; `exibicao` substitui a formatação automática (ex.: "1595 ou 1596")
- [X] T042 [P] Criar `src/plugins/remark-fonte.ts` com `remark-directive`: `:fonte{nat ref p}` vira `SeloNatureza` + chamada numerada para a referência; `ref` aceita várias ids separadas por espaço e o id reservado `sem-fonte`; `::divergencia{id}` vira o bloco de divergência; o build falha com natureza inválida, id inexistente, parágrafo de capítulo ou página temática sem nenhum `:fonte` (citação de transcrição herda o marcador do parágrafo seguinte) ou `nat=fato` com `sem-fonte`/referência `informal`; registrar o plugin em `astro.config.mjs`
- [ ] T043 [P] Criar `src/lib/ligacoes.ts` com funções simples de filtro (onde cada referência é usada; acontecimentos por lugar e por pessoa); pode ser criado na primeira história que precisar dele (US4 ou US6)
- [X] T044 Configurar `npm run validar` (verificação do Astro + build) e garantir `ordem` e `slug` únicos, arquivo de imagem existente e mensagens de erro em pt-BR no formato "arquivo › item: regra"; criar `scripts/validar-conteudo.ts` **somente** para regras que não couberem no esquema (T040) nem no plugin (T042)
- [X] T045 Criar os casos negativos de `quickstart.md` (seção 1) em `tests/validacao/validar-conteudo.test.ts`, que executam a validação (T044) sobre fixtures em `tests/validacao/fixtures/` e esperam falha, usando o executor de testes nativo do Node (`node:test`, sem dependência nova): parágrafo sem fonte, `fato` com `sem-fonte`, referência inexistente, pessoa nascida em 1950 sem óbito, imagem sem `alt`, capítulo sem `descricao`
- [X] T046 ⏳ Cadastrar em `conteudo/referencias.yaml` as referências aprovadas em T016, com ABNT conferida na obra (editora, ano, volume) e `localizacao` quando houver; referência cuja obra ainda não foi acessada entra com a ABNT marcada "a conferir" e não sustenta `fato` — depende de T016 e do acesso às obras

**Ponto de verificação**: `npm run validar` e `node --test tests/validacao/` passam; os casos
negativos falham como esperado.

---

## Fase 6: História de Usuário 1 — Percorrer a exposição (P1) 🎯 MVP

**Objetivo**: narrativa em capítulos com natureza e fonte em cada afirmação, divergências lado a
lado e navegação sequencial e direta.

**Teste independente**: da página inicial, seguir a exposição até o fim sem outros recursos;
toda afirmação mostra natureza e fonte; um capítulo do meio abre direto pelo endereço.

- [X] T047 [P] [US1] Criar `src/components/Fonte.astro` e `src/components/Divergencia.astro` (versões lado a lado, cada uma com sua fonte) e a lista "Referências deste capítulo" com a referência ABNT completa ao fim de cada capítulo (US1-2 sem depender de `/fontes/`)
- [X] T048 [P] [US1] Criar `src/components/NavegacaoCapitulos.astro` (anterior, próximo e sumário) e `src/components/CartaoCapitulo.astro`
- [X] T049 [US1] Criar `src/pages/exposicao/index.astro`: sumário de todos os capítulos por `ordem`, com dado estruturado `ItemList`
- [X] T050 [US1] Criar `src/pages/exposicao/[slug].astro`: capítulo com `Article` e `BreadcrumbList`, navegação anterior/próximo, imagens via `Figura`, título e descrição do frontmatter
- [X] T051 [P] [US1] Cadastrar em `conteudo/divergencias.yaml` as divergências do fichamento (ao menos as 6 conhecidas), cada versão com sua referência
- [X] T052 ⏳ [US1] Redigir os capítulos em `conteudo/capitulos/NN-<slug>.md` **exclusivamente** a partir de `pesquisa/fichamento.md` e de fontes `verificada`, seguindo a [regra editorial](#regra-editorial-vale-para-toda-tarefa-que-produz-conteúdo) (informação não confirmada nunca como fato), na estrutura provisória do data-model (origem em Portugal; raízes cristãs-novas e sefarditas; chegada ao Brasil; São Paulo e família; atuação pública e militar; últimos anos e falecimento; legado): `:fonte` em todo parágrafo, contexto histórico ligado aos acontecimentos, lacunas declaradas, nenhuma hipótese própria; enviar ao responsável para revisão humana antes de publicar (Princípio II)
- [ ] T053 [US1] Substituir o conteúdo provisório da página inicial pelos dados das coleções (`src/pages/index.astro` e componentes da Fase 4)
- [X] T054 [US1] Criar `tests/e2e/exposicao.spec.ts`: início → primeiro capítulo → último pelo "próximo"; abertura direta de capítulo do meio; da página inicial até a referência de uma afirmação em no máximo 3 ações (SC-003); divergência com versões lado a lado

**Ponto de verificação**: US1 funcional e testável sozinha. **MVP mínimo publicável.**

---

## Fase 7: História de Usuário 2 — Raízes cristãs-novas e sefarditas (P2)

**Objetivo**: introdução aos sefarditas e capítulo do vínculo de Sebastião com suas fontes.

**Teste independente**: ler só `/sefarditas/` e o capítulo das raízes; um leigo explica quem
foram os sefarditas e o que se sabe sobre o vínculo de Sebastião.

- [X] T055 ⏳ [US2] Redigir `conteudo/paginas/sefarditas.md` a partir de fontes historiográficas `verificada` (levantadas em T012), com os tópicos de US2-1 (origem na Península Ibérica, presença em Portugal, perseguição, expulsão e conversões forçadas, dispersão, ligação com a trajetória de Sebastião), limitada ao necessário para entender Sebastião, com `:fonte` em todo parágrafo e referências historiográficas levantadas em T012
- [X] T056 [US2] Criar `src/pages/sefarditas.astro` (dado estruturado `Article`)
- [ ] T057 ⏳ [US2] Completar o capítulo das raízes em `conteudo/capitulos/` com as fontes do vínculo, cada afirmação atribuída a quem afirma: José Gonçalves Salvador (natureza `historiografia`, após conferir a obra e a página; enquanto não conferida, "a confirmar"), certificado da CIL (atestação institucional contemporânea, natureza `historiografia`, cadastrado em `conteudo/referencias.yaml` sem dados pessoais do descendente — Princípio V); `fato` só com documento primário consultado (ex.: processo inquisitorial); depende do acesso à obra de Salvador e dos dados do certificado fornecidos pelo responsável
- [X] T058 [US2] Criar `tests/e2e/sefarditas.spec.ts`: tópicos de US2-1 presentes; vínculo sefardita na abertura da página inicial com acesso direto ao capítulo das raízes

**Ponto de verificação**: US1 e US2 funcionam de forma independente.

---

## Fase 8: História de Usuário 3 — Linha do tempo (P2)

**Objetivo**: acontecimentos da trajetória e de contexto em ordem, com datas imprecisas e
divergências visíveis e ligações para capítulo e lugar.

**Teste independente**: abrir só `/linha-do-tempo/`; ordem correta, vida × contexto
distinguíveis, ligações funcionando, tudo visível sem JavaScript.

- [ ] T059 [P] [US3] Cadastrar em `conteudo/acontecimentos.yaml`, conforme a regra editorial, todos os acontecimentos `trajetoria` do fichamento e os de `contexto` selecionados editorialmente, com `natureza`, `referencias` (ao menos uma, ou `sem-fonte`), `lugares`, `pessoas`, `capitulo` com âncora e `divergencia` quando houver
- [ ] T060 [US3] Criar `src/components/LinhaDoTempo.astro`: `<ol>` cronológica gerada no build; `trajetoria` × `contexto` distinguíveis por forma e rótulo, não só por cor; datas via `src/lib/datas.ts`; divergência visível; ligações para capítulo e para o lugar no mapa
- [ ] T061 [US3] Acrescentar a `src/components/LinhaDoTempo.astro` o filtro "vida de Sebastião / contexto / ambos" com script pequeno (≤ 20 KB); sem JavaScript, todos os itens ficam visíveis
- [ ] T062 [US3] Criar `src/pages/linha-do-tempo.astro` com âncoras `#<id-acontecimento>` e dado estruturado `ItemList`
- [ ] T063 [US3] Criar `tests/e2e/linha-do-tempo.spec.ts`: ordem cronológica; 100% dos acontecimentos `trajetoria` presentes (SC-004); navegação por teclado; conteúdo completo com JavaScript desativado

**Ponto de verificação**: US3 funcional e independente.

---

## Fase 9: História de Usuário 4 — Mapa da trajetória (P2)

**Objetivo**: mapa interativo em duas vistas, com lugares, trajetos documentados × presumidos,
painel por lugar e lista textual equivalente.

**Teste independente**: abrir só `/mapa/`; todos os lugares da trajetória presentes, painel
acessível por teclado, presumidos rotulados, lista completa sem JavaScript.

- [ ] T064 [P] [US4] Cadastrar, conforme a regra editorial, `conteudo/lugares.yaml` (nome histórico, nome atual, país, coordenadas, `precisao`, `raio_km`, `vista`, referências) e `conteudo/trajetos.yaml` (`de`, `para`, `comprovacao`, `acontecimento`, referências) a partir do fichamento
- [ ] T065 [US4] Completar `scripts/gerar-mapas.ts`: vistas `atlantico` e `sao-vicente`, projeção de lugares e trajetos e validação "coordenadas dentro dos limites da vista declarada"
- [ ] T066 [US4] Criar `src/components/Mapa.astro`: SVG com lugares focáveis e clicáveis; `aproximada`/`regiao` como área sombreada; trajeto `presumido` tracejado **e** com rótulo "presumido"; painel do lugar com nome histórico, nome atual, acontecimentos e fontes; JavaScript ≤ 40 KB
- [ ] T067 [US4] Acrescentar a `src/components/Mapa.astro` a lista textual de lugares e trajetos com o mesmo conteúdo do mapa, operável por teclado (FR-016)
- [ ] T068 [US4] Criar `src/pages/mapa.astro` e `src/pages/lugares/[id].astro` (dado estruturado `Place`)
- [ ] T069 [US4] Atualizar `src/components/PreviaLugares.astro` da página inicial para usar `lugares.yaml` e a vista `atlantico` gerada
- [ ] T070 [US4] Criar `tests/e2e/mapa.spec.ts`: 100% dos lugares da trajetória no mapa e na lista (SC-004); painel abre por teclado; trajeto presumido com rótulo; lista completa com JavaScript desativado

**Ponto de verificação**: US4 funcional e independente.

---

## Fase 10: História de Usuário 5 — Família (P3)

**Objetivo**: pais, esposa, sogros, filhos e cônjuges dos filhos, divergências genealógicas e
vínculos notáveis.

**Teste independente**: abrir só `/familia/`; pessoas no limite definido, fontes e divergência
de número de filhos visíveis; vínculos notáveis com tipo de ligação.

- [ ] T071 [P] ⏳ [US5] Cadastrar `conteudo/pessoas.yaml` a partir do fichamento, conforme a regra editorial (o vínculo por casamento com a família de Raposo Tavares depende de fonte ainda não fornecida): pais, esposa, sogros, filhos e cônjuges dos filhos, com `relacoes`, `lacunas` (ex.: nome da mãe não localizado) e `referencias`; vínculos notáveis com `ligacao_notavel` (Raposo Tavares: `convivencia` na bandeira de 1628 e `casamento` de Mécia da Cunha Lobo com Francisco Vieira Tavares, só com fonte); nenhum dado da árvore pessoal do responsável
- [ ] T072 [P] [US5] Criar `src/components/PessoaCard.astro` (nome, variantes, datas, vínculo, natureza, fontes)
- [ ] T073 [US5] Criar `src/pages/familia/index.astro`, `src/pages/familia/[id].astro` (dado estruturado `Person`) e `src/pages/familia/vinculos-notaveis.astro`, exibindo a divergência de número de filhos
- [ ] T074 [US5] Criar `tests/e2e/familia.spec.ts`: pessoas por vínculo; divergência lado a lado; vínculo notável com tipo, natureza e fonte

**Ponto de verificação**: US5 funcional e independente.

---

## Fase 11: História de Usuário 6 — Consulta direta e fontes (P3)

**Objetivo**: chegar a qualquer tema pela navegação principal e consultar todas as referências.

**Teste independente**: da página inicial, achar uma informação específica e sua referência sem
passar pela narrativa.

- [ ] T075 [US6] Criar `src/pages/fontes.astro`: todas as referências em ABNT agrupadas por tipo (primárias, secundárias, informais), âncoras `#<id-referencia>` e "onde é usada" calculado por `src/lib/ligacoes.ts`
- [ ] T076 [US6] Revisar `src/components/Navegacao.astro` e `src/components/Rodape.astro` para que todas as seções e o sumário da exposição sejam alcançáveis de qualquer página
- [ ] T077 [US6] Criar `tests/e2e/consulta.spec.ts`: da página inicial a um capítulo, lugar ou pessoa sem passar pela narrativa; fontes agrupadas por tipo; "onde é usada" com links válidos

**Ponto de verificação**: todas as histórias funcionam de forma independente.

---

## Fase 12: Acabamento, verificação e publicação

**Objetivo**: requisitos transversais, verificação final e publicação no domínio próprio.

- [ ] T078 [P] Criar `conteudo/paginas/sobre.md` e `src/pages/sobre/index.astro` (método do projeto e legenda das naturezas) e `src/pages/sobre/historico-de-revisoes.astro` a partir de `conteudo/alteracoes.yaml`, com "Revisado em" e link nas páginas afetadas (FR-011)
- [ ] T079 [P] Criar `src/pages/404.astro` com links para as seções
- [ ] T080 [P] SEO: ativar `@astrojs/sitemap` em `astro.config.mjs`, criar `public/robots.txt` apontando o sitemap e `src/lib/seo.ts` com os dados estruturados JSON-LD de cada rota conforme `contracts/rotas.md` (datas aproximadas como texto)
- [ ] T081 [P] Criar imagens de compartilhamento por seção em `public/og/` (composição tipográfica ou imagem com direitos; sem rosto de Sebastião) e ligá-las no `LayoutBase`
- [ ] T082 Revisão editorial final registrada em `specs/001-acervo-mvp/checklists/revisao-conteudo.md`: natureza frase a frase, ABNT, direitos de reprodução de cada imagem, ausência de rosto de Sebastião, regra dos 100 anos, ausência de dados pessoais do responsável
- [ ] T083 Executar `quickstart.md` completo (seções 1 a 4), Lighthouse em página inicial, capítulo e mapa, e navegação com NVDA; registrar resultados em `specs/001-acervo-mvp/checklists/verificacao-final.md`
- [ ] T084 ⏳ Realizar o teste com 3 leitores (recrutados pelo responsável) sem conhecimento prévio (SC-001) e registrar o resultado em `specs/001-acervo-mvp/checklists/verificacao-final.md`
- [ ] T085 ⏳ 🛑 Registrar o domínio `.com.br` (nome escolhido e registro pago pelo responsável no Registro.br), configurar DNS, `public/CNAME` e a opção `site` em `astro.config.mjs`
- [ ] T086 ⏳ 🛑 Publicar a versão final no domínio próprio, após aprovação explícita do responsável, e enviar o sitemap ao Google Search Console (conta do responsável)

---

## Dependências e ordem de execução

### Dependências entre fases

```text
Fase 1 (ambiente) ──> Fase 3 (fundação visual) ──> Fase 4 (página inicial) ──🛑 aprovação T038
                                                                              │
Fase 2 (levantamento) — começa já, em paralelo ─────────┐                     ▼
                                                         ├──> Fase 5 (fundação de conteúdo)
                                                         │          │
                                                         ▼          ▼
                                              Fases 6–11 (histórias US1 → US6)
                                                         │
                                                         ▼
                                              Fase 12 (acabamento e publicação)
```

- **Fase 2** não depende de código e alimenta T046 e todo o conteúdo das fases 6–11.
- **T038 (aprovação visual)** bloqueia todas as páginas além da inicial.
- **Fase 5** depende da Fase 1 e bloqueia as histórias. Pode ser desenvolvida durante a revisão
  da página inicial, porque não cria páginas.
- **T046** depende de T016 (catálogo aprovado).

### Dependências externas (materiais, acessos e decisões)

Tarefas marcadas com ⏳ não podem ser concluídas só com o que já existe no projeto:

| Tarefa | Depende de | Fornecido por |
|---|---|---|
| T001 | Instalação do Node.js na máquina | Responsável (executa ou autoriza) |
| T003 | Conta no GitHub + confirmação de tornar o repositório público | Responsável |
| T008 | Confirmação para ativar o GitHub Pages | Responsável |
| T014 | Imagens dos documentos do FamilySearch | Responsável |
| T016, T038 | Revisão e aprovação | Responsável |
| T046 | Acesso às obras para conferir ABNT (Silva Leme, Sillos, Salvador, Pedro Taques) | Acervos digitais (T012) ou cópias do responsável |
| T052, T055 | Fichamento aprovado (T016) e fontes `verificada`; revisão humana do texto | T016 + responsável |
| T057 | Obra de José Gonçalves Salvador e dados do certificado da CIL (emissor, data, teor, sem dados pessoais) | Acervos / responsável |
| T071 | Fonte do casamento de Mécia da Cunha Lobo com Francisco Vieira Tavares | Responsável (FamilySearch) |
| T084 | Três leitores de teste | Responsável |
| T085 | Nome do domínio e pagamento do registro | Responsável |
| T086 | Aprovação da publicação final; conta no Google Search Console | Responsável |

Enquanto uma dependência não chega, a tarefa avança no que for possível e o conteúdo afetado
fica fora do site ou marcado "a confirmar", nunca preenchido por suposição.

### Dependências entre histórias

- **US1 (P1)**: depende das fases 4 e 5. Base do MVP.
- **US2 (P2)**: usa a estrutura de capítulos de US1 (capítulo das raízes); a página
  `/sefarditas/` é independente.
- **US3 (P2)** e **US4 (P2)**: independentes entre si; ligam-se a capítulos de US1 quando
  existirem (ligações ausentes não quebram o build).
- **US5 (P3)** e **US6 (P3)**: independentes; US6 lista referências cadastradas por todas.

### Dentro de cada história

Dados (YAML/Markdown) e componentes em paralelo → página → teste e2e → ponto de verificação.

## Oportunidades de paralelismo

- Fase 1: T005, T007, T008 e T009.
- Fase 2 inteira em paralelo com as fases 1, 3 e 4; dentro dela, T013 em paralelo com T012.
- Fase 3: T017, T018, T021, T022, T023, T024 e T025.
- Fase 4: T030, T031, T032 e T033.
- Fase 5: T041, T042 e T043.
- US3 e US4 em paralelo; US5 e US6 em paralelo.

### Exemplo: Fase 4 (página inicial)

```text
Tarefa: "Criar src/components/PreviaTrajetoria.astro"           (T030)
Tarefa: "Criar src/components/PreviaLugares.astro"              (T031)
Tarefa: "Criar src/components/DestaqueDocumento.astro"          (T032)
Tarefa: "Criar src/components/DescubraAHistoria.astro"          (T033)
```

### Exemplo: História de Usuário 1

```text
Tarefa: "Criar Fonte.astro e Divergencia.astro"                 (T047)
Tarefa: "Criar NavegacaoCapitulos.astro e CartaoCapitulo.astro" (T048)
Tarefa: "Cadastrar conteudo/divergencias.yaml"                  (T051)
```

## Estratégia de implementação

### Primeiro marco: aprovação visual

1. Fase 1 (ambiente) e início da Fase 2 (levantamento).
2. Fase 3 (fundação visual) e Fase 4 (página inicial).
3. **Parar em T038** e validar a direção visual com o responsável.

### MVP incremental

1. Fase 5 (fundação de conteúdo) → Fase 6 (US1): **MVP mínimo publicável**.
2. US2 → US3 → US4 → US5 → US6, cada uma testada e publicável isoladamente.
3. Fase 12: acabamento, domínio próprio e publicação final.

## Observações

- Cada tarefa deve terminar com commit; cada ponto de verificação, com publicação de prévia.
- Conteúdo histórico só entra no acervo vindo do fichamento (`pesquisa/fichamento.md`).
- Nenhuma dependência além das listadas no plano sem registro no plano (Princípio VII).
