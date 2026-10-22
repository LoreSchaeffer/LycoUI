import {Avatar, Col, Navbar, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Collapsed Mode (Mobile View)';
export const description = <p>Use the <code>expand="never"</code> property to force the Navbar into a mobile-style collapsed state regardless of the screen width. This is useful for offcanvas menus or minimal layouts.</p>;
export const order = 2;

export const vanillaHtml = `
<nav class="navbar navbar-base">
  <div class="navbar-container">
    <a class="navbar-brand" href="#">MobileApp</a>
    <button type="button" class="navbar-toggle" aria-expanded="false" aria-controls="navbar-collapse-mobile">
      <span></span><span></span><span></span>
    </button>
    <div class="navbar-collapse" id="navbar-collapse-mobile">
      <div class="navbar-collapse-inner">
        <ul class="navbar-nav">
          <li class="navbar-item">
            <a class="navbar-link is-active" href="#" aria-current="page">Dashboard</a>
          </li>
          <li class="navbar-item navbar-dropdown">
            <button type="button" class="navbar-dropdown-trigger btn btn-unstyled" aria-expanded="false" aria-haspopup="true">
              <div style="display: flex; align-items: center; gap: 8px;">
                <div class="avatar avatar-sm avatar-circle">
                  <div class="avatar-fallback">LR</div>
                </div>
                <span>Rick A.</span>
              </div>
            </button>
            <div class="navbar-dropdown-menu">
              <a href="#" class="navbar-dropdown-item">Settings</a>
              <div class="navbar-dropdown-submenu">
                <button type="button" class="navbar-dropdown-submenu-trigger" aria-haspopup="true">
                  <span>Theme</span>
                  <svg class="navbar-dropdown-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                <div class="navbar-dropdown-menu navbar-dropdown-nested">
                  <a href="#" class="navbar-dropdown-item">Light</a>
                  <a href="#" class="navbar-dropdown-item">Dark</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
`;

export default function CollapsedExample() {
    return (
        <Row>
            <Col span={12} className="mb-4">
                <div style={{maxWidth: '400px', margin: '0 auto', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-xl)', overflow: 'hidden'}}>
                    <Navbar expand="never" style={{borderBottom: '1px solid var(--color-border-subtle)'}}>
                        <Navbar.Brand href="#">MobileApp</Navbar.Brand>
                        <Navbar.Toggle/>
                        <Navbar.Collapse>
                            <Navbar.Nav>
                                <Navbar.Item>
                                    <Navbar.Link href="#" active>Dashboard</Navbar.Link>
                                </Navbar.Item>
                                <Navbar.Dropdown unstyled title={
                                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                        <Avatar fallback="LR" size="sm"/>
                                        <span>Rick A.</span>
                                    </div>
                                }>
                                    <Navbar.DropdownItem href="#">Settings</Navbar.DropdownItem>
                                    <Navbar.DropdownSubMenu title="Theme">
                                        <Navbar.DropdownItem href="#">Light</Navbar.DropdownItem>
                                        <Navbar.DropdownItem href="#">Dark</Navbar.DropdownItem>
                                    </Navbar.DropdownSubMenu>
                                </Navbar.Dropdown>
                            </Navbar.Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div style={{height: '300px', padding: '2rem', backgroundColor: 'var(--color-bg-base)'}}>
                        <p className="text-secondary">Simulated mobile viewport. Try clicking the hamburger icon to expand the menu.</p>
                    </div>
                </div>
            </Col>
        </Row>
    );
}
