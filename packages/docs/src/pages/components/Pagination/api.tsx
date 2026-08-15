import type {ApiConfig, PropDefinition} from "../../../types.ts";

const paginationProps: PropDefinition[] = [
    {
        name: 'currentPage',
        type: 'number',
        required: true,
        description: 'The current active page.'
    },
    {
        name: 'totalPages',
        type: 'number',
        required: true,
        description: 'The total number of pages.'
    },
    {
        name: 'variant',
        type: "'standard' | 'compact'",
        defaultValue: "'standard'",
        description: 'Visual style variant of the pagination.'
    },
    {
        name: 'onPageChange',
        type: '(page: number) => void',
        description: 'Callback fired when the user changes the page.'
    },
    {
        name: 'colorVariant',
        type: 'FullVariant',
        typeLink: '/docs/types/full-variant',
        defaultValue: "'primary'",
        description: 'Applies a color scheme from the global theme palette.'
    },
    {
        name: 'size',
        type: 'SizeVariant',
        typeLink: '/docs/types/size-variant',
        defaultValue: "'md'",
        description: 'The size of the pagination buttons.'
    },
    {
        name: 'siblingCount',
        type: 'number',
        defaultValue: '1',
        description: 'The number of sibling pages to show before and after the current page in the standard variant.'
    },
    {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'If true, disables the pagination component.'
    }
];

export const apiConfig: ApiConfig = [
    {
        name: 'PaginationProps',
        data: paginationProps
    }
];
