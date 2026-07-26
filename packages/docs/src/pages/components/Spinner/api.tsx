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
        type: 'ColorVariant',
        defaultValue: "'primary'",
        description: 'Maps the spinner color to the global theme hues.'
    },
    {
        name: 'size',
        type: "'sm' | 'base' | 'lg'",
        defaultValue: "'base'",
        description: 'Defines the physical dimensions of the spinner.'
    },
    {
        name: '...props',
        type: 'HTMLAttributes<HTMLSpanElement>',
        description: 'Inherits all native HTML span attributes (e.g., aria-label, role).'
    }
];

export const apiConfig = [
    {name: 'spinnerPropsData', data: spinnerPropsData}
]