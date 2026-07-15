import type {PropDefinition} from '../../../components/api-reference/ApiReference';

export const buttonPropsData: PropDefinition[] = [
    {
        name: 'variant',
        type: 'ColorVariant',
        defaultValue: "'primary'",
        description: 'Defines the color scheme based on global theme hues.'
    },
    {
        name: 'size',
        type: "'sm' | 'base' | 'lg'",
        defaultValue: "'base'",
        description: 'Defines the physical size, padding, and font size of the button.'
    },
    {
        name: 'isFlat',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Strips gradients, textures, and shadows for a pure solid-color appearance.'
    },
    {
        name: 'isLoading',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Triggers the loading state, hiding text, disabling interaction, and showing a spinner.'
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
    },
    {
        name: '...props',
        type: 'ButtonHTMLAttributes<HTMLButtonElement>',
        description: <>Inherits all native HTML button attributes (e.g., <code>disabled</code>, <code>onClick</code>).</>
    }
];

export const buttonGroupPropsData: PropDefinition[] = [
    {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        defaultValue: "'horizontal'",
        description: 'Defines the layout direction and handles internal border-radius collapsing.'
    },
    {
        name: '...props',
        type: 'HTMLAttributes<HTMLDivElement>',
        description: 'Inherits all native HTML div attributes.'
    }
];