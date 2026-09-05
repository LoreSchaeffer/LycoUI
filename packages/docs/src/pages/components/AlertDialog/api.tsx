import type {PropDefinition} from '../../../components/api-reference/ApiReference';

export const alertDialogProps: PropDefinition[] = [
    {
        name: 'defaultOpen',
        type: 'boolean',
        defaultValue: 'false',
        description: 'The open state of the dialog when it is initially rendered. Use when you do not need to control its open state.'
    },
    {
        name: 'open',
        type: 'boolean',
        description: 'The controlled open state of the dialog. Must be used in conjunction with onOpenChange.'
    },
    {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Event handler called when the open state of the dialog changes.'
    },
    {
        name: 'children',
        type: 'ReactNode',
        description: 'The content of the AlertDialog, including Trigger and Content.'
    }
];

export const alertDialogTriggerProps: PropDefinition[] = [
    {
        name: 'asChild',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.'
    }
];

export const alertDialogContentProps: PropDefinition[] = [
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        defaultValue: "'md'",
        description: 'Determines the max-width of the dialog.'
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes.'
    }
];

export const alertDialogActionProps: PropDefinition[] = [
    {
        name: 'asChild',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.'
    }
];

export const alertDialogCancelProps: PropDefinition[] = [
    {
        name: 'asChild',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Change the default rendered element for the one passed as a child, merging their props and behavior. This element will automatically receive focus when the dialog opens.'
    }
];

export const apiConfig = [
    {name: 'alertDialogProps', data: alertDialogProps},
    {name: 'alertDialogTriggerProps', data: alertDialogTriggerProps},
    {name: 'alertDialogContentProps', data: alertDialogContentProps},
    {name: 'alertDialogActionProps', data: alertDialogActionProps},
    {name: 'alertDialogCancelProps', data: alertDialogCancelProps}
];
