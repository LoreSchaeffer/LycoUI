import type {PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const tabsProps: PropDefinition[] = [
    {
        name: 'defaultValue',
        type: 'string',
        defaultValue: "''",
        description: 'The key of the tab that should be active by default.',
    },
    {
        name: 'value',
        type: 'string',
        defaultValue: 'undefined',
        description: 'The key of the active tab (controlled mode).',
    },
    {
        name: 'color',
        type: 'SemanticVariant',
        defaultValue: "'primary'",
        description: 'Color variant for the active tab indicator.',
    },
    {
        name: 'onChange',
        type: '(value: string) => void',
        defaultValue: 'undefined',
        description: 'Callback fired when the active tab changes.',
    }
];

export const tabTriggerProps: PropDefinition[] = [
    {
        name: 'value',
        type: 'string',
        defaultValue: 'undefined',
        description: 'The unique key identifying this tab.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Whether the tab trigger is disabled.',
    }
];

export const tabContentProps: PropDefinition[] = [
    {
        name: 'value',
        type: 'string',
        defaultValue: 'undefined',
        description: 'The unique key linking this content to its trigger.',
    }
];

export const apiConfig = [
    {
        name: 'Tabs',
        data: tabsProps
    },
    {
        name: 'TabTrigger',
        data: tabTriggerProps
    },
    {
        name: 'TabContent',
        data: tabContentProps
    }
];
