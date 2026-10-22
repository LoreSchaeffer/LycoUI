import {expect, test} from '@playwright/test';
test('reduced motion removes animated surface transitions', async ({page}) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    await page.setContent('<style>@media (prefers-reduced-motion: reduce) { .surface { transition: none !important; } }</style><div class="surface"></div>');
    await expect(page.locator('.surface')).toHaveCSS('transition-duration', '0s');
});
