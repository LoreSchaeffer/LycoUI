import type {PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const treeViewApi: PropDefinition[] = [
    {
        name: 'selectedId',
        type: 'string',
        description: 'The ID of the currently selected item (controlled).'
    },
    {
        name: 'onSelect',
        type: '(id: string) => void',
        description: 'Callback fired when an item is selected.'
    }
];

export const treeItemApi: PropDefinition[] = [
    {
        name: 'id',
        type: 'string',

        description: 'Unique identifier for the item.'
    },
    {
        name: 'label',
        type: 'ReactNode',

        description: 'The label to display for the item.'
    },
    {
        name: 'icon',
        type: 'ReactNode',
        description: 'Optional custom icon. If undefined, a default chevron is used if it has children.'
    },
    {
        name: 'defaultExpanded',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Whether the item is expanded by default (uncontrolled).'
    },
    {
        name: 'expanded',
        type: 'boolean',
        description: 'Whether the item is currently expanded (controlled).'
    },
    {
        name: 'onToggle',
        type: '(expanded: boolean) => void',
        description: 'Callback fired when expansion state changes.'
    }
];

export const apiConfig = [
    {name: 'TreeView Props', data: treeViewApi},
    {name: 'TreeItem Props', data: treeItemApi}
];
