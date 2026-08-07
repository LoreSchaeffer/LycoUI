import type {PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const alertProps: PropDefinition[] = [
    {
        name: 'variant',
        type: "FullVariant | 'white'",
        typeLink: '/docs/types/full-variant',
        defaultValue: "'primary'",
        description: 'Semantic color variant of the alert. Supports all theme colors plus white.',
    },
    {
        name: 'icon',
        type: 'ReactNode',
        defaultValue: 'undefined',
        description: 'Icon displayed on the left side of the alert.',
    },
    {
        name: 'closable',
        type: 'boolean',
        defaultValue: 'false',
        description: 'If true, displays a close button in the top right corner.',
    },
    {
        name: 'duration',
        type: 'number',
        defaultValue: 'undefined',
        description: 'Duration in seconds before the alert automatically closes. Displays an animated progress bar at the bottom.',
    },
    {
        name: 'onClose',
        type: '() => void',
        defaultValue: 'undefined',
        description: 'Callback fired when the alert is closed (either manually or after the duration).',
    }
];

export const apiConfig = [
    {
        name: 'Alert',
        data: alertProps
    }
];
