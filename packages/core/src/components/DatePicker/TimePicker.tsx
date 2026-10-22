import './DatePicker.scss';
import {type CSSProperties, forwardRef, type HTMLAttributes, type KeyboardEvent, useCallback, useEffect, useLayoutEffect, useId, useMemo, useRef, useState,} from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import type {FullVariant, SizeVariant} from '../../types/types.ts';
import {getContrastColor} from '../../utils/theme.ts';
import {useMediaQuery} from '../../hooks/useMediaQuery.ts';
import TimeInput from './TimeInput.tsx';
import {parseTime} from './time-model';

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
    /** Name of the input, required for form integration. */
    name?: string;
    /** Controls validation behavior. */
    validation?: 'disabled' | 'auto' | 'valid' | 'invalid';
    /** Custom validation function. Returns null if valid, or an error message string. */
    validationFn?: (value: TimeValue | null) => string | null;
    /** Custom message displayed below the input. Overrides auto-generated messages. */
    validationMessage?: string;
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
            name,
            validation = 'disabled',
            validationFn,
            validationMessage,
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
        const popoverRef = useRef<HTMLDivElement>(null);

        const [popoverStyles, setPopoverStyles] = useState<CSSProperties>({});

        const updatePosition = useCallback(() => {
            if (!isOpen || !containerRef.current || !popoverRef.current) return;
            const triggerRect = containerRef.current.getBoundingClientRect();
            const popoverRect = popoverRef.current.getBoundingClientRect();
            
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;
            const viewportWidth = document.documentElement.clientWidth;
            const viewportHeight = window.innerHeight;
            
            let calculatedLeft = triggerRect.left + scrollX;
            let calculatedTop = triggerRect.bottom + scrollY + 8;
            
            // X-Axis bounding (Right edge)
            if (calculatedLeft + popoverRect.width > viewportWidth + scrollX - 16) {
                // Align right edges
                calculatedLeft = (triggerRect.right + scrollX) - popoverRect.width;
            }
            
            // X-Axis bounding (Left edge strict clamp)
            if (calculatedLeft < scrollX + 16) {
                calculatedLeft = scrollX + 16;
            }

            // Y-Axis bounding (Flip to top if bottom overflows)
            if (triggerRect.bottom + popoverRect.height + 8 > viewportHeight && triggerRect.top - popoverRect.height - 8 > 0) {
                calculatedTop = triggerRect.top + scrollY - popoverRect.height - 8;
            }

            setPopoverStyles({
                position: 'absolute',
                top: `${calculatedTop}px`,
                left: `${calculatedLeft}px`,
                zIndex: 'var(--z-dropdown, 9999)',
            });
        }, [isOpen]);

        useLayoutEffect(() => {
            if (isOpen) {
                updatePosition();
                window.addEventListener('scroll', updatePosition, true);
                window.addEventListener('resize', updatePosition);
                return () => {
                    window.removeEventListener('scroll', updatePosition, true);
                    window.removeEventListener('resize', updatePosition);
                };
            }
        }, [isOpen, updatePosition]);

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
        
        const autoMessage = validation === 'auto' && validationFn ? validationFn(value ?? null) : null;
        const finalMessage = validationMessage || autoMessage;
        const isComponentInvalid = isInvalid || validation === 'invalid' || (validation === 'auto' && autoMessage !== null);

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
                const target = e.target as Node;
                const popoverEl = document.getElementById(popoverId);
                if (containerRef.current && !containerRef.current.contains(target) && (!popoverEl || !popoverEl.contains(target))) {
                    setIsOpen(false);
                }
            };
            document.addEventListener('mousedown', handleOutside);
            return () => document.removeEventListener('mousedown', handleOutside);
        }, [isOpen, popoverId]);


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
            const time = parseTime(val);
            if (time) onChange?.(time);
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
                    'datepicker-time',
                    size !== 'md' && `datepicker-${size}`,
                    disabled && 'is-disabled',
                    isComponentInvalid && 'is-invalid',
                    isOpen && 'is-open',
                    className
                )}
                style={inlineStyle}
                {...props}
            >
                <div
                    className="datepicker-trigger"
                    onClick={(e) => {
                        e.stopPropagation(); // CRITICAL: Prevent bubbling to document
                        if (disabled) return;
                        if (!isOpen) setIsOpen(true);
                        inputRef.current?.focus();
                    }}
                >
                    {/* Clock icon */}
                    <span className="datepicker-icon" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                    </span>

                    <input
                        ref={inputRef}
                        type={isMobile ? "time" : "text"}
                        className="datepicker-input"
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
                        name={name}
                        aria-invalid={isComponentInvalid}
                    />

                    {/* Clear button */}
                    {inputValue && (
                        <span
                            className="datepicker-clear"
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
                    <svg className="datepicker-chevron" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </div>

                {!isMobile && isOpen && createPortal(
                    <div
                        ref={popoverRef}
                        id={popoverId}
                        className="datepicker-popover"
                        role="dialog"
                        aria-label="Time picker"
                        style={{
                            ...popoverStyles,
                            ...(isColored ? {
                                '--datepicker-color-base': colorBase,
                                '--datepicker-color-contrast': colorContrast,
                            } as CSSProperties : {}),
                        }}
                    >
                        <TimeInput
                            hours={currentHours}
                            minutes={currentMinutes}
                            colorBase={colorBase}
                            onChange={handleTimeChange}
                            use12Hour={resolved12Hour}
                        />
                    </div>,
                    document.body
                )}

                {isComponentInvalid && finalMessage && (
                    <div className="input__message input__message--invalid" role="alert">
                        {finalMessage}
                    </div>
                )}
            </div>
        );
    }
);

TimePicker.displayName = 'TimePicker';

