import './DatePicker.scss';
import {type CSSProperties, forwardRef, type HTMLAttributes, type KeyboardEvent, useCallback, useEffect, useId, useMemo, useRef, useState,} from 'react';
import clsx from 'clsx';
import type {FullVariant, SizeVariant} from '../../types/types.ts';
import {getContrastColor} from '../../utils/theme.ts';
import {useMediaQuery} from '../../hooks/useMediaQuery.ts';
import Calendar from './Calendar.tsx';
import TimeInput from './TimeInput.tsx';
import {formatDateString, parseDateString} from './DatePicker.tsx';

/**
 * Props for the DateTimePicker component.
 */
export interface DateTimePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** The currently selected date and time (controlled). Pass `null` or `undefined` to clear. */
    value?: Date | null;
    /** Callback fired when the user applies a date+time selection or clears the value. */
    onChange?: (date: Date | null) => void;
    /** Placeholder text displayed when no date is selected. */
    placeholder?: string;
    /** The semantic color variant applied to focus rings and active states. */
    variant?: FullVariant | 'default';
    /** The size of the picker trigger. Default: `'md'`. */
    size?: SizeVariant;
    /** If true, the picker is non-interactive. */
    disabled?: boolean;
    /** The earliest date the user may select. */
    minDate?: Date;
    /** The latest date the user may select. */
    maxDate?: Date;
    /**
     * Controls how the date portion is formatted in the trigger.
     * Maps to Intl.DateTimeFormat's dateStyle option ('short', 'medium', etc.)
     * OR accepts a custom formatting string using tokens: 'yyyy', 'MM', 'dd'.
     */
    dateFormat?: string;
    /**
     * A BCP 47 locale tag (e.g. 'en-US', 'de-DE').
     * When omitted the browser's locale is used.
     */
    locale?: string;
    /** If true, enables 12-hour format with AM/PM selection. */
    use12Hour?: boolean;
}

const pad2 = (n: number): string => String(n).padStart(2, '0');

/**
 * A fully accessible date-and-time picker combining a calendar grid and
 * scrollable time columns in a single popover. Supports controlled usage
 * via `value` / `onChange`. Changes are committed when the user clicks "Apply".
 *
 * @example
 * ```tsx
 * const [dt, setDt] = useState<Date | null>(null);
 * <DateTimePicker value={dt} onChange={setDt} />
 * ```
 */
export const DateTimePicker = forwardRef<HTMLDivElement, DateTimePickerProps>(
    (
        {
            value,
            onChange,
            placeholder = 'Select date & time…',
            variant = 'primary',
            size = 'md',
            disabled = false,
            minDate,
            maxDate,
            dateFormat = 'medium',
            locale,
            use12Hour = false,
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

        // Internal draft state — only committed via "Apply"
        const [draftDate, setDraftDate] = useState<Date | null>(value ?? null);
        const [draftHours, setDraftHours] = useState<number>(value?.getHours() ?? 0);
        const [draftMinutes, setDraftMinutes] = useState<number>(value?.getMinutes() ?? 0);
        const [viewDate, setViewDate] = useState<Date>(() => {
            const d = value ?? new Date();
            return new Date(d.getFullYear(), d.getMonth(), 1);
        });

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
            const datePart = formatDateString(value, dateFormat, locale);
            const timePart = new Intl.DateTimeFormat(locale, {hour: 'numeric', minute: '2-digit', hour12: resolved12Hour}).format(value);
            return `${datePart} ${timePart}`;
        }, [value, locale, dateFormat, resolved12Hour]);

        const nativeValue = useMemo(() => {
            if (!value) return '';
            // HTML datetime-local requires YYYY-MM-DDThh:mm
            const y = value.getFullYear();
            const m = pad2(value.getMonth() + 1);
            const d = pad2(value.getDate());
            const h = pad2(value.getHours());
            const min = pad2(value.getMinutes());
            return `${y}-${m}-${d}T${h}:${min}`;
        }, [value]);

        // Sync draft state and input state when controlled value changes externally
        useEffect(() => {
            setDraftDate(value ?? null);
            setDraftHours(value?.getHours() ?? 0);
            setDraftMinutes(value?.getMinutes() ?? 0);
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

        const handleSelectDate = useCallback((date: Date) => {
            setDraftDate(date);
            setViewDate(new Date(date.getFullYear(), date.getMonth(), 1));
        }, []);

        const handleTimeChange = useCallback((hours: number, minutes: number) => {
            setDraftHours(hours);
            setDraftMinutes(minutes);
        }, []);

        const handleApply = useCallback(() => {
            if (!draftDate) {
                onChange?.(null);
            } else {
                const committed = new Date(draftDate);
                committed.setHours(draftHours, draftMinutes, 0, 0);
                onChange?.(committed);
            }
            setIsOpen(false);
        }, [draftDate, draftHours, draftMinutes, onChange]);

        const handleClear = useCallback(
            (e: React.MouseEvent) => {
                e.stopPropagation();
                onChange?.(null);
                setInputValue('');
                setIsInvalid(false);
                setIsOpen(false);
            },
            [onChange]
        );

        const handleNativeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            if (!val) {
                onChange?.(null);
                return;
            }
            const parsed = new Date(val);
            if (!isNaN(parsed.getTime())) {
                onChange?.(parsed);
            }
        }, [onChange]);

        const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            setInputValue(val);
            if (!val) {
                setIsInvalid(false);
                setDraftDate(null);
                setDraftHours(0);
                setDraftMinutes(0);
                return;
            }

            const timeMatch = val.match(/\s+(\d{1,2}:\d{2}(?:\s*(?:AM|PM|am|pm))?)$/);
            if (timeMatch) {
                const timePart = timeMatch[1];
                const datePart = val.substring(0, timeMatch.index).trim();

                const parsedDate = parseDateString(datePart, dateFormat);
                if (parsedDate) {
                    const match = timePart.match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM|am|pm))?$/);
                    if (match) {
                        let h = parseInt(match[1], 10);
                        const m = parseInt(match[2], 10);
                        const ampm = match[3]?.toUpperCase();

                        if (resolved12Hour && ampm) {
                            if (h === 12) h = ampm === 'AM' ? 0 : 12;
                            else if (ampm === 'PM') h += 12;
                        }

                        if (h >= 0 && h <= 23 && m >= 0 && m <= 59) {
                            parsedDate.setHours(h, m, 0, 0);
                            setIsInvalid(false);
                            setDraftDate(parsedDate);
                            setDraftHours(h);
                            setDraftMinutes(m);
                            setViewDate(new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1));
                            return;
                        }
                    }
                }
            }
            // Fallback for simple date without time if the user is still typing
            const partialDate = parseDateString(val, dateFormat);
            if (partialDate) {
                setIsInvalid(false);
                setDraftDate(partialDate);
                setViewDate(new Date(partialDate.getFullYear(), partialDate.getMonth(), 1));
                return;
            }

            setIsInvalid(true);
        }, [dateFormat, resolved12Hour]);

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
                    if (!isOpen) {
                        setDraftDate(value ?? null);
                        setDraftHours(value?.getHours() ?? 0);
                        setDraftMinutes(value?.getMinutes() ?? 0);
                        if (value) setViewDate(new Date(value.getFullYear(), value.getMonth(), 1));
                        setIsOpen(true);
                    } else setIsOpen(false);
                } else if (e.key === 'Escape') {
                    setIsOpen(false);
                } else if (e.key === 'Tab') {
                    setIsOpen(false);
                }
            },
            [disabled, isOpen, value]
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
                    'datepicker--datetime',
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
                        if (!isOpen) {
                            setDraftDate(value ?? null);
                            setDraftHours(value?.getHours() ?? 0);
                            setDraftMinutes(value?.getMinutes() ?? 0);
                            if (value) setViewDate(new Date(value.getFullYear(), value.getMonth(), 1));
                            setIsOpen(true);
                        }
                        inputRef.current?.focus();
                    }}
                >
                    {/* Calendar-clock icon */}
                    <span className="datepicker__icon" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                            <polyline points="12 14 12 17 14 17"/>
                        </svg>
                    </span>

                    <input
                        ref={inputRef}
                        type={isMobile ? "datetime-local" : "text"}
                        className="datepicker__input"
                        placeholder={placeholder}
                        value={isMobile ? nativeValue : inputValue}
                        onChange={isMobile ? handleNativeChange : handleInputChange}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isMobile && !disabled && !isOpen) {
                                setDraftDate(value ?? null);
                                setDraftHours(value?.getHours() ?? 0);
                                setDraftMinutes(value?.getMinutes() ?? 0);
                                if (value) setViewDate(new Date(value.getFullYear(), value.getMonth(), 1));
                                setIsOpen(true);
                            }
                        }}
                        onKeyDown={!isMobile ? handleTriggerKeyDown : undefined}
                        disabled={disabled}
                        aria-haspopup={!isMobile ? "dialog" : undefined}
                        aria-expanded={!isMobile ? isOpen : undefined}
                        aria-controls={!isMobile ? popoverId : undefined}
                        aria-invalid={isInvalid}
                    />

                    {inputValue && (
                        <span
                            className="datepicker__clear"
                            role="button"
                            aria-label="Clear date and time"
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

                    <svg className="datepicker__chevron" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </div>

                {!isMobile && isOpen && (
                    <div
                        id={popoverId}
                        className="datepicker__popover datepicker__popover--datetime"
                        role="dialog"
                        aria-label="Date and time picker"
                    >
                        <div className="datepicker__calendar-section">
                            <Calendar
                                viewDate={viewDate}
                                selectedDate={draftDate}
                                minDate={minDate}
                                maxDate={maxDate}
                                colorBase={colorBase}
                                onSelectDate={handleSelectDate}
                                onPrevMonth={handlePrevMonth}
                                onNextMonth={handleNextMonth}
                            />
                        </div>
                        <div className="datepicker__vertical-divider" role="separator"/>
                        <div className="datepicker__time-section">
                            <TimeInput
                                hours={draftHours}
                                minutes={draftMinutes}
                                colorBase={colorBase}
                                onChange={handleTimeChange}
                                use12Hour={resolved12Hour}
                            />
                        </div>
                        <div style={{flex: '1 1 100%'}}>
                            <button
                                type="button"
                                className="datepicker__apply-btn"
                                onClick={handleApply}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
);

DateTimePicker.displayName = 'DateTimePicker';
