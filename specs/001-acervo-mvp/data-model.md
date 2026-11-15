# Modelo de Dados e Conteúdo: Exposição Histórica Digital — MVP

**Funcionalidade**: `001-acervo-mvp` | **Data**: 2026-11-13 | **Plano**: [plan.md](plan.md)

O acervo fica em `conteudo/`, separado do código (Princípio VIII). O formato exato dos arquivos
está em [contracts/conteudo.md](contracts/conteudo.md); aqui ficam as entidades, os campos, os
relacionamentos e as regras de validação.

Convenções:

- Todo item tem `id`: minúsculas, sem acentos, palavras separadas por hífen (ex.: `juqueri`).
  O `id` nunca muda depois de publicado, porque endereços e ligações dependem dele.
- Campos marcados com * são obrigatórios.
- "Validação" indica regra verificada automaticamente no build (a publicação falha se violada).

---

## Tipos comuns

### Natureza da informação

Valores fixos (FR-006, Princípio II):

| Valor | Rótulo exibido |
|---|---|
| `fato` | Fato documentado |
| `historiografia` | Informação historiográfica |
| `tradicao` | Tradição genealógica |
| `hipotese` | Hipótese |

### Data histórica

Representa datas exatas, aproximadas, intervalos e limites.

| Campo | Descrição |
|---|---|
| `ano`* | Ano (inteiro), usado para ordenar |
| `mes`, `dia` | Opcionais |
| `precisao`* | `exata`, `aproximada` (c.), `antes-de`, `depois-de`, `intervalo` |
| `ate` | Ano final, quando `precisao = intervalo` |
| `exibicao` | Texto livre que substitui a formatação automática (ex.: "1595 ou 1596") |

Exibição automática: `exata` → "1600"; `aproximada` → "c. 1565"; `antes-de` → "antes de 1632";
`intervalo` → "1599–1605".

### Lista de referências

Lista de citações: `{ ref*: id da Referência, p: página ou localização no documento }`.

---

## Entidades

### Referência (`referencias.yaml`)

Fonte que sustenta afirmações (FR-007, FR-008, FR-010).

| Campo | Descrição |
|---|---|
| `id`* | Ex.: `silva-leme-v7` |
| `abnt`* | Referência completa no formato ABNT (NBR 6023), escrita à mão |
| `tipo`* | `primaria` (documento da época), `secundaria` (obra historiográfica ou genealógica) ou `informal` (origem conhecida, mas sem valor de fonte formal: post, vídeo, árvore colaborativa) |
| `localizacao` | Dados complementares: acervo, fundo, cota (FR-008) |
| `url` | Endereço on-line, quando houver |
| `acesso` | Data de acesso, para fontes on-line |
| `observacao` | Nota editorial (ex.: "transcreve Pedro Taques") |

Identificador reservado: `sem-fonte`, para informação sem origem conhecida.

"Onde é usada" (FR-010) não é campo: é **calculado** no build a partir de todas as citações.

Validação:

- `id` único; `abnt` não vazio.
- Toda citação no acervo aponta para um `id` existente ou para `sem-fonte`.
- Referência `informal` ou `sem-fonte` não pode sustentar afirmação de natureza `fato`
  (FR-007).

### Capítulo (`capitulos/NN-<slug>.md`)

Trecho da narrativa (FR-002, FR-003, FR-004).

Metadados (frontmatter):

| Campo | Descrição |
|---|---|
| `titulo`* | Título exibido |
| `slug`* | Parte do endereço (ex.: `chegada-ao-brasil`) |
| `ordem`* | Posição na exposição (inteiro, único) |
| `descricao`* | Descrição para buscadores e compartilhamento (FR-027), 50–160 caracteres |
| `periodo` | Data histórica de início e fim do capítulo |
| `acontecimentos` | Ids de acontecimentos tratados no capítulo |
| `imagem` | Id de imagem de destaque |

Corpo: Markdown com marcadores de afirmação (`:fonte{...}`) e blocos de divergência
(`::divergencia{...}`). Ver [contracts/conteudo.md](contracts/conteudo.md#marcação-de-afirmações).

Validação:

- `ordem` e `slug` únicos.
- Todo parágrafo do corpo tem ao menos um marcador `:fonte` (exceto citações de época marcadas
  como transcrição, que herdam o marcador do parágrafo seguinte).
- Todo marcador tem natureza válida e referência existente.

Estrutura provisória dos capítulos (definição editorial; não é conteúdo histórico):
origem em Portugal; raízes cristãs-novas e sefarditas; chegada ao Brasil; São Paulo e família;
atuação pública e militar; últimos anos e falecimento; legado. A divisão final será feita na
redação do conteúdo.

### Página temática (`paginas/<slug>.md`)

Textos fora da sequência de capítulos: introdução aos sefarditas (FR-005), página "Sobre o
projeto" (método, legenda de naturezas). Mesmos campos do capítulo, sem `ordem`. A introdução
aos sefarditas segue as mesmas regras de marcação.

### Acontecimento (`acontecimentos.yaml`)

Fato datado, exibido na linha do tempo (FR-012, FR-013).

| Campo | Descrição |
|---|---|
| `id`* | Ex.: `armado-cavaleiro-1600` |
| `titulo`* | Frase curta |
| `data`* | Data histórica |
| `tipo`* | `trajetoria` (vida de Sebastião) ou `contexto` |
| `natureza`* | Natureza da informação |
| `referencias`* | Lista de referências (ao menos uma, ou `sem-fonte`) |
| `lugares` | Ids de lugares |
| `pessoas` | Ids de pessoas |
| `capitulo` | Slug do capítulo e âncora do trecho correspondente |
| `divergencia` | Id de divergência, quando houver |

Validação: ids de lugares, pessoas, capítulo e divergência existentes; referências válidas.

SC-004: todo acontecimento `trajetoria` aparece na linha do tempo; acontecimentos `contexto`
entram por inclusão editorial no arquivo.

### Lugar (`lugares.yaml`)

| Campo | Descrição |
|---|---|
| `id`* | Ex.: `juqueri` |
| `nome_historico`* | Ex.: "Juqueri" |
| `nome_atual` | Ex.: "Mairiporã (SP)" |
| `pais`* | `portugal` ou `brasil` |
| `coordenadas`* | `[latitude, longitude]` |
| `precisao`* | `exata`, `aproximada` ou `regiao` |
| `raio_km` | Raio da área sombreada, quando `aproximada` ou `regiao` |
| `vista`* | `atlantico`, `sao-vicente` ou ambas |
| `descricao` | Texto curto |
| `referencias` | Fontes da identificação do lugar |

"Acontecimentos associados" (FR-015) é **calculado** a partir de `acontecimentos.lugares`.

Validação: coordenadas dentro dos limites da vista declarada.

### Trajeto (`trajetos.yaml`)

Deslocamento entre lugares (FR-014, FR-015).

| Campo | Descrição |
|---|---|
| `id`* | Ex.: `bahia-sao-paulo` |
| `de`*, `para`* | Ids de lugares |
| `comprovacao`* | `documentado` ou `presumido` |
| `acontecimento` | Id do acontecimento relacionado |
| `referencias`* | Fontes |
| `descricao` | Texto curto |

Regra de exibição: `presumido` → linha tracejada e rótulo "presumido"; nunca só por cor.

Validação: `documentado` exige ao menos uma referência que não seja `informal` nem `sem-fonte`.

### Pessoa (`pessoas.yaml`)

Família e vínculos notáveis (FR-018, FR-018a, FR-019).

| Campo | Descrição |
|---|---|
| `id`* | Ex.: `maria-pedroso` |
| `nome`* | Nome principal |
| `variantes` | Outras grafias (ex.: "Maria Pedroso de Alvarenga") |
| `nascimento`, `obito` | Datas históricas |
| `vinculo`* | `protagonista`, `pai`, `mae`, `conjuge`, `sogro`, `sogra`, `filho`, `filha`, `conjuge-de-filho`, `notavel` |
| `relacoes` | Lista `{ tipo, pessoa }` (ex.: `{ tipo: filho-de, pessoa: sebastiao-de-freitas }`) |
| `ligacao_notavel` | Só para `notavel`: `{ tipo: descendencia | casamento | convivencia, descricao*, natureza*, referencias* }` |
| `natureza`* | Natureza das informações principais da pessoa |
| `referencias`* | Fontes |
| `lacunas` | Texto declarando lacunas conhecidas (ex.: "nome da mãe não localizado") |
| `evidencia_historica` | Referência que comprova que a pessoa viveu há mais de 100 anos, quando faltam datas |

`relacoes` é a base para uma futura árvore genealógica (Princípio VIII), sem implementá-la agora.

Validação:

- Regra dos 100 anos (FR-019, Princípio V): a pessoa só é publicada se cumprir ao menos uma
  condição: tem `obito`; ou `nascimento.ano` ≤ (ano atual − 100); ou tem `evidencia_historica`
  (referência que comprova que viveu há mais de 100 anos, ex.: citada em obra do século XVII).
  Sem nenhuma delas, a publicação falha.
- Nenhuma pessoa com vínculo fora da lista acima (impede publicar a árvore pessoal do responsável).
- Ids de `relacoes` existentes.

### Divergência (`divergencias.yaml`)

Versões conflitantes entre fontes (FR-009, SC-005).

| Campo | Descrição |
|---|---|
| `id`* | Ex.: `numero-de-filhos` |
| `tema`* | Ex.: "Número de filhos" |
| `versoes`* | Lista (mínimo 2) de `{ texto*, referencias* }` |
| `observacao` | Nota editorial neutra, sem escolher versão sem fundamento |

Validação: ao menos duas versões, cada uma com referência.

### Imagem (`imagens.yaml` + arquivos em `imagens/`)

| Campo | Descrição |
|---|---|
| `id`* | Ex.: `mapa-capitania-sao-vicente` |
| `arquivo`* | Nome do arquivo em `conteudo/imagens/` |
| `alt`* | Texto alternativo |
| `legenda`* | Legenda visível |
| `credito`*, `origem`*, `licenca`* | Autoria, acervo de origem, licença ou situação de direitos |
| `tipo`* | `historica`, `fotografia-atual` (selo "Fotografia atual") ou `ilustracao` (selo "Ilustração") |
| `data_foto` | Data da fotografia, para `fotografia-atual`, quando conhecida |

Validação: todos os campos obrigatórios presentes; arquivo existente. A proibição de imagem do
rosto de Sebastião (FR-021) é verificada na revisão editorial.

### Registro de alteração (`alteracoes.yaml`)

| Campo | Descrição |
|---|---|
| `data`* | Data ISO (AAAA-MM-DD) |
| `afeta`* | Ids ou slugs do conteúdo alterado |
| `descricao`* | O que mudou |
| `motivo`* | Por que mudou |
| `referencias` | Fontes que motivaram a mudança |

---

## Relacionamentos

```text
Capítulo ──cita──> Referência        (marcadores :fonte no texto)
Capítulo ──mostra──> Divergência     (blocos ::divergencia)
Capítulo ──trata──> Acontecimento
Acontecimento ──ocorre em──> Lugar
Acontecimento ──envolve──> Pessoa
Acontecimento ──cita──> Referência
Acontecimento ──pode ter──> Divergência
Trajeto ──liga──> Lugar (de, para)
Trajeto ──relacionado a──> Acontecimento
Pessoa ──relaciona-se com──> Pessoa
Pessoa / Lugar / Divergência ──citam──> Referência
Imagem ──ilustra──> Capítulo / Página
Registro de alteração ──afeta──> qualquer conteúdo
```

As ligações inversas (ex.: "acontecimentos deste lugar", "onde esta fonte é usada") são
calculadas no build. Nenhuma informação é escrita em dois lugares.
