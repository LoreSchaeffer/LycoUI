import {useState} from 'react';
import {TimePicker} from '@loreschaeffer/lyco-ui';

export const title = 'TimePicker (24-hour)';
export const description = 'A time picker in 24-hour format. Try typing a time like "14:30" directly into the input.';
export const order = 2;

export const vanillaHtml = `
<div class="datepicker">
  <div class="datepicker__trigger" data-lyco-timepicker>
    <div class="datepicker__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    </div>
    <input type="time" class="datepicker__input" placeholder="Select time..." />
  </div>
</div>
`;

export default function TimePicker24Example() {
    const [time, setTime] = useState<{ hours: number; minutes: number } | null>(null);

    return (
        <div style={{maxWidth: '300px'}}>
            <TimePicker
                value={time}
                onChange={setTime}
                placeholder="Select time..."
            />
        </div>
    );
}
