import { DocTemplate } from '../../../components/DocTemplate';
import { apiConfig } from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', { eager: true });
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true,
});

export default function CodeDoc() {
    return (
        <DocTemplate
            title="Code"
            description="Display syntax-highlighted code snippets using Shiki. Features optional toolbars for copying and downloading, and an editable mode for live text input."
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
}
