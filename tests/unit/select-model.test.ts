import {describe, expect, it} from 'vitest';
import {filterSelectOptions, findSelectableOption, type SelectModelOption} from '../../packages/core/src/components/Select/select-model.ts';

const options: SelectModelOption[] = [
    {id: 'one', label: 'One', value: 1},
    {id: 'break', isSpacer: true},
    {id: 'two', label: 'Two', value: '2', disabled: true},
    {id: 'three', label: 'Three', value: '3'}
];

describe('select model', () => {
    it('filters visible options without changing stable IDs', () => {
        expect(filterSelectOptions(options, 'th').map(option => option.id)).toEqual(['break', 'three']);
    });

    it('skips disabled options and spacers during keyboard navigation', () => {
        expect(findSelectableOption(options, 0, 1)).toBe(3);
        expect(findSelectableOption(options, 3, -1)).toBe(0);
    });
});
