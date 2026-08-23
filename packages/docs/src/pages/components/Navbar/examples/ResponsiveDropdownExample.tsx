import { Navbar, Row, Col } from '@loreschaeffer/lyco-ui';

export const title = 'Responsive Navbar with Dropdown';
export const description = <p>See how the dropdowns seamlessly transform into accordion-style inline menus when the Navbar is viewed on mobile devices (or explicitly collapsed).</p>;
export const order = 4;

export const vanillaHtml = `
<nav class="navbar navbar--base">
  <div class="navbar__container">
    <a class="navbar__brand" href="#">LycoUI</a>
    <button type="button" class="navbar__toggle" aria-expanded="false" aria-controls="navbar-collapse-responsive">
      <span></span><span></span><span></span>
    </button>
    <div class="navbar__collapse is-open" id="navbar-collapse-responsive">
      <div class="navbar__collapse-inner">
        <ul class="navbar__nav">
          <li class="navbar__item">
            <a class="navbar__link is-active" href="#">Dashboard</a>
          </li>
        </ul>
        <ul class="navbar__nav navbar__nav--align-end">
          <li class="navbar__item navbar__dropdown is-open">
            <button type="button" class="navbar__dropdown-trigger" aria-expanded="true" aria-haspopup="true">
              Profile
              <svg class="navbar__dropdown-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="navbar__dropdown-menu is-open">
              <a href="#" class="navbar__dropdown-item">Account Details</a>
              <div class="navbar__dropdown-submenu is-open">
                <button type="button" class="navbar__dropdown-submenu-trigger" aria-haspopup="true" aria-expanded="true">
                  <span>Theme Settings</span>
                  <svg class="navbar__dropdown-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                <div class="navbar__dropdown-menu navbar__dropdown-menu--nested is-open">
                  <a href="#" class="navbar__dropdown-item">Light Mode</a>
                  <a href="#" class="navbar__dropdown-item">Dark Mode</a>
                </div>
              </div>
              <a href="#" class="navbar__dropdown-item" style="color: var(--color-danger);">Sign Out</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
`;

export default function ResponsiveDropdownExample() {
    return (
        <Row>
            {/* We force a narrow column to simulate a mobile viewport */}
            <Col span={12} md={6}>
                <div style={{ height: '400px', display: 'flex', flexDirection: 'column', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                    {/* By NOT passing 'expand', the navbar defaults to collapsed (mobile) view */}
                    <Navbar>
                        <Navbar.Brand href="#">LycoUI Mobile</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse>
                            <Navbar.Nav>
                                <Navbar.Item>
                                    <Navbar.Link href="#" active>Dashboard</Navbar.Link>
                                </Navbar.Item>
                            </Navbar.Nav>
                            <Navbar.Nav align="end">
                                <Navbar.Dropdown title="Profile">
                                    <Navbar.DropdownItem href="#">Account Details</Navbar.DropdownItem>
                                    
                                    <Navbar.DropdownSubMenu title="Theme Settings">
                                        <Navbar.DropdownItem href="#">Light Mode</Navbar.DropdownItem>
                                        <Navbar.DropdownItem href="#">Dark Mode</Navbar.DropdownItem>
                                    </Navbar.DropdownSubMenu>
    
                                    <Navbar.DropdownItem href="#" style={{ color: 'var(--color-danger)' }}>Sign Out</Navbar.DropdownItem>
                                </Navbar.Dropdown>
                            </Navbar.Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div style={{ padding: '2rem', flex: 1, backgroundColor: 'var(--color-bg-base)' }}>
                        <p className="text-secondary">Simulated mobile viewport. Try opening the hamburger menu and the dropdowns.</p>
                    </div>
                </div>
            </Col>
        </Row>
    );
}
