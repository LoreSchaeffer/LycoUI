import type {PropDefinition} from '../../../components/api-reference/ApiReference';

export const checkboxPropsData: PropDefinition[] = [
    {
        name: 'label',
        type: 'ReactNode',
        description: 'Text or component to display next to the checkbox. Automatically wrapped in a label element for accessibility.'
    },
    {
        name: 'variant',
        type: "ColorVariant | 'default'",
        defaultValue: "'primary'",
        description: 'Applies semantic colors from the global palette to the checkbox background and border.'
    },
    {
        name: 'size',
        type: "'sm' | 'base' | 'lg'",
        defaultValue: "'base'",
        description: 'Controls the physical dimensions of the checkbox and its label text.'
    }
];

export const apiConfig = [
    {name: 'checkboxPropsData', data: checkboxPropsData}
];