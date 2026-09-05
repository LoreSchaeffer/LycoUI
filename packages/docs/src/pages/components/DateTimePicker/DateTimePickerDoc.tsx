import React from 'react';
import {DocTemplate} from '../../../components/DocTemplate.tsx';
import {apiConfig} from './api.tsx';

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});

const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true,
});

/**
 * Documentation page for the Date & Time Pickers suite.
 * Covers DatePicker, TimePicker, and DateTimePicker in a single consolidated page.
 */
const DateTimePickerDoc: React.FC = () => {
    return (
        <DocTemplate
            title="Date & Time Pickers"
            description={
                <p>
                    A suite of three fully accessible picker components —{' '}
                    <strong>DatePicker</strong>, <strong>TimePicker</strong>, and{' '}
                    <strong>DateTimePicker</strong> — featuring locale-aware formatting,
                    min/max constraints, keyboard navigation, and a shared CSS variable
                    theming system. Each component supports controlled usage via{' '}
                    <code>value</code> / <code>onChange</code>.
                </p>
            }
            a11yNotes={`Complex widget. Keyboard navigation allows moving between dates using arrow keys. Uses \`role="grid"\` for the calendar month and provides clear \`aria-label\`s for the previous/next month buttons.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
};

export default DateTimePickerDoc;
