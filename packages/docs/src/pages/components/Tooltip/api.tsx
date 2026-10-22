import type {PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const tooltipProps: PropDefinition[] = [
    {
        name: 'content',
        type: 'React.ReactNode',
        defaultValue: 'undefined',
        description: 'The content to display inside the tooltip.',
    },
    {
        name: 'position',
        type: 'TooltipPosition',
        defaultValue: "'top'",
        description: 'The preferred placement of the tooltip relative to its trigger.',
    },
    {
        name: 'children',
        type: 'ReactElement',
        defaultValue: 'undefined',
        description: 'The trigger element the tooltip wraps.',
    },
    {
        name: 'offset',
        type: 'number',
        defaultValue: '8',
        description: 'Distance in pixels between the tooltip and its trigger.',
    }
];

export const apiConfig = [
    {
        name: 'Tooltip',
        data: tooltipProps
    }
];
