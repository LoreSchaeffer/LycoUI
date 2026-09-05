import type {PropDefinition} from '../../../components/api-reference/ApiReference';

export const switchPropsData: PropDefinition[] = [
    {
        name: 'label',
        type: 'ReactNode',
        description: 'Text or component to display next to the switch. Automatically wrapped in a label element for accessibility.'
    },
    {
        name: 'variant',
        type: 'FullVariant',
        typeLink: '/docs/types#full-variant',
        defaultValue: "'primary'",
        description: 'Applies semantic colors from the global palette to the switch background when checked.'
    },
    {
        name: 'size',
        type: 'SizeVariant',
        typeLink: '/docs/types#size-variant',
        defaultValue: "'md'",
        description: 'Controls the physical dimensions of the switch and its label text.'
    }
];

export const cssVariables: PropDefinition[] = [
    {
        name: '--switch-color-base',
        type: 'color',
        description: 'The base color of the component, injected dynamically based on the variant/color prop.'
    },
    {
        name: '--switch-color-contrast',
        type: 'color',
        description: 'The contrast color for the switch knob, calculated automatically to ensure readability against the base color.'
    }
];

export const apiConfig = [
    {
        name: 'CSS Variables',
        data: cssVariables
    },
    {name: 'SwitchProps', data: switchPropsData}
];
