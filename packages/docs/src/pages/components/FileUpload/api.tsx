import type {PropDefinition} from '../../../components/api-reference/ApiReference.tsx';

export const fileUploadProps: PropDefinition[] = [
    {name: 'variant', type: 'FullVariant', defaultValue: "'primary'", description: 'Semantic color variant for the dropzone.'},
    {name: 'onDropFiles', type: '(files: File[]) => void', description: 'Called when files are selected or dropped.'},
    {name: 'onDragStateChange', type: '(isDragActive: boolean) => void', description: 'Called when the drag state changes.'},
    {name: 'children', type: 'React.ReactNode', description: 'Custom content rendered inside the dropzone.'},
    {name: 'multiple', type: 'boolean', defaultValue: 'false', description: 'Inherited native file-input prop.'},
    {name: 'accept', type: 'string', description: 'Inherited native file-input prop controlling accepted file types.'},
    {name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Inherited native file-input prop.'},
];

export const apiConfig = [{name: 'FileUpload Props', data: fileUploadProps}];
