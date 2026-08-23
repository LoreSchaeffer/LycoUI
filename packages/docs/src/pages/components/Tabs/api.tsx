import type {PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const tabsProps: PropDefinition[] = [
    {
        name: 'defaultActiveKey',
        type: 'string',
        defaultValue: "''",
        description: 'The key of the tab that should be active by default.',
    },
    {
        name: 'activeKey',
        type: 'string',
        defaultValue: 'undefined',
        description: 'The key of the active tab (controlled mode).',
    },
    {
        name: 'onChange',
        type: '(key: string) => void',
        defaultValue: 'undefined',
        description: 'Callback fired when the active tab changes.',
    }
];

export const tabTriggerProps: PropDefinition[] = [
    {
        name: 'eventKey',
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
        name: 'eventKey',
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
