import {expect, test} from '@playwright/test';

test('real Vanilla pickers build desktop popovers, preserve form identity, and restore native inputs', async ({page}) => {
  await page.goto('/');
  await page.evaluate(() => {
    document.body.insertAdjacentHTML('beforeend', `<form id="picker-form">
      <input id="date" type="date" name="date" value="2026-03-10" min="2026-03-01" data-lyco-datepicker>
      <input id="time" type="time" name="time" value="09:30" data-lyco-timepicker data-use-12-hour="true">
      <input id="when" type="datetime-local" name="when" value="2026-03-10T09:30" data-lyco-datetimepicker>
    </form>`);
    window.lycoHarness?.init();
  });

  const date = page.locator('#date');
  await expect(date).toHaveAttribute('name', 'date');
  await expect(date).toHaveAttribute('aria-haspopup', 'dialog');
  await date.click();
  await expect(page.locator('.datepicker-popover[aria-label="Date picker calendar"]')).toBeVisible();
  await expect(page.locator('.datepicker-popover[aria-label="Date picker calendar"] .datepicker-cal-grid [role="gridcell"]')).toHaveCount(42);
  await date.press('Escape');
  await expect(page.locator('.datepicker-popover[aria-label="Date picker calendar"]')).toBeHidden();

  await page.locator('#time').click();
  await expect(page.locator('.datepicker-popover[aria-label="Time picker"] .datepicker-time-col')).toHaveCount(3);
  await page.locator('#when').click();
  await expect(page.locator('.datepicker-popover[aria-label="Date and time picker"] .datepicker-btn-primary')).toHaveText('Apply');

  await page.evaluate(() => window.lycoHarness?.destroy());
  await expect(date).toHaveAttribute('type', 'date');
  await expect(page.locator('#time')).toHaveAttribute('type', 'time');
  await expect(page.locator('#when')).toHaveAttribute('type', 'datetime-local');
});
