import {expect, test} from '@playwright/test';

test('gallery modal keeps manipulation events inside its dialog surface', async ({page}) => {
    await page.setContent('<dialog class="modal image-viewer" role="dialog" aria-modal="true"><div class="modal-dialog"><div class="modal-content"><div class="image-viewer-container"><div class="image-viewer-image-wrapper"><img class="image-viewer-image" alt="Image"></div></div></div></div></dialog>');
    const dialog = page.locator('.modal');
    await expect(dialog).toHaveAttribute('role', 'dialog');
    await expect(dialog.locator('.image-viewer-image-wrapper')).toHaveCount(1);
    await expect(page.locator('[class*="__"], [class*="--"]')).toHaveCount(0);
});
