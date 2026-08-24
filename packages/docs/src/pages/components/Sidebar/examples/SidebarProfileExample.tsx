import React, { useState } from 'react';
import { Sidebar, Button, Row, Col, Avatar } from '@loreschaeffer/lyco-ui';
import { FiMenu, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';

export const title = 'User Profile (Collapsible)';
export const description = (
    <p>
        Integrate the <code>Avatar</code> component into the Sidebar's footer to create a collapsible user profile menu. 
        In mini mode, only the avatar is visible, while in expanded mode, the user's name and email are displayed alongside a dropdown trigger.
    </p>
);
export const order = 10;

export const vanillaHtml = `
<div style="display: flex; height: 600px; position: relative; background-color: var(--color-bg-base); border-radius: var(--radius-md); border: 1px solid var(--color-border-subtle); overflow: hidden;">
  
  <!-- EXPANDED SIDEBAR -->
  <aside class="sidebar" style="--sidebar-width: 256px;">
    <div class="sidebar__header">
      <button class="btn btn--ghost btn--icon" type="button" aria-label="Toggle Menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
      <span style="font-weight:600;font-size:1.125rem;margin-left:0.5rem;">LycoApp</span>
    </div>
    <div class="sidebar__content">
      <ul class="sidebar__nav">
        <li class="sidebar__item">
          <a class="sidebar__link is-active" aria-current="page" href="#">
            <span class="sidebar__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </span>
            <span class="sidebar__label">Dashboard</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="sidebar__footer">
      <ul class="sidebar__nav">
        <li class="sidebar__item sidebar__dropdown">
          <button type="button" class="btn btn--ghost sidebar__dropdown-trigger" aria-expanded="false" aria-haspopup="true">
            <span class="sidebar__icon">
              <div class="avatar avatar--sm avatar--circle" aria-hidden="true">
                <div class="avatar__fallback">LR</div>
              </div>
            </span>
            <span class="sidebar__label">
              <div style="display:flex;flex-direction:column;align-items:flex-start;line-height:1.2;">
                <span style="font-size:var(--font-size-sm);font-weight:500;color:var(--color-text-primary);">Lorenzo R.</span>
                <span style="font-size:var(--font-size-xs);color:var(--color-text-secondary);">lorenzo@example.com</span>
              </div>
            </span>
            <svg class="sidebar__dropdown-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="sidebar__dropdown-menu-wrapper">
            <div class="sidebar__dropdown-menu">
              <a class="sidebar__dropdown-item" href="#">Profile</a>
              <a class="sidebar__dropdown-item" href="#">Settings</a>
              <a class="sidebar__dropdown-item" href="#" style="color:var(--color-danger);">Sign Out</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </aside>

  <!-- COLLAPSED / MINI SIDEBAR -->
  <aside class="sidebar is-mini" style="border-left: 1px solid var(--color-border-subtle);">
    <div class="sidebar__header">
      <button class="btn btn--ghost btn--icon" type="button" aria-label="Toggle Menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
      <span style="font-weight:600;font-size:1.125rem;margin-left:0.5rem;">LycoApp</span>
    </div>
    <div class="sidebar__content">
      <ul class="sidebar__nav">
        <li class="sidebar__item">
          <a class="sidebar__link is-active" aria-current="page" href="#">
            <span class="sidebar__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </span>
          </a>
        </li>
      </ul>
    </div>
    <div class="sidebar__footer">
      <ul class="sidebar__nav">
        <li class="sidebar__item sidebar__dropdown">
          <button type="button" class="btn btn--ghost sidebar__dropdown-trigger" aria-expanded="false" aria-haspopup="true">
            <span class="sidebar__icon">
              <div class="avatar avatar--sm avatar--circle" aria-hidden="true">
                <div class="avatar__fallback">LR</div>
              </div>
            </span>
          </button>
          <div class="sidebar__dropdown-menu-wrapper">
            <div class="sidebar__dropdown-menu">
              <a class="sidebar__dropdown-item" href="#">Profile</a>
              <a class="sidebar__dropdown-item" href="#">Settings</a>
              <a class="sidebar__dropdown-item" href="#" style="color:var(--color-danger);">Sign Out</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </aside>

</div>
`;

export default function SidebarProfileExample() {
    const [isMini, setIsMini] = useState(false);

    return (
        <Row>
            <Col span={12}>
                <div style={{ 
                    display: 'flex',
                    height: '600px', 
                    position: 'relative',
                    border: '1px solid var(--color-border-subtle)', 
                    borderRadius: 'var(--radius-md)', 
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-bg-base)'
                }}>
                    <Sidebar isMini={isMini} defaultWidth={256} style={{ position: 'relative', height: '100%', zIndex: 1, borderRight: '1px solid var(--color-border-subtle)' }}>
                        <Sidebar.Header style={{ display: 'flex', alignItems: 'center', padding: 'var(--spacing-3)' }}>
                            <Button 
                                ghost 
                                iconOnly 
                                onClick={() => setIsMini(p => !p)}
                                aria-label="Toggle sidebar"
                            >
                                <FiMenu size={20} />
                            </Button>
                            {!isMini && <span style={{ fontWeight: 600, fontSize: '1.125rem', marginLeft: '0.5rem' }}>LycoApp</span>}
                        </Sidebar.Header>

                        <Sidebar.Content>
                            <Sidebar.Nav>
                                <Sidebar.Item>
                                    <Sidebar.Link active icon={
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                                    }>
                                        Dashboard
                                    </Sidebar.Link>
                                </Sidebar.Item>
                            </Sidebar.Nav>
                        </Sidebar.Content>

                        <Sidebar.Footer style={{ borderTop: '1px solid var(--color-border-subtle)', padding: 'var(--spacing-2) 0' }}>
                            <Sidebar.Nav>
                                <Sidebar.Dropdown
                                    icon={<Avatar size="sm" fallback="LR" aria-hidden="true" />}
                                    title={
                                        !isMini && (
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.2 }}>
                                                <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--color-text-primary)' }}>Lorenzo R.</span>
                                                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>lorenzo@example.com</span>
                                            </div>
                                        )
                                    }
                                >
                                    <Sidebar.DropdownItem href="#">
                                        <FiUser size={14} style={{ opacity: 0.7 }} />
                                        Profile
                                    </Sidebar.DropdownItem>
                                    <Sidebar.DropdownItem href="#">
                                        <FiSettings size={14} style={{ opacity: 0.7 }} />
                                        Settings
                                    </Sidebar.DropdownItem>
                                    <Sidebar.DropdownItem href="#" style={{ color: 'var(--color-danger)' }}>
                                        <FiLogOut size={14} style={{ opacity: 0.7 }} />
                                        Sign Out
                                    </Sidebar.DropdownItem>
                                </Sidebar.Dropdown>
                            </Sidebar.Nav>
                        </Sidebar.Footer>
                    </Sidebar>

                    <div style={{ flex: 1, padding: '2rem' }}>
                        <p className="text-secondary">Click the menu icon to toggle mini mode. Click the user profile in the footer to open the dropdown.</p>
                        <p className="text-secondary mt-2">In mini mode, the dropdown automatically switches to a fixed floating popover to ensure it stays fully visible.</p>
                    </div>
                </div>
            </Col>
        </Row>
    );
}
