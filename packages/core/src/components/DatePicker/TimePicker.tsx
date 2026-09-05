import './DatePicker.scss';
import {type CSSProperties, forwardRef, type HTMLAttributes, type KeyboardEvent, useCallback, useEffect, useId, useMemo, useRef, useState,} from 'react';
import clsx from 'clsx';
import type {FullVariant, SizeVariant} from '../../types/types.ts';
import {getContrastColor} from '../../utils/theme.ts';
import {useMediaQuery} from '../../hooks/useMediaQuery.ts';
import TimeInput from './TimeInput.tsx';

/** Represents a selected time value. */
/**
 * TimeValue.
 */
export interface TimeValue {
    /** The hour component (0–23). */
    hours: number;
    /** The minute component (0–59). */
    minutes: number;
}

/**
 * Props for the TimePicker component.
 */
export interface TimePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** The currently selected time (controlled). Pass `null` or `undefined` to clear. */
    value?: TimeValue | null;
    /** Callback fired when the user selects or clears a time. */
    onChange?: (time: TimeValue | null) => void;
    /** Placeholder text displayed when no time is selected. */
    placeholder?: string;
    /** The semantic color variant applied to focus rings and active states. */
    variant?: FullVariant | 'default';
    /** The size of the time picker trigger. Default: `'md'`. */
    size?: SizeVariant;
    /** If true, the picker is non-interactive. */
    disabled?: boolean;
    /** If true, enables 12-hour format with AM/PM selection. */
    use12Hour?: boolean;
    /** A BCP 47 locale tag (e.g. 'en-US'). When omitted the browser's locale is used. */
    locale?: string;
}

const pad2 = (n: number): string => String(n).padStart(2, '0');

/**
 * A fully accessible time picker component with a scrollable hours/minutes popover.
 * Supports controlled usage via `value` / `onChange`.
 *
 * @example
 * ```tsx
 * const [time, setTime] = useState<TimeValue | null>(null);
 * <TimePicker value={time} onChange={setTime} />
 * ```
 */
export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
    (
        {
            value,
            onChange,
            placeholder = 'Select time…',
            variant = 'primary',
            size = 'md',
            disabled = false,
            use12Hour,
            locale,
            className,
            id,
            style,
            ...props
        },
        ref
    ) => {
        const generatedId = useId();
        const pickerId = id ?? generatedId;
        const popoverId = `${pickerId}-popover`;

        const [isOpen, setIsOpen] = useState(false);
        const [inputValue, setInputValue] = useState('');
        const [isInvalid, setIsInvalid] = useState(false);

        const containerRef = useRef<HTMLDivElement>(null);
        const inputRef = useRef<HTMLInputElement>(null);

        const mergedRef = useCallback(
            (node: HTMLDivElement | null) => {
                (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                if (typeof ref === 'function') ref(node);
                else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
            },
            [ref]
        );

        const isColored = variant !== 'default';
        const isMobile = useMediaQuery('(max-width: 768px)');

        const resolved12Hour = use12Hour ?? new Intl.DateTimeFormat(locale, {hour: 'numeric'}).resolvedOptions().hour12;

        const displayValue = useMemo(() => {
            if (!value) return '';
            if (resolved12Hour) {
                const d = new Date();
                d.setHours(value.hours, value.minutes, 0, 0);
                return new Intl.DateTimeFormat(locale, {hour: 'numeric', minute: '2-digit', hour12: true}).format(d);
            }
            return `${pad2(value.hours)}:${pad2(value.minutes)}`;
        }, [value, resolved12Hour, locale]);

        const nativeValue = value ? `${pad2(value.hours)}:${pad2(value.minutes)}` : '';

        // Sync input state when value changes externally
        useEffect(() => {
            if (value) {
                setInputValue(displayValue);
                setIsInvalid(false);
            } else {
                setInputValue('');
                setIsInvalid(false);
            }
        }, [value, displayValue]);

        // Close on outside click
        useEffect(() => {
            if (!isOpen) return;
            const handleOutside = (e: MouseEvent) => {
                if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                    setIsOpen(false);
                }
            };
            document.addEventListener('mousedown', handleOutside);
            return () => document.removeEventListener('mousedown', handleOutside);
        }, [isOpen]);


        const handleClear = useCallback(
            (e: React.MouseEvent) => {
                e.stopPropagation();
                onChange?.(null);
                setInputValue('');
                setIsInvalid(false);
            },
            [onChange]
        );

        const handleTimeChange = useCallback(
            (hours: number, minutes: number) => {
                onChange?.({hours, minutes});
            },
            [onChange]
        );

        const handleNativeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            if (!val) {
                onChange?.(null);
                return;
            }
            const [h, m] = val.split(':').map(Number);
            if (!isNaN(h) && !isNaN(m)) {
                onChange?.({hours: h, minutes: m});
            }
        }, [onChange]);

        const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            setInputValue(val);
            if (!val) {
                setIsInvalid(false);
                onChange?.(null);
                return;
            }

            const match = val.match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM|am|pm))?$/);
            if (match) {
                let h = parseInt(match[1], 10);
                const m = parseInt(match[2], 10);
                const ampm = match[3]?.toUpperCase();

                if (resolved12Hour && ampm) {
                    if (h === 12) h = ampm === 'AM' ? 0 : 12;
                    else if (ampm === 'PM') h += 12;
                }

                if (h >= 0 && h <= 23 && m >= 0 && m <= 59) {
                    setIsInvalid(false);
                    onChange?.({hours: h, minutes: m});
                    return;
                }
            }
            setIsInvalid(true);
        }, [onChange, resolved12Hour]);

        const handleTriggerKeyDown = useCallback(
            (e: KeyboardEvent<HTMLInputElement>) => {
                if (disabled) return;
                if (e.key === 'Enter') {
                    if (!isOpen) setIsOpen(true);
                    else setIsOpen(false);
                } else if (e.key === 'Escape') {
                    setIsOpen(false);
                } else if (e.key === 'Tab') {
                    setIsOpen(false);
                }
            },
            [disabled, isOpen]
        );

        const colorBase = isColored
            ? `var(--${variant}-500, var(--color-${variant}))`
            : 'var(--color-primary)';
        const colorContrast = getContrastColor(variant !== 'default' ? variant : undefined);

        const inlineStyle: CSSProperties = {
            ...(isColored
                ? {
                    '--datepicker-color-base': colorBase,
                    '--datepicker-color-contrast': colorContrast,
                }
                : {}),
            ...style,
        } as CSSProperties;

        const currentHours = value?.hours ?? 0;
        const currentMinutes = value?.minutes ?? 0;

        return (
            <div
                ref={mergedRef}
                id={pickerId}
                className={clsx(
                    'datepicker',
                    'datepicker--time',
                    size !== 'md' && `datepicker--${size}`,
                    disabled && 'is-disabled',
                    isInvalid && 'is-invalid',
                    isOpen && 'is-open',
                    className
                )}
                style={inlineStyle}
                {...props}
            >
                <div
                    className="datepicker__trigger"
                    onClick={() => {
                        if (disabled) return;
                        if (!isOpen) setIsOpen(true);
                        inputRef.current?.focus();
                    }}
                >
                    {/* Clock icon */}
                    <span className="datepicker__icon" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                    </span>

                    <input
                        ref={inputRef}
                        type={isMobile ? "time" : "text"}
                        className="datepicker__input"
                        placeholder={placeholder}
                        value={isMobile ? nativeValue : inputValue}
                        onChange={isMobile ? handleNativeChange : handleInputChange}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isMobile && !disabled && !isOpen) setIsOpen(true);
                        }}
                        onKeyDown={!isMobile ? handleTriggerKeyDown : undefined}
                        disabled={disabled}
                        aria-haspopup={!isMobile ? "dialog" : undefined}
                        aria-expanded={!isMobile ? isOpen : undefined}
                        aria-controls={!isMobile ? popoverId : undefined}
                        aria-invalid={isInvalid}
                    />

                    {/* Clear button */}
                    {inputValue && (
                        <span
                            className="datepicker__clear"
                            role="button"
                            aria-label="Clear time"
                            tabIndex={disabled ? -1 : 0}
                            onClick={handleClear}
                            onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') handleClear(e as unknown as React.MouseEvent);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </span>
                    )}

                    {/* Chevron */}
                    <svg className="datepicker__chevron" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </div>

                {!isMobile && isOpen && (
                    <div
                        id={popoverId}
                        className="datepicker__popover"
                        role="dialog"
                        aria-label="Time picker"
                    >
                        <TimeInput
                            hours={currentHours}
                            minutes={currentMinutes}
                            colorBase={colorBase}
                            onChange={handleTimeChange}
                            use12Hour={resolved12Hour}
                        />
                    </div>
                )}
            </div>
        );
    }
);

TimePicker.displayName = 'TimePicker';
