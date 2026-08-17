import { Sidebar, Button } from '@loreschaeffer/lyco-ui';
import React, { useState } from 'react';

export const title = 'Overlay Mode';
export const description = <p>Use the <code>variant="overlay"</code> prop and the <code>isOpen</code> prop to create a drawer-style sidebar. This is ideal for mobile navigation.</p>;
export const order = 5;

export const vanillaHtml = `
<button class="btn btn-primary" type="button" onclick="document.getElementById('my-sidebar').classList.add('is-open')">
    Open Drawer
</button>

<!-- Backdrop must be placed right before the sidebar in vanilla JS -->
<div class="sidebar-backdrop" onclick="document.getElementById('my-sidebar').classList.remove('is-open')"></div>
<aside id="my-sidebar" class="sidebar sidebar--overlay">
  <div class="sidebar__header">
    <strong>Mobile Menu</strong>
  </div>
  <div class="sidebar__content">
    <ul class="sidebar__nav">
      <li class="sidebar__item">
        <a class="sidebar__link is-active" href="#">
          <span class="sidebar__icon">H</span>
          <span class="sidebar__label">Home</span>
        </a>
      </li>
    </ul>
  </div>
</aside>
`;

export default function OverlayExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ padding: '1rem', border: '1px solid var(--color-border-base)', borderRadius: 'var(--radius-lg)' }}>
            <Button onClick={() => setIsOpen(true)}>
                Open Drawer
            </Button>
            
            {/* The overlay sidebar is position: fixed by default and will slide in from the screen edge */}
            <Sidebar 
                variant="overlay" 
                isOpen={isOpen} 
                onClose={() => setIsOpen(false)}
            >
                <Sidebar.Header>
                    <strong>Mobile Menu</strong>
                </Sidebar.Header>
                <Sidebar.Content>
                    <Sidebar.Nav>
                        <Sidebar.Item>
                            <Sidebar.Link href="#" active>
                                Home
                            </Sidebar.Link>
                        </Sidebar.Item>
                        <Sidebar.Item>
                            <Sidebar.Link href="#">
                                Profile
                            </Sidebar.Link>
                        </Sidebar.Item>
                    </Sidebar.Nav>
                </Sidebar.Content>
            </Sidebar>
        </div>
    );
}
