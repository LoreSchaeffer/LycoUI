import type {PropDefinition} from '../../../components/api-reference/ApiReference';

export const dropdownMenuPropsData: PropDefinition[] = [
    {
        name: 'children',
        type: 'React.ReactNode',
        description: 'The trigger, content, and other dropdown menu elements.'
    },
    {
        name: 'isOpen',
        type: 'boolean',
        description: 'The controlled open state of the dropdown menu.'
    },
    {
        name: 'onOpenChange',
        type: '(isOpen: boolean) => void',
        description: 'Event handler called when the open state changes.'
    }
];

export const dropdownMenuItemPropsData: PropDefinition[] = [
    {
        name: 'children',
        type: 'React.ReactNode',
        description: 'The visible content of the menu item.'
    },
    {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Prevents the item from being selected or focused.'
    },
    {
        name: 'destructive',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Styles the item to indicate a destructive action (e.g., Delete).'
    }
];

export const dropdownMenuTriggerPropsData: PropDefinition[] = [
    {
        name: 'children',
        type: 'React.ReactNode',
        description: 'The trigger content, or the element to clone when asChild is true.'
    },
    {
        name: 'asChild',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.'
    }
];

export const dropdownMenuContentPropsData: PropDefinition[] = [
    {
        name: 'children',
        type: 'React.ReactNode',
        description: 'The menu items rendered inside the portalled menu surface.'
    }
];

export const dropdownMenuSeparatorPropsData: PropDefinition[] = [];

export const dropdownMenuSubMenuPropsData: PropDefinition[] = [
    {
        name: 'title',
        type: 'React.ReactNode',
        description: 'The content of the submenu trigger.'
    },
    {
        name: 'children',
        type: 'React.ReactNode',
        description: 'The items rendered inside the submenu.'
    }
];

export const apiConfig = [
    {name: 'DropdownMenu Props', data: dropdownMenuPropsData},
    {name: 'DropdownMenuTrigger Props', data: dropdownMenuTriggerPropsData},
    {name: 'DropdownMenuItem Props', data: dropdownMenuItemPropsData},
    {name: 'DropdownMenuContent Props', data: dropdownMenuContentPropsData},
    {name: 'DropdownMenuSeparator Props', data: dropdownMenuSeparatorPropsData},
    {name: 'DropdownMenuSubMenu Props', data: dropdownMenuSubMenuPropsData}
];
