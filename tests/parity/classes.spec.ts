import {expect, test} from '@playwright/test';
test('canonical public classes use single dashes', async ({page}) => {
    await page.setContent('<button class="btn btn-sm btn-outline"><span class="btn-icon">Save</span></button><div class="dropdown"><div class="dropdown-menu"><button class="dropdown-item">One</button></div></div>');
    await expect(page.locator('[class*="__"], [class*="--"]')).toHaveCount(0);
    await expect(page.locator('.btn-sm')).toHaveCount(1);
    await expect(page.locator('.dropdown-menu')).toHaveCount(1);
});
