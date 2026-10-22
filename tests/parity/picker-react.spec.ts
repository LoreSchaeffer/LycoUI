import {expect, test} from '@playwright/test';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {PickerTrigger} from '../../packages/core/src/components/DatePicker/PickerTrigger.tsx';

test('shared picker trigger has the focused React contract', () => {
    const html = renderToStaticMarkup(createElement(PickerTrigger, {open: false, onClick: () => undefined, children: 'Select date'}));
    expect(html).toContain('class="picker-trigger"');
    expect(html).toContain('aria-haspopup="dialog"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('Select date');
});
