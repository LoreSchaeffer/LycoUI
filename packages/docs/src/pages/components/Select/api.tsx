import type {PropDefinition} from '../../../components/api-reference/ApiReference';

export const selectPropsData: PropDefinition[] = [
    {
        name: 'options',
        type: 'SelectOption[]',
        description: 'Array of objects containing label, value, optional icon, and spacer flags.'
    },
    {
        name: 'value',
        type: 'string | number',
        description: 'The currently selected value (controlled state).'
    },
    {
        name: 'onChange',
        type: '(value: string | number) => void',
        description: 'Callback fired when a new option is selected.'
    },
    {
        name: 'icon',
        type: 'ReactNode',
        description: 'Default leading icon displayed when no option is selected or when the selected option lacks an icon.'
    },
    {
        name: 'variant',
        type: 'FullVariant',
        typeLink: '/docs/types#full-variant',
        defaultValue: "'primary'",
        description: 'Applies semantic colors to focus rings and active states.'
    },
    {
        name: 'size',
        type: 'SizeVariant',
        typeLink: '/docs/types#size-variant',
        defaultValue: "'md'",
        description: 'Controls the physical dimensions of the select trigger.'
    }
];

export const selectOptionPropsData: PropDefinition[] = [
    {
        name: 'label',
        type: 'string',
        description: 'The visible text for the option.'
    },
    {
        name: 'value',
        type: 'string | number',
        description: 'The underlying value of the option.'
    },
    {
        name: 'icon',
        type: 'ReactNode',
        description: 'Optional leading icon for this specific option.'
    },
    {
        name: 'variant',
        type: 'FullVariant',
        typeLink: '/docs/types#full-variant',
        description: 'Applies semantic colors to the option background and text (dim style).'
    },
    {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Prevents the option from being selected.'
    },
    {
        name: 'isSpacer',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Renders the option as a horizontal divider instead of a selectable item.'
    }
];

export const apiConfig = [
    {name: 'selectPropsData', data: selectPropsData},
    {name: 'selectOptionPropsData', data: selectOptionPropsData}
];