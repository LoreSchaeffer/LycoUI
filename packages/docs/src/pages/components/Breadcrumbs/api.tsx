import type {PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const breadcrumbsPropsData: PropDefinition[] = [
    {
        name: 'children',
        type: 'ReactNode',
        description: 'The breadcrumb items and separators to be rendered inside the `<nav>` element.'
    }
];

export const breadcrumbItemPropsData: PropDefinition[] = [
    {
        name: 'children',
        type: 'ReactNode',
        description: 'The content of the breadcrumb item, usually an `<a>` or `<span>` tag.'
    },
    {
        name: 'isCurrentPage',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Marks the item as the current page, applying the `aria-current="page"` attribute and active styles.'
    }
];

export const breadcrumbSeparatorPropsData: PropDefinition[] = [
    {
        name: 'children',
        type: 'ReactNode',
        defaultValue: "'/'",
        description: 'Custom separator content. Defaults to a slash.'
    }
];

export const apiConfig = [
    {name: 'Breadcrumbs Props', data: breadcrumbsPropsData},
    {name: 'BreadcrumbItem Props', data: breadcrumbItemPropsData},
    {name: 'BreadcrumbSeparator Props', data: breadcrumbSeparatorPropsData}
];
