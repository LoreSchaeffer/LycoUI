import type {PropDefinition} from '../../../components/api-reference/ApiReference';

export const imageViewerProps: PropDefinition[] = [
    {
        name: 'isOpen',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Controls whether the image viewer is open and visible on screen.'
    },
    {
        name: 'images',
        type: 'ImageViewerImage[]',
        description: 'Array of image objects to display. See Custom Types below.'
    },
    {
        name: 'initialIndex',
        type: 'number',
        defaultValue: '0',
        description: 'The index of the image to show when initially opened.'
    },
    {
        name: 'onClose',
        type: '() => void',
        description: 'Callback fired when the user attempts to close the viewer.'
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes to apply to the viewer overlay container.'
    }
];

export const imageViewerImageProps: PropDefinition[] = [
    {
        name: 'id',
        type: 'string | number',
        description: 'Unique identifier for the image.'
    },
    {
        name: 'url',
        type: 'string',
        description: 'The high-resolution source URL of the image.'
    },
    {
        name: 'thumbnailUrl',
        type: 'string',
        description: 'Optional URL for a smaller thumbnail image. If not provided, the high-res URL is used.'
    },
    {
        name: 'alt',
        type: 'string',
        description: 'Optional alternative text for the image.'
    }
];

export const apiConfig = [
    {name: 'imageViewerProps', data: imageViewerProps},
    {name: 'ImageViewerImage', data: imageViewerImageProps, isType: true}
];
