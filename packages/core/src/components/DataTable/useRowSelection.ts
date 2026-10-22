import {useCallback, useState} from 'react';

export type RowKey = string | number;

export function useRowSelection(controlledKeys: readonly RowKey[] | undefined, defaultKeys: readonly RowKey[], onChange?: (keys: RowKey[]) => void) {
    const [uncontrolledKeys, setUncontrolledKeys] = useState<RowKey[]>([...defaultKeys]);
    const keys = controlledKeys ?? uncontrolledKeys;
    const commit = useCallback((next: RowKey[]) => {
        if (controlledKeys === undefined) setUncontrolledKeys(next);
        onChange?.(next);
    }, [controlledKeys, onChange]);
    const toggle = useCallback((key: RowKey, checked: boolean) => commit(checked ? [...keys, key] : keys.filter((candidate) => candidate !== key)), [commit, keys]);
    const toggleAll = useCallback((available: readonly RowKey[], checked: boolean) => commit(checked ? Array.from(new Set([...keys, ...available])) : []), [commit, keys]);
    return {keys, toggle, toggleAll};
}
