import type {PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const buttonPropsData: PropDefinition[] = [
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
        name: 'flat',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Strips gradients, textures, and shadows for a pure solid-color appearance.'
    },
    {
        name: 'static',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disable click animation.'
    },
    {
        name: 'outlined',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Applies a transparent background with a solid border. Fills with color on hover.'
    },
    {
        name: 'rounded',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Applies maximum border-radius, creating a pill shape for text buttons or a perfect circle for icon-only buttons.'
    },
    {
        name: 'loading',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Triggers the loading state, hiding text, disabling interaction, and showing a spinner.'
    },
    {
        name: 'icon',
        type: 'ReactNode',
        description: 'Standalone icon for square icon-only buttons. Disables children rendering.'
    },
    {
        name: 'iconStart',
        type: 'ReactNode',
        description: 'Icon element positioned before the text content.'
    },
    {
        name: 'iconEnd',
        type: 'ReactNode',
        description: 'Icon element positioned after the text content.'
    }
];

export const buttonGroupPropsData: PropDefinition[] = [
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