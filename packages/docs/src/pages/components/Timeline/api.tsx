import type {PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const timelinePropsData: PropDefinition[] = [
    {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        defaultValue: "'vertical'",
        description: 'The orientation of the timeline.'
    },
    {
        name: 'align',
        type: "'left' | 'right' | 'alternate'",
        defaultValue: "'left'",
        description: 'The alignment of the timeline items. "alternate" only applies to the vertical orientation, creating a zigzag layout.'
    },
    {
        name: 'children',
        type: 'ReactNode',
        description: 'The `TimelineItem` components to be rendered inside the timeline.'
    }
];

export const timelineItemPropsData: PropDefinition[] = [
    {
        name: 'title',
        type: 'ReactNode',
        description: 'The main title or content of the timeline event.'
    },
    {
        name: 'time',
        type: 'ReactNode',
        description: 'An optional timestamp or date for the event.'
    },
    {
        name: 'icon',
        type: 'ReactNode',
        description: 'An optional custom icon to override the default circular indicator.'
    },
    {
        name: 'color',
        type: 'string',
        description: 'Custom theme color name (e.g. `success`, `danger`) to override the default primary color for this specific item.'
    }
];

export const apiConfig = [
    {name: 'Timeline Props', data: timelinePropsData},
    {name: 'TimelineItem Props', data: timelineItemPropsData}
];
