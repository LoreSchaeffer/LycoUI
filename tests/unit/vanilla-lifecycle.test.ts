import { describe, expect, it, vi } from 'vitest';
import { BaseController } from '../../packages/core/src/vanilla/BaseController';
import { controllerRegistry } from '../../packages/core/src/vanilla/controller-registry';

describe('vanilla controller lifecycle', () => {
  it('removes every listener and cleanup exactly once', () => {
    const controller = new BaseController();
    const target = document.createElement('button');
    const listener = vi.fn();
    const cleanup = vi.fn();

    controller.listen(target, 'click', listener);
    controller.addCleanup(cleanup);
    target.click();
    controller.destroy();
    controller.destroy();
    target.click();

    expect(listener).toHaveBeenCalledTimes(1);
    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  it('owns one controller per feature and can destroy a root', () => {
    const root = document.createElement('div');
    const child = document.createElement('button');
    root.append(child);
    const controller = { destroy: vi.fn() };

    controllerRegistry.register(child, 'tooltip', controller);
    expect(controllerRegistry.get(child, 'tooltip')).toBe(controller);
    controllerRegistry.destroy(root);

    expect(controller.destroy).toHaveBeenCalledOnce();
    expect(controllerRegistry.get(child, 'tooltip')).toBeUndefined();
  });
});
