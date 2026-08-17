import { Navbar } from '@loreschaeffer/lyco-ui';

export const title = 'Basic Navbar';
export const description = <p>A standard navbar with a brand on the left and links on the right.</p>;
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
        </ul>
      </div>
    </div>
  </div>
</nav>
`;

export default function BasicExample() {
    return (
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
                </Navbar.Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
