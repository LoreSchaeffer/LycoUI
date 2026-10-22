import {useCallback, useRef, useState} from 'react';

export function useImageTransform() {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({x: 0, y: 0});
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({x: 0, y: 0});
    const reset = useCallback(() => { setScale(1); setPosition({x: 0, y: 0}); }, []);
    const wheel = useCallback((event: React.WheelEvent) => {
        setScale(current => {
            const next = Math.max(0.5, Math.min(4, current + (event.deltaY < 0 ? 0.1 : -0.1)));
            if (next <= 1) setPosition({x: 0, y: 0});
            return next;
        });
    }, []);
    const start = useCallback((event: React.MouseEvent) => {
        if (scale <= 1) return;
        setIsDragging(true);
        dragStart.current = {x: event.clientX - position.x, y: event.clientY - position.y};
    }, [position, scale]);
    const move = useCallback((event: React.MouseEvent) => {
        if (!isDragging) return;
        setPosition({x: event.clientX - dragStart.current.x, y: event.clientY - dragStart.current.y});
    }, [isDragging]);
    return {scale, position, isDragging, reset, wheel, start, move, end: () => setIsDragging(false)};
}
