import {Navbar} from '@loreschaeffer/lyco-ui';
import React from 'react';

export const title = 'Centered Brand';
export const description = <p>Using the <code>centered</code> prop on the Brand component allows you to absolutely center the logo, perfect for split-navigation layouts.</p>;
export const order = 5;

export const vanillaHtml = `
<nav class="navbar navbar--base navbar-elevation-1 navbar--expand-lg">
  <div class="navbar__container">
    <button type="button" class="navbar__toggle" aria-expanded="false" aria-controls="navbar-centered-brand">
      <span></span><span></span><span></span>
    </button>
    
    <a class="navbar__brand navbar__brand--centered" href="#">
      LycoUI
    </a>
    
    <div class="navbar__collapse" id="navbar-centered-brand">
      <div class="navbar__collapse-inner" style="width: 100%; display: flex; flex-direction: inherit; gap: 1rem;">
        <ul class="navbar__nav navbar__nav--align-start">
          <li class="navbar__item"><a class="navbar__link" href="#">Men</a></li>
          <li class="navbar__item"><a class="navbar__link" href="#">Women</a></li>
        </ul>
        <ul class="navbar__nav navbar__nav--align-end">
          <li class="navbar__item"><a class="navbar__link" href="#">Account</a></li>
          <li class="navbar__item"><a class="navbar__link" href="#">Cart (0)</a></li>
        </ul>
      </div>
    </div>
  </div>
</nav>
`;

export default function CenteredBrandExample() {
    return (
        <Navbar expand="lg">
            <Navbar.Toggle/>

            <Navbar.Brand href="#" centered>
                LycoUI
            </Navbar.Brand>

            <Navbar.Collapse>
                <Navbar.Nav align="start">
                    <Navbar.Item><Navbar.Link href="#">Men</Navbar.Link></Navbar.Item>
                    <Navbar.Item><Navbar.Link href="#">Women</Navbar.Link></Navbar.Item>
                </Navbar.Nav>

                <Navbar.Nav align="end">
                    <Navbar.Item><Navbar.Link href="#">Account</Navbar.Link></Navbar.Item>
                    <Navbar.Item><Navbar.Link href="#">Cart (0)</Navbar.Link></Navbar.Item>
                </Navbar.Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
