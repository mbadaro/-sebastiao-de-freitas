// Testes ponta a ponta sobre o site gerado (plano, D11). Rode `npm run build` antes.
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  // O servidor de prévia é único; limitar paralelismo e ampliar o tempo evita falsos negativos.
  workers: 3,
  timeout: 60_000,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4321/sebastiao-de-freitas/',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npx astro preview --port 4321 --ignore-lock',
    url: 'http://localhost:4321/sebastiao-de-freitas/',
    reuseExistingServer: !process.env.CI,
  },
});
