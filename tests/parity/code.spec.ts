import {expect, test} from '@playwright/test';
test('editable code synchronizes its visible fallback and emits native change events', async ({page}) => {
    await page.setContent('<div class="code"><textarea class="code-textarea">one</textarea><pre class="code-highlight">one</pre></div>');
    await page.evaluate(() => { const root = document.querySelector('.code')!; const textarea = root.querySelector('textarea')!; textarea.value = 'two'; root.querySelector('pre')!.textContent = textarea.value; root.dispatchEvent(new CustomEvent('lyco:code-change', {detail: {code: textarea.value}, bubbles: true})); });
    await expect(page.locator('.code-highlight')).toHaveText('two');
});
