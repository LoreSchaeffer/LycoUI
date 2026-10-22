import {describe, expect, it} from 'vitest';
import {deriveRows} from '../../packages/core/src/components/DataTable/data-model.ts';

const columns = [{id: 'name'}, {id: 'score'}] as const;
const rows = [{name: 'Áda', score: 2}, {name: 'Bea', score: 1}, {name: 'Cara', score: 3}];

describe('deriveRows', () => {
    it('filters accent-insensitively, sorts stably, and pages results', () => {
        const result = deriveRows(rows, columns, {query: 'ada', sortColumn: 'score', sortDirection: 'desc', pageSize: 1});
        expect(result.rows).toEqual([{name: 'Áda', score: 2}]);
        expect(result.total).toBe(1);
        expect(result.from).toBe(1);
    });

    it('clamps a stale page after filtering', () => {
        const result = deriveRows(rows, columns, {query: 'bea', page: 4, pageSize: 1});
        expect(result.page).toBe(1);
        expect(result.totalPages).toBe(1);
        expect(result.to).toBe(1);
    });
});
