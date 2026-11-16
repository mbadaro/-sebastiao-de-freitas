// Configuração do Astro — gerador de site estático (plano, D1 e D2).
import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import remarkFonte from './src/plugins/remark-fonte.ts';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Domínio próprio (T085, 2026-11-16).
  site: 'https://sebastiaodefreitas.com.br',
  base: '/',
  trailingSlash: 'always',
  output: 'static',
  // Sitemap para buscadores (T080); a página 404 fica de fora.
  integrations: [sitemap({ filter: (pagina) => !pagina.includes('/404') })],
  // Marcadores :fonte e ::divergencia no Markdown (D4). Plugins remark exigem o processador
  // @astrojs/markdown-remark no Astro 7 (decisão aprovada em 2026-11-15).
  markdown: {
    remarkPlugins: [remarkDirective, remarkFonte],
  },
  // Política de segurança de conteúdo gerada pelo Astro, com hashes dos scripts e estilos
  // (plano, Segurança): só recursos do próprio domínio.
  security: {
    csp: {
      directives: ["default-src 'self'", "img-src 'self' data:", "font-src 'self'"],
    },
  },
});
