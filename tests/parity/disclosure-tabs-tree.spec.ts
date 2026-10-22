import {expect, test} from '@playwright/test';
test('tab activation keeps one enabled trigger tabbable and clears hidden panels', async ({page}) => {
    await page.setContent('<div class="tabs"><button role="tab" class="is-active" aria-selected="true" tabindex="0">One</button><button role="tab" aria-selected="false" tabindex="-1">Two</button><div role="tabpanel">One panel</div><div role="tabpanel" hidden>Two panel</div></div>');
    const tabs = page.locator('[role="tab"]');
    await expect(tabs.nth(0)).toHaveAttribute('tabindex', '0');
    await page.evaluate(() => { const tabs = document.querySelectorAll<HTMLElement>('[role="tab"]'); const panels = document.querySelectorAll<HTMLElement>('[role="tabpanel"]'); tabs[0].tabIndex = -1; tabs[1].tabIndex = 0; panels[0].hidden = true; panels[1].hidden = false; });
    await expect(tabs.nth(1)).toHaveAttribute('tabindex', '0');
    await expect(page.locator('[role="tabpanel"]').nth(1)).not.toHaveAttribute('hidden');
});
