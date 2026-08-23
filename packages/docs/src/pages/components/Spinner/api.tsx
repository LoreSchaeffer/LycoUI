import type {PropDefinition} from '../../../components/api-reference/ApiReference';

export const spinnerPropsData: PropDefinition[] = [
    {
        name: 'type',
        type: "'classic' | 'growing'",
        defaultValue: "'classic'",
        description: 'Defines the visual animation style of the spinner.'
    },
    {
        name: 'variant',
        type: 'FullVariant',
        typeLink: '/docs/types#full-variant',
        defaultValue: "'primary'",
        description: 'Maps the spinner color to the global theme hues (e.g., amber, lime, fuchsia) or semantic variants.'
    },
    {
        name: 'size',
        type: 'SizeVariant',
        typeLink: '/docs/types#size-variant',
        defaultValue: "'md'",
        description: 'Defines the physical dimensions of the spinner.'
    }
];

export const apiConfig = [
    {name: 'spinnerPropsData', data: spinnerPropsData}
]