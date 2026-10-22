import { describe, expect, it } from 'vitest';
import { nextNavigationAction } from '../../packages/core/src/interaction/navigation';

describe('shared navigation', () => {
  it('skips disabled and hidden entries while wrapping with ArrowDown', () => {
    expect(nextNavigationAction({ key: 'ArrowDown', currentIndex: 0, enabledIndices: [0, 3], orientation: 'vertical', loop: true }))
      .toEqual({ type: 'focus', index: 3 });
  });

  it('returns the first enabled entry for Home', () => {
    expect(nextNavigationAction({ key: 'Home', currentIndex: 3, enabledIndices: [1, 3], orientation: 'vertical', loop: true }))
      .toEqual({ type: 'focus', index: 1 });
  });
});
