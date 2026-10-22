import { expect, test } from '@playwright/test';

test('loads the real React and Vanilla entries in the deterministic fixture', async ({ page }) => {
  const pageErrors: Error[] = [];
  page.on('pageerror', (error) => pageErrors.push(error));

  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-lyco-harness-ready', 'true');
  await expect(page.getByRole('button', { name: 'React button' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Vanilla button' })).toBeVisible();
  expect(pageErrors).toEqual([]);
});
