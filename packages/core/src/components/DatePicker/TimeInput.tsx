import {forwardRef, type KeyboardEvent, memo, useCallback, useEffect, useRef} from 'react';
import clsx from 'clsx';

/** Internal props for the TimeInput sub-component. Not exported publicly. */
/**
 * Props for the TimeInput component.
 */
export interface TimeInputProps {
    /** Current hour value (0–23). */
    hours: number;
    /** Current minute value (0–59). */
    minutes: number;
    /** CSS variable value for the active/selected color. */
    colorBase: string;
    /** Called when the user selects a new time. */
    onChange: (hours: number, minutes: number) => void;
    /** Whether to display 12-hour format with AM/PM column. */
    use12Hour?: boolean;
}

const HOURS_24 = Array.from({length: 24}, (_, i) => i);
const HOURS_12 = Array.from({length: 12}, (_, i) => (i === 0 ? 12 : i)); // 12, 1, 2...11
const MINUTES = Array.from({length: 60}, (_, i) => i);
const AMPM = ['AM', 'PM'] as const;

const pad2 = (n: number): string => String(n).padStart(2, '0');

/**
 * Internal time input component showing scrollable columns for hours and minutes.
 * Uses `role="listbox"` / `role="option"` for accessibility.
 * Wrapped in `React.memo` to prevent unnecessary re-renders.
 */
const TimeInput = memo(forwardRef<HTMLDivElement, TimeInputProps>(function TimeInput(
    {hours, minutes, onChange, use12Hour = false},
    ref
) {
    const hoursRef = useRef<HTMLDivElement>(null);
    const minutesRef = useRef<HTMLDivElement>(null);
    const ampmRef = useRef<HTMLDivElement>(null);

    const isPM = hours >= 12;
    const currentAmPm = isPM ? 'PM' : 'AM';
    const displayHour = use12Hour ? (hours % 12 || 12) : hours;
    const hourOptions = use12Hour ? HOURS_12 : HOURS_24;

    // Scroll selected item into center of the column
    const scrollToSelected = useCallback((colRef: React.RefObject<HTMLDivElement | null>, selector: string) => {
        const col = colRef.current;
        if (!col) return;
        const target = col.querySelector(selector) as HTMLElement | null;
        if (target) {
            const colHeight = col.clientHeight;
            const itemTop = target.offsetTop;
            const itemHeight = target.clientHeight;
            col.scrollTop = itemTop - colHeight / 2 + itemHeight / 2;
        }
    }, []);

    useEffect(() => {
        scrollToSelected(hoursRef, '.is-selected');
    }, [displayHour, scrollToSelected, use12Hour]);

    useEffect(() => {
        scrollToSelected(minutesRef, '.is-selected');
    }, [minutes, scrollToSelected]);

    useEffect(() => {
        if (use12Hour) {
            scrollToSelected(ampmRef, '.is-selected');
        }
    }, [currentAmPm, scrollToSelected, use12Hour]);

    const handleHourClick = useCallback((h: number) => {
        let newHours = h;
        if (use12Hour) {
            if (h === 12) newHours = isPM ? 12 : 0;
            else newHours = isPM ? h + 12 : h;
        }
        onChange(newHours, minutes);
    }, [isPM, minutes, onChange, use12Hour]);

    const handleMinuteClick = useCallback((m: number) => {
        onChange(hours, m);
    }, [hours, onChange]);

    const handleAmPmClick = useCallback((val: 'AM' | 'PM') => {
        if (val === currentAmPm) return;
        const newHours = val === 'PM' ? hours + 12 : hours - 12;
        onChange(newHours, minutes);
    }, [currentAmPm, hours, minutes, onChange]);

    const handleHourKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            let nextH = use12Hour ? displayHour - 1 : hours - 1;
            if (use12Hour && nextH === 0) nextH = 12;
            if (!use12Hour && nextH < 0) nextH = 23;
            handleHourClick(nextH);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            let nextH = use12Hour ? displayHour + 1 : hours + 1;
            if (use12Hour && nextH > 12) nextH = 1;
            if (!use12Hour && nextH > 23) nextH = 0;
            handleHourClick(nextH);
        }
    }, [displayHour, hours, handleHourClick, use12Hour]);

    const handleMinuteKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            onChange(hours, (minutes - 1 + 60) % 60);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            onChange(hours, (minutes + 1) % 60);
        }
    }, [hours, minutes, onChange]);

    const handleAmPmKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            handleAmPmClick(currentAmPm === 'AM' ? 'PM' : 'AM');
        }
    }, [currentAmPm, handleAmPmClick]);

    return (
        <div className="datepicker__time" ref={ref}>
            <span className="datepicker__time-label">Time</span>
            <div className="datepicker__time-columns">
                {/* Hours column */}
                <div
                    ref={hoursRef}
                    className="datepicker__time-col"
                    role="listbox"
                    aria-label="Hours"
                    tabIndex={0}
                    onKeyDown={handleHourKeyDown}
                >
                    {hourOptions.map(h => (
                        <div
                            key={h}
                            className={clsx('datepicker__time-item', h === displayHour && 'is-selected')}
                            role="option"
                            aria-selected={h === displayHour}
                            onClick={() => handleHourClick(h)}
                        >
                            {pad2(h)}
                        </div>
                    ))}
                </div>

                <span className="datepicker__time-separator" aria-hidden="true">:</span>

                {/* Minutes column */}
                <div
                    ref={minutesRef}
                    className="datepicker__time-col"
                    role="listbox"
                    aria-label="Minutes"
                    tabIndex={0}
                    onKeyDown={handleMinuteKeyDown}
                >
                    {MINUTES.map(m => (
                        <div
                            key={m}
                            className={clsx('datepicker__time-item', m === minutes && 'is-selected')}
                            role="option"
                            aria-selected={m === minutes}
                            onClick={() => handleMinuteClick(m)}
                        >
                            {pad2(m)}
                        </div>
                    ))}
                </div>

                {/* AM/PM column */}
                {use12Hour && (
                    <div
                        ref={ampmRef}
                        className="datepicker__time-col"
                        role="listbox"
                        aria-label="AM/PM"
                        tabIndex={0}
                        onKeyDown={handleAmPmKeyDown}
                        style={{flex: 0.8}} // slightly smaller
                    >
                        {AMPM.map(val => (
                            <div
                                key={val}
                                className={clsx('datepicker__time-item', val === currentAmPm && 'is-selected')}
                                role="option"
                                aria-selected={val === currentAmPm}
                                onClick={() => handleAmPmClick(val)}
                            >
                                {val}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}));

TimeInput.displayName = 'TimeInput';

export default TimeInput;
