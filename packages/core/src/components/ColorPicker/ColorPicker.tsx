import './ColorPicker.scss';
import {type HTMLAttributes, type KeyboardEvent, type MouseEvent, useCallback, useEffect, useId, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {useControllableState} from '../../hooks/useControllableState';
import {usePickerPopover} from '../DatePicker/PickerPopover';

export interface ColorPickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    swatches?: string[];
    disabled?: boolean;
    compact?: boolean;
}

const normalizeColor = (value: string): string | null => {
    const hex = value.trim().match(/^#?([\da-f]{6})$/i);
    if (hex) return `#${hex[1].toUpperCase()}`;
    const rgb = value.trim().match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);
    if (!rgb || rgb.slice(1).some(channel => Number(channel) > 255)) return null;
    return `#${rgb.slice(1).map(channel => Number(channel).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
};

export function ColorPicker({value, defaultValue = '#000000', onChange, swatches, disabled = false, compact = false, className, onClick, onKeyDown, ...props}: ColorPickerProps) {
    const isControlled = value !== undefined;
    const hasSwatches = Boolean(swatches?.length);
    const [color, setColor] = useControllableState({
        value: isControlled ? normalizeColor(value) ?? '#000000' : undefined,
        defaultValue: normalizeColor(defaultValue) ?? '#000000',
        onChange,
    });
    const [draft, setDraft] = useState(color);
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverId = `lyco-color-picker-${useId().replace(/:/g, '')}`;
    const {popoverRef, popoverStyles} = usePickerPopover(open, triggerRef, popoverId, () => setOpen(false));

    useEffect(() => setDraft(color), [color]);

    const commit = useCallback(() => {
        const next = normalizeColor(inputRef.current?.value ?? draft);
        if (next) {
            setDraft(isControlled ? color : next);
            if (isControlled && inputRef.current) inputRef.current.value = color;
            if (next !== color) setColor(next);
        } else {
            setDraft(color);
            if (inputRef.current) inputRef.current.value = color;
        }
    }, [color, draft, isControlled, setColor]);

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
        setDraft(isControlled ? color : normalized);
        setColor(normalized);
    };

    const selectSwatch = (next: string) => {
        selectColor(next);
        setOpen(false);
    };

    const togglePopover = (event: MouseEvent<HTMLDivElement>) => {
        onClick?.(event);
        if (!event.defaultPrevented && hasSwatches && !disabled) setOpen(current => !current);
    };

    const toggleCompactPopover = (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented && compact && hasSwatches && !disabled && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            setOpen(current => !current);
        }
    };

    return (
        <div {...props} className={['color-picker', compact && 'is-compact', disabled && 'is-disabled', className].filter(Boolean).join(' ')} ref={triggerRef} role={compact && hasSwatches ? 'button' : undefined} tabIndex={compact && hasSwatches && !disabled ? 0 : undefined} aria-haspopup={compact && hasSwatches ? 'dialog' : undefined} aria-expanded={compact && hasSwatches ? open : undefined} aria-controls={compact && hasSwatches ? popoverId : undefined} onClick={togglePopover} onKeyDown={toggleCompactPopover}>
            <span className="color-picker-preview" style={{backgroundColor: normalizeColor(color) ?? color}} aria-hidden="true"/>
            {!compact && <input
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
            />}
            {hasSwatches && !compact && <button type="button" className="color-picker-trigger" aria-label="Choose color" aria-expanded={open} aria-controls={popoverId} disabled={disabled}>
                <svg className="color-picker-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
            </button>}
            {!hasSwatches && <input type="color" className="color-picker-native-trigger" aria-label="Choose color" value={normalizeColor(color) ?? '#000000'} disabled={disabled} onChange={event => selectColor(event.target.value)}/>}
            {hasSwatches && open && createPortal(<div className="color-picker-dropdown" id={popoverId} ref={popoverRef} role="dialog" aria-label="Choose color" style={popoverStyles} onClick={event => event.stopPropagation()}>
                <div className="color-picker-swatches">
                    {swatches!.map(swatch => <button key={swatch} type="button" className="color-picker-swatch" data-color={swatch} aria-label={`Select ${swatch}`} style={{backgroundColor: swatch}} onClick={() => selectSwatch(swatch)}/>)}
                </div>
                <input type="color" className="color-picker-native" aria-label="Custom color" value={normalizeColor(color) ?? '#000000'} onMouseDown={event => event.stopPropagation()} onChange={event => selectColor(event.target.value)}/>
            </div>, document.body)}
        </div>
    );
}
