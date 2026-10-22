import { expect, test } from '@playwright/test';

test('owns modal triggers once and releases them on destroy', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.lycoHarness?.init());
  await page.locator('#modal-toggle').click();
  await expect(page.locator('#lifecycle-modal')).toHaveCSS('display', 'flex');

  await page.evaluate(() => window.lycoHarness?.destroy());
  await page.locator('#lifecycle-modal [data-lyco-dismiss="modal"]').evaluate((button) => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  await expect(page.locator('#lifecycle-modal')).toHaveCSS('display', 'none');
});
