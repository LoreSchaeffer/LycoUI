import {describe, expect, it} from 'vitest';
import {clampDate, formatLocalDate, parseLocalDate} from '../../packages/core/src/components/DatePicker/date-model';
import {formatTime, parseTime} from '../../packages/core/src/components/DatePicker/time-model';

describe('picker models', () => {
  it('parses valid local leap dates without UTC conversion', () => {
    const date = parseLocalDate('2024-02-29');
    expect(date && formatLocalDate(date)).toBe('2024-02-29');
    expect(parseLocalDate('2023-02-29')).toBeNull();
  });
  it('clamps date limits and handles 12-hour noon/midnight', () => {
    expect(formatLocalDate(clampDate(new Date(2024, 0, 1), new Date(2024, 0, 2)))).toBe('2024-01-02');
    expect(formatTime({hours: 0, minutes: 0}, true)).toBe('12:00 AM');
    expect(formatTime({hours: 12, minutes: 0}, true)).toBe('12:00 PM');
    expect(parseTime('24:00')).toBeNull();
    expect(parseTime('12:30 AM')).toEqual({hours: 0, minutes: 30});
    expect(parseTime('1:30 PM')).toEqual({hours: 13, minutes: 30});
  });
});
