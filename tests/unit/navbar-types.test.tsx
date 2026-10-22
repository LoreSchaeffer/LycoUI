import React from 'react';
import {describe, expect, it} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {Navbar} from '../../packages/core/src/components/Navbar/Navbar';

describe('Navbar compound API', () => {
  it('keeps polymorphic links and the controlled collapse relationship', () => {
    const markup = renderToStaticMarkup(
      <Navbar id="main-nav">
        <Navbar.Brand href="/">Lyco</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse><Navbar.Nav><Navbar.Item><Navbar.Link href="/docs">Docs</Navbar.Link></Navbar.Item></Navbar.Nav></Navbar.Collapse>
      </Navbar>
    );
    expect(markup).toContain('href="/docs"');
    expect(markup).toContain('aria-controls="main-nav-collapse"');
    expect(markup).toContain('id="main-nav-collapse"');
    expect(markup).toContain('class="navbar-container"');
    expect(markup).not.toContain('navbar__');
    expect(markup).not.toContain('navbar--');
  });
});
