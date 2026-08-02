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
        type: "ColorVariant | 'default'",
        defaultValue: "'default'",
        description: 'Applies semantic colors from the global palette to the card structure.'
    },
    {
        name: 'isDim',
        type: 'boolean',
        defaultValue: 'true',
        description: 'If true, applies a transparent background. If false, applies a solid block color.'
    }
];

export const apiConfig = [
    {name: 'cardPropsData', data: cardPropsData}
];