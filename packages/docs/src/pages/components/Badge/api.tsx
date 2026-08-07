import type {PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const badgeProps: PropDefinition[] = [
    {
        name: 'variant',
        type: "FullVariant | 'white' | 'neutral'",
        typeLink: '/docs/types/full-variant',
        defaultValue: "'primary'",
        description: 'Applies a color scheme from the global theme palette.'
    },
    {
        name: 'pill',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Applies the `.badge-pill` class to make the badge fully rounded.'
    },
    {
        name: 'dim',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Applies the `.badge-dim` class to use a softer, semi-transparent background color instead of a solid color.'
    },
    {
        name: 'children',
        type: 'ReactNode',
        description: 'The content of the badge (usually text or a number).'
    }
];

export const apiConfig = [
    {
        name: 'badgeProps',
        data: badgeProps
    }
];
