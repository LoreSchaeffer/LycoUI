import {Sidebar} from '@loreschaeffer/lyco-ui';
import React from 'react';

export const title = 'Auto-Generated Initials';
export const description = <p>If you don't provide an <code>icon</code> to a <code>Sidebar.Link</code>, it will automatically extract the initials from the text.</p>;
export const order = 2;

export const vanillaHtml = `
<aside class="sidebar sidebar-fixed" style="position: relative; height: 300px;">
  <div class="sidebar-content">
    <ul class="sidebar-nav">
      <li class="sidebar-item">
        <a class="sidebar-link is-active" href="#">
          <span class="sidebar-icon">DA</span>
          <span class="sidebar-label">Dashboard</span>
        </a>
      </li>
      <li class="sidebar-item">
        <a class="sidebar-link" href="#">
          <span class="sidebar-icon">US</span>
          <span class="sidebar-label">User Settings</span>
        </a>
      </li>
      <li class="sidebar-item">
        <a class="sidebar-link" href="#">
          <span class="sidebar-icon">B</span>
          <span class="sidebar-label">Billing</span>
        </a>
      </li>
    </ul>
  </div>
</aside>
`;

export default function InitialsExample() {
    return (
        <div style={{height: '300px', display: 'flex', border: '1px solid var(--color-border-base)', borderRadius: 'var(--radius-lg)', overflow: 'hidden'}}>
            <Sidebar variant="fixed" style={{position: 'relative'}}>
                <Sidebar.Content>
                    <Sidebar.Nav>
                        <Sidebar.Item>
                            <Sidebar.Link href="#" active>
                                Dashboard
                            </Sidebar.Link>
                        </Sidebar.Item>
                        <Sidebar.Item>
                            <Sidebar.Link href="#">
                                User Settings
                            </Sidebar.Link>
                        </Sidebar.Item>
                        <Sidebar.Item>
                            <Sidebar.Link href="#">
                                Billing
                            </Sidebar.Link>
                        </Sidebar.Item>
                    </Sidebar.Nav>
                </Sidebar.Content>
            </Sidebar>
            <div style={{padding: '2rem', flex: 1, backgroundColor: 'var(--color-bg-root)'}}>
                <p>Observe the auto-generated icons in the sidebar.</p>
            </div>
        </div>
    );
}
