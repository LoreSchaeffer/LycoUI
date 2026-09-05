import {useState} from 'react';
import {DatePicker} from '@loreschaeffer/lyco-ui';

export const title = 'Basic DatePicker';
export const description = 'A standard date picker with manual input support. On mobile devices, this automatically falls back to a native `<input type="date">` for better UX.';
export const order = 1;

export const vanillaHtml = `
<div class="datepicker">
  <div class="datepicker__trigger" data-lyco-datepicker>
    <div class="datepicker__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    </div>
    <!-- The native fallback pattern is simply using type="date" -->
    <input type="date" class="datepicker__input" placeholder="Select date..." />
  </div>
</div>
`;

export default function BasicDatePickerExample() {
    const [date, setDate] = useState<Date | null>(null);

    return (
        <div style={{maxWidth: '300px'}}>
            <DatePicker
                value={date}
                onChange={setDate}
                placeholder="Select date..."
            />
        </div>
    );
}
