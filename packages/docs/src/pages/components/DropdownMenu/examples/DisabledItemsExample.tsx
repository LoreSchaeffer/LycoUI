import React from 'react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@loreschaeffer/lyco-ui';

export const title = "Disabled Items";
export const description = "Items can be disabled using the `disabled` prop, which removes their interactivity and adjusts their opacity.";
export const order = 3;

export const vanillaHtml = `
<div class="dropdown-menu">
  <button class="dropdown-menu__trigger" aria-haspopup="menu" aria-expanded="false" onclick="this.classList.toggle('is-open'); this.nextElementSibling.hidden = !this.nextElementSibling.hidden">
    View Options
  </button>
  <div class="dropdown-menu__content" role="menu" hidden>
    <div class="dropdown-menu__item" role="menuitem" tabindex="0">View Details</div>
    <div class="dropdown-menu__item is-disabled" role="menuitem" aria-disabled="true" tabindex="-1">Edit (No Permission)</div>
  </div>
</div>
`;

export default function DisabledItemsExample() {
    return (
        <div style={{paddingBottom: '100px'}}>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    View Options
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem disabled>Edit (No Permission)</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
