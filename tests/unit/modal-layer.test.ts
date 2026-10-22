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

  it('focuses the requested target and restores focus after close', async () => {
    const trigger = document.createElement('button');
    const dialog = document.createElement('dialog');
    const primary = document.createElement('button');
    dialog.append(primary);
    document.body.append(trigger, dialog);
    trigger.focus();

    const close = openModalLayer({root: dialog, initialFocus: primary, returnFocus: trigger});
    await Promise.resolve();
    expect(document.activeElement).toBe(primary);
    close();
    expect(document.activeElement).toBe(trigger);
  });
});
