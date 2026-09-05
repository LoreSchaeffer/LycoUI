import type {PropDefinition} from '../../../components/api-reference/ApiReference';

export const textareaProps: PropDefinition[] = [
    {
        name: 'variant',
        type: 'FullVariant',
        defaultValue: "'primary'",
        description: 'The semantic color variant of the textarea.'
    },
    {
        name: 'size',
        type: 'SizeVariant',
        defaultValue: "'md'",
        description: "The size of the textarea ('sm', 'md', 'lg')."
    },
    {
        name: 'label',
        type: 'string',
        description: 'Label text for the textarea. Floats up when the textarea has a value or is focused.'
    },
    {
        name: 'validation',
        type: "'disabled' | 'auto' | 'valid' | 'invalid'",
        defaultValue: "'disabled'",
        description: 'The validation state of the textarea.'
    },
    {
        name: 'validationFn',
        type: '(value: string) => string | null',
        description: 'A custom validation function that returns an error message string or null. Called when validation is "auto".'
    },
    {
        name: 'validationMessage',
        type: 'string',
        description: 'A static validation message to display.'
    },
    {
        name: 'flat',
        type: 'boolean',
        defaultValue: 'false',
        description: 'If true, renders a flat version of the textarea without borders.'
    },
    {
        name: 'resize',
        type: "'none' | 'vertical' | 'horizontal' | 'both'",
        defaultValue: "'both'",
        description: 'Controls the resizability of the textarea.'
    },
    {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'If true, the textarea is disabled.'
    },
    {
        name: 'readOnly',
        type: 'boolean',
        defaultValue: 'false',
        description: 'If true, the textarea is read-only.'
    }
];

export const cssVariables: PropDefinition[] = [
    {
        name: '--textarea-color-base',
        type: 'color',
        description: 'The primary semantic color of the textarea for borders and focus rings.'
    },
    {
        name: '--textarea-min-height',
        type: 'length',
        description: 'The minimum height of the textarea field.'
    },
    {
        name: '--textarea-radius',
        type: 'length',
        description: 'The border radius of the textarea.'
    }
];

export const apiConfig = [
    {
        name: 'CSS Variables',
        data: cssVariables
    },
    {
        name: 'TextareaProps',
        data: textareaProps
    }
];
