export interface SelectModelOption {
    id: string;
    label?: string;
    value?: string | number;
    disabled?: boolean;
    isSpacer?: boolean;
}

export function filterSelectOptions<T extends SelectModelOption>(options: T[], query: string): T[] {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return options;
    return options.filter(option => option.isSpacer || (option.label || String(option.value ?? '')).toLowerCase().includes(normalized));
}

export function findSelectableOption(options: SelectModelOption[], start: number, direction: 1 | -1, includeStart = false): number {
    for (let index = includeStart ? start : start + direction; index >= 0 && index < options.length; index += direction) {
        if (!options[index].disabled && !options[index].isSpacer) return index;
    }
    return start;
}
