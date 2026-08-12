import { Navbar } from 'lyco-ui';
import React from 'react';

export const title = 'Complex Layout';
export const description = <p>Leveraging flexbox alignment, you can position navigation on the left and arbitrary elements (like a search bar or buttons) on the right.</p>;
export const order = 4;

export const vanillaHtml = `
<nav class="navbar navbar--base navbar-elevation-1 navbar--expand-lg">
  <div class="navbar__container">
    <a class="navbar__brand" href="#">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
      LycoUI
    </a>
    <button type="button" class="navbar__toggle" aria-expanded="false" aria-controls="navbar-complex">
      <span></span><span></span><span></span>
    </button>
    <div class="navbar__collapse" id="navbar-complex">
      <div class="navbar__collapse-inner" style="width: 100%; display: flex; flex-direction: inherit; gap: 1rem;">
        <ul class="navbar__nav navbar__nav--align-start">
          <li class="navbar__item"><a class="navbar__link is-active" href="#">Dashboard</a></li>
          <li class="navbar__item"><a class="navbar__link" href="#">Settings</a></li>
        </ul>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <input type="text" placeholder="Search..." style="padding: 0.25rem 0.5rem; border-radius: 4px; border: 1px solid var(--color-border-base); background: var(--color-bg-root); color: inherit;" />
          <button style="padding: 0.25rem 0.75rem; border-radius: 4px; background: var(--color-primary); color: white;">Search</button>
        </div>
      </div>
    </div>
  </div>
</nav>
`;

export default function ComplexLayoutExample() {
    return (
        <Navbar expand="lg">
            <Navbar.Brand href="#">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                LycoUI
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Nav align="start">
                    <Navbar.Item><Navbar.Link href="#" active>Dashboard</Navbar.Link></Navbar.Item>
                    <Navbar.Item><Navbar.Link href="#">Settings</Navbar.Link></Navbar.Item>
                </Navbar.Nav>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="text" placeholder="Search..." style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid var(--color-border-base)', background: 'var(--color-bg-root)', color: 'inherit' }} />
                    <button style={{ padding: '0.25rem 0.75rem', borderRadius: '4px', background: 'var(--color-primary)', color: 'white' }}>Search</button>
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
}
