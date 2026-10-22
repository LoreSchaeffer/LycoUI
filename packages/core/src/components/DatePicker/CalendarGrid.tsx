import React from 'react';
import {formatLocalDate} from './date-model';

export function CalendarGrid({days, selected, onSelect}: {days: Date[]; selected?: Date; onSelect: (date: Date) => void}): React.ReactElement {
  const selectedValue = selected ? formatLocalDate(selected) : undefined;
  return <div className="calendar-grid" role="grid">{days.map((day) => {
    const value = formatLocalDate(day);
    return <button key={value} type="button" role="gridcell" aria-selected={value === selectedValue} onClick={() => onSelect(day)}>{day.getDate()}</button>;
  })}</div>;
}
