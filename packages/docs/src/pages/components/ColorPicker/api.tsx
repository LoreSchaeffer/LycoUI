import type {PropDefinition} from '../../../components/api-reference/ApiReference';

export const colorPickerProps: PropDefinition[] = [
    {
        name: 'value',
        type: 'string',
        description: 'Controlled color value. Accepts six-digit HEX or rgb(r, g, b); the displayed value is normalized to uppercase #RRGGBB.',
    },
    {
        name: 'defaultValue',
        type: 'string',
        defaultValue: "'#000000'",
        description: 'Initial color when the picker is uncontrolled.',
    },
    {
        name: 'onChange',
        type: '(value: string) => void',
        description: 'Called with the selected color as uppercase #RRGGBB.',
    },
    {
        name: 'swatches',
        type: 'string[]',
        description: 'Preset colors shown in the dialog. Omitting this prop uses the default palette.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables text editing and opening the color dialog.',
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional class name on the root element.',
    },
    {
        name: '...props',
        type: 'HTMLAttributes<HTMLDivElement>',
        description: 'Standard div attributes passed to the root element.',
    },
];

export const apiConfig = [{name: 'colorPickerProps', data: colorPickerProps}];
