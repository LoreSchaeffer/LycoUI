import {act} from 'react';
import {createRoot, type Root} from 'react-dom/client';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {ColorPicker} from '../../packages/core/src/components/ColorPicker/ColorPicker';

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
        await act(async () => container.querySelector<HTMLButtonElement>('[data-color="#ABCDEF"]')!.click());
        expect(onChange).toHaveBeenCalledWith('#ABCDEF');
        expect(container.querySelector<HTMLInputElement>('.color-picker-input')!.value).toBe('#112233');
    });

    it('waits for the controlled parent after native color selection', async () => {
        const onChange = vi.fn();
        await act(async () => root.render(<ColorPicker value="#112233" onChange={onChange}/>));
        await act(async () => container.querySelector<HTMLButtonElement>('.color-picker-trigger')!.click());
        const native = container.querySelector<HTMLInputElement>('.color-picker-native')!;
        await act(async () => {
            Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(native, '#abcdef');
            native.dispatchEvent(new Event('input', {bubbles: true}));
            native.dispatchEvent(new Event('change', {bubbles: true}));
        });
        expect(onChange).toHaveBeenCalledWith('#ABCDEF');
        expect(container.querySelector<HTMLInputElement>('.color-picker-input')!.value).toBe('#112233');
    });
});
