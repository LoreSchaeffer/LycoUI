import {useState} from 'react';
import {Col, DatePicker, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Min & Max Constraints';
export const description = 'Use `minDate` and `maxDate` to restrict the selectable range. The calendar will automatically disable out-of-bounds dates and prevent navigation beyond the allowed months.';
export const order = 6;

export const vanillaHtml = `
<div class="datepicker">
  <div class="datepicker__trigger" data-lyco-datepicker data-min-date="2026-09-01" data-max-date="2026-09-30">
    <div class="datepicker__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    </div>
    <input type="text" class="datepicker__input" placeholder="Select date..." />
  </div>
</div>
`;

export default function MinMaxExample() {
    const [date, setDate] = useState<Date | null>(null);

    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Max date is 14 days from now
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 14);

    return (
        <Row>
            <Col span={12}>
                <div style={{maxWidth: '300px'}}>
                    <DatePicker
                        value={date}
                        onChange={setDate}
                        minDate={today}
                        maxDate={maxDate}
                        placeholder="Select date (next 14 days)..."
                    />
                </div>
            </Col>
        </Row>
    );
}
