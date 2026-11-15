<!--
Relatório de Impacto da Sincronização (Sync Impact Report)
- Versão: 1.2.0 → 1.3.0
- Motivo do incremento (MINOR, e não PATCH): a emenda cria obrigações novas para os planos
  (registrar alternativas descartadas, estimar custo recorrente com premissas, justificar
  cada dependência externa) e transforma a recomendação sobre dependências em obrigação.
  Isso é alteração material de orientação existente. A regra "custo operacional DEVE ser
  mantido baixo e previsível" foi preservada, agora acompanhada da obrigação de estimativa.
- Princípio modificado (título inalterado):
  VII. Simplicidade e Sustentabilidade Tecnológica: regras substituídas integralmente pelo
       texto aprovado pelo responsável. Justificativa do princípio mantida.
- Justificativa da emenda: tornar as decisões de arquitetura e tecnologia mais transparentes
  e verificáveis, reduzindo decisões arbitrárias, complexidade desnecessária e dependências
  que comprometam a sustentabilidade do projeto.
- Seções adicionadas: nenhuma.
- Seções removidas: nenhuma.
- Templates dependentes: não alterados (o Spec Kit lê a Constituição em tempo de execução).
- TODOs adiados: nenhum.
-->

# Constituição do Projeto Sebastião de Freitas

Acervo histórico digital dedicado à vida, à trajetória e ao legado de Sebastião de Freitas,
português que viveu entre os séculos XVI e XVII e cuja história está ligada à formação do
Brasil colonial e à história de São Paulo. O projeto reúne, organiza, contextualiza e apresenta
informações históricas e genealógicas dispersas, como homenagem e como preservação da memória.
O projeto não é um blog, portal de notícias ou plataforma de publicação contínua.

Convenção normativa: **DEVE** / **NÃO DEVE** (e os plurais **DEVEM** / **NÃO DEVEM**) indicam
regras obrigatórias; **RECOMENDA-SE** indica a prática esperada, cujo desvio precisa ser
justificado; **PODE** (e **PODEM**) indica opção permitida. Nas frases descritivas, essas
palavras aparecem em minúsculas e não têm valor normativo.

## Princípios Fundamentais

### I. Preservação da Memória Histórica

- O acervo DEVE ter como finalidade principal preservar e tornar acessível a memória de
  Sebastião de Freitas, que é o protagonista e o foco do projeto.
- Todo conteúdo publicado DEVE contribuir para compreender sua vida, sua trajetória, seu
  contexto ou seu legado; conteúdo sem essa relação NÃO DEVE ser incluído.
- O conteúdo DEVE ser tratado como acervo de longo prazo: estável, revisado e citável.
  Ele NÃO DEVE seguir a lógica de publicação contínua ou de feed.
- Alterações relevantes no conteúdo histórico publicado (correções factuais, revisão de
  interpretação, inclusão ou remoção de fontes) DEVEM ter registro contendo o que foi
  alterado, quando, por qual motivo e com base em quais fontes.
- A forma de armazenar e de apresentar esse registro não é definida por esta Constituição e
  DEVE ser decidida na especificação ou no plano correspondente.

**Justificativa:** o valor do projeto está na permanência e na confiabilidade do acervo, não
no volume ou na frequência de publicação.

### II. Rigor e Responsabilidade Histórica

- Toda afirmação DEVE ser classificada em uma destas naturezas: **fato documentado**,
  **informação historiográfica** (interpretação de historiadores), **tradição genealógica**
  ou **hipótese**.
- A natureza da informação DEVE ficar visível para o leitor, e não apenas registrada
  internamente.
- NÃO DEVE ser inventado nenhum fato, data, nome, vínculo de parentesco, citação ou
  referência. Lacunas DEVEM ser declaradas como lacunas.
- Hipóteses DEVEM ser apresentadas como hipóteses, com o fundamento que as sustenta, e
  NÃO DEVEM ser promovidas a fato por repetição ou por omissão da ressalva.
- Conteúdo produzido ou rascunhado com apoio de ferramentas automatizadas, incluindo IA,
  DEVE passar por verificação humana contra as fontes antes da publicação.

**Justificativa:** genealogia e história colonial acumulam tradições repetidas sem lastro; o
projeto só tem valor se o leitor souber quanto pode confiar em cada informação.

### III. Rastreabilidade e Transparência das Fontes

- Toda informação publicada DEVE estar vinculada a pelo menos uma fonte identificável, ou
  ser explicitamente marcada como sem fonte localizada.
- As referências DEVEM ser registradas de forma que outra pessoa consiga localizar a fonte
  (autor, título, acervo ou arquivo, localização, data de acesso quando aplicável).
- Referências e citações DEVEM seguir as normas da ABNT em vigor (NBR 6023 para
  referências e NBR 10520 para citações). Quando a norma não cobrir um dado necessário
  para localizar a fonte (por exemplo, fundo ou cota de documento de arquivo), esse dado
  DEVE ser acrescentado à referência.
- Quando fontes divergirem, as versões DEVEM ser apresentadas lado a lado, com a indicação
  de qual fonte sustenta cada uma. A divergência NÃO DEVE ser resolvida silenciosamente.
- RECOMENDA-SE distinguir fontes primárias (documentos da época) de fontes secundárias
  (obras historiográficas e genealógicas).
- O uso de imagens, transcrições e documentos DEVE respeitar direitos autorais e licenças,
  com crédito ao acervo de origem.

**Justificativa:** a rastreabilidade permite verificar, corrigir e ampliar o acervo, e
diferencia um trabalho historicamente responsável de uma coletânea de afirmações.

### IV. Contextualização Histórica e Imparcialidade Editorial

- Os acontecimentos DEVEM ser contextualizados conforme a realidade política, social,
  cultural, religiosa e jurídica de Portugal e do Brasil colonial da época.
- O texto NÃO DEVE romantizar a personagem nem aplicar julgamentos anacrônicos.
- Contextualizar não significa justificar, assim como não julgar anacronicamente não
  significa omitir. Fatos incômodos ou controversos DEVEM ser apresentados com o devido
  contexto e NÃO DEVEM ser suprimidos.
- A origem sefardita e a condição de cristão-novo PODEM ser abordadas quando forem
  historicamente relevantes para a trajetória de Sebastião de Freitas, com o mesmo rigor
  das demais informações.
- O contexto histórico DEVE complementar a biografia, sem se tornar um conteúdo autônomo
  que desloque o foco do protagonista.

**Justificativa:** a homenagem só é legítima se for honesta; o leitor precisa entender a
época para entender a pessoa.

### V. Privacidade e Responsabilidade com Dados Pessoais

- NÃO DEVEM ser publicados dados pessoais de pessoas vivas.
- Ramos genealógicos que se aproximem do presente DEVEM ser interrompidos antes de expor
  pessoas vivas ou permitir identificá-las indiretamente.
- Critério conservador: toda pessoa nascida há menos de 100 anos e sem registro de óbito
  localizado DEVE ser tratada como viva, e seus dados pessoais NÃO DEVEM ser publicados.
- Quando a data de nascimento for desconhecida, a pessoa DEVE ser tratada como viva, salvo
  evidência documental de que nasceu há mais de 100 anos ou de que faleceu.
- O site NÃO DEVE coletar dados pessoais dos visitantes além do estritamente necessário
  ao funcionamento. Qualquer coleta (contato, analytics, cookies) DEVE ter finalidade
  declarada e respeitar a LGPD.
- RECOMENDA-SE preferir soluções de medição de audiência que não identifiquem o visitante.

**Justificativa:** um acervo genealógico conecta o passado a famílias atuais; o projeto não
pode virar vetor de exposição de pessoas que não consentiram.

### VI. Experiência, Acessibilidade e Usabilidade

- O site DEVE atender às WCAG 2.2 nível AA (diretrizes internacionais de acessibilidade
  web) como requisito, e não como melhoria futura.
- A interface DEVE ser responsiva e utilizável em celular, tablet e desktop.
- Recursos interativos (como linha do tempo e mapa) DEVEM oferecer alternativa acessível
  em texto e navegação por teclado.
- O conteúdo principal DEVE permanecer legível e navegável mesmo se recursos interativos
  falharem ou não forem suportados.
- RECOMENDA-SE que a experiência seja moderna, intuitiva e visualmente atraente, sem
  sacrificar legibilidade, desempenho ou sobriedade compatível com um acervo histórico.
- Desempenho e segurança DEVEM ser avaliados no plano de cada funcionalidade, com critérios
  verificáveis e adequados ao escopo da funcionalidade.

**Justificativa:** memória preservada que poucos conseguem acessar não cumpre seu propósito.

### VII. Simplicidade e Sustentabilidade Tecnológica

- Antes de definir uma solução técnica, o agente DEVE avaliar alternativas que atendam aos
  requisitos da funcionalidade. A solução escolhida DEVE ser a que apresentar o menor nível
  de complexidade arquitetural e operacional, sem comprometer os requisitos funcionais, não
  funcionais e os demais princípios desta Constituição.
- A avaliação DEVE considerar, no mínimo: quantidade de componentes e serviços, dependências
  externas, infraestrutura necessária, esforço de manutenção, custo operacional e impacto na
  portabilidade da solução.
- O plano da funcionalidade DEVE registrar a solução escolhida, as alternativas consideradas
  e descartadas e a justificativa técnica da decisão. Quando não houver alternativa
  relevante, essa condição DEVE ser explicitada.
- Backend, banco de dados, painel administrativo, autenticação e outros componentes de
  infraestrutura NÃO DEVEM ser introduzidos sem que um requisito identificado demonstre sua
  necessidade. Essa necessidade DEVE ser descrita e justificada no plano da funcionalidade.
- O custo operacional DEVE ser mantido baixo e previsível. Quando a solução introduzir
  serviços ou recursos com custo recorrente, o custo DEVE ser estimado e registrado no plano,
  com identificação dos itens geradores de custo e das respectivas premissas. Quando não
  houver custo recorrente previsto, isso DEVE ser declarado.
- Dependências externas DEVEM ser justificadas no plano quanto à necessidade, à adequação
  ao projeto e à continuidade de manutenção. Sempre que houver alternativas relevantes,
  DEVEM ser consideradas sua maturidade, estabilidade, documentação, manutenção ativa e
  possibilidade de substituição.

**Justificativa:** um projeto de memória mantido por poucas pessoas precisa sobreviver a
longos períodos sem manutenção ativa.

### VIII. Evolução e Extensibilidade

- O conteúdo (textos, fontes, eventos, lugares, pessoas) DEVE ser mantido de forma
  estruturada e separada da implementação da aplicação.
- Atualizar ou acrescentar conteúdo NÃO DEVE exigir alterações desnecessárias no código.
- A estrutura do acervo DEVE evitar escolhas que impeçam ou dificultem desnecessariamente
  funcionalidades futuras (por exemplo, árvore genealógica interativa), sem exigir a
  implementação antecipada dessas funcionalidades.
- Funcionalidades fora do escopo vigente NÃO DEVEM ser implementadas por antecipação.

**Justificativa:** separar conteúdo de código permite que o acervo cresça e mude de
apresentação sem perder o que já foi pesquisado.

### IX. Independência Operacional e Longevidade

- A solução DEVE privilegiar portabilidade e independência de fornecedor, com caminho de
  migração viável para hospedagem, ferramentas e serviços.
- O conteúdo DEVE ser armazenado em formatos abertos, legíveis e exportáveis, sem
  depender de serviço proprietário para ser recuperado.
- O projeto DEVE poder ser reconstruído e publicado a partir do seu repositório e da sua
  documentação, sem conhecimento que exista apenas na cabeça de alguém.
- Dependência de serviço pago ou proprietário DEVE ter alternativa identificada e
  registrada no plano.

**Justificativa:** o acervo deve durar mais do que qualquer fornecedor, framework ou
mantenedor individual.

## Diretrizes Editoriais e Escopo

**Escopo inicial (MVP):**

- O protagonista e foco principal é Sebastião de Freitas.
- O contexto histórico de Portugal e do Brasil colonial complementa a biografia.
- Linha do tempo e mapa geográfico interativo são funcionalidades **candidatas** ao MVP;
  a inclusão definitiva DEVE ser decidida na especificação.
- Uma árvore genealógica completa e interativa não faz parte do MVP.
- Um portal amplo sobre a história sefardita está fora do escopo inicial.

**Regras editoriais:**

- Toda publicação DEVE obedecer aos Princípios II, III e IV: classificação da natureza da
  informação, fonte identificável, contexto de época e divergências explícitas.
- Toda especificação de conteúdo DEVE indicar quais fontes sustentam o material previsto.
- Mudança de escopo (inclusão de tema fora do foco no protagonista) DEVE ser tratada como
  emenda a esta seção.

**Idioma:**

- Esta Constituição, as especificações, os planos, as tarefas e toda a documentação DEVEM
  ser escritos em português brasileiro (pt-BR).
- Termos técnicos consagrados PODEM permanecer em inglês quando isso favorecer a clareza.
- Na versão inicial, o conteúdo do site DEVE ser publicado em pt-BR. Traduções para outros
  idiomas PODEM ser consideradas em versões futuras, por meio de especificação própria.
- Citações de fontes de época PODEM manter a grafia original, com indicação de que se trata
  de transcrição.

## Diretrizes Tecnológicas e Fluxo de Desenvolvimento

**Decisões tecnológicas:**

- A stack (linguagem, framework, banco de dados, hospedagem) está em aberto. Nenhuma
  tecnologia é adotada por esta Constituição.
- Cada escolha tecnológica DEVE ser feita no plano (`/speckit-plan`) da funcionalidade que
  a exigir, com justificativa explícita frente aos Princípios VII, VIII e IX.
- Critérios obrigatórios de avaliação de qualquer tecnologia: simplicidade, custo
  operacional, manutenibilidade, longevidade, portabilidade, acessibilidade, desempenho e
  segurança.

**Fluxo de desenvolvimento (Spec Kit):**

- Toda funcionalidade DEVE seguir o fluxo especificação → plano → tarefas → implementação.
- Todo plano DEVE conter a verificação de conformidade com esta Constituição (seção
  "Constitution Check" do template de plano), apontando cada desvio e sua justificativa.
- Toda entrega com interface DEVE ser verificada quanto a WCAG 2.2 AA e responsividade
  antes de ser considerada concluída.
- Todo conteúdo DEVE ser revisado contra as fontes antes da publicação (Princípio II).

## Governança

- Esta Constituição prevalece sobre qualquer outra prática, especificação ou plano do
  projeto. Em caso de conflito, a especificação ou o plano DEVE ser ajustado, ou a
  Constituição DEVE ser emendada formalmente.
- **Emendas:** DEVEM ser feitas por meio do comando `/speckit-constitution`, com descrição
  da mudança, motivo e impacto, e aprovadas pelo responsável pelo projeto (atualmente,
  Marcelo).
- **Versionamento** (versionamento semântico):
  - MAJOR: remoção ou redefinição incompatível de princípio ou regra de governança.
  - MINOR: novo princípio ou seção, ou ampliação ou alteração material de orientação
    existente.
  - PATCH: esclarecimento, redação ou correção sem efeito semântico.
- **Datas:** a data de ratificação é fixa. A data de última alteração DEVE ser atualizada a
  cada emenda aprovada, no formato AAAA-MM-DD.
- **Conformidade:** toda especificação, plano e conjunto de tarefas DEVE ser verificado
  contra esta Constituição; desvios DEVEM ser justificados por escrito no plano. Complexidade
  não justificada é motivo de rejeição.
- RECOMENDA-SE revisar a Constituição a cada marco relevante do projeto (por exemplo, ao
  concluir o MVP).

**Versão**: 1.3.0 | **Ratificada em**: 2026-11-11 | **Última alteração**: 2026-11-12
