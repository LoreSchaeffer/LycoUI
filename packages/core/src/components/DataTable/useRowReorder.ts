import {useCallback, useState} from 'react';
import type {DragEvent} from 'react';

export function useRowReorder(onReorder?: (sourceIndex: number, destinationIndex: number) => void) {
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const onDragStart = useCallback((event: DragEvent<HTMLTableRowElement>, index: number) => {
        setDragIndex(index);
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', String(index));
        requestAnimationFrame(() => (event.target as HTMLElement).classList.add('is-dragging'));
    }, []);
    const onDragOver = useCallback((event: DragEvent<HTMLTableRowElement>, index: number) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        setDragOverIndex(index);
    }, []);
    const reset = useCallback(() => {
        setDragIndex(null);
        setDragOverIndex(null);
    }, []);
    const onDrop = useCallback((event: DragEvent<HTMLTableRowElement>, destinationIndex: number) => {
        event.preventDefault();
        if (dragIndex !== null && dragIndex !== destinationIndex) onReorder?.(dragIndex, destinationIndex);
        reset();
    }, [dragIndex, onReorder, reset]);
    return {dragIndex, dragOverIndex, onDragStart, onDragOver, onDragLeave: reset, onDrop, onDragEnd: reset};
}
