import {act} from 'react';
import {createRoot} from 'react-dom/client';
import {afterEach, describe, expect, it} from 'vitest';

import {PropsTable} from '../../packages/docs/src/components/api-reference/ApiReference.tsx';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('PropsTable', () => {
    let container: HTMLDivElement | undefined;
    let root: ReturnType<typeof createRoot> | undefined;

    afterEach(async () => {
        if (root) await act(() => root?.unmount());
        container?.remove();
        root = undefined;
        container = undefined;
    });

    it('separates a required badge from the prop name', async () => {
        container = document.createElement('div');
        document.body.appendChild(container);
        root = createRoot(container);

        await act(async () => {
            root?.render(
                <PropsTable
                    title="Props"
                    data={[{name: 'children', type: 'ReactNode', required: true, description: 'Content'}]}
                />,
            );
        });

        const propContent = container.querySelector('.td-prop')?.firstElementChild as HTMLElement | null;
        expect(propContent?.style.display).toBe('flex');
        expect(propContent?.style.alignItems).toBe('center');
        expect(propContent?.style.gap).toBe('0.5rem');
    });
});
