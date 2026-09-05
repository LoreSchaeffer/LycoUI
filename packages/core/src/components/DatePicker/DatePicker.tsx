import './DatePicker.scss';
import {type CSSProperties, forwardRef, type HTMLAttributes, type KeyboardEvent, useCallback, useEffect, useId, useMemo, useRef, useState,} from 'react';
import clsx from 'clsx';
import type {FullVariant, SizeVariant} from '../../types/types.ts';
import {getContrastColor} from '../../utils/theme.ts';
import {useMediaQuery} from '../../hooks/useMediaQuery.ts';
import Calendar from './Calendar.tsx';

/**
 * Props for the DatePicker component.
 */
export interface DatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** The currently selected date (controlled). Pass `null` or `undefined` to clear. */
    value?: Date | null;
    /** Callback fired when the user selects or clears a date. */
    onChange?: (date: Date | null) => void;
    /** Placeholder text displayed when no date is selected. */
    placeholder?: string;
    /** The semantic color variant applied to focus rings and active states. */
    variant?: FullVariant | 'default';
    /** The size of the date picker trigger. Default: `'md'`. */
    size?: SizeVariant;
    /** If true, the picker is non-interactive. */
    disabled?: boolean;
    /** The earliest date the user may select. */
    minDate?: Date;
    /** The latest date the user may select. */
    maxDate?: Date;
    /**
     * Maps to Intl.DateTimeFormat's dateStyle option ('short', 'medium', etc.)
     * OR accepts a custom formatting string using tokens: 'yyyy', 'MM', 'dd'.
     * Example: 'yyyy-MM-dd' or 'dd/MM/yyyy'.
     */
    dateFormat?: string;
    /**
     * A BCP 47 locale tag (e.g. `'en-US'`, `'de-DE'`).
     * When omitted the browser's locale is used.
     */
    locale?: string;
}

const pad2 = (n: number): string => String(n).padStart(2, '0');

export function formatDateString(date: Date, format: string, locale?: string): string {
    if (['short', 'medium', 'long', 'full'].includes(format)) {
        return new Intl.DateTimeFormat(locale, {dateStyle: format as 'short' | 'medium' | 'long' | 'full'}).format(date);
    }
    const y = date.getFullYear().toString();
    const m = pad2(date.getMonth() + 1);
    const d = pad2(date.getDate());
    return format.replace('yyyy', y).replace('MM', m).replace('dd', d);
}

export function parseDateString(str: string, format: string): Date | null {
    if (['short', 'medium', 'long', 'full'].includes(format)) {
        const parsed = new Date(str);
        return isNaN(parsed.getTime()) ? null : parsed;
    }
    const tokens = {
        'yyyy': '(\\d{4})',
        'MM': '(\\d{1,2})',
        'dd': '(\\d{1,2})'
    };
    const regexStr = format
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // escape regex chars
        .replace(/yyyy|MM|dd/g, (match) => tokens[match as keyof typeof tokens]);

    const match = str.match(new RegExp(`^${regexStr}$`));
    if (!match) return null;

    let y = 0, m = 0, d = 0;
    let idx = 1;
    const formatTokens = format.match(/yyyy|MM|dd/g) || [];
    for (const token of formatTokens) {
        const val = parseInt(match[idx++], 10);
        if (token === 'yyyy') y = val;
        if (token === 'MM') m = val;
        if (token === 'dd') d = val;
    }
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
        const parsed = new Date(y, m - 1, d);
        if (parsed.getFullYear() === y && parsed.getMonth() === m - 1 && parsed.getDate() === d) return parsed;
    }
    return null;
}

/**
 * A fully accessible date picker component with a popover calendar, keyboard navigation,
 * and locale-aware date formatting. Supports controlled usage via `value` / `onChange`.
 *
 * @example
 * ```tsx
 * const [date, setDate] = useState<Date | null>(null);
 * <DatePicker value={date} onChange={setDate} />
 * ```
 */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
    (
        {
            value,
            onChange,
            placeholder = 'Select date…',
            variant = 'primary',
            size = 'md',
            disabled = false,
            minDate,
            maxDate,
            dateFormat = 'medium',
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
        const [viewDate, setViewDate] = useState<Date>(() => value ?? new Date());

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

        // Format the display string
        const displayValue = useMemo(() => {
            if (!value) return '';
            return formatDateString(value, dateFormat, locale);
        }, [value, locale, dateFormat]);

        const nativeValue = useMemo(() => {
            if (!value) return '';
            return `${value.getFullYear()}-${pad2(value.getMonth() + 1)}-${pad2(value.getDate())}`;
        }, [value]);

        // Sync viewDate and input state when value changes externally
        useEffect(() => {
            if (value) {
                setViewDate(new Date(value.getFullYear(), value.getMonth(), 1));
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


        const handleSelectDate = useCallback(
            (date: Date) => {
                onChange?.(date);
                setIsOpen(false);
            },
            [onChange]
        );

        const handleClear = useCallback(
            (e: React.MouseEvent) => {
                e.stopPropagation();
                onChange?.(null);
                setInputValue('');
                setIsInvalid(false);
            },
            [onChange]
        );

        const handleNativeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            if (!val) {
                onChange?.(null);
                return;
            }
            const [y, m, d] = val.split('-').map(Number);
            if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
                onChange?.(new Date(y, m - 1, d));
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

            const parsed = parseDateString(val, dateFormat);
            if (parsed) {
                setIsInvalid(false);
                setViewDate(new Date(parsed.getFullYear(), parsed.getMonth(), 1));
                onChange?.(parsed);
            } else {
                setIsInvalid(true);
            }
        }, [onChange, dateFormat]);

        const handlePrevMonth = useCallback(() => {
            setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
        }, []);

        const handleNextMonth = useCallback(() => {
            setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
        }, []);

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

        return (
            <div
                ref={mergedRef}
                id={pickerId}
                className={clsx(
                    'datepicker',
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
                    {/* Calendar icon */}
                    <span className="datepicker__icon" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                    </span>

                    <input
                        ref={inputRef}
                        type={isMobile ? "date" : "text"}
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
                            aria-label="Clear date"
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
                        aria-label="Date picker calendar"
                    >
                        <Calendar
                            viewDate={viewDate}
                            selectedDate={value ?? null}
                            minDate={minDate}
                            maxDate={maxDate}
                            colorBase={colorBase}
                            onSelectDate={handleSelectDate}
                            onPrevMonth={handlePrevMonth}
                            onNextMonth={handleNextMonth}
                        />
                    </div>
                )}
            </div>
        );
    }
);

DatePicker.displayName = 'DatePicker';
