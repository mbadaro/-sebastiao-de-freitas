// Configuração do Astro — gerador de site estático (plano, D1 e D2).
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Endereço provisório da prévia; muda para o domínio próprio na T085.
  site: 'https://mbadaro.github.io',
  base: '/sebastiao-de-freitas',
  trailingSlash: 'always',
  output: 'static',
});
