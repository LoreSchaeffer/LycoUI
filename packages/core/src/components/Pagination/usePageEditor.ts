import {useCallback, useEffect, useRef, useState} from 'react';
import {normalizePageEdit} from './pagination-model';

export function usePageEditor(currentPage: number, totalPages: number, onChange: (page: number) => void) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(String(currentPage));
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => setInputValue(String(currentPage)), [currentPage]);
    useEffect(() => { if (isEditing) inputRef.current?.focus(); }, [isEditing]);
    const cancel = useCallback(() => { setIsEditing(false); setInputValue(String(currentPage)); }, [currentPage]);
    const commit = useCallback(() => {
        const page = normalizePageEdit(inputValue, totalPages);
        setIsEditing(false);
        if (page === null) return setInputValue(String(currentPage));
        onChange(page);
    }, [currentPage, inputValue, onChange, totalPages]);
    return {isEditing, inputRef, inputValue, setInputValue, start: () => setIsEditing(true), cancel, commit};
}
