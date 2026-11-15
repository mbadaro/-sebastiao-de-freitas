// T054 — História de Usuário 1: percorrer a exposição.
import { test, expect } from '@playwright/test';

test('do início ao último capítulo pelo "próximo" (US1-1)', async ({ page }) => {
  await page.goto('');
  await page.getByRole('link', { name: /Comece a exposição/ }).click();
  await expect(page).toHaveURL(/\/exposicao\/$/);
  await page.locator('.sumario__item').first().click();
  let passos = 0;
  while ((await page.locator('a[rel="next"]').count()) > 0 && passos < 20) {
    await page.locator('a[rel="next"]').click();
    passos++;
  }
  await expect(page.locator('.sobretitulo')).toContainText(/Capítulo (\d+) de \1/);
});

test('capítulo do meio abre direto pelo endereço (FR-003)', async ({ page }) => {
  await page.goto('exposicao/sao-paulo-e-familia/');
  await expect(page.locator('h1')).toHaveText('São Paulo e a família');
  await expect(page.locator('a[rel="prev"]')).toHaveCount(1);
  await expect(page.locator('a[rel="next"]')).toHaveCount(1);
});

test('da página inicial à referência de uma afirmação em até 3 ações (SC-003)', async ({ page }) => {
  await page.goto('');
  await page.getByRole('link', { name: /Comece a exposição/ }).click(); // 1
  await page.locator('.sumario__item').first().click(); // 2
  await page.locator('.marcador__chamada').first().click(); // 3
  const alvo = page.locator('#citacao-1');
  await expect(alvo).toBeVisible();
  await expect(alvo.locator('.citacao__natureza')).not.toBeEmpty(); // natureza por extenso na nota
  await expect(alvo.locator('.citacao__ref').first()).not.toBeEmpty();
});

test('toda afirmação mostra natureza e chamada para a fonte (FR-006, SC-002)', async ({ page }) => {
  await page.goto('exposicao/');
  const links = await page.locator('.sumario__item').evaluateAll((as) => as.map((a) => a.getAttribute('href')!));
  for (const href of links) {
    await page.goto(href);
    const paragrafos = page.locator('.texto-capitulo > p');
    const n = await paragrafos.count();
    for (let i = 0; i < n; i++) {
      const nota = paragrafos.nth(i).locator('.marcador__chamada').first();
      await expect(nota, `${href} §${i + 1}`).toBeVisible();
      await expect(nota).toHaveAttribute('aria-label', /Fato documentado|Informação historiográfica|Tradição genealógica|Hipótese/);
    }
    // Toda chamada aponta para uma citação existente.
    const chamadas = await page.locator('.marcador__chamada').evaluateAll((as) => as.map((a) => a.getAttribute('href')!));
    for (const alvo of chamadas) await expect(page.locator(alvo)).toHaveCount(1);
  }
});

test('divergência aparece com as versões lado a lado, cada uma com fonte (FR-009)', async ({ page }) => {
  await page.goto('exposicao/raizes-cristas-novas-e-sefarditas/');
  const div = page.locator('.divergencia').first();
  await div.locator('summary').click(); // recolhida por padrão; abre ao clicar
  const versoes = div.locator('.divergencia__versao');
  expect(await versoes.count()).toBeGreaterThanOrEqual(2);
  for (let i = 0; i < (await versoes.count()); i++) {
    await expect(versoes.nth(i).locator('.divergencia__fonte')).toContainText('Fonte');
  }
});
