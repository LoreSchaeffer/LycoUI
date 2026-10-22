import type {PropDefinition} from '../../../components/api-reference/ApiReference';

export const cardPropsData: PropDefinition[] = [
    {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Content rendered inside the card.'
    },
    {
        name: 'elevation',
        type: 'CardElevation',
        typeLink: '/docs/types#card-elevation',
        defaultValue: '1',
        description: <>Controls the shadow depth and background lightness. Applies <code>.card--elevation-*</code>.</>
    },
    {
        name: 'padding',
        type: 'CardPadding',
        typeLink: '/docs/types#card-padding',
        defaultValue: "'none'",
        description: 'Controls the internal spacing of the main card container (useful if not using compound sections).'
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
        description: 'Strips shadows and background gradients for a clean flat appearance. Applies .card--flat class.'
    },
    {
        name: 'flat',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Renders without elevation.'
    },
    {
        name: 'interactive',
        type: 'boolean',
        defaultValue: 'false',
        description: 'If true, hovering the card smoothly elevates it and intensifies its border. Applies .card--interactive class.'
    }
];

export const cardSectionPropsData: PropDefinition[] = [
    {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Content to be rendered inside the section.'
    },
    {
        name: 'className',
        type: 'string',
        description: 'Optional additional CSS classes.'
    }
];

export const apiConfig = [
    {name: 'Card Props', data: cardPropsData},
    {name: 'Card.Header / Card.Body / Card.Footer Props', data: cardSectionPropsData}
];
