import React, {useEffect, useRef} from 'react';
import {useControllableState} from '../../hooks/useControllableState';
import {createDismissableLayer} from '../../interaction/dismissable-layer';

export interface MenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger: React.ReactElement<Record<string, unknown>>;
  children: React.ReactNode;
}

export function Menu({open, defaultOpen = false, onOpenChange, trigger, children}: MenuProps): React.ReactElement {
  const [isOpen, setOpen] = useControllableState({value: open, defaultValue: defaultOpen, onChange: onOpenChange});
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen || !rootRef.current) return;
    return createDismissableLayer({contains: (target) => rootRef.current?.contains(target) ?? false, onDismiss: () => setOpen(false)});
  }, [isOpen, setOpen]);
  return <div ref={rootRef} className="menu">
    {React.cloneElement(trigger, {'aria-expanded': isOpen, onClick: () => setOpen(!isOpen)})}
    <div className="menu-surface" role="menu" hidden={!isOpen}>{children}</div>
  </div>;
}
