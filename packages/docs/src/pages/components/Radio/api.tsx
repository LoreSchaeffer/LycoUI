import type {PropDefinition} from '../../../components/api-reference/ApiReference';

export const radioPropsData: PropDefinition[] = [
    {
        name: 'label',
        type: 'ReactNode',
        description: 'Text or component to display next to the radio. Automatically wrapped in a label element.'
    },
    {
        name: 'variant',
        type: "ColorVariant | 'default'",
        defaultValue: "'primary'",
        description: 'Applies semantic colors from the global palette to the radio background and border.'
    },
    {
        name: 'size',
        type: "'sm' | 'base' | 'lg'",
        defaultValue: "'base'",
        description: 'Controls the physical dimensions of the radio and its label text.'
    }
];

export const apiConfig = [
    {name: 'radioPropsData', data: radioPropsData}
];