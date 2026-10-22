import {act} from 'react';
import {createRoot, type Root} from 'react-dom/client';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {ColorPicker} from '../../packages/core/src/components/ColorPicker/ColorPicker';

describe('ColorPicker public integration', () => {
    it('exports ColorPicker from the core package entry point', async () => {
        const core = await import('../../packages/core/src/index.ts');
        expect(core.ColorPicker).toBeTypeOf('function');
    });

    it('loads the documentation page and examples', async () => {
        const [page, basic, predefined, compact] = await Promise.all([
            import('../../packages/docs/src/pages/components/ColorPicker/ColorPickerDoc.tsx'),
            import('../../packages/docs/src/pages/components/ColorPicker/examples/BasicExample.tsx'),
            import('../../packages/docs/src/pages/components/ColorPicker/examples/PredefinedSwatchesExample.tsx'),
            import('../../packages/docs/src/pages/components/ColorPicker/examples/CompactExample.tsx'),
        ]);
        expect(page.default).toBeTypeOf('function');
        expect(basic.default).toBeTypeOf('function');
        expect(predefined.default).toBeTypeOf('function');
        expect(compact.default).toBeTypeOf('function');
    });
});

describe('ColorPicker interactions', () => {
    let container: HTMLDivElement;
    let root: Root;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        root = createRoot(container);
    });

    afterEach(async () => {
        await act(async () => root.unmount());
        container.remove();
    });

    it('normalizes RGB text after commit', async () => {
        await act(async () => root.render(<ColorPicker defaultValue="#112233"/>));
        const input = container.querySelector<HTMLInputElement>('.color-picker-input')!;
        await act(async () => {
            input.value = 'rgb(1, 2, 3)';
            input.dispatchEvent(new Event('input', {bubbles: true}));
            input.dispatchEvent(new FocusEvent('blur', {bubbles: true}));
        });
        expect(input.value).toBe('#010203');
    });

    it('does not publish an invalid custom color', async () => {
        const onChange = vi.fn();
        await act(async () => root.render(<ColorPicker value="#112233" onChange={onChange}/>));
        const input = container.querySelector<HTMLInputElement>('.color-picker-input')!;
        await act(async () => {
            input.value = 'not-a-color';
            input.dispatchEvent(new Event('input', {bubbles: true}));
            input.dispatchEvent(new FocusEvent('blur', {bubbles: true}));
        });
        expect(onChange).not.toHaveBeenCalled();
        expect(input.value).toBe('#112233');
    });

    it('publishes a selected predefined swatch', async () => {
        const onChange = vi.fn();
        await act(async () => root.render(<ColorPicker value="#112233" onChange={onChange} swatches={['#ABCDEF']}/>));
        await act(async () => container.querySelector<HTMLButtonElement>('.color-picker-trigger')!.click());
        await act(async () => document.querySelector<HTMLButtonElement>('[data-color="#ABCDEF"]')!.click());
        expect(onChange).toHaveBeenCalledWith('#ABCDEF');
        expect(document.querySelector('[role="dialog"]')).toBeNull();
    });

    it('connects its trigger and portalled dialog through generated ARIA IDs', async () => {
        await act(async () => root.render(<ColorPicker defaultValue="#112233" swatches={['#ABCDEF']}/>));
        const trigger = container.querySelector<HTMLButtonElement>('.color-picker-trigger')!;
        await act(async () => trigger.click());
        const dialog = document.querySelector<HTMLElement>('[role="dialog"]')!;
        expect(container.contains(dialog)).toBe(false);
        expect(trigger.getAttribute('aria-controls')).toBe(dialog.id);
        expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('positions the portal without invoking scrolling APIs', async () => {
        const scrollIntoView = vi.fn();
        const original = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollIntoView');
        Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {configurable: true, value: scrollIntoView});
        try {
            await act(async () => root.render(<ColorPicker defaultValue="#112233" swatches={['#ABCDEF']}/>));
            await act(async () => container.querySelector<HTMLButtonElement>('.color-picker-trigger')!.click());
            expect(document.querySelector<HTMLElement>('.color-picker-dropdown')?.style.position).toBe('fixed');
            expect(scrollIntoView).not.toHaveBeenCalled();
        } finally {
            if (original) Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', original);
            else delete (HTMLElement.prototype as HTMLElement & {scrollIntoView?: () => void}).scrollIntoView;
        }
    });

    it('makes the portal visible only after applying its initial measured position', async () => {
        const rect = (values: Partial<DOMRect>): DOMRect => ({
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0,
            x: 0,
            y: 0,
            toJSON: () => ({}),
            ...values,
        });
        const getBoundingClientRect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function() {
            return this.classList.contains('color-picker')
                ? rect({left: 120, right: 320, top: 120, bottom: 160, width: 200, height: 40})
                : rect({width: 120, height: 100});
        });
        const originalClientWidth = Object.getOwnPropertyDescriptor(document.documentElement, 'clientWidth');
        const originalInnerWidth = Object.getOwnPropertyDescriptor(window, 'innerWidth');
        const originalScrollX = Object.getOwnPropertyDescriptor(window, 'scrollX');
        const originalScrollY = Object.getOwnPropertyDescriptor(window, 'scrollY');
        Object.defineProperty(document.documentElement, 'clientWidth', {configurable: true, value: 1000});
        Object.defineProperty(window, 'innerWidth', {configurable: true, value: 200});
        Object.defineProperty(window, 'scrollX', {configurable: true, value: 200});
        Object.defineProperty(window, 'scrollY', {configurable: true, value: 300});
        try {
            await act(async () => root.render(<ColorPicker defaultValue="#112233" swatches={['#ABCDEF']}/>));
            await act(async () => container.querySelector<HTMLButtonElement>('.color-picker-trigger')!.click());
            const dialog = document.querySelector<HTMLElement>('[role="dialog"]')!;
            expect(dialog.style.visibility).toBe('visible');
            expect(dialog.style.left).toBe('120px');
            expect(dialog.style.top).toBe('168px');
        } finally {
            getBoundingClientRect.mockRestore();
            if (originalClientWidth) Object.defineProperty(document.documentElement, 'clientWidth', originalClientWidth);
            else delete (document.documentElement as HTMLElement & {clientWidth?: number}).clientWidth;
            if (originalInnerWidth) Object.defineProperty(window, 'innerWidth', originalInnerWidth);
            else delete (window as Window & {innerWidth?: number}).innerWidth;
            if (originalScrollX) Object.defineProperty(window, 'scrollX', originalScrollX);
            else delete (window as Window & {scrollX?: number}).scrollX;
            if (originalScrollY) Object.defineProperty(window, 'scrollY', originalScrollY);
            else delete (window as Window & {scrollY?: number}).scrollY;
        }
    });

    it('normalizes initial controlled and default colors', async () => {
        await act(async () => root.render(<ColorPicker defaultValue="abcdef"/>));
        expect(container.querySelector<HTMLInputElement>('.color-picker-input')!.value).toBe('#ABCDEF');
        await act(async () => root.render(<ColorPicker value="rgb(1, 2, 3)"/>));
        expect(container.querySelector<HTMLInputElement>('.color-picker-input')!.value).toBe('#010203');
    });

    it('uses a valid fallback when an initial prop is invalid', async () => {
        await act(async () => root.render(<ColorPicker value="invalid"/>));
        const input = container.querySelector<HTMLInputElement>('.color-picker-input')!;
        expect(input.value).toBe('#000000');
        await act(async () => {
            input.value = 'still-invalid';
            input.dispatchEvent(new FocusEvent('blur', {bubbles: true}));
        });
        expect(input.value).toBe('#000000');
    });

    it('waits for the controlled parent after a text commit', async () => {
        const onChange = vi.fn();
        await act(async () => root.render(<ColorPicker value="#112233" onChange={onChange}/>));
        const input = container.querySelector<HTMLInputElement>('.color-picker-input')!;
        await act(async () => {
            input.value = 'rgb(1, 2, 3)';
            input.dispatchEvent(new FocusEvent('blur', {bubbles: true}));
        });
        expect(onChange).toHaveBeenCalledWith('#010203');
        expect(input.value).toBe('#112233');
    });

    it('waits for the controlled parent after a swatch selection', async () => {
        const onChange = vi.fn();
        await act(async () => root.render(<ColorPicker value="#112233" onChange={onChange} swatches={['#ABCDEF']}/>));
        await act(async () => container.querySelector<HTMLButtonElement>('.color-picker-trigger')!.click());
        await act(async () => document.querySelector<HTMLButtonElement>('[data-color="#ABCDEF"]')!.click());
        expect(onChange).toHaveBeenCalledWith('#ABCDEF');
        expect(container.querySelector<HTMLInputElement>('.color-picker-input')!.value).toBe('#112233');
    });

    it('waits for the controlled parent after native color selection', async () => {
        const onChange = vi.fn();
        await act(async () => root.render(<ColorPicker value="#112233" onChange={onChange} swatches={['#ABCDEF']}/>));
        await act(async () => container.querySelector<HTMLButtonElement>('.color-picker-trigger')!.click());
        const native = document.querySelector<HTMLInputElement>('.color-picker-native')!;
        await act(async () => {
            Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(native, '#abcdef');
            native.dispatchEvent(new Event('input', {bubbles: true}));
            native.dispatchEvent(new Event('change', {bubbles: true}));
        });
        expect(onChange).toHaveBeenCalledWith('#ABCDEF');
        expect(container.querySelector<HTMLInputElement>('.color-picker-input')!.value).toBe('#112233');
    });

    it('opens the swatch dialog when its displayed color value is clicked', async () => {
        await act(async () => root.render(<ColorPicker defaultValue="#112233" swatches={['#ABCDEF']}/>));
        const input = container.querySelector<HTMLInputElement>('.color-picker-input')!;
        await act(async () => input.dispatchEvent(new MouseEvent('click', {bubbles: true})));
        expect(document.querySelector('[role="dialog"]')).not.toBeNull();
    });

    it('uses the Select chevron SVG in the trigger', async () => {
        await act(async () => root.render(<ColorPicker defaultValue="#112233" swatches={['#ABCDEF']}/>));
        const chevron = container.querySelector<SVGSVGElement>('.color-picker-chevron')!;
        expect(chevron.getAttribute('viewBox')).toBe('0 0 24 24');
        expect(chevron.querySelector('polyline')?.getAttribute('points')).toBe('15 18 9 12 15 6');
    });

    it('keeps the swatch dialog open when the native color input receives pointer and click events', async () => {
        await act(async () => root.render(<ColorPicker defaultValue="#112233" swatches={['#ABCDEF']}/>));
        await act(async () => container.querySelector<HTMLButtonElement>('.color-picker-trigger')!.click());
        const native = document.querySelector<HTMLInputElement>('.color-picker-native')!;
        await act(async () => {
            native.dispatchEvent(new MouseEvent('mousedown', {bubbles: true}));
            native.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        expect(document.querySelector('[role="dialog"]')).not.toBeNull();
    });

    it('uses a native trigger without rendering a dialog when swatches are omitted', async () => {
        await act(async () => root.render(<ColorPicker defaultValue="#112233"/>));
        const native = container.querySelector<HTMLInputElement>('.color-picker-native-trigger')!;
        expect(native.type).toBe('color');
        expect(native.value).toBe('#112233');
        expect(container.querySelector('.color-picker-trigger')).toBeNull();
        expect(document.querySelector('[role="dialog"]')).toBeNull();
    });

    it('renders only the color swatch when compact', async () => {
        await act(async () => root.render(<ColorPicker defaultValue="#112233" compact/>));
        expect(container.querySelector('.color-picker-preview')).not.toBeNull();
        expect(container.querySelector('.color-picker-input')).toBeNull();
        expect(container.querySelector('.color-picker-trigger')).toBeNull();
        expect(container.querySelector('.color-picker')?.className).toContain('is-compact');
    });

    it('opens a swatch palette from a keyboard-accessible compact trigger', async () => {
        await act(async () => root.render(<ColorPicker defaultValue="#112233" compact swatches={['#ABCDEF']}/>));
        const trigger = container.querySelector<HTMLDivElement>('.color-picker')!;
        expect(trigger.getAttribute('role')).toBe('button');
        expect(trigger.tabIndex).toBe(0);
        await act(async () => trigger.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', bubbles: true})));
        expect(document.querySelector('[role="dialog"]')).not.toBeNull();
    });
});
