import { Sidebar, Button, Row, Col } from '@loreschaeffer/lyco-ui';
import React, { useState } from 'react';

export const title = 'Mini Mode & Dropdowns';
export const description = <p>Toggle the <code>isMini</code> prop to collapse the sidebar into an icon-only mode. In standard mode, dropdowns act as an accordion. In mini mode, they transform into floating fly-out menus to preserve space. Icons and initials are perfectly centered.</p>;
export const order = 3;

export const vanillaHtml = `
<div style="display: flex; height: 500px; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-xl); overflow: hidden;">
  <!-- Remove .is-mini to expand -->
  <aside class="sidebar sidebar--fixed is-mini" style="position: relative;">
    <div class="sidebar__header">
      <span class="sidebar__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
      </span>
      <span class="sidebar__label">Acme Corp</span>
    </div>
    
    <div class="sidebar__content">
      <ul class="sidebar__nav">
        <li class="sidebar__item">
          <a class="sidebar__link" href="#">
            <span class="sidebar__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </span>
            <span class="sidebar__label">Overview</span>
          </a>
        </li>
        
        <!-- Accordion / Flyout Dropdown -->
        <li class="sidebar__item sidebar__dropdown">
          <button class="sidebar__dropdown-trigger" aria-expanded="false">
            <span class="sidebar__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </span>
            <span class="sidebar__label">Customers</span>
            <svg class="sidebar__dropdown-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="sidebar__dropdown-menu-wrapper">
            <div class="sidebar__dropdown-menu">
              <a href="#" class="sidebar__dropdown-item">Active Users</a>
              <a href="#" class="sidebar__dropdown-item">Archived</a>
              <a href="#" class="sidebar__dropdown-item">Segments</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="sidebar__footer">
      <a class="sidebar__link" href="#">
        <span class="sidebar__icon"><svg viewBox="0 0 24 24" fill="none" stroke="var(--color-danger)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></span>
        <span class="sidebar__label" style="color: var(--color-danger);">Logout</span>
      </a>
    </div>
  </aside>
  
  <div style="flex: 1; padding: 2rem; background: var(--color-bg-base);">
    Main Content Area
  </div>
</div>
`;

export default function MiniExample() {
    const [isMini, setIsMini] = useState(true);

    return (
        <Row>
            <Col span={12}>
                <div style={{ marginBottom: '1rem' }}>
                    <Button onClick={() => setIsMini(!isMini)} outlined>
                        Toggle Mini Mode: {isMini ? 'ON' : 'OFF'}
                    </Button>
                </div>
                <div style={{ height: '500px', display: 'flex', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                    <Sidebar 
                        isMini={isMini} 
                        style={{ position: 'relative', height: '100%' }} // override fixed position for inline docs
                    >
                        <Sidebar.Header>
                            <span className="sidebar__icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                            </span>
                            <span className="sidebar__label font-bold text-lg">Acme Corp</span>
                        </Sidebar.Header>
                        
                        <Sidebar.Content>
                            <Sidebar.Nav>
                                <Sidebar.Item>
                                    <Sidebar.Link href="#" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>}>
                                        Overview
                                    </Sidebar.Link>
                                </Sidebar.Item>
                                
                                <Sidebar.Dropdown 
                                    title="Customers" 
                                    icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>}
                                >
                                    <Sidebar.DropdownItem href="#" active>Active Users</Sidebar.DropdownItem>
                                    <Sidebar.DropdownItem href="#">Archived</Sidebar.DropdownItem>
                                    <Sidebar.DropdownItem href="#">Segments</Sidebar.DropdownItem>
                                </Sidebar.Dropdown>

                                <Sidebar.Dropdown 
                                    title="Settings" 
                                    icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>}
                                >
                                    <Sidebar.DropdownItem href="#">Account</Sidebar.DropdownItem>
                                    <Sidebar.DropdownItem href="#">Billing</Sidebar.DropdownItem>
                                    <Sidebar.DropdownItem href="#">Notifications</Sidebar.DropdownItem>
                                </Sidebar.Dropdown>
                            </Sidebar.Nav>
                        </Sidebar.Content>
                        
                        <Sidebar.Footer>
                            <Sidebar.Link href="#" icon={<svg viewBox="0 0 24 24" fill="none" stroke="var(--color-danger)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>}>
                                <span style={{ color: 'var(--color-danger)' }}>Logout</span>
                            </Sidebar.Link>
                        </Sidebar.Footer>
                    </Sidebar>
                    
                    <div style={{ flex: 1, padding: '2rem', backgroundColor: 'var(--color-bg-base)', position: 'relative' }}>
                        <p className="text-secondary mb-4">Interact with the "Customers" or "Settings" menus.</p>
                        <p className="text-muted text-sm">
                            In Standard mode, they expand vertically pushing other items down. 
                            In Mini Mode, hover over the icons to reveal a floating submenu that overlaps this content!
                        </p>
                    </div>
                </div>
            </Col>
        </Row>
    );
}
