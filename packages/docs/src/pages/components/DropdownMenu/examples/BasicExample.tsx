import React from 'react';
import {Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger} from '@loreschaeffer/lyco-ui';

export const title = "Basic Dropdown";
export const description = "A simple dropdown menu demonstrating standard interactive items and a separator, using the `asChild` pattern on the trigger.";
export const order = 1;

export const vanillaHtml = `
<div class="dropdown-menu">
  <!-- Here the trigger is any custom element (like our Button) -->
  <button class="button button--primary button--md" aria-haspopup="menu" aria-expanded="false" onclick="this.classList.toggle('is-open'); this.nextElementSibling.hidden = !this.nextElementSibling.hidden">
    Options
  </button>
  <div class="dropdown-menu__content" role="menu" hidden>
    <div class="dropdown-menu__item" role="menuitem" tabindex="0">Profile</div>
    <div class="dropdown-menu__item" role="menuitem" tabindex="0">Settings</div>
    <div class="dropdown-menu__separator" role="separator"></div>
    <div class="dropdown-menu__item" role="menuitem" tabindex="0">Logout</div>
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
