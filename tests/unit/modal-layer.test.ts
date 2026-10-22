import { describe, expect, it } from 'vitest';
import { openModalLayer } from '../../packages/core/src/interaction/modal-layer';

describe('modal layer', () => {
  it('reference-counts scroll locking and disposes idempotently', () => {
    const first = document.createElement('dialog');
    const second = document.createElement('dialog');
    document.body.append(first, second);
    const closeFirst = openModalLayer({root: first});
    const closeSecond = openModalLayer({root: second});
    closeFirst();
    expect(document.body.style.overflow).toBe('hidden');
    closeSecond();
    closeSecond();
    expect(document.body.style.overflow).toBe('');
  });
});
