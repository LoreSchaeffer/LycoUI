import {useState} from 'react';
import {DateTimePicker} from '@loreschaeffer/lyco-ui';

export const title = 'DateTimePicker (Side-by-side Layout)';
export const description = 'The DateTimePicker combines both calendar and time wheels. On desktop, it uses a side-by-side layout. On mobile, it falls back to `<input type="datetime-local">`.';
export const order = 4;

export const vanillaHtml = `
<div class="datepicker">
  <div class="datepicker__trigger" data-lyco-datetimepicker>
    <div class="datepicker__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    </div>
    <input type="datetime-local" class="datepicker__input" placeholder="Select date and time..." />
  </div>
</div>
`;

export default function DateTimePickerLayoutExample() {
    const [dateTime, setDateTime] = useState<Date | null>(null);

    return (
        <div style={{maxWidth: '300px'}}>
            <DateTimePicker
                value={dateTime}
                onChange={setDateTime}
                placeholder="Select date and time..."
                use12Hour
            />
        </div>
    );
}
