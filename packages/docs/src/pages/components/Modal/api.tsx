import type {PropDefinition} from '../../../components/api-reference/ApiReference';

export const modalProps: PropDefinition[] = [
    {
        name: 'isOpen',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Controls whether the modal is open and visible on screen.'
    },
    {
        name: 'onClose',
        type: '() => void',
        description: 'Callback fired when the user attempts to close the modal (e.g. clicking the backdrop, pressing Escape, or clicking a dismiss button).'
    },
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        defaultValue: "'md'",
        description: 'Determines the max-width of the modal dialog.'
    },
    {
        name: 'centered',
        type: 'boolean',
        defaultValue: 'true',
        description: 'If true, centers the modal vertically in the viewport. If false, aligns it to the top.'
    },
    {
        name: 'scrollable',
        type: 'boolean',
        defaultValue: 'false',
        description: 'If true, allows the modal body to scroll internally while keeping the header and footer fixed in place.'
    },
    {
        name: 'children',
        type: 'ReactNode',
        description: 'The content of the modal, typically ModalHeader, ModalBody, and ModalFooter.'
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes to apply to the modal overlay container.'
    }
];

export const modalHeaderProps: PropDefinition[] = [
    {
        name: 'children',
        type: 'ReactNode',
        description: 'The content of the header, typically ModalTitle and a close button.'
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes.'
    }
];

export const modalTitleProps: PropDefinition[] = [
    {
        name: 'as',
        type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'",
        defaultValue: "'h3'",
        description: 'The HTML heading element to render.'
    },
    {
        name: 'children',
        type: 'ReactNode',
        description: 'The title text.'
    }
];

export const modalBodyProps: PropDefinition[] = [
    {
        name: 'children',
        type: 'ReactNode',
        description: 'The main scrollable content of the modal.'
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes.'
    }
];

export const modalFooterProps: PropDefinition[] = [
    {
        name: 'children',
        type: 'ReactNode',
        description: 'Action buttons or footer content.'
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes.'
    }
];

export const apiConfig = [
    { name: 'modalProps', data: modalProps },
    { name: 'modalHeaderProps', data: modalHeaderProps },
    { name: 'modalTitleProps', data: modalTitleProps },
    { name: 'modalBodyProps', data: modalBodyProps },
    { name: 'modalFooterProps', data: modalFooterProps }
];
