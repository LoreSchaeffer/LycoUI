import {expect, test} from '@playwright/test';

test('real Vanilla carousel builds the React-equivalent controls and restores authored slides', async ({page}) => {
  await page.goto('/');
  await page.evaluate(() => {
    document.body.insertAdjacentHTML('beforeend', `
      <section id="native-carousel" class="carousel" data-lyco-carousel data-infinite="true" tabindex="0">
        <article class="carousel-slide" aria-label="original-one">One</article>
        <article class="carousel-slide" aria-label="original-two">Two</article>
      </section>`);
    window.lycoHarness?.init();
  });

  const carousel = page.locator('#native-carousel');
  await expect(carousel).toHaveAttribute('role', 'region');
  await expect(carousel.locator(':scope > .carousel-track > .carousel-slide')).toHaveCount(4);
  await expect(carousel.locator('.carousel-arrow-prev')).toBeEnabled();
  await carousel.press('ArrowRight');
  await expect(carousel.locator('.carousel-arrow-prev')).toBeEnabled();
  await expect(carousel.locator('.carousel-dot[aria-current]')).toHaveCount(1);

  await page.evaluate(() => window.lycoHarness?.destroy());
  await expect(carousel.locator(':scope > .carousel-track')).toHaveCount(0);
  await expect(carousel.locator(':scope > .carousel-slide')).toHaveCount(2);
  await expect(carousel.locator('.carousel-slide').first()).toHaveAttribute('aria-label', 'original-one');
  await expect(carousel.locator('.carousel-arrow-prev')).toHaveCount(0);
});
