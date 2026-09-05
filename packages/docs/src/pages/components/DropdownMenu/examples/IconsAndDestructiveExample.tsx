import React from 'react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger} from '@loreschaeffer/lyco-ui';
import {FiCopy, FiEdit2, FiMoreVertical, FiTrash2} from 'react-icons/fi';

export const title = "Icons and Destructive Action";
export const description = "Dropdown items can include icons for better visual scannability. Use the `destructive` prop for critical actions. Here we also show a custom icon trigger.";
export const order = 2;

export const vanillaHtml = `
<div class="dropdown-menu">
  <button aria-label="More options" style="background: transparent; border: none; cursor: pointer; padding: 4px;" aria-haspopup="menu" aria-expanded="false" onclick="this.classList.toggle('is-open'); this.nextElementSibling.hidden = !this.nextElementSibling.hidden">
    <svg>...</svg>
  </button>
  <div class="dropdown-menu__content" role="menu" hidden>
    <div class="dropdown-menu__item" role="menuitem" tabindex="0">
      <svg>...</svg> Edit
    </div>
    <div class="dropdown-menu__item" role="menuitem" tabindex="0">
      <svg>...</svg> Duplicate
    </div>
    <div class="dropdown-menu__separator" role="separator"></div>
    <div class="dropdown-menu__item dropdown-menu__item--destructive" role="menuitem" tabindex="0">
      <svg>...</svg> Delete
    </div>
  </div>
</div>
`;

export default function IconsAndDestructiveExample() {
    return (
        <div style={{paddingBottom: '140px'}}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button aria-label="More options" style={{background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px'}}>
                        <FiMoreVertical size={20}/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <FiEdit2/> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <FiCopy/> Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem destructive>
                        <FiTrash2/> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
