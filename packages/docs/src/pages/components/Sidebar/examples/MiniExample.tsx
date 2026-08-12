import { Sidebar, Button } from 'lyco-ui';
import React, { useState } from 'react';

export const title = 'Mini Mode';
export const description = <p>Toggle the <code>isMini</code> prop to collapse the sidebar into an icon-only mode. Icons will be perfectly centered. Auto-generated initials will be used if an icon is missing.</p>;
export const order = 3;

const HomeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

export const vanillaHtml = `
<!-- The is-mini class collapses the sidebar -->
<aside class="sidebar sidebar--fixed is-mini" style="position: relative; height: 300px;">
  <div class="sidebar__content">
    <ul class="sidebar__nav">
      <li class="sidebar__item">
        <a class="sidebar__link is-active" href="#">
          <span class="sidebar__icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </span>
          <span class="sidebar__label">Dashboard</span>
        </a>
      </li>
      <li class="sidebar__item">
        <a class="sidebar__link" href="#">
          <span class="sidebar__icon">US</span>
          <span class="sidebar__label">User Settings</span>
        </a>
      </li>
    </ul>
  </div>
</aside>
`;

export default function MiniExample() {
    const [isMini, setIsMini] = useState(true);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
                <Button onClick={() => setIsMini(prev => !prev)}>
                    Toggle Mini Mode
                </Button>
            </div>
            <div style={{ height: '300px', display: 'flex', border: '1px solid var(--color-border-base)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <Sidebar variant="fixed" isMini={isMini} style={{ position: 'relative' }}>
                    <Sidebar.Content>
                        <Sidebar.Nav>
                            <Sidebar.Item>
                                <Sidebar.Link href="#" active icon={<HomeIcon />}>
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
                <div style={{ padding: '2rem', flex: 1, backgroundColor: 'var(--color-bg-root)' }}>
                    <p>Mini mode perfectly centers icons and auto-generated initials.</p>
                </div>
            </div>
        </div>
    );
}
