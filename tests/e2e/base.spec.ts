// T026 — verificações aplicadas a TODAS as páginas geradas.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { rotasGeradas } from './rotas';

const larguras = [360, 768, 1280];

for (const rota of rotasGeradas()) {
  const nome = `/${rota}`;

  test(`${nome} — acessibilidade WCAG 2.2 AA (axe)`, async ({ page }) => {
    // Mede o estado final: animações de entrada ainda em curso distorcem o contraste.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(rota);
    const resultado = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(
      resultado.violations.map((v) => `${v.id}: ${v.nodes.map((n) => `${n.target.join(" ")} (${n.any[0]?.message ?? ""})`).join(" | ")}`),
    ).toEqual([]);
  });

  test(`${nome} — sem rolagem horizontal em 360, 768 e 1280 px (SC-007)`, async ({ page }) => {
    for (const largura of larguras) {
      await page.setViewportSize({ width: largura, height: 800 });
      await page.goto(rota);
      const sobra = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(sobra, `largura ${largura}px`).toBeLessThanOrEqual(0);
    }
  });

  test(`${nome} — título, descrição e canônica (FR-027, SC-010)`, async ({ page }) => {
    await page.goto(rota);
    expect((await page.title()).length).toBeGreaterThan(0);
    const descricao = await page.locator('meta[name="description"]').getAttribute('content');
    expect(descricao?.length ?? 0).toBeGreaterThan(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  });

  test(`${nome} — nenhuma requisição a domínio externo (FR-020, Princípio V)`, async ({ page }) => {
    const externas: string[] = [];
    page.on('request', (req) => {
      const host = new URL(req.url()).hostname;
      if (host !== 'localhost' && !req.url().startsWith('data:')) externas.push(req.url());
    });
    await page.goto(rota, { waitUntil: 'networkidle' });
    expect(externas).toEqual([]);
  });
}
