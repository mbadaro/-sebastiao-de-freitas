// Configuração do Astro — gerador de site estático (plano, D1 e D2).
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Endereço provisório da prévia; muda para o domínio próprio na T085.
  site: 'https://mbadaro.github.io',
  base: '/sebastiao-de-freitas',
  trailingSlash: 'always',
  output: 'static',
  // Marcadores :fonte/::divergencia (D4): plugin em src/plugins/remark-fonte.ts, a registrar
  // após decisão sobre o processador de Markdown do Astro 7.
  // Política de segurança de conteúdo gerada pelo Astro, com hashes dos scripts e estilos
  // (plano, Segurança): só recursos do próprio domínio.
  security: {
    csp: {
      directives: ["default-src 'self'", "img-src 'self' data:", "font-src 'self'"],
    },
  },
});
