/**
 * T045 — casos negativos de quickstart.md (seção 1).
 * Cada caso copia o acervo de teste válido, introduz um erro e confirma que a geração do site falha
 * com a mensagem esperada. Executar: node --test tests/validacao/
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, rmSync, readFileSync, writeFileSync, appendFileSync, mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const valido = join('tests', 'validacao', 'fixtures', 'valido');
const tmp = join('tests', 'validacao', 'tmp');

function gerar(nome: string, alterar?: (dir: string) => void) {
  const dir = join(tmp, nome);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });
  cpSync(valido, dir, { recursive: true });
  alterar?.(dir);
  const r = spawnSync('npx', ['astro', 'build', '--outDir', join(tmp, `dist-${nome}`)], {
    env: { ...process.env, CONTEUDO_DIR: dir.split('\\').join('/') },
    encoding: 'utf8',
    shell: true,
  });
  return { codigo: r.status, saida: `${r.stdout}\n${r.stderr}` };
}

test('acervo de teste válido gera o site', () => {
  const r = gerar('valido');
  assert.equal(r.codigo, 0, r.saida.slice(-1500));
});

test('parágrafo de capítulo sem fonte falha', () => {
  const r = gerar('sem-fonte', (d) => appendFileSync(join(d, 'capitulos', '01-teste.md'), '\nParágrafo sem nenhuma fonte.\n'));
  assert.notEqual(r.codigo, 0);
  assert.match(r.saida, /parágrafo sem fonte/);
});

test('"fato" com sem-fonte falha (FR-007)', () => {
  const r = gerar('fato-sem-fonte', (d) =>
    appendFileSync(join(d, 'capitulos', '01-teste.md'), '\nAfirmação qualquer :fonte{nat=fato ref=sem-fonte}.\n'),
  );
  assert.notEqual(r.codigo, 0);
  assert.match(r.saida, /não pode ser "fato"/);
});

test('referência inexistente falha', () => {
  const r = gerar('ref-inexistente', (d) =>
    writeFileSync(
      join(d, 'acontecimentos.yaml'),
      '- id: teste\n  titulo: Teste\n  data: { ano: 1600, precisao: exata }\n  tipo: trajetoria\n  natureza: historiografia\n  referencias: [{ ref: obra-que-nao-existe }]\n',
    ),
  );
  assert.notEqual(r.codigo, 0);
  assert.match(r.saida, /obra-que-nao-existe/);
});

test('pessoa nascida em 1950 sem óbito falha (regra dos 100 anos)', () => {
  const r = gerar('cem-anos', (d) =>
    writeFileSync(
      join(d, 'pessoas.yaml'),
      '- id: pessoa-recente\n  nome: Pessoa Recente\n  nascimento: { ano: 1950, precisao: exata }\n  vinculo: notavel\n  ligacao_notavel: { tipo: casamento, descricao: x, natureza: tradicao, referencias: [{ ref: sem-fonte }] }\n  natureza: tradicao\n  referencias: [{ ref: sem-fonte }]\n',
    ),
  );
  assert.notEqual(r.codigo, 0);
  assert.match(r.saida, /regra dos 100 anos/);
});

test('imagem sem alt falha', () => {
  const r = gerar('imagem-sem-alt', (d) => {
    cpSync(join('public', 'og', 'padrao.png'), join(d, 'imagens', 'teste.png'));
    writeFileSync(
      join(d, 'imagens.yaml'),
      '- id: teste\n  arquivo: ./imagens/teste.png\n  legenda: Teste\n  credito: Teste\n  origem: Teste\n  licenca: Teste\n  tipo: ilustracao\n',
    );
  });
  assert.notEqual(r.codigo, 0);
  assert.match(r.saida, /alt/);
});

test('capítulo sem descrição falha', () => {
  const r = gerar('sem-descricao', (d) => {
    const f = join(d, 'capitulos', '01-teste.md');
    writeFileSync(f, readFileSync(f, 'utf8').replace(/^descricao:.*\n/m, ''));
  });
  assert.notEqual(r.codigo, 0);
  assert.match(r.saida, /descricao/);
});
