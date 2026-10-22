import type {PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const tableProps: PropDefinition[] = [
    {
        name: 'variant',
        type: 'FullVariant',
        typeLink: '/docs/custom-types/full-variant',
        description: 'Applies a contextual color variant to the entire table.',
    },
    {
        name: 'striped',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Adds zebra-striping to any table row within the tbody.',
    },
    {
        name: 'hover',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Enables a hover state on table rows within a tbody.',
    },
    {
        name: 'bordered',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Adds borders on all sides of the table and cells.',
    },
    {
        name: 'borderless',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Removes all borders from the table and cells.',
    },
    {
        name: 'size',
        type: "'sm' | 'md'",
        defaultValue: "'md'",
        description: 'Makes the table more compact by cutting cell padding in half.',
    },
];

export const tableRowProps: PropDefinition[] = [
    {
        name: 'variant',
        type: 'FullVariant',
        typeLink: '/docs/custom-types/full-variant',
        description: 'Applies a contextual color variant to the row.',
    },
    {
        name: 'hover',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Enables hover styling on the row.',
    }
];

export const tableCellProps: PropDefinition[] = [
    {
        name: 'variant',
        type: 'FullVariant',
        typeLink: '/docs/custom-types/full-variant',
        description: 'Applies a contextual color variant to the cell.',
    },
    {
        name: 'isHeader',
        type: 'boolean',
        defaultValue: 'false',
        description: 'If true, renders as a <th> instead of a <td>.',
    },
    {
        name: 'as',
        type: "'td' | 'th'",
        description: 'Explicitly sets the underlying HTML element.',
    },
    {
        name: 'scope',
        type: 'string',
        description: 'Explicitly sets the table-cell scope attribute.',
    }
];

export const apiConfig = [
    {name: 'Table', data: tableProps},
    {name: 'TableRow', data: tableRowProps},
    {name: 'TableCell', data: tableCellProps}
];
