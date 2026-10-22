import { describe, expect, it } from 'vitest';
import { createSafeSvg, setSafeText } from '../../packages/core/src/utils/safe-content';

describe('safe content helpers', () => {
  it('renders untrusted text as text rather than HTML', () => {
    const target = document.createElement('div');
    setSafeText(target, '<img src=x onerror=alert(1)>');
    expect(target.textContent).toBe('<img src=x onerror=alert(1)>');
    expect(target.querySelector('img')).toBeNull();
  });

  it('rejects event attributes and unsafe references in SVG markup', () => {
    expect(createSafeSvg('<svg><path onload="alert(1)" /></svg>')).toBeNull();
    expect(createSafeSvg('<svg><use href="https://unsafe.example/icon" /></svg>')).toBeNull();
  });
});
