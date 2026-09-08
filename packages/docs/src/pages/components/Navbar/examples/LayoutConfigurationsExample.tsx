import {Col, Navbar, Row} from '@loreschaeffer/lyco-ui';
import React from 'react';

export const title = 'Layout Configurations';
export const description = <p>The Navbar supports various layout configurations, including basic left-aligned navigation, centered brands for split layouts, right-aligned navigation, and complex dropdowns with variants.</p>;
export const order = 1;

export const vanillaHtml = `
<!-- Basic / Dropdown Example -->
<nav class="navbar navbar--base navbar--expand-lg" style="margin-bottom: 2rem;">
  <div class="navbar__container">
    <a class="navbar__brand" href="#">LycoUI</a>
    <button type="button" class="navbar__toggle" aria-expanded="false" aria-controls="navbar-collapse-basic">
      <span></span><span></span><span></span>
    </button>
    <div class="navbar__collapse" id="navbar-collapse-basic">
      <div class="navbar__collapse-inner">
        <ul class="navbar__nav">
          <li class="navbar__item"><a class="navbar__link is-active" href="#">Dashboard</a></li>
          <li class="navbar__item"><a class="navbar__link" href="#">Projects</a></li>
        </ul>
        <ul class="navbar__nav navbar__nav--align-end">
          <li class="navbar__item navbar__dropdown">
            <button type="button" class="navbar__dropdown-trigger" aria-expanded="false" aria-haspopup="true">
              Profile
              <svg class="navbar__dropdown-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="navbar__dropdown-menu navbar__dropdown-menu--right">
              <a href="#" class="navbar__dropdown-item">Account Details</a>
              <div class="navbar__dropdown-submenu">
                <button type="button" class="navbar__dropdown-submenu-trigger" aria-haspopup="true">
                  <span>Theme Settings</span>
                  <svg class="navbar__dropdown-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                <div class="navbar__dropdown-menu navbar__dropdown-menu--nested">
                  <a href="#" class="navbar__dropdown-item">Light Mode</a>
                  <a href="#" class="navbar__dropdown-item">Dark Mode</a>
                </div>
              </div>
              <a href="#" class="navbar__dropdown-item navbar__dropdown-item--danger">Sign Out</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>

<!-- Centered Brand Example -->
<nav class="navbar navbar--base navbar-elevation-1 navbar--expand-lg" style="margin-bottom: 2rem;">
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

<!-- Right Aligned Example -->
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

export default function LayoutConfigurationsExample() {
    return (
        <Row>
            <Col span={12}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
                    
                    {/* Basic / Dropdown Example */}
                    <div style={{minHeight: '250px', display: 'flex', flexDirection: 'column', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'visible'}}>
                        <Navbar expand="always">
                            <Navbar.Brand href="#">LycoUI</Navbar.Brand>
                            <Navbar.Toggle/>
                            <Navbar.Collapse>
                                <Navbar.Nav>
                                    <Navbar.Item><Navbar.Link href="#" active>Dashboard</Navbar.Link></Navbar.Item>
                                    <Navbar.Item><Navbar.Link href="#">Projects</Navbar.Link></Navbar.Item>
                                </Navbar.Nav>
                                <Navbar.Nav align="end">
                                    <Navbar.Dropdown title="Profile" align="right">
                                        <Navbar.DropdownItem href="#">Account Details</Navbar.DropdownItem>
                                        <Navbar.DropdownSubMenu title="Theme Settings">
                                            <Navbar.DropdownItem href="#">Light Mode</Navbar.DropdownItem>
                                            <Navbar.DropdownItem href="#">Dark Mode</Navbar.DropdownItem>
                                        </Navbar.DropdownSubMenu>
                                        <Navbar.DropdownItem href="#" variant="danger">Sign Out</Navbar.DropdownItem>
                                    </Navbar.Dropdown>
                                </Navbar.Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        <div style={{padding: '1rem', flex: 1, backgroundColor: 'var(--color-bg-base)', borderBottomLeftRadius: 'var(--radius-md)', borderBottomRightRadius: 'var(--radius-md)'}}>
                            <p className="text-secondary text-sm">Basic Navbar with Dropdowns and Variants.</p>
                        </div>
                    </div>

                    {/* Centered Brand Example */}
                    <div style={{display: 'flex', flexDirection: 'column', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden'}}>
                        <Navbar expand="always" elevation="0" style={{borderBottom: '1px solid var(--color-border-subtle)'}}>
                            <Navbar.Toggle/>
                            <Navbar.Brand href="#" centered>LycoUI</Navbar.Brand>
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
                        <div style={{padding: '1rem', flex: 1, backgroundColor: 'var(--color-bg-base)'}}>
                            <p className="text-secondary text-sm">Centered Brand.</p>
                        </div>
                    </div>

                    {/* Right Aligned Example */}
                    <div style={{display: 'flex', flexDirection: 'column', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden'}}>
                        <Navbar expand="always" elevation="0" style={{borderBottom: '1px solid var(--color-border-subtle)'}}>
                            <Navbar.Brand href="#">LycoUI</Navbar.Brand>
                            <Navbar.Toggle/>
                            <Navbar.Collapse>
                                <Navbar.Nav align="end">
                                    <Navbar.Item><Navbar.Link href="#" active>Home</Navbar.Link></Navbar.Item>
                                    <Navbar.Item><Navbar.Link href="#">About</Navbar.Link></Navbar.Item>
                                    <Navbar.Item><Navbar.Link href="#">Contact</Navbar.Link></Navbar.Item>
                                </Navbar.Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        <div style={{padding: '1rem', flex: 1, backgroundColor: 'var(--color-bg-base)'}}>
                            <p className="text-secondary text-sm">Right Aligned Navigation.</p>
                        </div>
                    </div>

                </div>
            </Col>
        </Row>
    );
}
