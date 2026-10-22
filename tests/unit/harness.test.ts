import { describe, expect, it } from 'vitest';
import { diffNormalizedDom, normalizeDom } from '../helpers/normalize-dom';

describe('DOM parity harness', () => {
  it('removes only generated identifiers and initialization bookkeeping', () => {
    const normalized = normalizeDom(
      '<button id="lyco-42" data-lyco-initialized="true" class="menu-item" aria-controls="lyco-43">Open</button>',
    );

    expect(normalized).toContain('class="menu-item"');
    expect(normalized).toContain('aria-controls="__generated_id__"');
    expect(normalized).not.toContain('data-lyco-initialized');
  });

  it('reports a deliberate tag and ARIA mismatch', () => {
    const mismatch = diffNormalizedDom(
      '<button class="menu-item" aria-expanded="true">Open</button>',
      '<div class="menu-item" aria-expanded="false">Open</div>',
    );

    expect(mismatch).toMatchObject({ equal: false });
    expect(mismatch.differences).toEqual(
      expect.arrayContaining([
        expect.stringContaining('tag'),
        expect.stringContaining('aria-expanded'),
      ]),
    );
  });
});
