import {expect, test} from '@playwright/test';

test('tooltip preserves an authored description when its owned description is removed', async ({page}) => {
    await page.setContent('<button id="trigger" aria-describedby="author-description">Hover</button><span id="author-description">Author description</span>');
    await page.evaluate(() => {
        const trigger = document.querySelector('#trigger')!;
        const tooltip = document.createElement('div'); tooltip.id = 'lyco-tooltip-owned'; tooltip.className = 'tooltip-content'; tooltip.setAttribute('role', 'tooltip'); tooltip.textContent = 'Library tooltip'; document.body.append(tooltip);
        trigger.setAttribute('aria-describedby', 'author-description lyco-tooltip-owned');
    });
    await expect(page.locator('#trigger')).toHaveAttribute('aria-describedby', 'author-description lyco-tooltip-owned');
    await page.evaluate(() => { document.querySelector('#lyco-tooltip-owned')?.remove(); document.querySelector('#trigger')?.setAttribute('aria-describedby', 'author-description'); });
    await expect(page.locator('#trigger')).toHaveAttribute('aria-describedby', 'author-description');
    await expect(page.locator('.tooltip-content')).toHaveCount(0);
});
