import React from 'react';
import {Col, Row, Sidebar} from '@loreschaeffer/lyco-ui';
import {FiAlertTriangle, FiCheckCircle, FiLock, FiSliders, FiTrash2, FiZap} from 'react-icons/fi';

export const title = 'Dropdown Item Variants';
export const description = (
    <p>
        Dropdown items support semantic color variants (<code>primary</code>, <code>success</code>, <code>warning</code>, <code>danger</code>) as well as the default neutral variant and disabled states.
    </p>
);
export const order = 6;

export const vanillaHtml = `
<aside class="sidebar" style="height: 480px; position: relative;">
  <div class="sidebar-header">
    <strong>Project Settings</strong>
  </div>
  <div class="sidebar-content">
    <ul class="sidebar-nav">
      <li class="sidebar-item sidebar-dropdown is-open">
        <button type="button" class="btn btn--ghost sidebar-dropdown-trigger" aria-expanded="true" aria-haspopup="true">
          <span class="sidebar-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </span>
          <span class="sidebar-label">Manage Space</span>
          <svg class="sidebar-dropdown-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <div class="sidebar-dropdown-menu-wrapper">
          <div class="sidebar-dropdown-menu">
            <!-- Default item -->
            <a class="sidebar-dropdown-item" href="#">General Preferences</a>
            <!-- Primary item -->
            <a class="sidebar-dropdown-item sidebar__dropdown-item--primary" href="#">Upgrade Plan</a>
            <!-- Success item -->
            <a class="sidebar-dropdown-item sidebar__dropdown-item--success" href="#">Operational Status</a>
            <!-- Warning item -->
            <a class="sidebar-dropdown-item sidebar__dropdown-item--warning" href="#">Maintenance Mode</a>
            <!-- Danger destructive item -->
            <a class="sidebar-dropdown-item sidebar__dropdown-item--danger" href="#">Delete Account</a>
            <!-- Disabled item -->
            <a class="sidebar-dropdown-item is-disabled" href="#" aria-disabled="true">Archived Logs (Locked)</a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</aside>
`;

export default function DropdownVariantsExample() {
    return (
        <Row>
            <Col span={12}>
                <div style={{height: '480px', display: 'flex', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden'}}>
                    <Sidebar variant="fixed" style={{position: 'relative'}}>
                        <Sidebar.Header>
                            <strong>Project Settings</strong>
                        </Sidebar.Header>

                        <Sidebar.Content>
                            <Sidebar.Nav>
                                <Sidebar.Dropdown
                                    title="Manage Space"
                                    icon={<FiSliders size={18}/>}
                                >
                                    <Sidebar.DropdownItem href="#" variant="default">
                                        <FiSliders size={14}/>
                                        General Preferences
                                    </Sidebar.DropdownItem>
                                    <Sidebar.DropdownItem href="#" variant="primary">
                                        <FiZap size={14}/>
                                        Upgrade Plan
                                    </Sidebar.DropdownItem>
                                    <Sidebar.DropdownItem href="#" variant="success">
                                        <FiCheckCircle size={14}/>
                                        Operational Status
                                    </Sidebar.DropdownItem>
                                    <Sidebar.DropdownItem href="#" variant="warning">
                                        <FiAlertTriangle size={14}/>
                                        Maintenance Mode
                                    </Sidebar.DropdownItem>
                                    <Sidebar.DropdownItem href="#" variant="danger">
                                        <FiTrash2 size={14}/>
                                        Delete Account
                                    </Sidebar.DropdownItem>
                                    <Sidebar.DropdownItem href="#" disabled>
                                        <FiLock size={14}/>
                                        Archived Logs (Locked)
                                    </Sidebar.DropdownItem>
                                </Sidebar.Dropdown>
                            </Sidebar.Nav>
                        </Sidebar.Content>
                    </Sidebar>

                    <div style={{padding: '2rem', flex: 1, backgroundColor: 'var(--color-bg-base)'}}>
                        <h2 style={{fontSize: 'var(--text-heading-sm)', marginBottom: '0.5rem'}}>Dropdown Variants Preview</h2>
                        <p className="text-secondary">
                            Click on <strong>Manage Space</strong> to expand the dropdown and hover over the items to test the semantic colors:
                        </p>
                        <ul style={{marginTop: '1rem', listStyle: 'disc', paddingLeft: '1.25rem', color: 'var(--color-text-secondary)', fontSize: 'var(--text-body-sm)'}}>
                            <li><strong>Default</strong>: Standard muted text with surface elevation hover</li>
                            <li><strong>Primary</strong>: Blue luminous accent with 10% opacity background on hover</li>
                            <li><strong>Success</strong>: Green state indicator</li>
                            <li><strong>Warning</strong>: Amber/yellow state indicator</li>
                            <li><strong>Danger</strong>: Red destructive action (e.g. Delete Account)</li>
                            <li><strong>Disabled</strong>: Inactive state with 50% opacity and disabled pointer events</li>
                        </ul>
                    </div>
                </div>
            </Col>
        </Row>
    );
}
