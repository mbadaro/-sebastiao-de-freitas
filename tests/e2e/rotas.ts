// Lista as páginas geradas em dist/ para que os testes cubram todas as rotas.
import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

export function rotasGeradas(dir = 'dist'): string[] {
  const rotas: string[] = [];
  const percorrer = (atual: string) => {
    for (const nome of readdirSync(atual)) {
      const caminho = join(atual, nome);
      if (statSync(caminho).isDirectory()) percorrer(caminho);
      else if (nome === 'index.html') {
        const rel = relative(dir, atual).split(sep).join('/');
        rotas.push(rel ? `${rel}/` : '');
      }
    }
  };
  percorrer(dir);
  return rotas.sort();
}
