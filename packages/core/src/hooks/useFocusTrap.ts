import {useEffect, type RefObject} from 'react';
import {trapFocus} from '../interaction/focus-scope';

/** Keeps keyboard focus within an active layer without owning its open state. */
export function useFocusTrap(root: RefObject<HTMLElement | null>, active: boolean): void {
  useEffect(() => {
    const element = root.current;
    if (!active || !element) return;
    const onKeyDown = (event: KeyboardEvent) => trapFocus(event, element);
    element.addEventListener('keydown', onKeyDown);
    return () => element.removeEventListener('keydown', onKeyDown);
  }, [active, root]);
}
