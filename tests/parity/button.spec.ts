import {expect, test} from '@playwright/test';
test('flat button is represented by a class, never a DOM attribute', async ({page}) => {
    await page.setContent('<button class="btn btn-flat">Save</button>');
    await expect(page.getByRole('button', {name: 'Save'})).not.toHaveAttribute('flat');
    await expect(page.getByRole('button', {name: 'Save'})).toHaveClass(/btn-flat/);
});
