import {expect, test} from '@playwright/test';

test('alert dialog has the shared modal dialog semantics', async ({page}) => {
    await page.setContent('<dialog class="modal" role="alertdialog" aria-modal="true" aria-labelledby="alert-title"><div class="modal-dialog"><div class="modal-content"><h3 id="alert-title" class="modal-title">Delete?</h3><button autofocus>Cancel</button><button>Delete</button></div></div></dialog>');
    const dialog = page.locator('[role="alertdialog"]');
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await expect(dialog).toHaveAttribute('aria-labelledby', 'alert-title');
    await expect(page.locator('[autofocus]')).toHaveCount(1);
});
