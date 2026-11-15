# Especificação da Funcionalidade: Exposição Histórica Digital — MVP

**Branch da funcionalidade**: `001-acervo-mvp`

**Criado em**: 2026-11-13

**Status**: Pronta para planejamento

**Entrada**: proposta "SPECIFICATION — SITE SEBASTIÃO DE FREITAS", versão 0.2.0, fornecida pelo
responsável pelo projeto.

## Esclarecimentos

### Sessão 2026-11-13

- P: Qual o destaque do vínculo sefardita? → R: Central na identidade da exposição. Além da
  menção de José Gonçalves Salvador, há certificado da Comunidade Israelita de Lisboa (CIL)
  atestando a origem sefardita de Sebastião, a ser citado como fonte.
- P: Que imagens são permitidas? → R: Iconografia histórica e ilustrações modernas de ambientes
  e objetos, sempre identificadas como ilustração; nenhuma imagem do rosto de Sebastião.
- P: Até que geração vai a família? → R: Pais, esposa, sogros, filhos e cônjuges dos filhos,
  mais "vínculos notáveis" (personagens históricos ligados à família), com fonte.
- P: Como fica conteúdo com pouca fundamentação? → R: O rigor não serve para retirar conteúdo:
  hipóteses e tradições de terceiros são publicadas, classificadas e atribuídas à sua origem.
  O projeto não formula hipóteses próprias.
- P: O que é "consulta direta"? → R: Cada capítulo ou tema (ex.: a morte de Sebastião) é
  acessível diretamente, sem percorrer os anteriores.
- P: Como tratar SEO? → R: Requisitos de descoberta e indexação na spec (FR-026 a FR-028,
  SC-010); sitemap, robots.txt e dados estruturados ficam para o plano.
- P: Ajustes finos de revisão → R: SC-004 restrito à trajetória de Sebastião; trajetos
  presumidos visualmente distintos dos documentados (FR-015); origem conhecida sempre indicada e
  origem desconhecida nunca como fato documentado (FR-007).

### Sessão 2026-11-14

- P: Fotografias atuais de lugares são permitidas? → R: Sim, identificadas como "Fotografia
  atual" (FR-021).

### Sessão 2026-11-15

- P: Como exibir natureza e fonte sem prejudicar a leitura (FR-006, FR-009)? → R: A história vem
  em primeiro plano. No texto, cada afirmação leva só uma nota numerada discreta (com a natureza
  no rótulo acessível e na dica); a natureza por extenso e a referência completa ficam em "Notas e
  fontes", ao fim do capítulo. Divergências aparecem recolhidas numa linha ("As fontes divergem:
  …") e, abertas, mostram as versões lado a lado.
- P: Qual o papel do site em relação às fontes? → R: Reunir o que existe sobre Sebastião e dizer de
  onde cada informação veio; não é pesquisa original, e nada é retirado por falta de verificação.

## Cenários de Usuário e Testes *(obrigatório)*

### História de Usuário 1 — Percorrer a exposição sobre Sebastião de Freitas (Prioridade: P1)

Um visitante que não sabe nada sobre Sebastião de Freitas chega à página inicial, é apresentado
ao personagem e é conduzido por uma narrativa cronológica e contextualizada: origem em Portugal,
chegada ao Brasil, vida em São Paulo, família, atuação pública e militar, falecimento e legado.
Em cada trecho, ele percebe o que é fato documentado, interpretação, tradição genealógica ou
hipótese, e pode ver a fonte.

**Por que esta prioridade**: é o coração do produto. Sozinha, já entrega uma exposição útil.

**Teste independente**: abrir a página inicial, seguir a narrativa do início ao fim sem usar
outros recursos e verificar que a trajetória completa é compreensível e que toda afirmação tem
natureza e fonte indicadas.

**Cenários de aceitação**:

1. **Dado** um visitante na página inicial, **quando** ele inicia a exposição, **então** é levado
   ao primeiro capítulo da narrativa e pode avançar capítulo a capítulo até o legado.
2. **Dado** um trecho da narrativa, **quando** o visitante consulta a indicação de fonte,
   **então** vê a natureza da informação e a referência completa (ABNT).
3. **Dado** um fato com versões divergentes entre fontes, **quando** ele aparece na narrativa,
   **então** as versões são exibidas lado a lado, cada uma com sua fonte.
4. **Dado** um acontecimento biográfico, **quando** apresentado, **então** vem acompanhado do
   contexto histórico necessário para entendê-lo (Portugal, Brasil colonial, administração,
   religião), sem se tornar conteúdo autônomo.

---

### História de Usuário 2 — Compreender as raízes cristãs-novas e sefarditas (Prioridade: P2)

O visitante entende o que foram os judeus sefarditas e os cristãos-novos em Portugal e no
Brasil colonial, e qual é a relação documentada de Sebastião de Freitas com essa história.

**Por que esta prioridade**: é o elemento que o responsável considera fundamental para a
identidade do produto; depende da narrativa (US1) para fazer sentido.

**Teste independente**: ler apenas a seção introdutória sobre os sefarditas e o trecho sobre o
vínculo de Sebastião, e verificar que um leigo consegue explicar, em poucas frases, quem foram os
sefarditas e o que se sabe (e o que não se sabe) sobre a ligação de Sebastião com eles.

**Cenários de aceitação**:

1. **Dado** o visitante na seção sobre os sefarditas, **quando** ele a lê, **então** encontra os
   tópicos: origem na Península Ibérica, presença em Portugal, perseguição, expulsão e conversões
   forçadas, dispersão e a ligação com a trajetória de Sebastião.
2. **Dado** o trecho sobre o vínculo de Sebastião, **quando** exibido, **então** cada afirmação
   indica se é fato documentado, interpretação historiográfica ou hipótese.
3. **Dado** a página inicial, **quando** exibida, **então** o vínculo sefardita aparece como
   parte da apresentação de Sebastião, com acesso direto ao capítulo correspondente.
4. **Dado** o capítulo sobre as raízes sefarditas, **quando** exibido, **então** apresenta as
   fontes que sustentam o vínculo (ex.: Salvador, certificado da CIL), cada uma com sua natureza.

---

### História de Usuário 3 — Navegar pela linha do tempo (Prioridade: P2)

O visitante vê, em sequência, os acontecimentos da vida de Sebastião ao lado dos eventos
históricos do seu tempo, e a partir de um acontecimento chega ao trecho da narrativa
correspondente.

**Por que esta prioridade**: decisão do responsável (entra no MVP); dá visão rápida da trajetória.

**Teste independente**: abrir somente a linha do tempo e verificar ordem, distinção visual entre
vida pessoal e contexto, e acesso ao conteúdo relacionado.

**Cenários de aceitação**:

1. **Dado** a linha do tempo, **quando** exibida, **então** os acontecimentos aparecem em ordem
   cronológica, com eventos pessoais distinguíveis de eventos de contexto.
2. **Dado** um acontecimento com data aproximada ou divergente, **quando** exibido, **então** a
   imprecisão ou a divergência fica visível (ex.: "c. 1565", "1595 ou 1596").
3. **Dado** um acontecimento com conteúdo relacionado, **quando** selecionado, **então** o
   visitante chega ao trecho da narrativa e ao lugar no mapa, quando houver.

---

### História de Usuário 4 — Explorar o mapa da trajetória (Prioridade: P2)

O visitante vê no mapa os lugares ligados à vida de Sebastião, com destaque para a ligação entre
Portugal e Brasil, e de cada lugar chega aos acontecimentos correspondentes.

**Por que esta prioridade**: funcionalidade obrigatória do MVP, por decisão do responsável.

**Teste independente**: abrir somente o mapa e verificar que todos os lugares da narrativa estão
presentes, com acontecimentos associados.

**Cenários de aceitação**:

1. **Dado** o mapa, **quando** exibido, **então** mostra os lugares documentados em Portugal e no
   Brasil e os deslocamentos entre eles.
2. **Dado** um lugar, **quando** selecionado, **então** mostra nome histórico, nome atual (quando
   houver), acontecimentos associados e fontes.
3. **Dado** um lugar ou trajeto de localização imprecisa (ex.: região do Guairá, rotas
   presumidas), **quando** exibido, **então** é marcado como aproximado.
4. **Dado** um visitante que não usa o mapa interativo, **quando** acessa a alternativa textual,
   **então** encontra a mesma lista de lugares e acontecimentos.

---

### História de Usuário 5 — Conhecer a família (Prioridade: P3)

O visitante conhece as relações de parentesco historicamente relevantes de Sebastião: pais,
cônjuge, família da esposa e filhos, com fontes e divergências.

**Por que esta prioridade**: complementa a biografia; não é necessária para entender a trajetória.

**Teste independente**: abrir somente a seção de família e verificar pessoas, vínculos, fontes e
o respeito ao limite de profundidade definido.

**Cenários de aceitação**:

1. **Dado** a seção de família, **quando** exibida, **então** apresenta pais, esposa, sogros,
   filhos e cônjuges dos filhos de Sebastião.
2. **Dado** uma divergência genealógica (ex.: 7 filhos em Silva Leme × 8 em Sillos), **quando**
   exibida, **então** as versões aparecem lado a lado com as fontes.
3. **Dado** um vínculo notável (personagem histórico ligado à família), **quando** exibido,
   **então** mostra o tipo de ligação (descendência, casamento, convivência), a fonte e a
   natureza da informação.

---

### História de Usuário 6 — Consultar diretamente e verificar fontes (Prioridade: P3)

Um pesquisador quer achar uma informação específica (uma data, um cargo, um lugar, uma obra) sem
percorrer a narrativa, e consultar a lista completa de referências.

**Por que esta prioridade**: atende o público pesquisador; a narrativa já cita as fontes (US1).

**Teste independente**: a partir da página inicial, localizar uma informação específica e a
referência que a sustenta sem passar pela narrativa.

**Cenários de aceitação**:

1. **Dado** o visitante em qualquer página, **quando** quer ir direto a um tema, **então** chega
   a ele pela navegação principal (narrativa por capítulo, linha do tempo, mapa, família, fontes).
2. **Dado** a página de fontes, **quando** exibida, **então** lista todas as referências em ABNT,
   distinguindo fontes primárias e secundárias, e de cada uma é possível ver onde é usada.

---

### Casos de Borda

- Informação sem fonte localizada: só é publicada se marcada explicitamente como tal.
- Data desconhecida ou aproximada: exibida com a indicação de imprecisão, nunca como data exata.
- Lacuna documental (ex.: nome da mãe de Sebastião): declarada como lacuna, não preenchida.
- Pessoa nascida há menos de 100 anos sem registro de óbito, ou com nascimento desconhecido:
  não é publicada (Princípio V).
- Recurso interativo (linha do tempo ou mapa) indisponível no dispositivo: o conteúdo continua
  acessível pela alternativa textual.
- Fonte digital que sai do ar: a referência ABNT continua permitindo localizar a obra original.

## Requisitos *(obrigatório)*

### Requisitos Funcionais

**Exposição e narrativa**

- **FR-001**: O site DEVE ter uma página inicial que apresente Sebastião de Freitas e dê acesso
  ao início da exposição e às demais seções.
- **FR-002**: O site DEVE apresentar a biografia em capítulos cronológicos, cobrindo, na medida
  das fontes disponíveis: origem e nascimento, raízes cristãs-novas/sefarditas, família, chegada
  ao Brasil, atuação pública e militar, principais acontecimentos, falecimento e legado.
- **FR-003**: O visitante DEVE poder avançar e voltar entre capítulos e também abrir qualquer
  capítulo ou tema diretamente (por um sumário e por endereço próprio), sem percorrer os
  anteriores. Esses endereços DEVEM ser permanentes e legíveis (descrevem o tema da página).
- **FR-004**: Cada capítulo DEVE trazer o contexto histórico necessário ao trecho, ligado ao
  acontecimento biográfico, sem seções de história geral desvinculadas do personagem.
- **FR-005**: O site DEVE ter uma seção introdutória sobre os judeus sefarditas e os
  cristãos-novos, cobrindo os tópicos do cenário de aceitação US2-1, limitada ao necessário para
  entender a trajetória de Sebastião.

**Rigor e fontes (Princípios II e III da Constituição)**

- **FR-006**: Toda afirmação histórica ou genealógica publicada DEVE exibir sua natureza: fato
  documentado, informação historiográfica, tradição genealógica ou hipótese.
- **FR-007**: Toda afirmação DEVE estar ligada a pelo menos uma referência, ou marcada como "sem
  fonte localizada". Quando a origem da informação for conhecida, ela DEVE ser indicada, mesmo
  que não seja uma fonte formal. Informação de origem desconhecida NÃO DEVE ser classificada
  como fato documentado.
- **FR-008**: As referências DEVEM seguir a ABNT (NBR 6023 e NBR 10520), com dados de localização
  complementares quando necessários (fundo, cota, acervo).
- **FR-009**: Divergências entre fontes DEVEM ser exibidas lado a lado, cada versão com sua fonte.
- **FR-009a**: Hipóteses e tradições genealógicas de terceiros PODEM ser publicadas, desde que
  classificadas e atribuídas à sua origem. A falta de fonte primária é motivo para classificar
  o conteúdo, não para excluí-lo. O projeto NÃO DEVE formular hipóteses próprias.
- **FR-010**: O site DEVE ter uma página com todas as referências, separando fontes primárias e
  secundárias, e indicando onde cada uma é usada.
- **FR-011**: Alterações relevantes no conteúdo publicado DEVEM ter registro (o quê, quando,
  motivo, fontes); a forma de exibição é decidida no plano.

**Linha do tempo e mapa**

- **FR-012**: O site DEVE ter uma linha do tempo com os acontecimentos da vida de Sebastião e
  eventos históricos de contexto, visualmente distinguíveis.
- **FR-013**: Datas aproximadas, incertas ou divergentes DEVEM ser exibidas como tais.
- **FR-014**: O site DEVE ter um mapa interativo com os lugares documentados da trajetória em
  Portugal e no Brasil e os deslocamentos entre eles.
- **FR-015**: Cada lugar DEVE mostrar nome histórico, nome atual quando houver, acontecimentos
  associados e fontes; lugares e trajetos imprecisos DEVEM ser marcados como aproximados.
  Trajetos documentados e presumidos DEVEM ser visualmente distintos; um trajeto presumido NÃO
  DEVE parecer comprovado.
- **FR-016**: Linha do tempo e mapa DEVEM ter alternativa textual com o mesmo conteúdo, operável
  por teclado.
- **FR-017**: Acontecimentos, lugares, pessoas e trechos da narrativa DEVEM ter ligações entre si
  quando houver relação (ex.: do acontecimento na linha do tempo para o lugar no mapa).

**Família e privacidade**

- **FR-018**: O site DEVE apresentar pais, esposa, sogros, filhos e cônjuges dos filhos de
  Sebastião, com vínculos, datas conhecidas e fontes.
- **FR-018a**: O site DEVE ter um espaço de "vínculos notáveis": personagens históricos ligados à
  família, com o tipo de ligação, a fonte e a natureza da informação.
- **FR-019**: O site NÃO DEVE publicar dados de pessoas vivas, aplicando o critério de 100 anos
  sem registro de óbito, nem dados da árvore genealógica pessoal do responsável pelo projeto.
- **FR-020**: O site NÃO DEVE exigir cadastro nem coletar dados pessoais dos visitantes.

**Imagens**

- **FR-021**: Toda imagem DEVE ter legenda, crédito, origem e texto alternativo, e respeitar
  direitos autorais. São permitidas iconografia histórica, fotografias atuais de lugares ligados
  à trajetória (identificadas como "Fotografia atual", com data quando conhecida) e ilustrações
  modernas de ambientes e objetos (identificadas como ilustração). O site NÃO DEVE exibir imagem
  que represente o rosto de Sebastião.

**Descoberta e indexação**

- **FR-026**: Todo o conteúdo público DEVE ser encontrável e indexável por mecanismos de busca,
  inclusive o texto de capítulos, acontecimentos, lugares, pessoas e fontes.
- **FR-027**: Cada página DEVE ter título e descrição próprios, em pt-BR, que identifiquem seu
  conteúdo (ex.: "A morte de Sebastião de Freitas em Juqueri (1644)").
- **FR-028**: Ao ser compartilhada em redes sociais ou aplicativos de mensagem, cada página DEVE
  exibir uma prévia com título, descrição e imagem adequados.

**Qualidade transversal**

- **FR-022**: O site DEVE atender à WCAG 2.2 nível AA.
- **FR-023**: O site DEVE ser utilizável em celular, tablet e computador.
- **FR-024**: Acrescentar ou corrigir conteúdo (texto, acontecimento, lugar, pessoa, fonte) NÃO
  DEVE exigir alteração no código da aplicação.
- **FR-025**: Todo o conteúdo DEVE estar em pt-BR; citações de época podem manter a grafia
  original, indicada como transcrição.

### Entidades-chave

- **Capítulo**: trecho da narrativa biográfica; ordem, título, texto, afirmações, contexto.
- **Afirmação**: unidade de informação verificável; texto, natureza, referências, divergências.
- **Referência**: fonte em ABNT; tipo (primária/secundária), dados de localização, onde é usada.
- **Acontecimento**: fato datado; data (exata, aproximada ou intervalo), tipo (pessoal ou de
  contexto), lugar, pessoas, referências.
- **Lugar**: nome histórico, nome atual, localização (precisa ou aproximada), acontecimentos.
- **Pessoa**: nome(s), datas conhecidas, vínculo com Sebastião, referências.
- **Divergência**: duas ou mais versões de uma afirmação, cada uma com sua referência.
- **Registro de alteração**: o quê, quando, motivo, fontes.

## Critérios de Sucesso *(obrigatório)*

### Resultados Mensuráveis

- **SC-001**: Um visitante sem conhecimento prévio, após percorrer a exposição, consegue
  descrever corretamente origem, chegada ao Brasil, atuação em São Paulo e família de Sebastião
  (verificado com ao menos 3 leitores de teste).
- **SC-002**: 100% das afirmações publicadas exibem natureza e referência (ou "sem fonte
  localizada").
- **SC-003**: Partindo da página inicial, o visitante chega à referência de qualquer afirmação
  em no máximo 3 ações.
- **SC-004**: 100% dos acontecimentos da trajetória de Sebastião aparecem na linha do tempo, e
  100% dos lugares da sua trajetória aparecem no mapa e na alternativa textual. Eventos e lugares
  de contexto entram por seleção editorial.
- **SC-005**: Todas as divergências conhecidas no momento da publicação (hoje, ao menos 6) são
  exibidas lado a lado.
- **SC-006**: Verificação WCAG 2.2 AA (automática + revisão manual de teclado e leitor de tela)
  sem falhas nas páginas do MVP.
- **SC-007**: Todas as páginas são legíveis em tela de 360 px de largura sem rolagem horizontal.
- **SC-008**: Um novo acontecimento com lugar e fonte pode ser publicado editando apenas conteúdo,
  sem tocar no código.
- **SC-009**: Nenhum dado de pessoa que se enquadre no critério de 100 anos é publicado.
- **SC-010**: 100% das páginas do MVP têm endereço permanente, título e descrição próprios, e
  seu conteúdo textual é legível por mecanismos de busca.

## Premissas

- A especificação define estrutura e regras; o conteúdo histórico será redigido a partir das
  fontes levantadas (Silva Leme, Sillos, Salvador, Pedro Taques, Atas da Câmara, documentos do
  FamilySearch, certificado da CIL). Onde faltar fonte, o conteúdo entra como lacuna declarada
  ou como hipótese/tradição atribuída à sua origem.
- O certificado da CIL é citado como fonte sobre Sebastião sem expor dados pessoais do
  descendente que o recebeu (Princípio V).
- A consulta direta é atendida por sumário, endereço próprio por capítulo/tema e página de
  fontes; busca textual não faz parte do MVP.
- O site é apenas de leitura: sem cadastro, comentários ou edição por visitantes.
- O site não é instrumento de comprovação de descendência (por exemplo, para fins de
  nacionalidade); apresenta a história e suas fontes.
- Eventos históricos de contexto (ex.: União Ibérica, Inquisição portuguesa) também seguem as
  regras de natureza e fonte.
- Requisitos de desempenho e segurança terão critérios verificáveis definidos no plano
  (Princípio VI).
- Objetivo de longo prazo: tornar o site referência sobre Sebastião de Freitas. Os meios
  técnicos de descoberta (mapa do site para buscadores, instruções para robôs, dados
  estruturados) são decididos no plano.
- A proposta citava "boas práticas de acessibilidade" (RNF03); prevalece a Constituição: WCAG 2.2 AA.
