import {useMemo} from 'react';
import type {SelectOption} from './Select';
import {filterSelectOptions, findSelectableOption} from './select-model';

export function useSelectState(options: SelectOption[], query: string, searchable: boolean, isOpen: boolean) {
    const visibleOptions = useMemo(() => {
        const identified = options.map((option, index) => ({...option, id: String(index)}));
        return searchable && isOpen ? filterSelectOptions(identified, query) : identified;
    }, [isOpen, options, query, searchable]);
    const nextIndex = (index: number, direction: 1 | -1, includeStart = false) => findSelectableOption(visibleOptions, index, direction, includeStart);
    return {visibleOptions, nextIndex};
}
