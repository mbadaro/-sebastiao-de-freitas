/**
 * Datas históricas (T041; FR-013): exatas, aproximadas, limites e intervalos.
 * A imprecisão sempre aparece para o leitor; nunca vira data exata falsa.
 */
export interface DataHistorica {
  ano: number;
  mes?: number;
  dia?: number;
  precisao: 'exata' | 'aproximada' | 'antes-de' | 'depois-de' | 'intervalo';
  ate?: number;
  exibicao?: string;
}

const meses = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

export function formatarData(d: DataHistorica): string {
  if (d.exibicao) return d.exibicao;
  const base =
    d.dia && d.mes ? `${d.dia} de ${meses[d.mes - 1]} de ${d.ano}` : d.mes ? `${meses[d.mes - 1]} de ${d.ano}` : `${d.ano}`;
  switch (d.precisao) {
    case 'aproximada':
      return `c. ${d.ano}`;
    case 'antes-de':
      return `antes de ${d.ano}`;
    case 'depois-de':
      return `depois de ${d.ano}`;
    case 'intervalo':
      return `${d.ano}–${d.ate}`;
    default:
      return base;
  }
}

/** Chave de ordenação cronológica. */
export function chaveData(d: DataHistorica): number {
  return d.ano * 10000 + (d.mes ?? 0) * 100 + (d.dia ?? 0);
}
