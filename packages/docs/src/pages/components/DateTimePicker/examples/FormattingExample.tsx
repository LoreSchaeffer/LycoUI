import {useState} from 'react';
import {DatePicker} from '@loreschaeffer/lyco-ui';

export const title = 'Formatting & Localization';
export const description = 'Use `dateFormat` and `locale` to customize the date string presentation in the trigger. The input continues to support manual typing using OS defaults (e.g., mm/dd/yyyy in en-US).';
export const order = 5;

export const vanillaHtml = `
<div class="datepicker">
  <!-- Note: In vanilla HTML, formatting is handled purely by the developer via JS before setting the value -->
  <div class="datepicker__trigger" data-lyco-datepicker data-date-format="full" data-locale="en-US">
    <div class="datepicker__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    </div>
    <input type="text" class="datepicker__input" placeholder="Select a date..." />
  </div>
</div>
`;

export default function FormattingExample() {
    const [date, setDate] = useState<Date | null>(null);

    return (
        <div style={{maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <DatePicker
                value={date}
                onChange={setDate}
                placeholder="Full Date Format (en-US)..."
                dateFormat="full"
                locale="en-US"
            />
            <DatePicker
                value={date}
                onChange={setDate}
                placeholder="Custom Format (yyyy-MM-dd)..."
                dateFormat="yyyy-MM-dd"
            />
            <DatePicker
                value={date}
                onChange={setDate}
                placeholder="Custom Format (dd/MM/yyyy)..."
                dateFormat="dd/MM/yyyy"
            />
        </div>
    );
}
