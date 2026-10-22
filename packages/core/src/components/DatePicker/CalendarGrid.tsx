import {type KeyboardEvent} from 'react';
import type React from 'react';
import clsx from 'clsx';

export interface CalendarGridProps {
    rows: Date[][];
    dayNames: readonly string[];
    label: string;
    focusedDayTime: number;
    selectedDayTime?: number;
    todayTime: number;
    viewMonth: number;
    isDateDisabled: (day: Date) => boolean;
    onSelectDay: (day: Date) => void;
    onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
}

/** Presentational calendar grid; navigation and date arithmetic remain in Calendar. */
export function CalendarGrid({rows, dayNames, label, focusedDayTime, selectedDayTime, todayTime, viewMonth, isDateDisabled, onSelectDay, onKeyDown}: CalendarGridProps): React.ReactElement {
    return <div className="datepicker-cal-grid" role="grid" aria-label={label} tabIndex={0} onKeyDown={onKeyDown}>
        <div className="datepicker-cal-row" role="row">
            {dayNames.map((name) => <div key={name} className="datepicker-cal-day-header" role="columnheader" aria-label={name}>{name}</div>)}
        </div>
        {rows.map((week, rowIndex) => <div key={rowIndex} className="datepicker-cal-row" role="row">
            {week.map((day) => {
                const dayTime = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
                const disabled = isDateDisabled(day);
                return <div key={dayTime} className={clsx('datepicker-cal-cell', day.getMonth() !== viewMonth && 'is-outside', dayTime === selectedDayTime && 'is-selected', dayTime === todayTime && 'is-today', disabled && 'is-disabled', dayTime === focusedDayTime && 'is-focused')} role="gridcell" aria-selected={dayTime === selectedDayTime} aria-disabled={disabled} tabIndex={dayTime === focusedDayTime ? 0 : -1} onClick={() => onSelectDay(day)}>{day.getDate()}</div>;
            })}
        </div>)}
    </div>;
}
