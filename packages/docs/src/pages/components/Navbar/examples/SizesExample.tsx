import React from 'react';
import {Col, Navbar, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Navbar Sizes';
export const description = <p>The Navbar supports multiple sizes (<code>sm</code>, <code>md</code>, <code>lg</code>) as well as custom pixel sizes.</p>;
export const order = 7;

export const vanillaHtml = `
<nav class="navbar navbar--base navbar--sm navbar--expand-always" style="margin-bottom: 1rem;">
  <div class="navbar__container">
    <a class="navbar__brand" href="#">LycoUI</a>
    <div class="navbar__collapse is-open">
      <div class="navbar__collapse-inner">
        <ul class="navbar__nav">
          <li class="navbar__item"><a class="navbar__link is-active" href="#">sm (48px)</a></li>
        </ul>
      </div>
    </div>
  </div>
</nav>
<nav class="navbar navbar--base navbar--md navbar--expand-always" style="margin-bottom: 1rem;">
  <div class="navbar__container">
    <a class="navbar__brand" href="#">LycoUI</a>
    <div class="navbar__collapse is-open">
      <div class="navbar__collapse-inner">
        <ul class="navbar__nav">
          <li class="navbar__item"><a class="navbar__link is-active" href="#">md (64px)</a></li>
        </ul>
      </div>
    </div>
  </div>
</nav>
<nav class="navbar navbar--base navbar--lg navbar--expand-always" style="margin-bottom: 1rem;">
  <div class="navbar__container">
    <a class="navbar__brand" href="#">LycoUI</a>
    <div class="navbar__collapse is-open">
      <div class="navbar__collapse-inner">
        <ul class="navbar__nav">
          <li class="navbar__item"><a class="navbar__link is-active" href="#">lg (80px)</a></li>
        </ul>
      </div>
    </div>
  </div>
</nav>
<nav class="navbar navbar--base navbar--expand-always" style="--navbar-height: 100px;">
  <div class="navbar__container">
    <a class="navbar__brand" href="#">LycoUI</a>
    <div class="navbar__collapse is-open">
      <div class="navbar__collapse-inner">
        <ul class="navbar__nav">
          <li class="navbar__item"><a class="navbar__link is-active" href="#">Custom (100px)</a></li>
        </ul>
      </div>
    </div>
  </div>
</nav>
`;

export default function SizesExample() {
    return (
        <Row>
            <Col span={12}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-md)'}}>
                    <Navbar size="sm" expand="always" style={{backgroundColor: 'var(--color-surface-elevated)'}}>
                        <Navbar.Brand href="#">LycoUI</Navbar.Brand>
                        <Navbar.Collapse>
                            <Navbar.Nav>
                                <Navbar.Item><Navbar.Link active>sm (48px)</Navbar.Link></Navbar.Item>
                            </Navbar.Nav>
                        </Navbar.Collapse>
                    </Navbar>

                    <Navbar size="md" expand="always" style={{backgroundColor: 'var(--color-surface-elevated)'}}>
                        <Navbar.Brand href="#">LycoUI</Navbar.Brand>
                        <Navbar.Collapse>
                            <Navbar.Nav>
                                <Navbar.Item><Navbar.Link active>md (64px)</Navbar.Link></Navbar.Item>
                            </Navbar.Nav>
                        </Navbar.Collapse>
                    </Navbar>

                    <Navbar size="lg" expand="always" style={{backgroundColor: 'var(--color-surface-elevated)'}}>
                        <Navbar.Brand href="#">LycoUI</Navbar.Brand>
                        <Navbar.Collapse>
                            <Navbar.Nav>
                                <Navbar.Item><Navbar.Link active>lg (80px)</Navbar.Link></Navbar.Item>
                            </Navbar.Nav>
                        </Navbar.Collapse>
                    </Navbar>

                    <Navbar size={100} expand="always" style={{backgroundColor: 'var(--color-surface-elevated)'}}>
                        <Navbar.Brand href="#">LycoUI</Navbar.Brand>
                        <Navbar.Collapse>
                            <Navbar.Nav>
                                <Navbar.Item><Navbar.Link active>Custom (100px)</Navbar.Link></Navbar.Item>
                            </Navbar.Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </Col>
        </Row>
    );
}
