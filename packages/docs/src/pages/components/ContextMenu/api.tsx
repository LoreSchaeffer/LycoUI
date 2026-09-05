import type {PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const contextMenuProps: PropDefinition[] = [
    {
        name: 'id',
        type: 'string',
        defaultValue: 'undefined',
        description: 'Unique identifier for the menu item.'
    },
    {
        name: 'label',
        type: 'ReactNode',
        defaultValue: 'undefined',
        description: 'The text or content to display for the item.'
    },
    {
        name: 'icon',
        type: 'ReactNode',
        defaultValue: 'undefined',
        description: 'Optional icon to display to the left of the label.'
    },
    {
        name: 'onClick',
        type: '(e: React.MouseEvent) => void',
        defaultValue: 'undefined',
        description: 'Function to call when the item is clicked.'
    },
    {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables the item, preventing clicks and hovering.'
    },
    {
        name: 'danger',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Applies destructive styling (red text/hover) to the item.'
    },
    {
        name: 'type',
        type: "'item' | 'separator'",
        defaultValue: "'item'",
        description: 'Whether the item is a standard action or a visual separator.'
    },
    {
        name: 'submenu',
        type: 'ContextMenuItemDef[]',
        defaultValue: 'undefined',
        description: 'Array of nested items to display in a cascading submenu.'
    }
];

export const apiConfig = [
    {
        name: 'ContextMenuItemDef (Object API)',
        data: contextMenuProps
    }
];
