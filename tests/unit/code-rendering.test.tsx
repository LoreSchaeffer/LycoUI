import {act} from 'react';
import {createRoot} from 'react-dom/client';
import {afterEach, describe, expect, it, vi} from 'vitest';

vi.mock('../../packages/core/src/components/Code/highlighter.ts', () => ({
    highlightCode: vi.fn()
        .mockResolvedValueOnce('<pre class="shiki"><code><span>const answer = 42;</span></code></pre>')
        .mockImplementation(() => new Promise(() => {})),
}));

import {Code} from '../../packages/core/src/components/Code/Code.tsx';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('Code rendering', () => {
    let container: HTMLDivElement | undefined;
    let root: ReturnType<typeof createRoot> | undefined;

    afterEach(async () => {
        if (root) await act(() => root?.unmount());
        container?.remove();
        root = undefined;
        container = undefined;
    });

    it('keeps completed highlighting visible when default languages are used', async () => {
        container = document.createElement('div');
        document.body.appendChild(container);
        root = createRoot(container);

        await act(async () => {
            root?.render(<Code code="const answer = 42;"/>);
            await Promise.resolve();
        });

        expect(container.querySelector('.code-highlight .shiki')).not.toBeNull();
        expect(container.querySelector('pre')?.style.color).not.toBe('transparent');
    });

    it('renders accessible icon-only copy and download toolbar actions', async () => {
        container = document.createElement('div');
        document.body.appendChild(container);
        root = createRoot(container);

        await act(async () => {
            root?.render(<Code code="const answer = 42;" showCopy showDownload/>);
            await Promise.resolve();
        });

        const copyButton = container.querySelector<HTMLButtonElement>('button[aria-label="Copy"]');
        const downloadButton = container.querySelector<HTMLButtonElement>('button[aria-label="Download"]');

        expect(copyButton?.textContent).toBe('');
        expect(downloadButton?.textContent).toBe('');
        expect(copyButton?.querySelector('svg[aria-hidden="true"]')).not.toBeNull();
        expect(downloadButton?.querySelector('svg[aria-hidden="true"]')).not.toBeNull();
    });

});
