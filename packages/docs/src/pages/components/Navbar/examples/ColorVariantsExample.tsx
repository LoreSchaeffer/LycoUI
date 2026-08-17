import { Navbar, Row, Col } from '@loreschaeffer/lyco-ui';

export const title = 'Color Variants';
export const description = <p>Navbars support all semantic and palette colors. Use the <code>dim</code> prop for a softer look.</p>;
export const order = 3;
export const vanillaHtml = `
<nav class="navbar navbar-variant navbar-primary navbar-solid navbar-elevation-1 navbar--expand-lg mb-4">
  <div class="navbar__container">
    <a class="navbar__brand" href="#">Primary Solid</a>
    <button type="button" class="navbar__toggle" aria-expanded="false" aria-controls="navbar-primary">
      <span></span><span></span><span></span>
    </button>
    <div class="navbar__collapse" id="navbar-primary">
      <div class="navbar__collapse-inner">
        <ul class="navbar__nav">
          <li class="navbar__item"><a class="navbar__link is-active" href="#">Home</a></li>
        </ul>
      </div>
    </div>
  </div>
</nav>

<nav class="navbar navbar-variant navbar-success navbar-dim navbar-elevation-1 navbar--expand-lg mb-4">
  <div class="navbar__container">
    <a class="navbar__brand" href="#">Success Dim</a>
    <button type="button" class="navbar__toggle" aria-expanded="false" aria-controls="navbar-success-dim">
      <span></span><span></span><span></span>
    </button>
    <div class="navbar__collapse" id="navbar-success-dim">
      <div class="navbar__collapse-inner">
        <ul class="navbar__nav">
          <li class="navbar__item"><a class="navbar__link is-active" href="#">Home</a></li>
        </ul>
      </div>
    </div>
  </div>
</nav>
`;

export default function ColorVariantsExample() {
    return (
        <Row>
            <Col span={12} className="mb-4">
                <Navbar variant="primary" expand="lg">
                    <Navbar.Brand href="#">Primary Solid</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Navbar.Nav>
                            <Navbar.Item><Navbar.Link href="#" active>Home</Navbar.Link></Navbar.Item>
                        </Navbar.Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Col>
            
            <Col span={12} className="mb-4">
                <Navbar variant="success" dim expand="lg">
                    <Navbar.Brand href="#">Success Dim</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Navbar.Nav>
                            <Navbar.Item><Navbar.Link href="#" active>Home</Navbar.Link></Navbar.Item>
                        </Navbar.Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Col>
            
            <Col span={12} className="mb-4">
                <Navbar variant="warning" expand="lg">
                    <Navbar.Brand href="#">Warning Solid</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Navbar.Nav>
                            <Navbar.Item><Navbar.Link href="#" active>Home</Navbar.Link></Navbar.Item>
                        </Navbar.Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Col>

            <Col span={12}>
                <Navbar variant="purple" dim expand="lg">
                    <Navbar.Brand href="#">Purple Dim</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Navbar.Nav>
                            <Navbar.Item><Navbar.Link href="#" active>Home</Navbar.Link></Navbar.Item>
                        </Navbar.Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Col>
        </Row>
    );
}
