import {DocTemplate} from '../../../components/DocTemplate';
import {apiConfig} from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

export default function TextareaDoc() {
    return (
        <DocTemplate
            title="Textarea"
            description="A premium, multiline text input component with floating labels, robust validation states, and resizability options."
            importCode="import { Textarea } from '@loreschaeffer/lyco-ui';"
            a11yNotes={`Native \`<textarea>\`. Should be explicitly linked to a \`<label>\`. Error states use \`aria-invalid\` and \`aria-describedby\` for validation messages.`}
            exampleModules={exampleModules}
            rawSources={rawSources as Record<string, string>}
            apiConfig={apiConfig}
        />
    );
}
