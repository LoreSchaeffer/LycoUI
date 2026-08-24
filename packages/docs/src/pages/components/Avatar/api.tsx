import type {PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const avatarProps: PropDefinition[] = [
    {
        name: 'src',
        type: 'string',
        description: 'The URL of the image to display.'
    },
    {
        name: 'alt',
        type: 'string',
        defaultValue: "''",
        description: 'The alt text for the image.'
    },
    {
        name: 'fallback',
        type: 'ReactNode',
        description: 'A fallback to display if the image is missing or fails to load. Can be text initials or a React node (like an Icon).'
    },
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        defaultValue: "'md'",
        description: 'The size of the avatar.'
    },
    {
        name: 'shape',
        type: "'circle' | 'square'",
        defaultValue: "'circle'",
        description: 'The shape of the avatar.'
    }
];

export const apiConfig = [
    {
        name: 'avatarProps',
        data: avatarProps
    }
];
