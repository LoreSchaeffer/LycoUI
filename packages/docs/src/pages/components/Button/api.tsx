import type {PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const buttonPropsData: PropDefinition[] = [
    {
        name: 'children',
        type: 'React.ReactNode',
        description: 'The content of the button.'
    },
    {
        name: 'variant',
        type: 'FullVariant',
        typeLink: '/docs/types#full-variant',
        defaultValue: "'primary'",
        description: 'Defines the color scheme based on global theme hues.'
    },
    {
        name: 'size',
        type: 'SizeVariant',
        typeLink: '/docs/types#size-variant',
        defaultValue: "'md'",
        description: 'Defines the physical size, padding, and font size of the button.'
    },
    {
        name: 'align',
        type: 'Alignment',
        typeLink: '/docs/types#alignment',
        defaultValue: "'center'",
        description: 'Defines the horizontal alignment of the button content.'
    },
    {
        name: 'outlined',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Applies a transparent background with a solid border. Fills with color on hover.'
    },
    {
        name: 'ghost',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Applies a transparent background and border. Shows a subtle semi-transparent color on hover.'
    },
    {
        name: 'static',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disable click animation.'
    },
    {
        name: 'rounded',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Applies maximum border-radius, creating a pill shape for text buttons or a perfect circle for icon-only buttons.'
    },
    {
        name: 'isLoading',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Triggers the loading state, substituting the icon with a spinner, and disabling interaction.'
    },
    {
        name: 'icon',
        type: 'React.ReactNode',
        description: 'Standalone icon for square icon-only buttons. Disables children rendering.'
    },
    {
        name: 'iconStart',
        type: 'React.ReactNode',
        description: 'Icon element positioned before the text content.'
    },
    {
        name: 'iconEnd',
        type: 'React.ReactNode',
        description: 'Icon element positioned after the text content.'
    },
    {
        name: 'spinnerType',
        type: 'SpinnerType',
        typeLink: '/docs/types#spinner-type',
        defaultValue: "'classic'",
        description: 'The visual style of the loading spinner.'
    },
    {
        name: 'flat',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Renders the button without elevation or shadow.'
    }
];

export const buttonGroupPropsData: PropDefinition[] = [
    {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'The buttons rendered in the group.'
    },
    {
        name: 'orientation',
        type: 'Orientation',
        typeLink: '/docs/types#orientation',
        defaultValue: "'horizontal'",
        description: 'Defines the layout direction and handles internal border-radius collapsing.'
    }
];

export const apiConfig = [
    {name: 'buttonPropsData', data: buttonPropsData},
    {name: 'buttonGroupPropsData', data: buttonGroupPropsData}
];
