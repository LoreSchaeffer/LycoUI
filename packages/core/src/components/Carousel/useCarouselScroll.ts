import {useCallback, useEffect, useRef, useState} from 'react';
import {canLoop, nextIndex, toDomIndex, toLogicalIndex} from './carousel-model';

interface CarouselScrollOptions { count: number; infinite: boolean; }

export function useCarouselScroll({count, infinite}: CarouselScrollOptions) {
    const trackRef = useRef<HTMLDivElement>(null);
    const jumping = useRef(false);
    const frame = useRef<number | undefined>(undefined);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollTo = useCallback((domIndex: number, behavior: ScrollBehavior = 'smooth') => {
        const track = trackRef.current;
        const child = track?.children[domIndex] as HTMLElement | undefined;
        if (!track || !child) return;
        const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        track.scrollTo({left: child.offsetLeft - track.offsetLeft - (track.clientWidth - child.clientWidth) / 2, behavior: reduced ? 'auto' : behavior});
    }, []);
    const sync = useCallback(() => {
        const track = trackRef.current;
        if (!track || jumping.current) return;
        const center = track.scrollLeft + track.clientWidth / 2;
        let closest = 0;
        let distance = Infinity;
        Array.from(track.children).forEach((child, index) => {
            const item = child as HTMLElement;
            const current = Math.abs(center - (item.offsetLeft - track.offsetLeft + item.clientWidth / 2));
            if (current < distance) { distance = current; closest = index; }
        });
        const logical = toLogicalIndex(closest, count, infinite);
        setActiveIndex(logical);
        if (canLoop(count, infinite) && (closest === 0 || closest === count + 1)) {
            jumping.current = true;
            scrollTo(toDomIndex(logical, count, infinite), 'auto');
            requestAnimationFrame(() => { jumping.current = false; });
        }
    }, [count, infinite, scrollTo]);
    useEffect(() => {
        if (!canLoop(count, infinite)) return;
        jumping.current = true;
        scrollTo(1, 'auto');
        const id = requestAnimationFrame(() => { jumping.current = false; });
        return () => cancelAnimationFrame(id);
    }, [count, infinite, scrollTo]);
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const onScroll = () => { if (frame.current) cancelAnimationFrame(frame.current); frame.current = requestAnimationFrame(sync); };
        const observer = new ResizeObserver(onScroll);
        observer.observe(track);
        track.addEventListener('scroll', onScroll, {passive: true});
        return () => { if (frame.current) cancelAnimationFrame(frame.current); observer.disconnect(); track.removeEventListener('scroll', onScroll); };
    }, [sync]);
    const goTo = useCallback((index: number) => scrollTo(toDomIndex(index, count, infinite)), [count, infinite, scrollTo]);
    const move = useCallback((direction: 1 | -1) => goTo(nextIndex(activeIndex, count, direction, infinite)), [activeIndex, count, infinite, goTo]);
    return {trackRef, activeIndex, goTo, move};
}
