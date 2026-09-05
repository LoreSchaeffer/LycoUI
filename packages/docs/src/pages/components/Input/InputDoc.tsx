import {DocTemplate} from '../../../components/DocTemplate';
import {apiConfig} from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

export default function InputDoc() {
    return (
        <DocTemplate
            title="Input"
            description={<p>A versatile text input component supporting various sizes, states, icons, and inline validation.</p>}
            a11yNotes="Uses native inputs underneath. Ensures focus rings are visible and aria-invalid is set on error."
            exampleModules={exampleModules}
            rawSources={rawSources as Record<string, string>}
            apiConfig={apiConfig}
        />
    );
}
