import {act, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {Select} from '../../packages/core/src/components/Select/Select.tsx';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('Select', () => {
    let container: HTMLDivElement | undefined;
    let root: ReturnType<typeof createRoot> | undefined;

    afterEach(async () => {
        if (root) await act(async () => root?.unmount());
        container?.remove();
        document.querySelectorAll('.select-dropdown').forEach(dropdown => dropdown.remove());
        root = undefined;
        container = undefined;
    });

    it('renders the Pagination-style SVG chevron in the trigger', async () => {
        container = document.createElement('div');
        document.body.append(container);
        root = createRoot(container);

        await act(async () => root?.render(<Select options={[{label: 'One', value: 'one'}]}/>));

        const chevron = container.querySelector('.select-chevron-btn svg.select-chevron');
        expect(chevron).not.toBeNull();
        expect(chevron?.getAttribute('viewBox')).toBe('0 0 24 24');
        expect(chevron?.getAttribute('stroke')).toBe('currentColor');
        expect(chevron?.getAttribute('stroke-width')).toBe('2');
        expect(chevron?.querySelector('polyline')?.getAttribute('points')).toBe('15 18 9 12 15 6');
    });

    it('selects a portaled option instead of dismissing it as an outside click', async () => {
        const Example = () => {
            const [value, setValue] = useState<string | number>('');
            return <><Select value={value} onChange={setValue} options={[{label: 'One', value: 'one'}, {label: 'Two', value: 'two'}]}/><output>{value}</output></>;
        };
        container = document.createElement('div');
        document.body.append(container);
        root = createRoot(container);
        Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {configurable: true, value: () => undefined});

        try {
            await act(async () => root?.render(<Example/>));
            const trigger = container.querySelector<HTMLElement>('[role="combobox"]')!;
            await act(async () => trigger.click());
            const option = document.querySelector<HTMLElement>('[role="option"]:nth-child(2)')!;

            await act(async () => option.dispatchEvent(new MouseEvent('mousedown', {bubbles: true})));
            await act(async () => option.click());

            expect(container.querySelector('output')?.textContent).toBe('two');
            expect(document.querySelector('[role="listbox"]')).toBeNull();
        } finally {
            delete (HTMLElement.prototype as {scrollIntoView?: unknown}).scrollIntoView;
        }
    });

    it('positions the portaled listbox before scrolling its focused option into view', async () => {
        container = document.createElement('div');
        document.body.append(container);
        root = createRoot(container);
        const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            bottom: 120, height: 20, left: 40, right: 140, top: 100, width: 100, x: 40, y: 100, toJSON: () => ({}),
        } as DOMRect);
        const scrollIntoView = vi.fn(function (this: HTMLElement) {
            expect(this.parentElement?.style.top).toBe('128px');
        });
        Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {configurable: true, value: scrollIntoView});

        try {
            await act(async () => root?.render(<Select options={[{label: 'One', value: 'one'}]}/>));
            await act(async () => container?.querySelector<HTMLElement>('[role="combobox"]')?.click());

            expect(scrollIntoView).toHaveBeenCalledOnce();
        } finally {
            rect.mockRestore();
            delete (HTMLElement.prototype as {scrollIntoView?: unknown}).scrollIntoView;
        }
    });
});
