import React from 'react';

export function PickerPopover({open, children}: {open: boolean; children: React.ReactNode}): React.ReactElement | null {
  if (!open) return null;
  return <div className="picker-popover" role="dialog">{children}</div>;
}
