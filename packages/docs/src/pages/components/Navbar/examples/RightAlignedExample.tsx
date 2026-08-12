import { Navbar } from 'lyco-ui';
import React from 'react';

export const title = 'Right Aligned Navigation';
export const description = <p>Use the <code>align="end"</code> prop on <code>Navbar.Nav</code> to push the navigation links to the right side of the navbar.</p>;
export const order = 6;

export const vanillaHtml = `
<nav class="navbar navbar--base navbar-elevation-1 navbar--expand-lg">
  <div class="navbar__container">
    <a class="navbar__brand" href="#">LycoUI</a>
    <button type="button" class="navbar__toggle" aria-expanded="false" aria-controls="navbar-right-aligned">
      <span></span><span></span><span></span>
    </button>
    <div class="navbar__collapse" id="navbar-right-aligned">
      <div class="navbar__collapse-inner">
        <ul class="navbar__nav navbar__nav--align-end">
          <li class="navbar__item"><a class="navbar__link is-active" href="#">Home</a></li>
          <li class="navbar__item"><a class="navbar__link" href="#">About</a></li>
          <li class="navbar__item"><a class="navbar__link" href="#">Contact</a></li>
        </ul>
      </div>
    </div>
  </div>
</nav>
`;

export default function RightAlignedExample() {
    return (
        <Navbar expand="lg">
            <Navbar.Brand href="#">LycoUI</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Nav align="end">
                    <Navbar.Item><Navbar.Link href="#" active>Home</Navbar.Link></Navbar.Item>
                    <Navbar.Item><Navbar.Link href="#">About</Navbar.Link></Navbar.Item>
                    <Navbar.Item><Navbar.Link href="#">Contact</Navbar.Link></Navbar.Item>
                </Navbar.Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
