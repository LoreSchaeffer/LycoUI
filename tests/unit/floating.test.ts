import { describe, expect, it } from 'vitest';
import { computeFloatingPosition } from '../../packages/core/src/interaction/floating-position';

describe('floating position', () => {
  it('flips a top surface below an anchor when it would overflow', () => {
    expect(computeFloatingPosition({ anchor: { top: 2, left: 20, width: 20, height: 20 }, surface: { top: 0, left: 0, width: 100, height: 40 }, viewport: { top: 0, left: 0, width: 200, height: 200 }, placement: 'top', gap: 8, gutter: 4, direction: 'ltr' }))
      .toMatchObject({ placement: 'bottom', top: 30 });
  });
});
