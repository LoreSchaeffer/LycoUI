import type {PropDefinition} from "../../../components/api-reference/ApiReference";

export const snackbarOptionsProps: PropDefinition[] = [
    {
        name: 'message',
        type: 'ReactNode | string',
        description: 'The content of the Snackbar.'
    },
    {
        name: 'variant',
        type: 'FullVariant',
        typeLink: '/docs/types/full-variant',
        defaultValue: "'secondary'",
        description: 'Applies a semantic or color variant style.'
    },
    {
        name: 'icon',
        type: 'ReactNode',
        description: 'An optional icon to display before the message.'
    },
    {
        name: 'closable',
        type: 'boolean',
        defaultValue: 'false',
        description: 'If true, shows a close button.'
    },
    {
        name: 'duration',
        type: 'SnackbarDuration',
        typeLink: '/docs/types/snackbar-duration',
        defaultValue: "'short'",
        description: "The time before auto-dismissal ('short', 'medium', 'long', or number in seconds)."
    },
    {
        name: 'isFlat',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Removes the box-shadow for a flat appearance.'
    }
];

export const useSnackbarApi: PropDefinition[] = [
    {
        name: 'showSnackbar',
        type: '(options: SnackbarOptions) => string',
        description: 'Displays a new Snackbar and returns its unique ID.'
    },
    {
        name: 'closeSnackbar',
        type: '(id: string) => void',
        description: 'Imperatively closes a specific Snackbar by ID.'
    }
];

export const apiConfig = [
    {
        name: 'SnackbarOptions',
        data: snackbarOptionsProps
    },
    {
        name: 'useSnackbar',
        data: useSnackbarApi
    }
];
