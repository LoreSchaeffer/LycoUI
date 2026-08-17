import { Navbar } from '@loreschaeffer/lyco-ui';

export const title = 'Centered Navbar';
export const description = <p>A navbar with a centered navigation list.</p>;
export const order = 2;
export const vanillaHtml = `
<nav class="navbar navbar--base navbar--expand-lg">
  <div class="navbar__container">
    <a class="navbar__brand" href="#">LycoUI</a>
    <button type="button" class="navbar__toggle" aria-expanded="false" aria-controls="navbar-collapse-centered">
      <span></span><span></span><span></span>
    </button>
    <div class="navbar__collapse" id="navbar-collapse-centered">
      <div class="navbar__collapse-inner">
        <ul class="navbar__nav navbar__nav--align-center">
          <li class="navbar__item">
            <a class="navbar__link is-active" href="#" aria-current="page">Home</a>
          </li>
          <li class="navbar__item">
            <a class="navbar__link" href="#">Products</a>
          </li>
          <li class="navbar__item">
            <a class="navbar__link" href="#">About Us</a>
          </li>
          <li class="navbar__item">
            <a class="navbar__link" href="#">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
`;

export default function CenteredExample() {
    return (
        <Navbar expand="lg">
            <Navbar.Brand href="#">LycoUI</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Nav align="center">
                    <Navbar.Item>
                        <Navbar.Link href="#" active>Home</Navbar.Link>
                    </Navbar.Item>
                    <Navbar.Item>
                        <Navbar.Link href="#">Products</Navbar.Link>
                    </Navbar.Item>
                    <Navbar.Item>
                        <Navbar.Link href="#">About Us</Navbar.Link>
                    </Navbar.Item>
                    <Navbar.Item>
                        <Navbar.Link href="#">Contact</Navbar.Link>
                    </Navbar.Item>
                </Navbar.Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
