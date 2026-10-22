import React from 'react';
import {Menu, type MenuProps} from '../Menu/Menu';

export type PopoverProps = MenuProps;

/** Role-neutral disclosure surface; listbox/menu semantics remain with adapters. */
export function Popover(props: PopoverProps): React.ReactElement {
  return <Menu {...props} />;
}
