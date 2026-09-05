import type {PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const carouselProps: PropDefinition[] = [
    {
        name: 'showArrows',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Whether to show the Prev/Next floating buttons.'
    },
    {
        name: 'showDots',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Whether to show the bottom pagination indicators.'
    },
    {
        name: 'gap',
        type: 'string',
        defaultValue: "'var(--spacing-4)'",
        description: 'CSS value for the space between slides.'
    },
    {
        name: 'slideWidth',
        type: 'string',
        defaultValue: "'100%'",
        description: 'CSS value for the width of each slide. Lower this value to show multiple slides at once.'
    },
    {
        name: 'centerMode',
        type: 'boolean',
        defaultValue: 'false',
        description: 'When true, the active slide is centered and adjacent slides peek from the edges. Arrows are pushed into the gutters.'
    },
    {
        name: 'infinite',
        type: 'boolean',
        defaultValue: 'false',
        description: 'When true, scrolling wraps around infinitely.'
    }
];

export const apiConfig = [
    {
        name: 'Carousel Props',
        data: carouselProps
    }
];
