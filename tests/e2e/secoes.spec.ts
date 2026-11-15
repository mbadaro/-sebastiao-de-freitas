// T063, T070, T074, T077 — linha do tempo (US3), mapa (US4), família (US5) e consulta (US6).
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

// Lê os dados diretamente do acervo para conferir que nada ficou de fora (SC-004).
// Leitura simples por blocos "- id:"; basta para id, tipo e vista.
function ler(arq: string) {
  return readFileSync(`conteudo/${arq}`, 'utf8')
    .split(/^- id: /m)
    .slice(1)
    .map((b) => ({
      id: b.split(/\r?\n/)[0].trim(),
      tipo: b.match(/^  tipo: (\S+)/m)?.[1],
      vista: (b.match(/^  vista: \[(.*)\]/m)?.[1] ?? '').split(',').map((v) => v.trim()).filter(Boolean),
    }));
}
const acontecimentos = ler('acontecimentos.yaml');
const lugares = ler('lugares.yaml');

test.describe('linha do tempo (US3)', () => {
  test('todos os acontecimentos da vida de Sebastião, em ordem cronológica (SC-004)', async ({ page }) => {
    await page.goto('linha-do-tempo/');
    for (const a of acontecimentos.filter((x) => x.tipo === 'trajetoria')) {
      await expect(page.locator(`li#${a.id}`)).toHaveCount(1);
    }
    const anos = await page.locator('.evento').evaluateAll((els) =>
      els.map((e) => Number((e.querySelector('.evento__data')?.textContent ?? '').match(/\d{4}/)?.[0])),
    );
    expect(anos).toEqual([...anos].sort((a, b) => a - b));
  });

  test('filtro por teclado mostra só o contexto', async ({ page }) => {
    await page.goto('linha-do-tempo/');
    await page.getByLabel('Contexto', { exact: true }).focus();
    await page.keyboard.press('Space');
    await expect(page.locator('.evento--trajetoria').first()).toBeHidden();
    await expect(page.locator('.evento--contexto').first()).toBeVisible();
  });

  test('sem JavaScript, tudo continua visível', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto('http://localhost:4321/sebastiao-de-freitas/linha-do-tempo/');
    await expect(page.locator('.evento')).toHaveCount(acontecimentos.length);
    await expect(page.locator('[data-filtro]')).toBeHidden();
    await ctx.close();
  });
});

test.describe('mapa (US4)', () => {
  test('todos os lugares aparecem no mapa e na lista (SC-004)', async ({ page }) => {
    await page.goto('mapa/');
    for (const l of lugares) {
      for (const v of l.vista) {
        await expect(page.locator(`a[href="#lugar-${v}-${l.id}"]`)).toHaveCount(1);
        await expect(page.locator(`#lugar-${v}-${l.id}`)).toHaveCount(1);
      }
    }
  });

  test('lugar no mapa abre a ficha por teclado', async ({ page }) => {
    await page.goto('mapa/');
    const link = page.locator('a[href="#lugar-sao-vicente-santos"]');
    await link.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#lugar-sao-vicente-santos$/);
    await expect(page.locator('#lugar-sao-vicente-santos')).toContainText('Santos');
  });

  test('trajeto presumido tem rótulo escrito', async ({ page }) => {
    await page.goto('mapa/');
    await expect(page.locator('.mapa-svg__trajeto--presumido text').first()).toHaveText('presumido');
    await expect(page.getByText('trajeto presumido').first()).toBeVisible();
  });

  test('página do lugar tem dado estruturado Place', async ({ page }) => {
    await page.goto('lugares/silves/');
    const ld = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(JSON.parse(ld!)['@type']).toBe('Place');
  });
});

test.describe('família (US5)', () => {
  test('pessoas agrupadas por vínculo e divergência do número de filhos', async ({ page }) => {
    await page.goto('familia/');
    await expect(page.getByRole('heading', { name: 'Os filhos' })).toBeVisible();
    await expect(page.locator('#divergencia-numero-de-filhos')).toHaveCount(1);
    await page.locator('#divergencia-numero-de-filhos summary').click();
    await expect(page.locator('#divergencia-numero-de-filhos .divergencia__versoes li')).toHaveCount(2);
  });

  test('vínculo notável mostra tipo, natureza e fonte', async ({ page }) => {
    await page.goto('familia/vinculos-notaveis/');
    const raposo = page.locator('.notavel', { hasText: 'Raposo Tavares' });
    await expect(raposo.locator('.notavel__tipo')).toContainText('Convivência');
    await expect(raposo.locator('.notavel__tipo')).toContainText('Tradição genealógica');
    await expect(raposo.locator('.notavel__fontes a').first()).toBeVisible();
  });
});

test.describe('consulta (US6)', () => {
  test('da página inicial a um lugar e a uma pessoa sem passar pela narrativa', async ({ page }) => {
    await page.goto('');
    await page.getByRole('navigation', { name: /principal/i }).getByRole('link', { name: 'Mapa' }).click();
    await page.locator('a[href*="/lugares/"]').first().click();
    await expect(page.locator('h1')).not.toBeEmpty();
    await page.goto('');
    await page.getByRole('navigation', { name: /principal/i }).getByRole('link', { name: 'Família' }).click();
    await page.locator('.pessoa__nome a').first().click();
    await expect(page).toHaveURL(/\/familia\/[a-z-]+\/$/);
  });

  test('fontes agrupadas por tipo, com "onde é usada" levando a páginas existentes', async ({ page, request }) => {
    await page.goto('fontes/');
    for (const id of ['primarias', 'secundarias', 'informais']) await expect(page.locator(`#${id}`)).toHaveCount(1);
    await expect(page.locator('#silva-leme-v7')).toHaveCount(1);
    const hrefs = await page.locator('.ref__usos a').evaluateAll((as) => [...new Set(as.map((a) => (a as HTMLAnchorElement).href.split('#')[0]))]);
    expect(hrefs.length).toBeGreaterThan(5);
    for (const h of hrefs) expect((await request.get(h)).status()).toBe(200);
  });
});
