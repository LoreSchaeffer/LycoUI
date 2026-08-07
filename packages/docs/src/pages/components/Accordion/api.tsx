import type {PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const accordionProps: PropDefinition[] = [
    {
        name: 'variant',
        type: 'FullVariant',
        typeLink: '/docs/types/full-variant',
        defaultValue: "'primary'",
        description: 'Visual variant of the accordion. Sets the color of the header when opened and the focus ring.',
    },
    {
        name: 'flush',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Removes the outer border, border-radius, and shadow to flush the accordion edge-to-edge with its parent container.',
    },
    {
        name: 'allowMultiple',
        type: 'boolean',
        defaultValue: 'false',
        description: 'If true, multiple accordion items can be open at the same time. Otherwise, opening an item closes the others.',
    },
    {
        name: 'defaultActiveKeys',
        type: 'string[]',
        defaultValue: '[]',
        description: 'The keys of the items that should be open initially.',
    },
    {
        name: 'activeKeys',
        type: 'string[]',
        defaultValue: 'undefined',
        description: 'For controlled mode: the keys of the currently open items.',
    },
    {
        name: 'onChange',
        type: '(keys: string[]) => void',
        defaultValue: 'undefined',
        description: 'Callback fired when an item is toggled.',
    }
];

export const accordionItemProps: PropDefinition[] = [
    {
        name: 'title',
        type: 'React.ReactNode',
        defaultValue: 'undefined',
        description: 'The title displayed in the header button.',
    },
    {
        name: 'eventKey',
        type: 'string',
        defaultValue: 'undefined',
        description: 'A unique identifier for the item. If not provided, an auto-generated ID is used.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables the accordion item, preventing it from being toggled.',
    }
];

export const apiConfig = [
    {
        name: 'Accordion',
        data: accordionProps
    },
    {
        name: 'AccordionItem',
        data: accordionItemProps
    }
];
