import type {PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const stepperPropsData: PropDefinition[] = [
    {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        defaultValue: "'horizontal'",
        description: 'The orientation of the stepper.'
    },
    {
        name: 'activeStep',
        type: 'number',
        defaultValue: '0',
        description: 'The zero-based index of the currently active step. This determines which steps are marked as completed or active.'
    },
    {
        name: 'compact',
        type: 'boolean',
        defaultValue: 'false',
        description: 'If true, the stepper uses a significantly smaller visual footprint, suitable for tight spaces.'
    },
    {
        name: 'hideNumbers',
        type: 'boolean',
        defaultValue: 'false',
        description: 'If true, hides the default numerical index inside the step circles.'
    },
    {
        name: 'color',
        type: 'string',
        description: 'Custom theme color name (e.g. `fuchsia`, `teal`) to override the default primary color.'
    },
    {
        name: 'children',
        type: 'ReactNode',
        description: 'The `Step` components to be rendered inside the stepper.'
    }
];

export const stepPropsData: PropDefinition[] = [
    {
        name: 'title',
        type: 'ReactNode',
        description: 'The main title of the step.'
    },
    {
        name: 'description',
        type: 'ReactNode',
        description: 'An optional description providing more details about the step.'
    },
    {
        name: 'icon',
        type: 'ReactNode',
        description: 'An optional custom icon to override the default step number.'
    },
    {
        name: 'isError',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Marks the step as being in an error state, changing its visual appearance to reflect the error.'
    },
    {
        name: 'isSuccess',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Marks the step as being in a success state, applying success colors.'
    },
    {
        name: 'isWarning',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Marks the step as being in a warning state, applying warning colors.'
    },
    {
        name: 'index',
        type: 'number',
        description: 'Internal prop: the zero-based index of the step (injected automatically by Stepper).'
    },
    {
        name: 'isActive',
        type: 'boolean',
        description: 'Internal prop: indicates if the step is currently active (injected automatically by Stepper).'
    },
    {
        name: 'isCompleted',
        type: 'boolean',
        description: 'Internal prop: indicates if the step has been completed (injected automatically by Stepper).'
    },
    {
        name: 'isLast',
        type: 'boolean',
        description: 'Internal prop: indicates if the step is the last one in the list (injected automatically by Stepper).'
    }
];

export const apiConfig = [
    {name: 'Stepper Props', data: stepperPropsData},
    {name: 'Step Props', data: stepPropsData}
];
