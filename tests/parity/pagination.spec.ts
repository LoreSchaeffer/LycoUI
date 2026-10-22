import {expect, test} from '@playwright/test';
test('pagination has an accessible navigation root and disabled controls', async ({page}) => {
    await page.setContent('<nav class="pagination" aria-label="Pagination" aria-disabled="true"><button class="pagination-btn pagination-btn-prev" disabled aria-label="Previous page">‹</button></nav>');
    await expect(page.locator('.pagination')).toHaveAttribute('aria-label', 'Pagination');
    await expect(page.getByLabel('Previous page')).toBeDisabled();
});
