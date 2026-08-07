import type {PropDefinition} from '../../../components/api-reference/ApiReference';

export const rangeProps: PropDefinition[] = [
    {
        name: 'value',
        type: 'number',
        description: 'The current value of the range slider. Use for controlled components.',
    },
    {
        name: 'defaultValue',
        type: 'number',
        description: 'The default value of the range slider. Use for uncontrolled components.',
    },
    {
        name: 'min',
        type: 'number',
        defaultValue: '0',
        description: 'The minimum allowed value.',
    },
    {
        name: 'max',
        type: 'number',
        defaultValue: '100',
        description: 'The maximum allowed value.',
    },
    {
        name: 'step',
        type: 'number',
        defaultValue: '1',
        description: 'The stepping interval.',
    },
    {
        name: 'variant',
        type: 'FullVariant',
        typeLink: '/docs/custom-types#fullvariant',
        defaultValue: "'primary'",
        description: 'The color variant of the range slider.',
    },
    {
        name: 'size',
        type: 'SizeVariant',
        typeLink: '/docs/custom-types#sizevariant',
        defaultValue: "'md'",
        description: 'The size of the range slider.',
    },
    {
        name: 'tooltipFormatter',
        type: '(value: number) => React.ReactNode',
        description: 'A function to format the value displayed in the droplet tooltip.',
    },
    {
        name: 'showTooltip',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Toggles the visibility of the droplet tooltip.',
    },
    {
        name: 'tooltipSize',
        type: 'SizeVariant',
        typeLink: '/docs/types/size-variant',
        defaultValue: "'md'",
        description: 'Applies a sizing variant to the tooltip droplet.',
    },
    {
        name: 'filled',
        type: 'boolean',
        defaultValue: 'true',
        description: 'If true, the track before the thumb will be filled with the variant color.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables the input.',
    },
];

export const apiConfig = [
    {
        name: 'rangeProps',
        data: rangeProps,
    }
];
