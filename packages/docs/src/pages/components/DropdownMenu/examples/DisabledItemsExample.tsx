import React from 'react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@loreschaeffer/lyco-ui';

export const title = "Disabled Items";
export const description = "Items can be disabled using the `disabled` prop, which removes their interactivity and adjusts their opacity.";
export const order = 3;

export const vanillaHtml = `
<div class="dropdown-menu" id="dropdown-disabled">
  <button class="dropdown-trigger" aria-haspopup="menu" aria-expanded="false" aria-controls="dropdown-disabled-menu" onclick="this.classList.toggle('is-open'); this.nextElementSibling.hidden = !this.nextElementSibling.hidden">
    View Options
  </button>
  <div class="dropdown-menu" id="dropdown-disabled-menu" role="menu" hidden>
    <div class="dropdown-item" role="menuitem" tabindex="0">View Details</div>
    <div class="dropdown-item is-disabled" role="menuitem" aria-disabled="true" tabindex="-1">Edit (No Permission)</div>
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
