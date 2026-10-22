import './ColorPicker.scss';
import {type HTMLAttributes, useCallback, useEffect, useId, useRef, useState} from 'react';
import {useControllableState} from '../../hooks/useControllableState';
import {usePickerPopover} from '../DatePicker/PickerPopover';

export interface ColorPickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    swatches?: string[];
    disabled?: boolean;
}

const DEFAULT_SWATCHES = ['#FF0000', '#FF8800', '#FFFF00', '#00AA00', '#0066FF', '#6633CC', '#000000', '#FFFFFF'];

const normalizeColor = (value: string): string | null => {
    const hex = value.trim().match(/^#?([\da-f]{6})$/i);
    if (hex) return `#${hex[1].toUpperCase()}`;
    const rgb = value.trim().match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);
    if (!rgb || rgb.slice(1).some(channel => Number(channel) > 255)) return null;
    return `#${rgb.slice(1).map(channel => Number(channel).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
};

export function ColorPicker({value, defaultValue = '#000000', onChange, swatches = DEFAULT_SWATCHES, disabled = false, className, ...props}: ColorPickerProps) {
    const [color, setColor] = useControllableState({value, defaultValue, onChange});
    const [draft, setDraft] = useState(color);
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverId = `${useId()}-popover`;
    const {popoverRef} = usePickerPopover(open, triggerRef, popoverId, () => setOpen(false));

    useEffect(() => setDraft(color), [color]);

    const commit = useCallback(() => {
        const next = normalizeColor(inputRef.current?.value ?? draft);
        if (next) {
            setDraft(next);
            if (next !== color) setColor(next);
        } else {
            setDraft(color);
            if (inputRef.current) inputRef.current.value = color;
        }
    }, [color, draft, setColor]);

    // Native blur also handles programmatic changes to the editable input.
    useEffect(() => {
        const input = inputRef.current;
        if (!input) return;
        input.addEventListener('blur', commit);
        return () => input.removeEventListener('blur', commit);
    }, [commit]);

    const selectColor = (next: string) => {
        const normalized = normalizeColor(next);
        if (!normalized || disabled) return;
        setDraft(normalized);
        setColor(normalized);
        setOpen(false);
    };

    return (
        <div {...props} className={['color-picker', disabled && 'is-disabled', className].filter(Boolean).join(' ')} ref={triggerRef}>
            <span className="color-picker-preview" style={{backgroundColor: normalizeColor(color) ?? color}} aria-hidden="true"/>
            <input
                ref={inputRef}
                className="color-picker-input"
                aria-label="Color value"
                value={draft}
                disabled={disabled}
                onChange={event => setDraft(event.target.value)}
                onKeyDown={event => {
                    if (event.key === 'Enter') {
                        commit();
                        inputRef.current?.blur();
                    }
                }}
            />
            <button type="button" className="color-picker-trigger" aria-label="Choose color" aria-expanded={open} aria-controls={popoverId} disabled={disabled} onClick={() => setOpen(current => !current)}>
                <span aria-hidden="true">▾</span>
            </button>
            {open && <div className="color-picker-popover" id={popoverId} ref={popoverRef} role="dialog" aria-label="Choose color">
                <div className="color-picker-swatches">
                    {swatches.map(swatch => <button key={swatch} type="button" className="color-picker-swatch" data-color={swatch} aria-label={`Select ${swatch}`} style={{backgroundColor: swatch}} onClick={() => selectColor(swatch)}/>)}
                </div>
                <input type="color" className="color-picker-native" aria-label="Custom color" value={normalizeColor(color) ?? '#000000'} onChange={event => selectColor(event.target.value)}/>
            </div>}
        </div>
    );
}
