import React from 'react';

export function PickerTrigger({open, onClick, children}: {open: boolean; onClick: () => void; children: React.ReactNode}): React.ReactElement {
  return <button type="button" className="picker-trigger" aria-haspopup="dialog" aria-expanded={open} onClick={onClick}>{children}</button>;
}
