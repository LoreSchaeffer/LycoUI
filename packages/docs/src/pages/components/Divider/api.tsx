import type {PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const dividerProps: PropDefinition[] = [
    {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        defaultValue: "'horizontal'",
        description: 'The orientation of the divider.'
    },
    {
        name: 'spacing',
        type: "'none' | 'sm' | 'md' | 'lg'",
        defaultValue: "'md'",
        description: 'Determines the margin around the line (top/bottom for horizontal, left/right for vertical).'
    },
    {
        name: 'length',
        type: "'sm' | 'md' | 'lg' | 'full'",
        defaultValue: "'full'",
        description: 'Determines the size of the line itself (e.g., sm = 50%, md = 75%, lg = 98%, full = 100%).'
    },
    {
        name: 'color',
        type: 'string',
        defaultValue: "'undefined'",
        description: 'Custom color for the divider. Overrides the default border color.'
    },
    {
        name: 'thickness',
        type: 'string | number',
        defaultValue: "'1px'",
        description: 'Thickness of the divider (height for horizontal, width for vertical).'
    }
];

export const apiConfig = [
    {
        name: 'Divider Props',
        data: dividerProps
    }
];
