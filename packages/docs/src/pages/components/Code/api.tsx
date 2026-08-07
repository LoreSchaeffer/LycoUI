import type {PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const codeProps: PropDefinition[] = [
    {
        name: 'code',
        type: 'string',
        defaultValue: 'undefined',
        description: 'The code snippet to display (for controlled usage).'
    },
    {
        name: 'defaultCode',
        type: 'string',
        defaultValue: "''",
        description: 'The initial code if used in uncontrolled editable mode.'
    },
    {
        name: 'language',
        type: 'string',
        defaultValue: "'javascript'",
        description: 'The language to highlight. Defaults to javascript.'
    },
    {
        name: 'editable',
        type: 'boolean',
        defaultValue: 'false',
        description: 'If true, turns the code block into a lightweight code editor.'
    },
    {
        name: 'showCopy',
        type: 'boolean',
        defaultValue: 'false',
        description: 'If true, displays a copy button in the top right header.'
    },
    {
        name: 'showDownload',
        type: 'boolean',
        defaultValue: 'false',
        description: 'If true, displays a download button in the top right header.'
    },
    {
        name: 'showLanguageSelector',
        type: 'boolean',
        defaultValue: 'false',
        description: 'If true, displays a dropdown in the header to change the language.'
    },
    {
        name: 'supportedLanguages',
        type: 'string[]',
        defaultValue: "['javascript', 'typescript', 'html', 'css', 'json', 'bash', 'tsx', 'jsx', 'scss']",
        description: 'The list of languages available in the selector dropdown.'
    },
    {
        name: 'fileName',
        type: 'string',
        defaultValue: "'snippet'",
        description: 'The default filename used when downloading the code.'
    },
    {
        name: 'onChange',
        type: '(code: string) => void',
        defaultValue: 'undefined',
        description: 'Callback fired when the code is edited (requires editable=true).'
    }
];

export const apiConfig = [
    {
        name: 'Code',
        data: codeProps
    }
];
