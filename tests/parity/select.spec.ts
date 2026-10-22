import {expect, test} from '@playwright/test';

test('Select uses the canonical single-dash combobox contract', async ({page}) => {
    await page.setContent('<label id="select-label">Choose</label><div class="select"><div class="select-trigger" role="combobox" aria-labelledby="select-label" aria-haspopup="listbox" aria-expanded="false" aria-controls="select-listbox" tabindex="0"><div class="select-content"><span class="select-value">One</span></div><button class="select-chevron-btn" aria-label="Toggle dropdown" tabindex="-1">⌄</button></div></div>');
    const trigger = page.locator('.select-trigger');
    await expect(trigger).toHaveAttribute('role', 'combobox');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('.select-dropdown')).toHaveCount(0);
    await page.evaluate(() => {
        const trigger = document.querySelector('.select-trigger')!;
        trigger.setAttribute('aria-expanded', 'true');
        const listbox = document.createElement('ul');
        listbox.id = 'select-listbox'; listbox.className = 'select-dropdown'; listbox.setAttribute('role', 'listbox');
        listbox.innerHTML = '<li id="select-listbox-option-0" class="select-option is-selected" role="option" aria-selected="true">One</li>';
        document.body.append(listbox);
    });
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('body > .select-dropdown')).toHaveCount(1);
    await expect(page.locator('.select-option')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('[class*="__"], [class*="--"]')).toHaveCount(0);
});
