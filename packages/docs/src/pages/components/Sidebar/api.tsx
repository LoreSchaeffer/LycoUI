import type {PropDefinition} from '../../../components/api-reference/ApiReference.tsx';

export const sidebarProps: PropDefinition[] = [
    {
        name: 'isOpen',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Controls whether the sidebar is open. Mainly used for the overlay variant.'
    },
    {
        name: 'isMini',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Toggles the mini (icon-only) state of the sidebar.'
    },
    {
        name: 'miniIconScale',
        type: 'number',
        defaultValue: '1',
        description: 'Scale multiplier applied via CSS transform to sidebar icons when in mini mode (e.g. 1.25 for 125% zoom).'
    },
    {
        name: 'resizable',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Enables a drag handle to resize the sidebar width.'
    },
    {
        name: 'variant',
        type: "'fixed' | 'overlay' | 'push'",
        defaultValue: "'fixed'",
        description: 'Defines how the sidebar interacts with the page layout.'
    },
    {
        name: 'defaultWidth',
        type: 'number',
        defaultValue: '256',
        description: 'Initial width in pixels (only applies when resizable is true).'
    },
    {
        name: 'minWidth',
        type: 'number',
        defaultValue: '200',
        description: 'Minimum width constraint when resizing.'
    },
    {
        name: 'maxWidth',
        type: 'number',
        defaultValue: '400',
        description: 'Maximum width constraint when resizing.'
    },
    {
        name: 'onClose',
        type: '() => void',
        description: 'Callback fired when the backdrop is clicked (in overlay mode).'
    }
];

export const sidebarLinkProps: PropDefinition[] = [
    {
        name: 'icon',
        type: 'React.ReactNode',
        description: 'Optional icon to display next to the label. If not provided, initials are auto-generated from the label text.'
    },
    {
        name: 'active',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Highlights the link to indicate the current page or selection.'
    },
    {
        name: 'as',
        type: 'React.ElementType',
        defaultValue: "'a'",
        description: 'Custom component to render as (e.g., Link from react-router-dom).'
    }
];

export const sidebarIconProps: PropDefinition[] = [
    {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Icon element, SVG, or character to render inside the icon container.'
    }
];

export const sidebarLabelProps: PropDefinition[] = [
    {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Text or node to render as the sidebar item label.'
    }
];

export const sidebarDropdownItemProps: PropDefinition[] = [
    {
        name: 'as',
        type: 'React.ElementType',
        defaultValue: "'a'",
        description: 'Custom component to render as (e.g., Link from react-router-dom).'
    },
    {
        name: 'active',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Highlights the item to indicate active/current state.'
    },
    {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables the dropdown item, preventing user interaction.'
    },
    {
        name: 'variant',
        type: "'default' | 'primary' | 'success' | 'warning' | 'danger'",
        defaultValue: "'default'",
        description: 'Visual intent and color variant of the dropdown item.'
    }
];

export const apiConfig = [
    {name: 'Sidebar', data: sidebarProps},
    {name: 'Sidebar.Link', data: sidebarLinkProps},
    {name: 'Sidebar.Icon', data: sidebarIconProps},
    {name: 'Sidebar.Label', data: sidebarLabelProps},
    {name: 'Sidebar.DropdownItem', data: sidebarDropdownItemProps}
];
