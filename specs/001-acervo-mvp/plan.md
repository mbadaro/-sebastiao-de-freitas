# Plano de Implementação: Exposição Histórica Digital — MVP

**Branch**: `001-acervo-mvp` | **Data**: 2026-11-13 | **Spec**: [spec.md](spec.md)

**Entrada**: especificação da funcionalidade em `specs/001-acervo-mvp/spec.md` e Constituição
v1.3.0 em `.specify/memory/constitution.md`.

## Resumo

Site estático de exposição histórica sobre Sebastião de Freitas: narrativa em capítulos,
introdução aos sefarditas, linha do tempo, mapa interativo, família, vínculos notáveis e fontes
em ABNT, com natureza e fonte visíveis em cada afirmação.

Abordagem técnica: **gerador de site estático (Astro)** lendo um **acervo em Markdown e YAML**
na pasta `conteudo/`, separado do código. Regras da Constituição (natureza, fontes, 100 anos,
metadados) viram **validação automática no build**. Linha do tempo em HTML puro; mapa em **SVG
gerado na publicação** a partir de dados de domínio público, sem serviço externo. Publicação
gratuita no **GitHub Pages** com domínio próprio. Decisões detalhadas em
[research.md](research.md).

## Revisões deste plano

| Versão | Data | Alteração |
|---|---|---|
| 1 | 2026-11-13 | Versão inicial |
| 2 | 2026-11-14 | Decisões Q-1 a Q-3; incorporação do briefing de identidade visual ("Museu Digital Imersivo"): nova seção [Identidade visual](#identidade-visual), [Sequência de entregas](#sequência-de-entregas) com a página inicial como primeira entrega e aprovação visual antes das demais páginas, decisões D14–D16 em research.md, orçamento de fontes e imagem de abertura em Desempenho, novos riscos e pré-requisito de Node.js |
| 3 | 2026-11-14 | FR-021 na matriz com os selos "Ilustração" e "Fotografia atual" (sem seção separada); regra de uso de documentos do FamilySearch e outros acervos digitais (dependências editoriais e D8). **Plano fechado** |

## Contexto Técnico

**Linguagem/Versão**: TypeScript e JavaScript sobre Node.js LTS vigente; HTML e CSS.

**Dependências principais**: Astro (gerador estático), `remark-directive` (marcadores de
afirmação), `@astrojs/sitemap`, `d3-geo` (projeção do mapa, só no build). Detalhes na seção
[Dependências externas](#dependências-externas).

**Armazenamento**: arquivos Markdown e YAML versionados no repositório (`conteudo/`). Sem banco
de dados.

**Testes**: validação de conteúdo no build (esquemas + script próprio); Playwright + axe-core
para testes ponta a ponta e acessibilidade; Lighthouse manual; revisão com leitor de tela.

**Plataforma-alvo**: navegadores atuais em celular, tablet e computador; hospedagem estática.

**Tipo de projeto**: site estático (aplicação web somente de leitura).

**Metas de desempenho**: ver [Desempenho](#desempenho).

**Restrições**: WCAG 2.2 AA; legível a 360 px sem rolagem horizontal; conteúdo completo sem
JavaScript; nenhuma chamada a serviço de terceiros em tempo de execução.

**Escala/Escopo**: cerca de 7–10 capítulos, 3 páginas temáticas, até ~30 pessoas, ~20 lugares,
~50 acontecimentos, ~40 referências; cerca de 60–100 páginas geradas. Tráfego baixo.

## Constitution Check

*Gate: verificado antes da pesquisa (Fase 0) e reavaliado após o desenho (Fase 1).*

| Princípio | Como o plano atende | Desvio |
|---|---|---|
| **I. Preservação da memória** | Acervo estável em formato aberto e versionado; endereços permanentes; registro de alterações relevantes em `alteracoes.yaml` + página "Histórico de revisões" (D12) | Nenhum |
| **II. Rigor histórico** | Natureza obrigatória em cada marcador e entidade; validação impede origem desconhecida como `fato`; hipóteses de terceiros atribuídas; revisão humana do conteúdo antes de publicar | Nenhum. A verificação automática é por parágrafo; a frase a frase é editorial (D4) |
| **III. Fontes** | Referências em ABNT; ids validados; "onde é usada" calculado; divergências em entidade própria, exibidas lado a lado; tipo `informal` para origem conhecida sem valor de fonte | Nenhum |
| **IV. Contexto e imparcialidade** | Contexto dentro dos capítulos, ligado aos acontecimentos; acontecimentos `contexto` só por seleção editorial; introdução sefardita restrita ao necessário | Nenhum (aspecto editorial) |
| **V. Privacidade** | Regra dos 100 anos validada no build; vínculos restritos a uma lista fechada (impede publicar a árvore pessoal); sem cadastro, cookies, analytics, fontes ou mapas de terceiros | Nenhum |
| **VI. Experiência e acessibilidade** | HTML semântico, componentes acessíveis, alternativas textuais, testes axe + teclado + 360 px, revisão com leitor de tela; metas de desempenho e segurança definidas abaixo; paleta verificada quanto a contraste, combinações reprovadas restritas a uso decorativo; animações respeitam `prefers-reduced-motion` | Nenhum |
| **VII. Simplicidade** | Alternativas avaliadas e registradas para cada decisão (research.md); sem backend, banco, CMS, painel ou autenticação; 4 dependências de execução/build e 2 de teste; custo recorrente estimado | Nenhum |
| **VIII. Extensibilidade** | Conteúdo separado do código; `relacoes` entre pessoas preparam uma futura árvore sem implementá-la; novas entidades entram como novos arquivos YAML | Nenhum |
| **IX. Longevidade** | Formatos abertos; site reconstruível a partir do repositório; saída estática portátil para qualquer hospedagem; alternativas registradas para hospedagem (Cloudflare Pages) e gerador (Eleventy) | Nenhum |

**Resultado**: aprovado antes e depois do desenho. Nenhum desvio a justificar.

## Estrutura do Projeto

### Documentação (esta funcionalidade)

```text
specs/001-acervo-mvp/
├── plan.md              # este arquivo
├── research.md          # decisões e alternativas (Fase 0)
├── data-model.md        # entidades e validações (Fase 1)
├── quickstart.md        # roteiro de validação (Fase 1)
├── contracts/
│   ├── rotas.md         # endereços públicos
│   └── conteudo.md      # formato dos arquivos do acervo
└── tasks.md             # gerado por /speckit-tasks
```

### Código-fonte e conteúdo (raiz do repositório)

```text
conteudo/                    # ACERVO: só conteúdo, nenhum código
├── capitulos/
├── paginas/
├── imagens/
└── *.yaml                   # acontecimentos, alteracoes, divergencias, imagens,
                             # lugares, pessoas, referencias, trajetos

src/                         # APLICAÇÃO
├── content.config.ts        # coleções e esquemas de validação
├── pages/                   # rotas (ver contracts/rotas.md)
├── layouts/                 # layout base (SEO, Open Graph, JSON-LD, navegação)
├── components/              # Fonte, Divergencia, LinhaDoTempo, Mapa, Sumario, PessoaCard...
├── plugins/                 # plugin remark dos marcadores :fonte e ::divergencia
├── lib/                     # datas históricas, cálculo de ligações inversas, SEO
└── styles/

scripts/
├── validar-conteudo.ts      # regras além dos esquemas (ver data-model.md)
└── gerar-mapas.ts           # projeção dos lugares e trajetos sobre o SVG (build)

dados-geo/                   # Natural Earth (domínio público), usado só no build
public/                      # robots.txt, fontes tipográficas, favicon
tests/
└── e2e/                     # Playwright + axe

.github/
├── workflows/               # validação, build, testes e publicação
└── dependabot.yml           # atualização de dependências
```

**Decisão de estrutura**: projeto único. A separação que importa é `conteudo/` × `src/`
(Princípio VIII): editar o acervo nunca exige tocar em `src/`.

## Identidade visual

Fonte: briefing "Museu Digital Imersivo", personalidade sofisticada e contemporânea
(2026-11-14). O briefing **não altera requisitos da spec**; ele orienta a apresentação. Decisões
técnicas detalhadas em [research.md](research.md) (D14–D16).

### Impactos na arquitetura

| Diretriz do briefing | Decisão técnica |
|---|---|
| Tokens de design centralizados | Propriedades personalizadas de CSS (variáveis nativas) em `src/styles/tokens.css`: cores, tipografia, espaçamentos, raios, sombras, durações de animação. Nenhum framework de CSS (D14) |
| Áreas claras e escuras alternadas | Duas "superfícies" de seção (`escura` e `clara`), cada uma redefinindo os tokens de texto, link e destaque. Não há alternância de tema pelo usuário (fora do escopo) |
| Playfair Display + Source Sans 3 | Ambas SIL OFL, hospedadas no site em WOFF2, subconjunto latino (D15). Playfair só em títulos e destaques (≥ 24 px); Source Sans 3 em todo o resto |
| Transições e animações discretas | CSS puro + transições nativas entre páginas do navegador (View Transitions), sem biblioteca e sem JavaScript; tudo desligado com `prefers-reduced-motion` (D16) |
| Mapas exploráveis, linha do tempo interativa | Já previstos (D5, D6); recebem os tokens visuais |
| Imagens históricas, fotografias atuais, sem retratos inventados | FR-021 (ajustado em 2026-11-14 para incluir fotografias atuais), D8. Selos visuais padronizados "Ilustração" e "Fotografia atual" |

### Contraste da paleta (WCAG 2.2 AA)

Calculado em 2026-11-14 para as combinações relevantes. Mínimos: 4,5:1 texto normal; 3:1 texto
grande (≥ 24 px ou ≥ 18,7 px negrito) e elementos de interface.

| Texto / elemento | Fundo | Contraste | Uso permitido |
|---|---|---|---|
| Grafite `#202A33` | Marfim `#F3F0E8` | 12,8 | Texto corrido |
| Marfim | Azul profundo `#142638` | 13,5 | Texto corrido |
| Marfim | Azul petróleo `#244760` | 8,6 | Texto corrido |
| Azul petróleo | Marfim | 8,6 | Links e títulos em áreas claras |
| Dourado `#B69A70` | Azul profundo | 5,8 | Texto e detalhes em áreas escuras |
| Azul acinzentado `#8296A6` | Azul profundo | 5,0 | Texto secundário em áreas escuras |
| Dourado | Azul petróleo | 3,7 | Só texto grande e elementos de interface |
| Azul acinzentado | Azul petróleo | 3,2 | Só texto grande e elementos de interface |
| Azul acinzentado | Marfim | 2,7 | **Reprovado**: só decorativo |
| Dourado | Marfim | 2,4 | **Reprovado**: só decorativo |

Consequência: em áreas claras, texto secundário e destaques dourados precisam de **variantes
escurecidas** (meta ≥ 4,5:1), definidas como tokens próprios na implementação. Os tokens
documentam as combinações permitidas; o axe verifica o resultado nas páginas.

### Componentes visuais reutilizáveis

Base: `LayoutBase` (SEO, cabeçalho, rodapé), `Secao` (superfície clara ou escura),
`Cabecalho` e `Navegacao` (com menu móvel acessível), `Rodape`.

Exposição: `Hero`, `CartaoCapitulo`, `NavegacaoCapitulos` (anterior/próximo + sumário),
`Fonte` (marcador de natureza e referência), `Divergencia`, `SeloNatureza`.

Visuais: `Figura` (imagem + legenda + crédito + selo "Ilustração"), `DestaqueDocumento`
(documento ou referência em evidência), `LinhaDoTempo`, `Mapa`.

### Página inicial

Composição do briefing, ligada aos requisitos da spec:

| Seção | Superfície | Conteúdo | Requisito |
|---|---|---|---|
| Abertura (hero) | Escura | Nome, período, frase de apresentação **incluindo o vínculo sefardita**, convite "Comece a exposição" | FR-001, US2-3 |
| Trajetória | Clara | Prévia dos principais acontecimentos (da linha do tempo) e acesso aos capítulos | FR-001, FR-012 |
| Lugares e caminhos | Escura | Vista "Portugal–Brasil" do mapa (mesmo componente) e acesso ao mapa completo | FR-014 |
| Documentos e evidências | Clara | Destaque de 2–3 fontes ou documentos com imagem, natureza e link para `/fontes/` | FR-010 |
| Descubra a história | Escura | Acesso a exposição, sefarditas, família, linha do tempo, mapa e fontes | FR-001, FR-003 |

Ajustes em relação ao briefing:

- **Vínculo sefardita**: o briefing não o menciona na página inicial; a spec exige (US2-3).
  Entra na abertura.
- **Galeria de documentos**: o briefing cita "galerias"; a spec não prevê página de galeria.
  No MVP, documentos aparecem na seção "Documentos e evidências" e nos capítulos. Uma galeria
  própria exigiria alteração da spec.
- **Imagem de abertura**: depende de imagem histórica com direitos de uso. Até existir, a
  abertura usa composição tipográfica sobre o contorno do mapa Portugal–Brasil (gerado pelo
  próprio site), sem depender de imagem.
- **Conteúdo provisório**: a primeira versão usa apenas informações já verificadas (ex.: Silva
  Leme, v. 7) ou texto explicitamente marcado como provisório, que não é publicado.

### Validação da identidade visual

1. Revisão da página inicial no navegador pelo responsável (versão de prévia publicada ou local).
2. axe sem falhas (inclui contraste); teclado; NVDA.
3. 360, 768 e 1280 px sem rolagem horizontal e com hierarquia preservada.
4. `prefers-reduced-motion` ativo: nenhuma animação.
5. Lighthouse dentro das metas de desempenho.
6. **Aprovação explícita da direção visual** antes de implementar as demais páginas.

## Sequência de entregas

Ordem de alto nível (a decomposição em tarefas é do `/speckit-tasks`):

1. **Fundação**: Git e repositório público, Node.js, projeto Astro, tokens de design, fontes,
   `LayoutBase`, publicação automática de prévia.
2. **Página inicial funcional** em Astro, com conteúdo provisório verificado. **Ponto de
   aprovação visual.**
3. **Modelo de conteúdo e validação**: coleções, esquemas, marcadores `:fonte`, validador.
4. **Exposição** (capítulos e sumário), sefarditas e fontes — MVP mínimo (US1, US2, US6).
5. **Linha do tempo e mapa** (US3, US4).
6. **Família e vínculos notáveis** (US5).
7. **SEO, testes finais, domínio e publicação.**

Em paralelo, desde o início: **levantamento de conteúdo** (fichamento das fontes já
verificadas e dos documentos do FamilySearch fornecidos pelo responsável).

## Desempenho

Metas verificáveis (Princípio VI), medidas com Lighthouse em modo celular na página inicial, em
um capítulo e no mapa:

| Métrica | Meta |
|---|---|
| Lighthouse Desempenho | ≥ 90 |
| Lighthouse Acessibilidade | 100 |
| Lighthouse SEO | ≥ 95 |
| LCP (maior elemento visível carregado) | ≤ 2,5 s |
| CLS (deslocamento de layout) | ≤ 0,1 |
| JavaScript por página (compactado) | ≤ 20 KB; mapa ≤ 40 KB |
| Imagem individual (compactada) | ≤ 200 KB |
| Imagem de abertura (hero), versão celular | ≤ 150 KB, pré-carregada |
| Fontes tipográficas por página | ≤ 4 arquivos WOFF2, ≤ 150 KB no total |

Estratégia: HTML estático; JavaScript só nas ilhas do mapa e do filtro da linha do tempo;
imagens otimizadas pelo Astro (AVIF/WebP, tamanhos responsivos, carregamento tardio); fontes
locais com `font-display: swap` e subconjunto latino; nenhum script de terceiros.

## Segurança

Proporcional a um site estático, público e somente de leitura:

- Sem servidor de aplicação, banco, formulário ou login: não há superfície de ataque de
  aplicação além dos arquivos servidos.
- HTTPS obrigatório (certificado automático do GitHub Pages).
- Política de segurança de conteúdo (CSP) via `<meta>` no layout: só recursos do próprio domínio,
  sem scripts inline arbitrários.
- Nenhum script, fonte, mapa ou medição de terceiros.
- Dependências: lockfile versionado, Dependabot semanal, `npm audit` no CI (falha em
  vulnerabilidade alta ou crítica).
- Publicação só a partir do ramo principal, pelo GitHub Actions, com permissões mínimas.
- Verificação: testes e2e conferem ausência de requisições a domínios externos; `npm audit`
  sem itens altos ou críticos.

## Dependências externas

| Dependência | Finalidade | Requisito | Alternativas | Maturidade | Licença | Substituição |
|---|---|---|---|---|---|---|
| Astro | Gerar o site estático; validar coleções | FR-001–FR-028 (base) | Eleventy, Hugo | Madura, manutenção ativa | MIT | Reescrever templates; acervo intacto |
| remark-directive | Interpretar `:fonte` e `::divergencia` | FR-006, FR-007, FR-009 | Sintaxe própria via regex | Ecossistema unified, estável | MIT | Plugin próprio simples |
| @astrojs/sitemap | Gerar sitemap | FR-026 | Script próprio | Integração oficial | MIT | Script de ~30 linhas |
| d3-geo | Projetar coordenadas no SVG (só build) | FR-014 | proj4js, cálculo próprio | Muito madura | ISC | Projeção simples própria |
| Natural Earth | Contornos geográficos | FR-014 | Dados do IBGE/DGT | Referência consolidada | Domínio público | Qualquer base aberta |
| Playwright | Testes ponta a ponta | SC-003, SC-006, SC-007, SC-010 | Cypress, pa11y-ci | Muito madura | Apache-2.0 | Cypress |
| @axe-core/playwright | Acessibilidade automática | FR-022, SC-006 | pa11y, Lighthouse | Padrão de mercado | MPL-2.0 | pa11y |
| GitHub Pages + Actions | Hospedagem e publicação | Publicação | Cloudflare Pages, Netlify | Madura | Serviço gratuito (repo público) | Qualquer hospedagem estática |

Fontes tipográficas: Playfair Display e Source Sans 3, licença SIL OFL, hospedadas no próprio
site (D15). Alternativa registrada: Cormorant Garamond para títulos.

## Custos recorrentes

| Item | Custo estimado | Premissa |
|---|---|---|
| Hospedagem (GitHub Pages) | R$ 0 | Repositório público; tráfego dentro dos limites gratuitos |
| CI/CD (GitHub Actions) | R$ 0 | Gratuito para repositório público |
| Domínio `.com.br` | ≈ R$ 40/ano | Tabela do Registro.br; confirmar no registro |
| Serviços externos e APIs | R$ 0 | Nenhum serviço em tempo de execução |
| **Total** | **≈ R$ 40/ano** | — |

Se o repositório for privado (Q-1): hospedagem no Cloudflare Pages, R$ 0. Alternativa no GitHub
Pages com repositório privado: plano pago do GitHub.

## Matriz de rastreabilidade

| Req. | Componente técnico | Estratégia | Verificação |
|---|---|---|---|
| FR-001 | Rota `/`, página `inicio.md`, componentes da página inicial | Cinco seções do briefing visual, com destaque sefardita na abertura | Aprovação visual; cenário manual 1; e2e |
| FR-002 | Coleção de capítulos | Capítulos ordenados por `ordem` | Revisão editorial; e2e (sumário completo) |
| FR-003 | Rotas `/exposicao/*`, Sumário, anterior/próximo | Endereço por `slug` permanente | e2e; cenário manual 2 |
| FR-004 | Conteúdo dos capítulos | Contexto dentro do capítulo | Revisão editorial |
| FR-005 | Rota `/sefarditas/` | Página temática com os tópicos de US2-1 | Revisão editorial (checklist de tópicos) |
| FR-006 | Plugin `:fonte`, componente Fonte | Natureza obrigatória e exibida | Validação no build; e2e |
| FR-007 | Validador | `sem-fonte` e `informal` nunca com `fato` | Validação no build (teste negativo) |
| FR-008 | `referencias.yaml` campo `abnt`, `localizacao` | ABNT escrita à mão | Revisão editorial |
| FR-009 | `divergencias.yaml`, componente Divergencia | Versões lado a lado | Validação (≥ 2 versões); cenário manual 4 |
| FR-009a | Naturezas `tradicao` e `hipotese`, tipo `informal` | Atribuição obrigatória | Validação no build |
| FR-010 | Rota `/fontes/` | Lista por tipo; "onde é usada" calculado | e2e |
| FR-011 | `alteracoes.yaml`, `/sobre/historico-de-revisoes/` | Registro editorial + Git | Validação de campos; revisão |
| FR-012 | Componente LinhaDoTempo | `<ol>` com tipo visual distinto | e2e; cenário manual 5 |
| FR-013 | `lib/datas` | Formatação por `precisao`; `exibicao` para divergências | Testes da função; e2e |
| FR-014 | Componente Mapa + `gerar-mapas` | SVG com duas vistas e trajetos | e2e; cenário manual 6 |
| FR-015 | Mapa, `lugares.yaml`, `trajetos.yaml` | Área para aproximado; tracejado + rótulo para presumido | Validação; cenário manual 7 |
| FR-016 | Listas textuais do mapa e da linha do tempo | HTML nativo, sem depender de JS | e2e de teclado; cenário manual 8 |
| FR-017 | `lib/ligacoes` | Ligações inversas calculadas no build | e2e de links internos |
| FR-018 | Rotas `/familia/*` | Pessoas por vínculo | e2e; revisão |
| FR-018a | `/familia/vinculos-notaveis/` | `ligacao_notavel` com tipo, natureza e fontes | Validação; e2e |
| FR-019 | Validador | Regra dos 100 anos; vínculos em lista fechada | Validação (teste negativo) |
| FR-020 | Arquitetura estática | Sem formulários, cookies ou analytics | e2e (sem requisições externas) |
| FR-021 | `imagens.yaml`, componente `Figura` | Metadados obrigatórios; selo "Ilustração" ou "Fotografia atual" junto à legenda, conforme o `tipo`; imagens históricas com referência própria; todos os tipos misturados livremente no conteúdo, sem seção ou galeria separada | Validação (tipo e metadados obrigatórios); e2e (selo presente para `ilustracao` e `fotografia-atual`); revisão editorial (rosto de Sebastião, direitos de reprodução) |
| FR-022 | Todos os componentes | HTML semântico, foco visível, contraste | axe; NVDA; Lighthouse |
| FR-023 | CSS responsivo | Layout fluido, mobile first | e2e em 360, 768 e 1280 px |
| FR-024 | Separação `conteudo/` × `src/` | Coleções leem `conteudo/` | Cenário manual 12 |
| FR-025 | Conteúdo; `lang="pt-BR"` | Transcrições como citação | Revisão; e2e (`lang`) |
| FR-026 | SSG; sitemap; robots.txt | HTML completo por página | e2e sem JS; Search Console |
| FR-027 | Layout base; esquema exige `descricao` | `<title>` e `meta description` | Validação; e2e |
| FR-028 | Layout base | Open Graph + Twitter Card | e2e (meta tags); cenário manual 11 |
| SC-001 | Conteúdo | — | Teste com 3 leitores |
| SC-002 | Validador | Marcador por parágrafo; natureza e referência em entidades | Validação no build |
| SC-003 | Navegação | Afirmação → referência em 1 clique; início → capítulo em 2 | Cenário manual 3 |
| SC-004 | LinhaDoTempo, Mapa | Todo acontecimento `trajetoria` e seus lugares exibidos | e2e (contagem) |
| SC-005 | Divergências | 6 divergências conhecidas cadastradas | Revisão editorial |
| SC-006 | Acessibilidade | axe + teclado + NVDA | e2e; revisão manual |
| SC-007 | CSS | Sem rolagem horizontal | e2e a 360 px |
| SC-008 | Separação de conteúdo | Novo acontecimento via YAML | Cenário manual 12 |
| SC-009 | Validador | Regra dos 100 anos | Validação (teste negativo) |
| SC-010 | Rotas, layout, SSG | Endereço permanente, título, descrição | e2e |

### Dependências editoriais e de conteúdo

Requisitos atendidos pela estrutura, mas cujo cumprimento final depende de conteúdo:

- **Redação dos capítulos e da introdução sefardita** (FR-002, FR-004, FR-005): feita a partir
  das fontes levantadas; lacunas declaradas, nunca preenchidas.
- **Documentos do FamilySearch e certificado da CIL**: o responsável fornecerá; até lá, as
  afirmações correspondentes não são publicadas ou ficam com a natureza adequada.
- **Referências ABNT completas** (editora, ano, volume): conferir nas obras.
- **Fontes do casamento de Mécia da Cunha Lobo com Francisco Vieira Tavares** (vínculo notável
  com Raposo Tavares): pendentes.
- **Imagens**: levantamento de iconografia de domínio público ou com licença adequada.
- **Documentos do FamilySearch e de outros acervos digitais**: as informações extraídas podem
  ser usadas como evidência, com referência à fonte. A **imagem** digitalizada só é publicada
  após verificar as condições de uso da coleção e do custodiante original; na dúvida, o
  documento entra apenas como referência, sem imagem. Não há proibição geral: com permissão
  aplicável, a imagem pode ser publicada (ver D8 em research.md).

A implementação técnica pode avançar com conteúdo parcial; a publicação do MVP depende do
conteúdo mínimo de cada capítulo.

## Decisões do responsável (2026-11-14)

| # | Questão | Decisão |
|---|---|---|
| Q-1 | Repositório público ou privado? | **Público**. Hospedagem no GitHub Pages, gratuita |
| Q-2 | Domínio próprio? | **Sim**, `.com.br` (≈ R$ 40/ano). Nome ainda a escolher e registrar; não bloqueia a implementação, só a publicação final |
| Q-3 | Mapa em SVG sem zoom livre (D6)? | **Aprovado**, com avaliação após a primeira versão do mapa. Se não agradar, a alternativa registrada é Leaflet (D6) |

## Riscos

| Risco | Mitigação |
|---|---|
| Conteúdo histórico demora mais que o código | Implementação técnica independente do conteúdo final; publicar capítulos conforme ficam prontos |
| Marcação de afirmações se torna trabalhosa na escrita | Sintaxe curta; validação por parágrafo; revisar a ergonomia após o primeiro capítulo |
| Referências ABNT inconsistentes | Modelo de exemplos em `conteudo.md`; revisão editorial |
| Endereço publicado precisa mudar | Redirecionamento do endereço antigo; `id` e `slug` tratados como imutáveis |
| Atualizações do Astro quebram o build | Lockfile, Dependabot e testes no CI antes de publicar |
| Estética "imersiva" pesar no desempenho (imagens grandes, animações) | Orçamento de imagem e fontes; animações só em CSS; Lighthouse no ponto de aprovação visual |
| Falta de imagens históricas com direitos de uso | Abertura sem dependência de imagem; levantamento de iconografia de domínio público como frente de conteúdo |
| Dourado e azul acinzentado sem contraste em áreas claras | Variantes escurecidas como tokens; axe no CI |
| Node.js não instalado na máquina do responsável (verificado em 2026-11-14) | Instalação do Node.js LTS como primeira etapa da fundação |

## Complexity Tracking

Não se aplica: a verificação constitucional não identificou desvios.
