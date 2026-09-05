import type {PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

const navbarProps: PropDefinition[] = [
    {
        name: 'variant',
        type: "'base' | 'dark' | 'light' | 'transparent' | 'FullVariant'",
        typeLink: '/docs/types/full-variant',
        defaultValue: "'base'",
        description: 'Visual color variant of the navbar.'
    },
    {
        name: 'dim',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Applies the dim (subtle) styling for color variants.'
    },
    {
        name: 'elevation',
        type: "'0' | '1' | '2' | '3' | '4'",
        defaultValue: "'1'",
        description: 'Controls the box-shadow depth of the navbar.'
    },
    {
        name: 'position',
        type: "'static' | 'sticky' | 'fixed'",
        defaultValue: "'static'",
        description: 'Position behavior. Sticky stays at the top when scrolling past it.'
    },
    {
        name: 'expand',
        type: "'sm' | 'md' | 'lg' | 'xl' | 'always' | 'never'",
        defaultValue: "'lg'",
        description: 'Breakpoint at which the navbar expands from mobile hamburger menu to full desktop menu.'
    }
];

const navbarBrandProps: PropDefinition[] = [
    {
        name: 'as',
        type: 'React.ElementType',
        defaultValue: "'a'",
        description: 'Custom component to render as (e.g., Link from react-router-dom).'
    },
    {
        name: 'centered',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Absolutely centers the brand icon within the navbar.'
    }
];

const navbarNavProps: PropDefinition[] = [
    {
        name: 'align',
        type: 'Alignment',
        defaultValue: "'start'",
        description: 'Alignment of the nav items (start, center, end).'
    }
];

const navbarLinkProps: PropDefinition[] = [
    {
        name: 'as',
        type: 'React.ElementType',
        defaultValue: "'a'",
        description: 'Custom component to render as.'
    },
    {
        name: 'active',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Whether the link is currently active.'
    }
];

export const apiConfig = [
    {name: 'Navbar', data: navbarProps},
    {name: 'Navbar.Brand', data: navbarBrandProps},
    {name: 'Navbar.Nav', data: navbarNavProps},
    {name: 'Navbar.Link', data: navbarLinkProps}
];
