import {type CSSProperties, type RefObject, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import type React from 'react';

export interface PickerPopoverState {
    popoverRef: RefObject<HTMLDivElement | null>;
    popoverStyles: CSSProperties;
}

/** Owns the portal surface lifecycle shared by every picker. */
export function usePickerPopover(
    open: boolean,
    triggerRef: RefObject<HTMLElement | null>,
    popoverId: string,
    onDismiss: () => void,
): PickerPopoverState {
    const popoverRef = useRef<HTMLDivElement>(null);
    const [popoverStyles, setPopoverStyles] = useState<CSSProperties>({});

    const updatePosition = useCallback(() => {
        if (!open || !triggerRef.current || !popoverRef.current) return;
        const trigger = triggerRef.current.getBoundingClientRect();
        const surface = popoverRef.current.getBoundingClientRect();
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        let left = trigger.left + scrollX;
        let top = trigger.bottom + scrollY + 8;
        if (left + surface.width > document.documentElement.clientWidth + scrollX - 16) left = trigger.right + scrollX - surface.width;
        if (left < scrollX + 16) left = scrollX + 16;
        if (trigger.bottom + surface.height + 8 > window.innerHeight && trigger.top - surface.height - 8 > 0) top = trigger.top + scrollY - surface.height - 8;
        setPopoverStyles({position: 'absolute', top: `${top}px`, left: `${left}px`, zIndex: 'var(--z-dropdown, 9999)'});
    }, [open, triggerRef]);

    useLayoutEffect(() => {
        if (!open) return;
        updatePosition();
        window.addEventListener('scroll', updatePosition, true);
        window.addEventListener('resize', updatePosition);
        return () => {
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [open, updatePosition]);

    useEffect(() => {
        if (!open) return;
        const onMouseDown = (event: MouseEvent) => {
            const target = event.target as Node;
            const surface = document.getElementById(popoverId);
            if (!triggerRef.current?.contains(target) && !surface?.contains(target)) onDismiss();
        };
        document.addEventListener('mousedown', onMouseDown);
        return () => document.removeEventListener('mousedown', onMouseDown);
    }, [onDismiss, open, popoverId, triggerRef]);

    return {popoverRef, popoverStyles};
}

export function PickerPopover({open, children}: {open: boolean; children: React.ReactNode}): React.ReactElement | null {
    return open ? <div className="picker-popover" role="dialog">{children}</div> : null;
}
