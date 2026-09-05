import type {PropDefinition} from '../../../components/api-reference/ApiReference';

export const dropdownMenuPropsData: PropDefinition[] = [
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
        name: 'asChild',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.'
    }
];

export const apiConfig = [
    {name: 'DropdownMenu Props', data: dropdownMenuPropsData},
    {name: 'DropdownMenuTrigger Props', data: dropdownMenuTriggerPropsData},
    {name: 'DropdownMenuItem Props', data: dropdownMenuItemPropsData}
];
