import {useCallback, useEffect, useState} from 'react';

/** Shared focused/filled view state for native text controls. */
export function useInputState(value: unknown, defaultValue: unknown) {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(() => Boolean(value !== undefined ? value : defaultValue));

    useEffect(() => {
        if (value !== undefined) setIsFilled(String(value).length > 0);
    }, [value]);

    return {
        isFocused,
        isFilled,
        focus: useCallback(() => setIsFocused(true), []),
        blur: useCallback(() => setIsFocused(false), []),
        input: useCallback((nextValue: string) => setIsFilled(nextValue.length > 0), []),
    };
}
