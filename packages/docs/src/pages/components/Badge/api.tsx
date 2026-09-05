import type {PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const badgeProps: PropDefinition[] = [
    {
        name: 'variant',
        type: "FullVariant | 'white' | 'secondary'",
        typeLink: '/docs/types#full-variant',
        defaultValue: "'primary'",
        description: 'The visual style of the badge, mapping to the global theme hues (e.g., amber, lime, fuchsia) or semantic variants.'
    },
    {
        name: 'pill',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Use fully rounded borders for a pill-like appearance.'
    },
    {
        name: 'dim',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Applies the dim architecture: a highly transparent background with a subtle 1px border and vibrant text, perfect for low-emphasis metadata.'
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
