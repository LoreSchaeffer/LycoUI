import {forwardRef, type KeyboardEvent, memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';

/** Internal props for the Calendar sub-component. Not exported publicly. */
/**
 * Props for the Calendar component.
 */
export interface CalendarProps {
    /** The month/year currently displayed in the calendar. */
    viewDate: Date;
    /** The currently selected date, or null if none. */
    selectedDate: Date | null;
    /** The earliest selectable date. */
    minDate?: Date;
    /** The maximum selectable date. */
    maxDate?: Date;
    /** CSS variable value for the active/selected color, e.g. "var(--blue-500)". */
    colorBase: string;
    /** Called when the user selects a day cell. */
    onSelectDate: (d: Date) => void;
    /** Called when the user clicks the previous-month button. */
    onPrevMonth: () => void;
    /** Called when the user clicks the next-month button. */
    onNextMonth: () => void;
}

/** Zero-out the time portion of a date for safe day comparisons. */
const stripTime = (d: Date): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** Build the 6×7 grid of days for a given month view. */
const buildDayGrid = (viewDate: Date): Date[] => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // ISO week: Monday = 0 … Sunday = 6
    const startOffset = (firstDay.getDay() + 6) % 7;
    const endOffset = (7 - ((lastDay.getDay() + 1) % 7)) % 7;

    const days: Date[] = [];

    for (let i = startOffset; i > 0; i--) {
        days.push(new Date(year, month, 1 - i));
    }
    for (let d = 1; d <= lastDay.getDate(); d++) {
        days.push(new Date(year, month, d));
    }
    for (let i = 1; i <= endOffset; i++) {
        days.push(new Date(year, month + 1, i));
    }

    // Always return exactly 6 rows (42 cells)
    while (days.length < 42) {
        const last = days[days.length - 1];
        days.push(new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1));
    }

    return days;
};

const DAY_NAMES = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTH_FORMATTER = new Intl.DateTimeFormat(undefined, {month: 'long', year: 'numeric'});

/**
 * Internal calendar grid component. Renders a month view with keyboard navigation.
 * Uses ARIA `role="grid"`, `role="row"`, `role="gridcell"` for full accessibility.
 * Wrapped in `React.memo` to prevent unnecessary re-renders.
 */
const Calendar = memo(forwardRef<HTMLDivElement, CalendarProps>(function Calendar({
                                                                                      viewDate,
                                                                                      selectedDate,
                                                                                      minDate,
                                                                                      maxDate,
                                                                                      onSelectDate,
                                                                                      onPrevMonth,
                                                                                      onNextMonth,
                                                                                  }, ref) {
    const today = useMemo(() => stripTime(new Date()), []);
    const selectedNorm = useMemo(() => selectedDate ? stripTime(selectedDate) : null, [selectedDate]);
    const minNorm = useMemo(() => minDate ? stripTime(minDate) : null, [minDate]);
    const maxNorm = useMemo(() => maxDate ? stripTime(maxDate) : null, [maxDate]);

    const days = useMemo(() => buildDayGrid(viewDate), [viewDate]);
    const gridRef = useRef<HTMLDivElement>(null);

    const [focusedDay, setFocusedDay] = useState<Date>(() => {
        if (selectedDate) return stripTime(selectedDate);
        return stripTime(viewDate);
    });

    // Update focusedDay when viewDate changes (month navigation)
    useEffect(() => {
        setFocusedDay(prev => {
            const inNewMonth = prev.getMonth() === viewDate.getMonth() && prev.getFullYear() === viewDate.getFullYear();
            if (inNewMonth) return prev;
            return new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
        });
    }, [viewDate]);

    const isDateDisabled = useCallback((d: Date): boolean => {
        const n = stripTime(d);
        if (minNorm && n < minNorm) return true;
        if (maxNorm && n > maxNorm) return true;
        return false;
    }, [minNorm, maxNorm]);

    const handleSelectDay = useCallback((d: Date) => {
        if (isDateDisabled(d)) return;
        setFocusedDay(stripTime(d));
        onSelectDate(d);
    }, [isDateDisabled, onSelectDate]);

    const handleGridKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        let nextDay: Date | null = null;

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                nextDay = new Date(focusedDay.getFullYear(), focusedDay.getMonth(), focusedDay.getDate() - 1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextDay = new Date(focusedDay.getFullYear(), focusedDay.getMonth(), focusedDay.getDate() + 1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                nextDay = new Date(focusedDay.getFullYear(), focusedDay.getMonth(), focusedDay.getDate() - 7);
                break;
            case 'ArrowDown':
                e.preventDefault();
                nextDay = new Date(focusedDay.getFullYear(), focusedDay.getMonth(), focusedDay.getDate() + 7);
                break;
            case 'PageUp':
                e.preventDefault();
                onPrevMonth();
                break;
            case 'PageDown':
                e.preventDefault();
                onNextMonth();
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (!isDateDisabled(focusedDay)) {
                    handleSelectDay(focusedDay);
                }
                break;
            default:
                return;
        }

        if (nextDay) {
            setFocusedDay(stripTime(nextDay));
            // Navigate months if needed
            if (nextDay.getMonth() < viewDate.getMonth() || nextDay.getFullYear() < viewDate.getFullYear()) {
                onPrevMonth();
            } else if (nextDay.getMonth() > viewDate.getMonth() || nextDay.getFullYear() > viewDate.getFullYear()) {
                onNextMonth();
            }
        }
    }, [focusedDay, viewDate, isDateDisabled, handleSelectDay, onPrevMonth, onNextMonth]);

    const monthYearLabel = useMemo(() => MONTH_FORMATTER.format(viewDate), [viewDate]);

    // Build 6 rows of 7 days
    const rows = useMemo(() => {
        const result: Date[][] = [];
        for (let i = 0; i < 42; i += 7) {
            result.push(days.slice(i, i + 7));
        }
        return result;
    }, [days]);

    const focusedDayTime = focusedDay.getTime();

    return (
        <div className="datepicker__calendar" ref={ref}>
            {/* Header */}
            <div className="datepicker__cal-header">
                <button
                    type="button"
                    className="datepicker__cal-nav-btn"
                    onClick={onPrevMonth}
                    aria-label="Previous month"
                >
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"/>
                    </svg>
                </button>
                <span className="datepicker__cal-title" aria-live="polite">{monthYearLabel}</span>
                <button
                    type="button"
                    className="datepicker__cal-nav-btn"
                    onClick={onNextMonth}
                    aria-label="Next month"
                >
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </button>
            </div>

            {/* Calendar grid */}
            <div
                ref={gridRef}
                className="datepicker__cal-grid"
                role="grid"
                aria-label={monthYearLabel}
                tabIndex={0}
                onKeyDown={handleGridKeyDown}
            >
                {/* Day-of-week header row */}
                <div className="datepicker__cal-row" role="row">
                    {DAY_NAMES.map(name => (
                        <div
                            key={name}
                            className="datepicker__cal-day-header"
                            role="columnheader"
                            aria-label={name}
                        >
                            {name}
                        </div>
                    ))}
                </div>

                {/* Day rows */}
                {rows.map((week, rowIdx) => (
                    <div key={rowIdx} className="datepicker__cal-row" role="row">
                        {week.map(day => {
                            const dayNorm = stripTime(day);
                            const dayTime = dayNorm.getTime();
                            const isCurrentMonth = day.getMonth() === viewDate.getMonth();
                            const isSelected = selectedNorm !== null && dayTime === selectedNorm.getTime();
                            const isToday = dayTime === today.getTime();
                            const isDisabled = isDateDisabled(day);
                            const isFocused = dayTime === focusedDayTime;

                            return (
                                <div
                                    key={dayTime}
                                    className={clsx(
                                        'datepicker__cal-cell',
                                        !isCurrentMonth && 'is-outside',
                                        isSelected && 'is-selected',
                                        isToday && 'is-today',
                                        isDisabled && 'is-disabled',
                                        isFocused && 'is-focused'
                                    )}
                                    role="gridcell"
                                    aria-selected={isSelected}
                                    aria-disabled={isDisabled}
                                    tabIndex={isFocused ? 0 : -1}
                                    onClick={() => handleSelectDay(day)}
                                >
                                    {day.getDate()}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}));

Calendar.displayName = 'Calendar';

export default Calendar;
