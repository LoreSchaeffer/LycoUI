import type {PropDefinition} from '../../../components/api-reference/ApiReference';

// =============================================================================
// DatePicker Props
// =============================================================================
export const datePickerPropsData: PropDefinition[] = [
    {
        name: 'value',
        type: 'Date | null',
        description: 'The currently selected date (controlled). Pass null to clear the selection. The trigger acts as a text input allowing manual date typing (auto-parsed & validated).',
    },
    {
        name: 'onChange',
        type: '(date: Date | null) => void',
        description: 'Callback fired when the user selects or clears a date.',
    },
    {
        name: 'placeholder',
        type: 'string',
        defaultValue: "'Select date…'",
        description: 'Placeholder text displayed in the input when no date is selected.',
    },
    {
        name: 'variant',
        type: 'FullVariant | "default"',
        typeLink: '/docs/types#full-variant',
        defaultValue: "'primary'",
        description: 'Semantic color variant applied to focus rings, the selected day cell, and the Apply button.',
    },
    {
        name: 'size',
        type: 'SizeVariant',
        typeLink: '/docs/types#size-variant',
        defaultValue: "'md'",
        description: 'Controls the physical dimensions of the picker trigger.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'When true, the picker is non-interactive.',
    },
    {
        name: 'minDate',
        type: 'Date',
        description: 'The earliest date the user may select. Earlier dates are rendered as disabled.',
    },
    {
        name: 'maxDate',
        type: 'Date',
        description: 'The latest date the user may select. Later dates are rendered as disabled.',
    },
    {
        name: 'dateFormat',
        type: 'string',
        defaultValue: "'medium'",
        description: "Maps to Intl.DateTimeFormat's dateStyle option ('short', 'medium', etc.) or accepts custom formatting tokens (e.g. 'yyyy-MM-dd', 'dd/MM/yyyy'). Controls how the selected date is displayed in the input.",
    },
    {
        name: 'locale',
        type: 'string',
        description: "A BCP 47 locale tag (e.g. 'en-US', 'de-DE'). When omitted, the browser's locale is used.",
    },
];

// =============================================================================
// TimePicker Props
// =============================================================================
export const timePickerPropsData: PropDefinition[] = [
    {
        name: 'value',
        type: '{ hours: number; minutes: number } | null',
        description: 'The currently selected time (controlled). hours: 0–23, minutes: 0–59. The input allows manual typing (auto-parsed & validated).',
    },
    {
        name: 'onChange',
        type: '(time: { hours: number; minutes: number } | null) => void',
        description: 'Callback fired when the user selects or clears a time.',
    },
    {
        name: 'placeholder',
        type: 'string',
        defaultValue: "'Select time…'",
        description: 'Placeholder text displayed in the input when no time is selected.',
    },
    {
        name: 'use12Hour',
        type: 'boolean',
        defaultValue: 'false',
        description: 'If true, enables 12-hour format with AM/PM selection.',
    },
    {
        name: 'variant',
        type: 'FullVariant | "default"',
        typeLink: '/docs/types#full-variant',
        defaultValue: "'primary'",
        description: 'Semantic color variant applied to focus rings and selected time items.',
    },
    {
        name: 'size',
        type: 'SizeVariant',
        typeLink: '/docs/types#size-variant',
        defaultValue: "'md'",
        description: 'Controls the physical dimensions of the picker trigger.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'When true, the picker is non-interactive.',
    },
];

// =============================================================================
// DateTimePicker Props
// =============================================================================
export const dateTimePickerPropsData: PropDefinition[] = [
    {
        name: 'value',
        type: 'Date | null',
        description: 'The currently selected date and time (controlled). The input allows manual typing (auto-parsed on valid input).',
    },
    {
        name: 'onChange',
        type: '(date: Date | null) => void',
        description: 'Callback fired when the user clicks Apply or clears the value. Receives a Date with hours/minutes set, or null.',
    },
    {
        name: 'placeholder',
        type: 'string',
        defaultValue: "'Select date & time…'",
        description: 'Placeholder text displayed when no value is selected.',
    },
    {
        name: 'variant',
        type: 'FullVariant | "default"',
        typeLink: '/docs/types#full-variant',
        defaultValue: "'primary'",
        description: 'Semantic color variant.',
    },
    {
        name: 'size',
        type: 'SizeVariant',
        typeLink: '/docs/types#size-variant',
        defaultValue: "'md'",
        description: 'Controls the physical dimensions of the picker trigger.',
    },
    {
        name: 'use12Hour',
        type: 'boolean',
        description: 'If true, enables 12-hour format with AM/PM selection. If omitted, it automatically detects the system preference.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'When true, the picker is non-interactive.',
    },
    {
        name: 'minDate',
        type: 'Date',
        description: 'The earliest selectable date.',
    },
    {
        name: 'maxDate',
        type: 'Date',
        description: 'The latest selectable date.',
    },
    {
        name: 'dateFormat',
        type: 'string',
        defaultValue: "'medium'",
        description: "Controls how the date portion is displayed in the trigger. Accepts standard string ('short', 'medium') or custom tokens ('yyyy-MM-dd').",
    },
    {
        name: 'locale',
        type: 'string',
        description: "A BCP 47 locale tag. When omitted, the browser's locale is used.",
    },
];

// =============================================================================
// CSS Variables
// =============================================================================
export const cssVariablesData: PropDefinition[] = [
    {
        name: '--datepicker-color-base',
        type: 'color',
        description: 'The primary accent color for the picker. Injected automatically based on the variant prop. Used for: selected day cell background, focus rings, time item highlight, Apply button.',
    },
    {
        name: '--datepicker-color-contrast',
        type: 'color',
        description: 'The text/icon color on top of the selected state (auto-computed from the variant for maximum contrast).',
    },
];

// =============================================================================
// API Config
// =============================================================================
export const apiConfig = [
    {name: 'CSS Variables', data: cssVariablesData},
    {name: 'datePickerPropsData', data: datePickerPropsData},
    {name: 'timePickerPropsData', data: timePickerPropsData},
    {name: 'dateTimePickerPropsData', data: dateTimePickerPropsData},
];
