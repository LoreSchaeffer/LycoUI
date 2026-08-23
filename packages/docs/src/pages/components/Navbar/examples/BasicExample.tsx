import { Navbar, Row, Col } from '@loreschaeffer/lyco-ui';

export const title = 'Basic Navbar';
export const description = <p>A standard navbar with a brand on the left, links, and a dropdown.</p>;
export const order = 1;
export const vanillaHtml = `
<nav class="navbar navbar--base navbar--expand-lg">
  <div class="navbar__container">
    <a class="navbar__brand" href="#">LycoUI</a>
    <button type="button" class="navbar__toggle" aria-expanded="false" aria-controls="navbar-collapse-basic">
      <span></span><span></span><span></span>
    </button>
    <div class="navbar__collapse" id="navbar-collapse-basic">
      <div class="navbar__collapse-inner">
        <ul class="navbar__nav">
          <li class="navbar__item">
            <a class="navbar__link is-active" href="#" aria-current="page">Home</a>
          </li>
          <li class="navbar__item">
            <a class="navbar__link" href="#">Features</a>
          </li>
          <li class="navbar__item">
            <a class="navbar__link" href="#">Pricing</a>
          </li>
          <li class="navbar__item navbar__dropdown">
            <button type="button" class="navbar__dropdown-trigger" aria-expanded="false" aria-haspopup="true">
              More
              <svg class="navbar__dropdown-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="navbar__dropdown-menu">
              <a href="#" class="navbar__dropdown-item">About Us</a>
              <a href="#" class="navbar__dropdown-item">Contact</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
`;

export default function BasicExample() {
    return (
        <Row>
            <Col span={12}>
                <div style={{ height: '250px', display: 'flex', flexDirection: 'column', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                    <Navbar expand="lg">
                        <Navbar.Brand href="#">LycoUI</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse>
                            <Navbar.Nav>
                                <Navbar.Item>
                                    <Navbar.Link href="#" active>Home</Navbar.Link>
                                </Navbar.Item>
                                <Navbar.Item>
                                    <Navbar.Link href="#">Features</Navbar.Link>
                                </Navbar.Item>
                                <Navbar.Item>
                                    <Navbar.Link href="#">Pricing</Navbar.Link>
                                </Navbar.Item>
                                <Navbar.Dropdown title="More">
                                    <Navbar.DropdownItem href="#">About Us</Navbar.DropdownItem>
                                    <Navbar.DropdownItem href="#">Contact</Navbar.DropdownItem>
                                </Navbar.Dropdown>
                            </Navbar.Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div style={{ padding: '2rem', flex: 1, backgroundColor: 'var(--color-bg-base)' }}>
                        <p className="text-secondary">Basic page content goes here.</p>
                    </div>
                </div>
            </Col>
        </Row>
    );
}
