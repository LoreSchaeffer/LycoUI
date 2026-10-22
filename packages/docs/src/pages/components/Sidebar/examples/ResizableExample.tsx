import {Sidebar} from '@loreschaeffer/lyco-ui';
import React from 'react';

export const title = 'Resizable Sidebar';
export const description = <p>Adding the <code>resizable</code> prop allows users to drag the right edge of the sidebar to adjust its width. You can control the constraints using <code>minWidth</code> and <code>maxWidth</code>.</p>;
export const order = 4;

export const vanillaHtml = `
<!-- In Vanilla JS, dragging the .sidebar-resizer updates --sidebar-width -->
<aside class="sidebar sidebar-fixed" style="position: relative; height: 300px;">
  <div class="sidebar-content">
    <ul class="sidebar-nav">
      <li class="sidebar-item">
        <a class="sidebar-link is-active" href="#">
          <span class="sidebar-icon">R</span>
          <span class="sidebar-label">Resizable</span>
        </a>
      </li>
    </ul>
  </div>
  <div class="sidebar-resizer" aria-hidden="true"></div>
</aside>
`;

export default function ResizableExample() {
    return (
        <div style={{height: '300px', display: 'flex', border: '1px solid var(--color-border-base)', borderRadius: 'var(--radius-lg)', overflow: 'hidden'}}>
            <Sidebar variant="fixed" resizable minWidth={150} maxWidth={400} style={{position: 'relative'}}>
                <Sidebar.Header>
                    <strong>Drag my right edge!</strong>
                </Sidebar.Header>
                <Sidebar.Content>
                    <Sidebar.Nav>
                        <Sidebar.Item>
                            <Sidebar.Link href="#" active>
                                Resizable
                            </Sidebar.Link>
                        </Sidebar.Item>
                        <Sidebar.Item>
                            <Sidebar.Link href="#">
                                Feature
                            </Sidebar.Link>
                        </Sidebar.Item>
                    </Sidebar.Nav>
                </Sidebar.Content>
            </Sidebar>
            <div style={{padding: '2rem', flex: 1, backgroundColor: 'var(--color-bg-root)'}}>
                <p>Drag the border between the sidebar and this content to resize.</p>
            </div>
        </div>
    );
}
