import {describe, expect, it, vi} from 'vitest';
import {controllerRegistry} from '../../packages/core/src/vanilla/controller-registry.ts';

describe('vanilla controller registry', () => {
    it('destroys each root-scoped controller once and clears its initialization marker', () => {
        const root = document.createElement('div');
        const child = document.createElement('button'); child.dataset.lycoInitialized = 'true'; root.append(child);
        const destroy = vi.fn();
        controllerRegistry.register(child, 'test', {destroy});
        controllerRegistry.destroy(root);
        expect(destroy).toHaveBeenCalledOnce();
        expect(child.dataset.lycoInitialized).toBeUndefined();
    });
});
