import {expect, test} from '@playwright/test';

test('real Vanilla DataTable sorts, selects, and restores authored table rows', async ({page}) => {
  await page.goto('/');
  await page.evaluate(() => {
    document.body.insertAdjacentHTML('beforeend', `<table id="native-table" data-lyco-datatable data-selectable="true">
      <thead><tr><th data-column="name" tabindex="0">Name</th></tr></thead>
      <tbody><tr><td>Zoe</td></tr><tr><td>Ada</td></tr></tbody>
    </table>`);
    window.lycoHarness?.init();
  });
  const table = page.locator('#native-table');
  await expect(table.locator('xpath=../..').locator('.data-table-toolbar .data-table-search input')).toHaveAttribute('placeholder', 'Search...');
  await table.locator('th[data-column="name"]').click();
  await expect(table.locator('tbody tr').first()).toHaveText('Ada');
  await table.locator('tbody tr').first().click();
  await expect(table.locator('tbody tr').first()).toHaveAttribute('aria-selected', 'true');
  await table.locator('th[data-column="name"]').press('Enter');
  await expect(table.locator('tbody tr').first()).toHaveText('Zoe');
  await table.locator('xpath=../..').locator('.data-table-search input').fill('Ada');
  await expect(table.locator('tbody tr:visible')).toHaveCount(1);
  await page.evaluate(() => window.lycoHarness?.destroy());
  await expect(table.locator('tbody tr')).toHaveCount(2);
  await expect(table.locator('tbody tr').first()).toHaveText('Zoe');
});

test('Vanilla DataTable keyboard reorder keeps DOM order aligned with its command model', async ({page}) => {
  await page.goto('/');
  await page.evaluate(() => {
    document.body.insertAdjacentHTML('beforeend', `<table id="reorder-table" data-lyco-datatable data-reorderable="true"><thead><tr><th data-column="name">Name</th></tr></thead><tbody><tr><td>A</td></tr><tr><td>B</td></tr><tr><td>C</td></tr></tbody></table>`);
    window.lycoHarness?.init();
  });
  const rows = page.locator('#reorder-table tbody tr');
  await page.locator('#reorder-table').evaluate((table) => table.addEventListener('lyco:datatable-row-reorder', (event) => { table.dataset.reorder = JSON.stringify((event as CustomEvent).detail); }));
  await rows.first().evaluate((node) => node.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown', altKey: true, bubbles: true})));
  await expect(rows.nth(0)).toHaveText('B');
  await expect(rows.nth(1)).toHaveText('A');
  await expect(rows.nth(2)).toHaveText('C');
  await expect(page.locator('#reorder-table')).toHaveAttribute('data-reorder', '{"sourceIndex":0,"destinationIndex":1}');
});
