import {expect, test} from '@playwright/test';
import {deriveRows} from '../../packages/core/src/components/DataTable/data-model.ts';

test('React adapters receive the same clamped shared row model', () => {
    const model = deriveRows([{name: 'Ada'}, {name: 'Bea'}], [{id: 'name'}], {query: 'bea', page: 99, pageSize: 1});
    expect(model.rows).toEqual([{name: 'Bea'}]);
    expect(model.page).toBe(1);
    expect(model.from).toBe(1);
});
