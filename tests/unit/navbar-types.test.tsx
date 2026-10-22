import React from 'react';
import {describe, expect, it} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {Navbar} from '../../packages/core/src/components/Navbar/Navbar';
import {LycoNavbarController} from '../../packages/core/src/components/Navbar/Navbar.vanilla';

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

  it('uses shared controllers for Vanilla collapse and dropdown state', () => {
    document.body.innerHTML = `<nav class="navbar"><button class="navbar-toggle" aria-controls="panel"></button><div id="panel" class="navbar-collapse"></div><div class="navbar-dropdown"><button class="navbar-dropdown-trigger"></button><div class="navbar-dropdown-menu"></div></div></nav>`;
    const navbar = document.querySelector<HTMLElement>('.navbar')!;
    const toggle = document.querySelector<HTMLButtonElement>('.navbar-toggle')!;
    const panel = document.querySelector<HTMLElement>('#panel')!;
    const menuTrigger = document.querySelector<HTMLButtonElement>('.navbar-dropdown-trigger')!;
    const menu = document.querySelector<HTMLElement>('.navbar-dropdown-menu')!;
    const controller = new LycoNavbarController(navbar);

    toggle.click();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(panel.hidden).toBe(false);
    menuTrigger.click();
    expect(menuTrigger.getAttribute('aria-expanded')).toBe('true');
    expect(menu.hidden).toBe(false);
    controller.destroy();
  });
});
