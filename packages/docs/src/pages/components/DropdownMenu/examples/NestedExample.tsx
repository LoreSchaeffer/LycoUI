import React from 'react';
import {Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSubMenu, DropdownMenuTrigger} from '@loreschaeffer/lyco-ui';

export const title = "Nested Submenus";
export const description = "A dropdown menu featuring nested submenus. Submenus automatically flip to the left if there isn't enough space on the right.";
export const order = 4;

export const vanillaHtml = `
<div class="dropdown-menu">
  <button class="button button--base button--md" aria-haspopup="menu" aria-expanded="false" onclick="this.classList.toggle('is-open'); this.nextElementSibling.hidden = !this.nextElementSibling.hidden">
    Share
  </button>
  <div class="dropdown-menu__content" role="menu" hidden>
    <div class="dropdown-menu__item" role="menuitem" tabindex="0">Copy Link</div>
    <div class="dropdown-menu__separator" role="separator"></div>
    
    <div class="dropdown-menu__submenu" onmouseenter="this.querySelector('.dropdown-menu__submenu-content').classList.add('is-open')" onmouseleave="this.querySelector('.dropdown-menu__submenu-content').classList.remove('is-open')">
      <button type="button" class="dropdown-menu__submenu-trigger" aria-haspopup="true" aria-expanded="false">
        <span>Send via...</span>
        <svg class="dropdown-menu__caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
      <div class="dropdown-menu__submenu-content" role="menu">
        <div class="dropdown-menu__item" role="menuitem" tabindex="0">Email</div>
        <div class="dropdown-menu__item" role="menuitem" tabindex="0">Messages</div>
        <div class="dropdown-menu__item" role="menuitem" tabindex="0">WhatsApp</div>
      </div>
    </div>
    
    <div class="dropdown-menu__submenu" onmouseenter="this.querySelector('.dropdown-menu__submenu-content').classList.add('is-open')" onmouseleave="this.querySelector('.dropdown-menu__submenu-content').classList.remove('is-open')">
      <button type="button" class="dropdown-menu__submenu-trigger" aria-haspopup="true" aria-expanded="false">
        <span>Social Media</span>
        <svg class="dropdown-menu__caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
      <div class="dropdown-menu__submenu-content" role="menu">
        <div class="dropdown-menu__item" role="menuitem" tabindex="0">Twitter</div>
        <div class="dropdown-menu__item" role="menuitem" tabindex="0">LinkedIn</div>
      </div>
    </div>
  </div>
</div>
`;

export default function NestedExample() {
    return (
        <div style={{paddingBottom: '200px'}}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="base">Share</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Copy Link</DropdownMenuItem>
                    <DropdownMenuSeparator/>

                    <DropdownMenuSubMenu title="Send via...">
                        <DropdownMenuItem>Email</DropdownMenuItem>
                        <DropdownMenuItem>Messages</DropdownMenuItem>
                        <DropdownMenuItem>WhatsApp</DropdownMenuItem>
                    </DropdownMenuSubMenu>

                    <DropdownMenuSubMenu title="Social Media">
                        <DropdownMenuItem>Twitter</DropdownMenuItem>
                        <DropdownMenuItem>LinkedIn</DropdownMenuItem>
                    </DropdownMenuSubMenu>

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
