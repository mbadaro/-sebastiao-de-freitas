// Testes ponta a ponta sobre o site gerado (plano, D11). Rode `npm run build` antes.
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
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
