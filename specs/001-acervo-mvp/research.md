# Pesquisa e Decisões Técnicas: Exposição Histórica Digital — MVP

**Funcionalidade**: `001-acervo-mvp` | **Data**: 2026-11-13 | **Plano**: [plan.md](plan.md)

Cada decisão segue o formato exigido pelo Princípio VII da Constituição: solução escolhida,
alternativas descartadas, critérios e justificativa. Critérios usados em todas as comparações:
complexidade (componentes e serviços), manutenção, portabilidade, desempenho, acessibilidade e
custo operacional.

---

## D1. Estratégia de renderização

**Decisão**: geração estática (SSG). O site inteiro é gerado como arquivos HTML no momento da
publicação; o visitante recebe páginas prontas.

**Justificativa**: o site é de leitura, sem cadastro, formulários ou conteúdo por visitante
(FR-020). SSG entrega o texto completo no HTML (FR-026, SC-010), não depende de JavaScript para
indexação, não exige servidor de aplicação nem banco de dados (Princípio VII) e pode ser hospedado
em qualquer serviço de arquivos estáticos (Princípio IX).

**Alternativas descartadas**:

| Alternativa | Motivo do descarte |
|---|---|
| SSR (renderização no servidor) | Exige servidor em execução contínua, com custo e manutenção, sem requisito que o justifique |
| SPA (aplicação renderizada no navegador) | O conteúdo depende de JavaScript para aparecer; pior para SEO, acessibilidade e desempenho |
| HTML escrito à mão | Não separa conteúdo de código (FR-024, Princípio VIII); cada correção exigiria editar HTML |

---

## D2. Gerador de site estático

**Decisão**: **Astro** (licença MIT), na versão estável vigente no momento da implementação.

**Justificativa**:

- Gera HTML sem JavaScript por padrão; JavaScript só entra nos componentes que precisam dele
  ("ilhas"), o que atende desempenho e indexação.
- Tem **coleções de conteúdo com esquemas validados**: arquivos Markdown e YAML são checados no
  momento da geração do site (build). Um campo obrigatório ausente, como a natureza de uma
  afirmação, interrompe a publicação. Isso transforma regras da Constituição em verificação
  automática (Princípios II, III e V).
- Lê conteúdo de pastas fora do código-fonte, permitindo a pasta `conteudo/` separada (FR-024).
- Inclui otimização de imagens e integração oficial de sitemap.
- Projeto maduro, com manutenção ativa, ampla documentação e base de usuários grande.

**Alternativas descartadas**:

| Alternativa | Pontos fortes | Motivo do descarte |
|---|---|---|
| Eleventy (11ty) | Muito simples, MIT, maduro | Sem validação de esquema nativa; seria preciso montar a validação à mão. Diferença pequena; é o substituto natural se o Astro for abandonado |
| Hugo | Binário único, muito rápido, sem Node.js | Linguagem de templates menos legível; validação de dados fraca; componentes interativos menos naturais |
| Next.js | Muito popular | Pensado para aplicações React com servidor; peso e complexidade sem requisito correspondente |
| Jekyll | Nativo do GitHub Pages | Ecossistema Ruby em declínio; validação de dados fraca |

**Substituição**: o conteúdo fica em Markdown e YAML padrão, sem formato proprietário. Trocar o
gerador exige reescrever os templates e os componentes, mas não o acervo (Princípio IX).

---

## D3. Armazenamento e formato do conteúdo

**Decisão**: arquivos versionados no próprio repositório, na pasta `conteudo/`:

- **Markdown** para textos narrativos (capítulos, seção sobre os sefarditas, página "Sobre").
- **YAML** para entidades estruturadas (pessoas, lugares, trajetos, acontecimentos, referências,
  divergências, imagens, registro de alterações), um arquivo por tipo de entidade.
- Relacionamentos por **identificadores** legíveis (ex.: `silva-leme-v7`, `juqueri`).

**Justificativa**: formatos abertos e legíveis (Princípio IX), editáveis em qualquer editor de
texto, com histórico completo no Git e sem serviço externo. O volume do MVP (dezenas de pessoas,
lugares e acontecimentos) não justifica banco de dados. YAML é mais fácil de ler e editar à mão
do que JSON e aceita comentários.

**Alternativas descartadas**:

| Alternativa | Motivo do descarte |
|---|---|
| Banco de dados (SQLite, PostgreSQL) | Nenhum requisito exige consulta dinâmica; adicionaria servidor ou etapa de exportação |
| CMS headless (ex.: Strapi, Sanity, Contentful) | Serviço externo, custo ou manutenção, dependência de fornecedor; a spec exclui "sistema complexo de gerenciamento de conteúdo" |
| CMS baseado em Git (ex.: Decap CMS) | Daria uma interface de edição, mas não há requisito para isso no MVP; pode ser acrescentado depois sem mudar o formato dos arquivos |
| Somente JSON | Menos legível, sem comentários |
| Um arquivo por item (ex.: um YAML por pessoa) | Melhor para acervos grandes; no MVP espalha o conteúdo sem ganho. Migração simples se o acervo crescer |

---

## D4. Marcação de afirmações dentro do texto narrativo

**Problema**: FR-006 e FR-007 exigem que cada afirmação exiba natureza e fonte. O texto dos
capítulos é corrido; é preciso marcar afirmações sem tornar a escrita impraticável.

**Decisão**: **diretivas Markdown** (extensão padronizada da sintaxe Markdown, via biblioteca
`remark-directive`, MIT). Exemplo:

```markdown
Sebastião de Freitas era natural de Alagoa, no termo de Silves, no Algarve
:fonte{nat=fato ref=silva-leme-v7 p=168}.
```

Divergências entram como bloco: `::divergencia{id=jornada-jeronimo-pereira}`.

Na geração do site, cada marcador vira um indicador visível de natureza e um link para a
referência. Um validador próprio falha a publicação se:

- um parágrafo de capítulo não tiver nenhum marcador `:fonte`;
- a natureza não for uma das quatro previstas;
- o identificador da referência ou da divergência não existir;
- uma informação sem fonte formal (`ref=sem-fonte`) for classificada como `fato`.

**Justificativa**: mantém o texto legível para quem escreve, coloca a natureza ao lado da frase e
permite validação automática.

**Alternativas descartadas**:

| Alternativa | Motivo do descarte |
|---|---|
| Afirmações somente em YAML, montadas em texto pelo template | O texto vira fragmentos; a escrita narrativa fica inviável |
| Notas de rodapé Markdown comuns | Não carregam a natureza da informação de forma validável |
| MDX (Markdown com componentes) | Mistura código no conteúdo, contrariando o Princípio VIII |

**Granularidade**: a unidade mínima verificada automaticamente é o parágrafo. A marcação frase
a frase, quando o parágrafo tiver afirmações de naturezas diferentes, é responsabilidade
editorial e entra no checklist de revisão de conteúdo.

---

## D5. Linha do tempo

**Decisão**: **componente próprio**, gerado como HTML estático: uma lista ordenada (`<ol>`)
estilizada como linha do tempo. Filtro opcional (vida de Sebastião, contexto ou ambos) com pouco
JavaScript; sem o script, todos os itens continuam visíveis.

**Justificativa**: a própria lista é a alternativa textual (FR-016), sem duplicar conteúdo. Leitor
de tela e teclado funcionam nativamente. Nenhuma dependência externa.

**Alternativas descartadas**:

| Alternativa | Motivo do descarte |
|---|---|
| TimelineJS (Knight Lab) | Pesada, pensada para planilhas Google, acessibilidade limitada, conteúdo renderizado só via JavaScript |
| vis-timeline | Biblioteca grande, voltada a cronogramas interativos complexos; acessibilidade fraca |

---

## D6. Mapa interativo

**Decisão**: **mapas em SVG gerados na publicação**, a partir de dados geográficos de domínio
público (**Natural Earth**), com interação própria e leve:

- Duas vistas: **"Portugal–Brasil"** (travessia atlântica) e **"Capitania de São Vicente"**
  (detalhe de São Paulo, Juqueri, Santos e arredores). O Guairá aparece na vista regional.
- Lugares são elementos focáveis e clicáveis; ao selecionar um lugar, abre um painel com nome
  histórico, nome atual, acontecimentos e fontes.
- Trajetos documentados: linha contínua. Trajetos presumidos: linha tracejada **e** rótulo
  "presumido". Lugares aproximados: área sombreada em vez de ponto. A diferença nunca depende só
  de cor (WCAG).
- Projeção cartográfica calculada na geração do site com **d3-geo** (ISC); nenhum código de mapa
  é enviado ao navegador além da interação.
- Abaixo do mapa, a **lista textual** de lugares e trajetos, com o mesmo conteúdo (FR-016).

**Justificativa**: nenhum serviço externo em tempo de execução. Isso evita custo, dependência de
fornecedor (Princípio IX) e envio do IP do visitante a terceiros (Princípio V e LGPD). Também dá
controle total de acessibilidade e um visual coerente com uma exposição histórica, sem ruas e
rodovias atuais.

**Alternativas descartadas**:

| Alternativa | Pontos fortes | Motivo do descarte |
|---|---|---|
| Leaflet com camadas de mapa (tiles) do OpenStreetMap ou de provedor comercial | Biblioteca madura (BSD-2), zoom livre | Depende de servidor de tiles externo (política de uso, possível custo, IP do visitante enviado a terceiros); mostra o mapa atual, anacrônico |
| MapLibre GL | Mapas vetoriais modernos | Biblioteca grande, exige WebGL e serviço de tiles; complexidade desproporcional |
| Imagem estática sem interação | O mais simples | Não atende "mapa interativo" (FR-014) |

**Contrapartida aceita**: não há zoom livre. É compensado pelas duas vistas fixas. Ver questão
em aberto Q-3 no plano.

---

## D7. SEO e indexação

**Decisão**:

- HTML estático completo por página (D1).
- Endereços permanentes, em minúsculas, sem acentos, derivados do tema, com barra final
  (ver [contracts/rotas.md](contracts/rotas.md)). Endereço publicado não muda; se precisar
  mudar, o antigo redireciona para o novo.
- `<title>`, `meta description` e URL canônica obrigatórios por página; a validação falha se
  faltar título ou descrição (FR-027).
- Open Graph e Twitter Card com imagem por seção (sem rosto de Sebastião).
- `sitemap.xml` gerado pela integração oficial `@astrojs/sitemap` (MIT).
- `robots.txt` estático, liberando tudo e apontando o sitemap.
- Dados estruturados JSON-LD (schema.org): `Person` para Sebastião e pessoas da família,
  `Article` para capítulos, `Place` para lugares, `BreadcrumbList` para navegação. Datas
  aproximadas entram como texto, nunca como data exata falsa.

**Justificativa**: atende FR-026 a FR-028 e SC-010 sem serviços externos.

**Alternativas descartadas**: plugins de SEO de terceiros (desnecessários: os metadados são
poucos e gerados pelo layout base).

---

## D8. Imagens

**Decisão**: imagens em `conteudo/imagens/`, com metadados em `imagens.yaml` (legenda, crédito,
origem, licença, texto alternativo, tipo `historica` ou `ilustracao`). Otimização pelo próprio
Astro (formatos AVIF/WebP, tamanhos responsivos, `loading="lazy"` abaixo da dobra). A validação
falha se faltar algum metadado (FR-021).

**Selos**: imagens `ilustracao` e `fotografia-atual` exibem o selo correspondente junto à
legenda; imagens `historica` são identificadas pela legenda e pela referência. Os três tipos
aparecem misturados nos capítulos e páginas, sem seção ou galeria separada.

**Direitos de reprodução de documentos digitalizados** (ex.: FamilySearch):

- Informação extraída de um registro pode ser usada como evidência, com referência à fonte.
- Publicar a **imagem** do documento exige verificar as condições de uso da coleção e do
  custodiante original; o campo `licenca` registra a base da permissão.
- Na dúvida ou havendo restrição, o documento é citado como referência, sem publicar a imagem.
- Não há proibição geral: com permissão aplicável, a imagem pode ser publicada.

**Alternativas descartadas**: CDN de imagens (serviço externo sem necessidade).

---

## D9. Fontes tipográficas

**Decisão**: fontes de licença aberta (SIL OFL) hospedadas junto com o site. Nenhuma chamada a
Google Fonts ou similar.

**Justificativa**: privacidade (Princípio V) e independência (Princípio IX). A escolha estética
das fontes é tarefa de design, não de plano.

---

## D10. Hospedagem e publicação

**Decisão**: **GitHub Pages**, com publicação automática por **GitHub Actions** a cada alteração
aprovada no ramo principal. Domínio próprio apontado para o GitHub Pages.

**Justificativa**: gratuito para repositório público, HTTPS automático, publicação integrada ao
repositório que já guarda o conteúdo. O resultado do build é uma pasta de arquivos estáticos que
roda em qualquer outro serviço (Princípio IX).

**Alternativas**:

| Alternativa | Avaliação |
|---|---|
| Cloudflare Pages | Gratuito também para repositório privado; cabeçalhos HTTP configuráveis. **Alternativa preferida se o repositório for privado** (Q-1) |
| Netlify | Gratuito com limites; semelhante ao Cloudflare Pages |
| Servidor próprio ou VPS | Custo e manutenção sem necessidade |

**Pré-requisito**: o projeto ainda não está em Git. Criar o repositório é a primeira tarefa.

---

## D11. Testes e verificação

**Decisão**:

1. **Validação de conteúdo no build**: esquemas das coleções (Zod, incluído no Astro) e um
   script de validação próprio para regras que o esquema não cobre (ver
   [data-model.md](data-model.md)): integridade de referências cruzadas, marcadores por
   parágrafo, regra dos 100 anos, natureza × origem desconhecida, metadados de imagem e SEO.
2. **Testes ponta a ponta com Playwright** (Apache-2.0) e **axe-core** (`@axe-core/playwright`,
   MPL-2.0) sobre o site gerado: acessibilidade automática, ausência de rolagem horizontal a
   360 px, navegação por teclado no mapa e na linha do tempo, presença de título, descrição e
   canônica, links internos sem quebra.
3. **Lighthouse** (já embutido no Chrome) executado manualmente antes de cada publicação
   relevante, sem dependência no projeto.
4. **Revisão manual**: leitor de tela (NVDA no Windows) e teste com 3 leitores (SC-001).

**Alternativas descartadas**: pa11y-ci (cobre só acessibilidade; o Playwright cobre também
layout e navegação), Lighthouse CI (servidor ou serviço adicional para histórico; a execução
manual basta no MVP), testes unitários extensos (a lógica do site é pequena; o foco é validar
conteúdo e páginas geradas).

---

## D12. Registro de alterações relevantes (FR-011, Princípio I)

**Decisão**: duas camadas.

- **Git**: histórico completo e automático de toda mudança.
- **`conteudo/alteracoes.yaml`**: registro editorial apenas das alterações *relevantes* (correção
  factual, revisão de interpretação, inclusão ou remoção de fonte), com data, conteúdo afetado,
  descrição, motivo e fontes. Exibido em uma página "Histórico de revisões" e, em cada página
  afetada, como "Revisado em <data>" com link para a entrada.

**Justificativa**: o Git registra tudo, mas não é legível para o visitante nem distingue o que é
relevante. O YAML resolve isso sem ferramenta adicional.

---

## D13. Ambiente de desenvolvimento

**Decisão**: Node.js na versão LTS vigente e **npm** (já incluído no Node). Sem gerenciadores
alternativos (pnpm, yarn) para não somar ferramentas.

---

## D14. Tokens de design e estilos

**Decisão**: CSS nativo com propriedades personalizadas (variáveis CSS) em
`src/styles/tokens.css`, mais estilos com escopo por componente (recurso nativo do Astro).
Superfícies `clara` e `escura` redefinem os tokens de cor do conteúdo interno.

**Justificativa**: atende ao briefing (tokens centralizados) sem dependência. Tokens nativos
funcionam em qualquer gerador e sobrevivem a uma troca de ferramenta (Princípio IX).

**Alternativas descartadas**:

| Alternativa | Motivo do descarte |
|---|---|
| Tailwind CSS | Dependência e etapa de build a mais; classes utilitárias espalhadas pelos templates dificultam a leitura para um mantenedor não especialista |
| Sass | Recursos (variáveis, aninhamento) hoje cobertos por CSS nativo |
| Biblioteca de componentes (ex.: Bootstrap) | Estética genérica, contrária ao briefing; peso desnecessário |

---

## D15. Tipografia

**Decisão**: Playfair Display (títulos e destaques) e Source Sans 3 (texto e interface), ambas
SIL OFL, em versões variáveis WOFF2 com subconjunto latino, hospedadas no site, com
`font-display: swap` e pré-carregamento da fonte de texto.

**Justificativa**: escolha do briefing; licença aberta; hospedagem própria preserva privacidade
(D9). Playfair tem alto contraste de traço e fica ruim em tamanhos pequenos; por isso fica
restrita a ≥ 24 px.

**Alternativas**: Cormorant Garamond para títulos (registrada no briefing; mais delicada, exige
tamanhos ainda maiores). Pacotes npm de fontes (ex.: Fontsource) foram descartados: os arquivos
WOFF2 copiados para `public/` eliminam uma dependência.

---

## D16. Movimento e transições

**Decisão**:

- Transições entre páginas com a API nativa de View Transitions entre documentos, ativada só
  por CSS (melhoria progressiva: navegadores sem suporte navegam normalmente).
- Animações de entrada discretas em CSS; revelação ao rolar, se usada, com um único script
  pequeno (IntersectionObserver), opcional.
- Tudo desativado com `prefers-reduced-motion: reduce`. Nenhum movimento contínuo ou automático.

**Alternativas descartadas**:

| Alternativa | Motivo do descarte |
|---|---|
| Roteador de transições do Astro (ClientRouter) | Transforma a navegação em JavaScript; desnecessário com a API nativa |
| Bibliotecas de animação (GSAP, Framer Motion, AOS) | Dependência e peso para efeitos que o CSS resolve |
| Rolagem com efeito parallax | Prejudica desempenho e acessibilidade (WCAG 2.3.3) |

---

## Pontos que dependem de decisão do responsável

Decididos em 2026-11-14 (ver [plano](plan.md#decisões-do-responsável-2026-11-14)): repositório
público (Q-1), domínio `.com.br` próprio (Q-2, nome a definir) e mapa SVG sem zoom livre, a
reavaliar após a primeira versão (Q-3).
