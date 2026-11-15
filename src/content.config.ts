/**
 * Coleções do acervo (T040) — modelo em specs/001-acervo-mvp/data-model.md.
 * Os esquemas transformam regras da Constituição em validação: se o conteúdo violar uma regra,
 * a geração do site falha com mensagem em pt-BR.
 *
 * CONTEUDO_DIR permite apontar para outra pasta (usado pelos testes de validação).
 */
import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const base = process.env.CONTEUDO_DIR ?? 'conteudo';
const anoAtual = new Date().getFullYear();

/** id: "minúsculas, sem acentos, palavras separadas por hífen" (data-model.md). */
const idValido = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'id deve ter minúsculas, sem acentos, palavras separadas por hífen');

const natureza = z.enum(['fato', 'historiografia', 'tradicao', 'hipotese'], {
  error: 'natureza deve ser fato, historiografia, tradicao ou hipotese',
});

const dataHistorica = z
  .object({
    ano: z.number().int(),
    mes: z.number().int().min(1).max(12).optional(),
    dia: z.number().int().min(1).max(31).optional(),
    precisao: z.enum(['exata', 'aproximada', 'antes-de', 'depois-de', 'intervalo']),
    ate: z.number().int().optional(),
    exibicao: z.string().optional(),
  })
  .refine((d) => d.precisao !== 'intervalo' || d.ate !== undefined, {
    message: 'data com precisao "intervalo" exige o campo "ate"',
  });

/** Citação: referência existente (ou "sem-fonte", cadastrada como referência informal) + página. */
const citacao = z.object({ ref: reference('referencias'), p: z.union([z.string(), z.number()]).optional() });
const citacoes = z.array(citacao).min(1, 'informe ao menos uma referência (ou "sem-fonte")');

const descricaoSeo = z
  .string()
  .min(50, 'descricao deve ter de 50 a 160 caracteres')
  .max(160, 'descricao deve ter de 50 a 160 caracteres');

const referencias = defineCollection({
  loader: file(`${base}/referencias.yaml`),
  schema: z.object({
    id: idValido,
    abnt: z.string().min(1, 'abnt não pode ser vazio'),
    tipo: z.enum(['primaria', 'secundaria', 'informal']),
    localizacao: z.string().optional(),
    url: z.url().optional(),
    acesso: z.string().optional(),
    observacao: z.string().optional(),
  }),
});

const capitulos = defineCollection({
  loader: glob({ pattern: '*.md', base: `${base}/capitulos` }),
  schema: z.object({
    titulo: z.string(),
    slug: idValido,
    ordem: z.number().int().positive(),
    descricao: descricaoSeo,
    periodo: z.object({ inicio: dataHistorica, fim: dataHistorica.optional() }).optional(),
    acontecimentos: z.array(reference('acontecimentos')).default([]),
    imagem: reference('imagens').optional(),
  }),
});

/** Páginas temáticas: sefarditas, sobre, página inicial (campos extras permitidos). */
const paginas = defineCollection({
  loader: glob({ pattern: '*.md', base: `${base}/paginas` }),
  schema: z.looseObject({
    titulo: z.string(),
    descricao: descricaoSeo,
  }),
});

const acontecimentos = defineCollection({
  loader: file(`${base}/acontecimentos.yaml`),
  schema: z.object({
    id: idValido,
    titulo: z.string(),
    data: dataHistorica,
    tipo: z.enum(['trajetoria', 'contexto']),
    natureza,
    referencias: citacoes,
    lugares: z.array(reference('lugares')).default([]),
    pessoas: z.array(reference('pessoas')).default([]),
    capitulo: z.string().optional(),
    divergencia: reference('divergencias').optional(),
  }),
});

const lugares = defineCollection({
  loader: file(`${base}/lugares.yaml`),
  schema: z.object({
    id: idValido,
    nome_historico: z.string(),
    nome_atual: z.string().optional(),
    pais: z.enum(['portugal', 'brasil']),
    coordenadas: z.tuple([z.number().min(-90).max(90), z.number().min(-180).max(180)]),
    precisao: z.enum(['exata', 'aproximada', 'regiao']),
    raio_km: z.number().positive().optional(),
    vista: z.array(z.enum(['atlantico', 'sao-vicente'])).min(1),
    descricao: z.string().optional(),
    referencias: z.array(citacao).default([]),
  }),
});

const trajetos = defineCollection({
  loader: file(`${base}/trajetos.yaml`),
  schema: z.object({
    id: idValido,
    de: reference('lugares'),
    para: reference('lugares'),
    comprovacao: z.enum(['documentado', 'presumido']),
    acontecimento: reference('acontecimentos').optional(),
    referencias: citacoes,
    descricao: z.string().optional(),
  }),
});

const vinculos = [
  'protagonista', 'pai', 'mae', 'conjuge', 'sogro', 'sogra',
  'filho', 'filha', 'conjuge-de-filho', 'notavel',
] as const;

const pessoas = defineCollection({
  loader: file(`${base}/pessoas.yaml`),
  schema: z
    .object({
      id: idValido.refine((id) => id !== 'vinculos-notaveis', 'id "vinculos-notaveis" é reservado'),
      nome: z.string(),
      variantes: z.array(z.string()).default([]),
      nascimento: dataHistorica.optional(),
      obito: dataHistorica.optional(),
      vinculo: z.enum(vinculos, { error: `vinculo deve ser um de: ${vinculos.join(', ')}` }),
      relacoes: z.array(z.object({ tipo: z.string(), pessoa: reference('pessoas') })).default([]),
      ligacao_notavel: z
        .object({
          tipo: z.enum(['descendencia', 'casamento', 'convivencia']),
          descricao: z.string(),
          natureza,
          referencias: citacoes,
        })
        .optional(),
      natureza,
      referencias: citacoes,
      lacunas: z.string().optional(),
      evidencia_historica: citacao.optional(),
    })
    // Regra dos 100 anos (FR-019, Princípio V).
    .refine(
      (p) =>
        p.obito !== undefined ||
        (p.nascimento !== undefined && p.nascimento.ano <= anoAtual - 100) ||
        p.evidencia_historica !== undefined,
      {
        message:
          'regra dos 100 anos: a pessoa só é publicada se tiver obito, nascimento há 100 anos ou mais, ou evidencia_historica',
      },
    )
    .refine((p) => p.vinculo !== 'notavel' || p.ligacao_notavel !== undefined, {
      message: 'pessoa com vinculo "notavel" exige ligacao_notavel',
    }),
});

const divergencias = defineCollection({
  loader: file(`${base}/divergencias.yaml`),
  schema: z.object({
    id: idValido,
    tema: z.string(),
    versoes: z
      .array(z.object({ texto: z.string(), referencias: citacoes }))
      .min(2, 'divergência exige ao menos 2 versões'),
    observacao: z.string().optional(),
  }),
});

const imagens = defineCollection({
  loader: file(`${base}/imagens.yaml`),
  schema: ({ image }) =>
    z.object({
      id: idValido,
      arquivo: image(),
      alt: z.string().min(1, 'alt é obrigatório'),
      legenda: z.string().min(1),
      credito: z.string().min(1),
      origem: z.string().min(1),
      licenca: z.string().min(1),
      tipo: z.enum(['historica', 'fotografia-atual', 'ilustracao']),
      data_foto: z.string().optional(),
    }),
});

const alteracoes = defineCollection({
  loader: file(`${base}/alteracoes.yaml`),
  schema: z.object({
    id: idValido,
    data: z.iso.date({ error: 'data no formato AAAA-MM-DD' }),
    afeta: z.array(z.string()).min(1),
    descricao: z.string(),
    motivo: z.string(),
    referencias: z.array(citacao).default([]),
  }),
});

export const collections = {
  referencias,
  capitulos,
  paginas,
  acontecimentos,
  lugares,
  trajetos,
  pessoas,
  divergencias,
  imagens,
  alteracoes,
};
