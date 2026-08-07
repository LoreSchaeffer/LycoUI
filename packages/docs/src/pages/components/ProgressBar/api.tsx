import type {PropDefinition} from '../../../components/api-reference/ApiReference';

export const progressBarProps: PropDefinition[] = [
    {
        name: 'value',
        type: 'number',
        defaultValue: '0',
        description: 'The current progress value.',
    },
    {
        name: 'max',
        type: 'number',
        defaultValue: '100',
        description: 'The maximum progress value.',
    },
    {
        name: 'variant',
        type: 'FullVariant',
        typeLink: '/docs/custom-types#fullvariant',
        defaultValue: "'primary'",
        description: 'The color variant of the progress bar.',
    },
    {
        name: 'size',
        type: 'SizeVariant',
        typeLink: '/docs/custom-types#sizevariant',
        defaultValue: "'md'",
        description: 'The size of the progress bar.',
    },
];

export const apiConfig = [
    {
        name: 'progressBarProps',
        data: progressBarProps,
    }
];
