import React from 'react';
import {Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger} from '@loreschaeffer/lyco-ui';

export const title = "Basic Dropdown";
export const description = "A simple dropdown menu demonstrating standard interactive items and a separator, using the `asChild` pattern on the trigger.";
export const order = 1;

export const vanillaHtml = `
<div class="dropdown-menu" id="dropdown-basic">
  <!-- Here the trigger is any custom element (like our Button) -->
  <button class="btn btn-primary btn-md" aria-haspopup="menu" aria-expanded="false" aria-controls="dropdown-basic-menu" onclick="this.classList.toggle('is-open'); this.nextElementSibling.hidden = !this.nextElementSibling.hidden">
    Options
  </button>
  <div class="dropdown-menu" id="dropdown-basic-menu" role="menu" hidden>
    <div class="dropdown-item" role="menuitem" tabindex="0">Profile</div>
    <div class="dropdown-item" role="menuitem" tabindex="0">Settings</div>
    <div class="dropdown-divider" role="separator"></div>
    <div class="dropdown-item" role="menuitem" tabindex="0">Logout</div>
  </div>
</div>
`;

export default function BasicExample() {
    return (
        <div style={{paddingBottom: '120px'}}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="primary">Options</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
