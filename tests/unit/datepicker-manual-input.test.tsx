import {act} from 'react';
import {createRoot} from 'react-dom/client';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {DatePicker} from '../../packages/core/src/components/DatePicker/DatePicker.tsx';
import {DateTimePicker} from '../../packages/core/src/components/DatePicker/DateTimePicker.tsx';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('manual picker input', () => {
    let container: HTMLDivElement | undefined;
    let root: ReturnType<typeof createRoot> | undefined;

    beforeEach(() => {
        Object.defineProperty(window, 'matchMedia', {
            configurable: true,
            value: () => ({
                matches: false,
                addEventListener: () => undefined,
                removeEventListener: () => undefined,
            }),
        });
    });

    afterEach(async () => {
        if (root) await act(async () => root?.unmount());
        container?.remove();
        document.querySelectorAll('.datepicker-popover').forEach(popover => popover.remove());
        root = undefined;
        container = undefined;
    });

    async function typeInto(input: HTMLInputElement, value: string) {
        await act(async () => {
            const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
            setValue?.call(input, value);
            input.dispatchEvent(new Event('input', {bubbles: true}));
        });
    }

    async function blur(input: HTMLInputElement) {
        await act(async () => {
            input.focus();
            input.blur();
        });
    }

    async function pressEnter(input: HTMLInputElement) {
        await act(async () => input.dispatchEvent(new KeyboardEvent('keydown', {bubbles: true, key: 'Enter'})));
    }

    it('keeps partial DatePicker text local and reverts an invalid committed value', async () => {
        const onChange = vi.fn();
        container = document.createElement('div');
        document.body.append(container);
        root = createRoot(container);

        await act(async () => root?.render(
            <DatePicker value={new Date(2024, 0, 2)} onChange={onChange}/>
        ));

        const input = container.querySelector<HTMLInputElement>('input')!;
        const previousValue = input.value;
        await typeInto(input, '1');

        expect(input.value).toBe('1');
        expect(onChange).not.toHaveBeenCalled();

        await blur(input);

        expect(input.value).toBe(previousValue);
        expect(onChange).not.toHaveBeenCalled();
    });

    it('keeps partial DateTimePicker text local and reverts an invalid committed value', async () => {
        const onChange = vi.fn();
        container = document.createElement('div');
        document.body.append(container);
        root = createRoot(container);

        await act(async () => root?.render(
            <DateTimePicker value={new Date(2024, 0, 2, 9, 15)} onChange={onChange}/>
        ));

        const input = container.querySelector<HTMLInputElement>('input')!;
        const previousValue = input.value;
        await typeInto(input, '1');

        expect(input.value).toBe('1');
        expect(onChange).not.toHaveBeenCalled();

        await blur(input);

        expect(input.value).toBe(previousValue);
        expect(onChange).not.toHaveBeenCalled();
    });

    it('commits complete DatePicker and DateTimePicker text only when Enter is pressed', async () => {
        const onDateChange = vi.fn();
        const onDateTimeChange = vi.fn();
        container = document.createElement('div');
        document.body.append(container);
        root = createRoot(container);

        await act(async () => root?.render(
            <>
                <DatePicker onChange={onDateChange} dateFormat="yyyy-MM-dd"/>
                <DateTimePicker onChange={onDateTimeChange} dateFormat="yyyy-MM-dd"/>
            </>
        ));

        const [dateInput, dateTimeInput] = Array.from(container.querySelectorAll<HTMLInputElement>('input'));
        await typeInto(dateInput, '2024-02-29');
        await typeInto(dateTimeInput, '2024-02-29 14:30');

        expect(onDateChange).not.toHaveBeenCalled();
        expect(onDateTimeChange).not.toHaveBeenCalled();

        await pressEnter(dateInput);
        await pressEnter(dateTimeInput);

        expect(onDateChange).toHaveBeenCalledTimes(1);
        expect(onDateTimeChange).toHaveBeenCalledTimes(1);
        const date = onDateChange.mock.calls[0][0] as Date;
        expect([date.getFullYear(), date.getMonth(), date.getDate()]).toEqual([2024, 1, 29]);

        const dateTime = onDateTimeChange.mock.calls[0][0] as Date;
        expect([dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate(), dateTime.getHours(), dateTime.getMinutes()])
            .toEqual([2024, 1, 29, 14, 30]);
    });
});
