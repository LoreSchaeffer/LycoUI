import type {PropDefinition} from '../../../components/api-reference/ApiReference';

export const inputProps: PropDefinition[] = [
    {
        name: 'type',
        type: "'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url'",
        defaultValue: "'text'",
        description: 'The HTML input type.',
    },
    {
        name: 'variant',
        type: 'FullVariant',
        typeLink: '/docs/custom-types#fullvariant',
        defaultValue: "'primary'",
        description: 'Color variant applied on focus and accent elements.',
    },
    {
        name: 'size',
        type: 'SizeVariant',
        typeLink: '/docs/custom-types#sizevariant',
        defaultValue: "'md'",
        description: 'Controls the height, padding, and font size of the input.',
    },
    {
        name: 'label',
        type: 'string',
        description: 'Text for the floating label. When provided, the label animates above the field on focus or when a value is present.',
    },
    {
        name: 'iconStart',
        type: 'ReactNode',
        description: 'Icon displayed on the left side of the input.',
    },
    {
        name: 'iconEnd',
        type: 'ReactNode',
        description: 'Icon displayed on the right side of the input.',
    },
    {
        name: 'onIconStartClick',
        type: '() => void',
        description: 'If provided, renders the start icon as a clickable button.',
    },
    {
        name: 'onIconEndClick',
        type: '() => void',
        description: 'If provided, renders the end icon as a clickable button.',
    },
    {
        name: 'loading',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Displays a spinner in place of an icon. Follows the same placement logic as Button.',
    },
    {
        name: 'spinnerType',
        type: "'classic' | 'growing'",
        defaultValue: "'classic'",
        description: 'Type of spinner animation when loading is true.',
    },
    {
        name: 'spinnerPlacement',
        type: "'start' | 'end'",
        defaultValue: "'end'",
        description: 'Where to place the spinner when loading is true.',
    },
    {
        name: 'validation',
        type: "'disabled' | 'auto' | 'valid' | 'invalid'",
        defaultValue: "'disabled'",
        description: "Controls validation behavior. 'disabled' = no validation. 'auto' = validates on blur using native constraints and validationFn. 'valid'/'invalid' = manual override.",
    },
    {
        name: 'validationFn',
        type: '(value: string) => string | null',
        description: "Custom validation function. Returns null if valid, or an error message string. Only used when validation='auto'.",
    },
    {
        name: 'validationMessage',
        type: 'string',
        description: 'Custom message displayed below the input. Overrides auto-generated validation messages.',
    },
    {
        name: 'showStepButtons',
        type: 'boolean',
        defaultValue: 'true',
        description: "For type='number' only. Shows increment/decrement step buttons on the right side of the input.",
    },
    {
        name: 'flat',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Removes shadows and gradients for a minimal flat appearance.',
    },
];

export const apiConfig = [
    {
        name: 'inputProps',
        data: inputProps,
    }
];
