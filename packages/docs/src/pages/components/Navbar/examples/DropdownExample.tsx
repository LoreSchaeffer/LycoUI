import {Navbar} from '@loreschaeffer/lyco-ui';

export const title = 'Navbar with Dropdown';
export const description = <p>Include interactive dropdown menus in your navigation, perfect for Profile settings or complex sub-navigation menus. Supports deeply nested submenus that open smoothly on hover.</p>;
export const order = 3;

export const vanillaHtml = `
<nav class="navbar navbar--base navbar--expand-lg">
  <div class="navbar__container">
    <a class="navbar__brand" href="#">LycoUI</a>
    <button type="button" class="navbar__toggle" aria-expanded="false" aria-controls="navbar-collapse-dropdown">
      <span></span><span></span><span></span>
    </button>
    <div class="navbar__collapse" id="navbar-collapse-dropdown">
      <div class="navbar__collapse-inner">
        <ul class="navbar__nav">
          <li class="navbar__item">
            <a class="navbar__link is-active" href="#">Dashboard</a>
          </li>
          <li class="navbar__item">
            <a class="navbar__link" href="#">Projects</a>
          </li>
        </ul>
        <ul class="navbar__nav navbar__nav--align-end">
          <li class="navbar__item navbar__dropdown">
            <button type="button" class="navbar__dropdown-trigger" aria-expanded="false" aria-haspopup="true">
              Profile
              <svg class="navbar__dropdown-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="navbar__dropdown-menu">
              <a href="#" class="navbar__dropdown-item">Account Details</a>
              <div class="navbar__dropdown-submenu">
                <button type="button" class="navbar__dropdown-submenu-trigger" aria-haspopup="true">
                  <span>Theme Settings</span>
                  <svg class="navbar__dropdown-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                <div class="navbar__dropdown-menu navbar__dropdown-menu--nested">
                  <a href="#" class="navbar__dropdown-item">Light Mode</a>
                  <a href="#" class="navbar__dropdown-item">Dark Mode</a>
                  <a href="#" class="navbar__dropdown-item">System Preference</a>
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

export default function DropdownExample() {
    return (
        <div style={{minHeight: '350px', width: '100%'}}>
            <Navbar expand="lg">
                <Navbar.Brand href="#">LycoUI</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <Navbar.Nav>
                        <Navbar.Item>
                            <Navbar.Link href="#" active>Dashboard</Navbar.Link>
                        </Navbar.Item>
                        <Navbar.Item>
                            <Navbar.Link href="#">Projects</Navbar.Link>
                        </Navbar.Item>
                    </Navbar.Nav>
                    <Navbar.Nav align="end">
                        <Navbar.Dropdown title="Profile" align="right">
                            <Navbar.DropdownItem href="#">Account Details</Navbar.DropdownItem>

                            <Navbar.DropdownSubMenu title="Theme Settings">
                                <Navbar.DropdownItem href="#">Light Mode</Navbar.DropdownItem>
                                <Navbar.DropdownItem href="#">Dark Mode</Navbar.DropdownItem>
                                <Navbar.DropdownItem href="#">System Preference</Navbar.DropdownItem>
                            </Navbar.DropdownSubMenu>

                            <Navbar.DropdownItem href="#" style={{color: 'var(--color-danger)'}}>Sign Out</Navbar.DropdownItem>
                        </Navbar.Dropdown>
                    </Navbar.Nav>
                </Navbar.Collapse>
            </Navbar>

            {/* Simulated Content Area to showcase dropdown floating above */}
            <div style={{height: '300px', backgroundColor: 'var(--color-bg-base)', border: '1px solid var(--color-border-subtle)', borderTop: 'none', borderBottomLeftRadius: 'var(--radius-lg)', borderBottomRightRadius: 'var(--radius-lg)'}}>
            </div>
        </div>
    );
}
