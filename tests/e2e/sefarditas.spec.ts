// T058 (US2): a página das raízes sefarditas cobre os tópicos e liga ao capítulo das raízes.
import { test, expect } from '@playwright/test';

const BASE = '/';

test('página sefarditas traz os tópicos de US2-1', async ({ page }) => {
  await page.goto(`${BASE}sefarditas/`);
  await expect(page.locator('h1')).toContainText('sefarditas');
  const topicos = page.locator('.texto-capitulo h2');
  for (const t of ['Sefarad', 'Os judeus em Portugal', '1492 e 1497', 'Os cristãos-novos', 'A dispersão', 'Sebastião de Freitas']) {
    await expect(topicos.filter({ hasText: t }).first()).toBeVisible();
  }
  await expect(page.locator('.texto-capitulo .marcador').first()).toBeVisible();
  await page.getByRole('link', { name: 'Raízes cristãs-novas e sefarditas' }).click();
  await expect(page).toHaveURL(/exposicao\/raizes-cristas-novas-e-sefarditas\/$/);
});

test('página inicial dá acesso às raízes sefarditas', async ({ page }) => {
  await page.goto(BASE);
  await expect(page.locator(`a[href="${BASE}sefarditas/"]`).first()).toBeAttached();
});
