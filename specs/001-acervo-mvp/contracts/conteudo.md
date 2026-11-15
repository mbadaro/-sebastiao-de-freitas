# Contrato de Conteúdo (formato dos arquivos do acervo)

**Funcionalidade**: `001-acervo-mvp` | **Data**: 2026-11-13

Este é o contrato entre quem escreve o conteúdo e o site. Seguindo este formato, qualquer
conteúdo novo é publicado sem alterar código (FR-024, SC-008). Os campos e as regras de
validação estão em [data-model.md](../data-model.md).

> Os exemplos usam dados já verificados em Silva Leme, *Genealogia Paulistana*, v. 7, p. 168–169,
> apenas para ilustrar o formato. O conteúdo definitivo será redigido na implementação.

## Estrutura da pasta

```text
conteudo/
├── capitulos/
│   └── 01-origem-em-portugal.md      # NN-<slug>.md
├── paginas/
│   ├── inicio.md
│   ├── sefarditas.md
│   └── sobre.md
├── imagens/                          # arquivos de imagem
├── acontecimentos.yaml
├── alteracoes.yaml
├── divergencias.yaml
├── imagens.yaml
├── lugares.yaml
├── pessoas.yaml
├── referencias.yaml
└── trajetos.yaml
```

## Capítulo (Markdown com metadados)

```markdown
---
titulo: Origem em Portugal
slug: origem-em-portugal
ordem: 1
descricao: Onde nasceu Sebastião de Freitas e quem era sua família no Algarve.
acontecimentos: [nascimento]
---

Sebastião de Freitas era natural de Alagoa, da cidade de Silves, no Algarve
:fonte{nat=fato ref=silva-leme-v7 p=168}. Seu pai, Manoel Pires, é descrito como
"pessoa nobre, que foi provedor da santa casa de misericórdia da dita cidade"
:fonte{nat=historiografia ref=silva-leme-v7 p=168}.
```

## Marcação de afirmações

Marcador em linha, ao fim da afirmação:

```text
:fonte{nat=<natureza> ref=<id-referencia> p=<pagina>}
```

- `nat`: `fato`, `historiografia`, `tradicao` ou `hipotese`.
- `ref`: id em `referencias.yaml`, ou `sem-fonte`. Várias fontes: `ref="silva-leme-v7 sillos-asbrap-26"`.
- `p`: opcional; página ou localização.
- Exibição: rótulo curto da natureza + número que leva à referência completa (ABNT).

Bloco de divergência, em linha própria:

```text
::divergencia{id=numero-de-filhos}
```

Transcrição de época (FR-025), como citação Markdown seguida de marcador:

```markdown
> "ao Brasil em praça de soldado da companhia do capitão Gabriel Soares"
```

## Entidades em YAML (exemplos)

```yaml
# referencias.yaml
- id: silva-leme-v7
  abnt: "SILVA LEME, Luiz Gonzaga da. *Genealogia paulistana*. São Paulo: Duprat, 1905. v. 7."
  tipo: secundaria
  observacao: Título Freitas, p. 168–223. Cita Pedro Taques, Nobiliarquia Paulistana.
```

```yaml
# lugares.yaml
- id: juqueri
  nome_historico: Juqueri
  nome_atual: Mairiporã (SP)
  pais: brasil
  coordenadas: [-23.32, -46.59]
  precisao: aproximada
  raio_km: 10
  vista: [sao-vicente]
```

```yaml
# acontecimentos.yaml
- id: armado-cavaleiro
  titulo: Armado cavaleiro por d. Francisco de Souza
  data: { ano: 1600, precisao: exata }
  tipo: trajetoria
  natureza: historiografia
  referencias: [{ ref: silva-leme-v7, p: 169 }]
  lugares: [sao-paulo]
  capitulo: atuacao-publica-e-militar
```

```yaml
# divergencias.yaml
- id: numero-de-filhos
  tema: Número de filhos
  versoes:
    - texto: Sete filhos.
      referencias: [{ ref: silva-leme-v7, p: 169 }]
    - texto: Oito filhos, incluindo uma segunda Maria Pedroso omitida por Silva Leme.
      referencias: [{ ref: sillos-asbrap-26, p: 237 }]
```

```yaml
# trajetos.yaml
- id: bahia-sao-paulo
  de: bahia
  para: sao-paulo
  comprovacao: presumido
  referencias: [{ ref: silva-leme-v7, p: 169 }]
  descricao: Silva Leme registra que "da Bahia passou a S. Paulo"; o percurso não é documentado.
```

> A referência ABNT do exemplo (editora e ano) deve ser conferida na obra antes da publicação.

## Mensagens de validação

Quando o conteúdo viola uma regra, o build falha com mensagem em pt-BR indicando arquivo, item e
regra. Exemplo: `pessoas.yaml › joao-de-freitas: referência "silva-leme-v9" não existe`.
