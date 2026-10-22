import {expect, test} from '@playwright/test';
test('vanilla package entry remains an ES module surface', async ({page}) => {
    await page.setContent('<script type="module">window.__lycoModule = true;</script>');
    await expect.poll(() => page.evaluate(() => Boolean((window as Window & {__lycoModule?: boolean}).__lycoModule))).toBe(true);
});
