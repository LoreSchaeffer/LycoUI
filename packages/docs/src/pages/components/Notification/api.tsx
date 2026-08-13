import type { PropDefinition } from '../../../components/api-reference/ApiReference.tsx';

const notificationProps: PropDefinition[] = [
    {
        name: 'variant',
        type: "FullVariant | 'white'",
        typeLink: '/docs/types/full-variant',
        defaultValue: "'neutral'",
        description: 'Color variant. Semantic variants (success, warning, danger, info) auto-assign an appropriate icon.'
    },
    {
        name: 'icon',
        type: 'ReactNode',
        description: 'Custom icon. Overrides the auto-semantic icon. Pass null to suppress.'
    },
    {
        name: 'title',
        type: 'ReactNode',
        description: 'Bold heading displayed above the message body.'
    },
    {
        name: 'closable',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Shows a close button in the top-right corner.'
    },
    {
        name: 'isFlat',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Removes shadows and transparent border for a flat appearance.'
    },
    {
        name: 'duration',
        type: 'number',
        description: 'Duration in seconds. Controls the progress bar animation length.'
    },
    {
        name: 'onClose',
        type: '() => void',
        description: 'Callback fired when the close button is clicked or the notification auto-dismisses.'
    },
];

const providerProps: PropDefinition[] = [
    {
        name: 'position',
        type: "NotificationPosition",
        typeLink: '/docs/types/notification-position',
        defaultValue: "'bottom-right'",
        description: 'Screen corner where the notification stack appears. One of: top-left, top-right, bottom-left, bottom-right.'
    },
    {
        name: 'maxNotifications',
        type: 'number',
        defaultValue: '5',
        description: 'Maximum number of notifications visible simultaneously. Oldest are evicted when exceeded.'
    },
];

const notificationOptionsProps: PropDefinition[] = [
    {
        name: 'message',
        type: 'ReactNode',
        description: 'Body text of the notification. Required.'
    },
    {
        name: 'title',
        type: 'ReactNode',
        description: 'Bold heading above the message.'
    },
    {
        name: 'variant',
        type: "FullVariant | 'white'",
        typeLink: '/docs/types/full-variant',
        defaultValue: "'neutral'",
        description: 'Color variant. Semantic variants auto-assign an icon.'
    },
    {
        name: 'icon',
        type: 'ReactNode',
        description: 'Custom icon. Pass null to suppress the auto-semantic icon.'
    },
    {
        name: 'closable',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Shows a close button.'
    },
    {
        name: 'duration',
        type: "'short' | 'medium' | 'long' | number",
        defaultValue: "'short'",
        description: 'Auto-dismiss duration. Presets: short = 3s, medium = 5s, long = 8s. A number is interpreted as seconds.'
    },
    {
        name: 'isFlat',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Removes shadows and borders.'
    },
];

export const apiConfig = [
    { name: 'Notification', data: notificationProps },
    { name: 'NotificationProvider', data: providerProps },
    { name: 'useNotification (NotificationOptions)', data: notificationOptionsProps },
];
