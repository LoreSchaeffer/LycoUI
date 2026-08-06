import type {PropDefinition} from '../../../components/api-reference/ApiReference';

export const cardPropsData: PropDefinition[] = [
    {
        name: 'elevation',
        type: '0 | 1 | 2 | 3 | 4',
        defaultValue: '1',
        description: <>Controls the shadow depth and background lightness. Applies <code>.card-elevation-*</code>.</>
    },
    {
        name: 'padding',
        type: "'none' | 'sm' | 'md' | 'lg'",
        defaultValue: "'md'",
        description: 'Controls the internal spacing of the card container.'
    },
    {
        name: 'variant',
        type: "FullVariant | 'default'",
        typeLink: '/docs/types#full-variant',
        defaultValue: "'default'",
        description: 'Applies semantic or palette colors from the global theme to the card structure.'
    },
    {
        name: 'isDim',
        type: 'boolean',
        defaultValue: 'true',
        description: 'If true, applies a transparent background tint. If false, applies a solid block color with automatic text contrast.'
    },
    {
        name: 'isFlat',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Strips shadows and background gradients for a clean flat appearance. Applies .card-flat class.'
    }
];

export const apiConfig = [
    {name: 'cardPropsData', data: cardPropsData}
];