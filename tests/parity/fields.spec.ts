import {expect, test} from '@playwright/test';
test('field contracts associate labels and live validation messages', async ({page}) => {
    await page.setContent('<label for="field">Name</label><input id="field" class="input" aria-invalid="true" aria-describedby="field-message"><div id="field-message" role="alert">Required</div>');
    await expect(page.locator('label')).toHaveAttribute('for', 'field');
    await expect(page.locator('#field')).toHaveAttribute('aria-describedby', 'field-message');
    await expect(page.locator('#field-message')).toHaveAttribute('role', 'alert');
});
