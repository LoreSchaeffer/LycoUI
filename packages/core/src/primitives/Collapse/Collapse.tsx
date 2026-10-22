import React from 'react';
import {useControllableState} from '../../hooks/useControllableState';

export interface CollapseProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger: React.ReactElement<Record<string, unknown>>;
  children: React.ReactNode;
}

export function Collapse({open, defaultOpen = false, onOpenChange, trigger, children}: CollapseProps): React.ReactElement {
  const [isOpen, setOpen] = useControllableState({value: open, defaultValue: defaultOpen, onChange: onOpenChange});
  return <div className="collapse">
    {React.cloneElement(trigger, {'aria-expanded': isOpen, onClick: () => setOpen(!isOpen)})}
    <div className="collapse-panel" hidden={!isOpen} inert={!isOpen}>{children}</div>
  </div>;
}
