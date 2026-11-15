# Sebastião de Freitas — Exposição Histórica Digital

Acervo histórico digital sobre a vida, a trajetória e o legado de Sebastião de Freitas
(séculos XVI–XVII), construído com Spec-Driven Development (Spec Kit).

## Documentos do projeto

- Constituição: `.specify/memory/constitution.md`
- Especificação, plano e tarefas: `specs/001-acervo-mvp/`

## Ambiente

- Node.js v26.13.1 (LTS) e npm 11.20.0 — registrados em 2026-11-15

## Comandos

| Comando | O que faz |
|---|---|
| `npm install` | Instala as dependências |
| `npm run dev` | Servidor local com recarga automática |
| `npm run build` | Gera o site estático em `dist/` |
| `npm run preview` | Serve o site gerado para conferência |
| `npm run validar` | Verifica tipos e conteúdo e gera o site |
| `npm test` | Testes ponta a ponta (Playwright + axe) |

## Estrutura

- `conteudo/` — acervo (Markdown e YAML), separado do código
- `src/` — aplicação Astro
- `pesquisa/` — levantamento de fontes (documentação de trabalho; não é publicada)
