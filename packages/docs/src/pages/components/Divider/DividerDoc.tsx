import {DocTemplate} from '../../../components/DocTemplate';
import {apiConfig} from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true,
});

export default function DividerDoc() {
    return (
        <DocTemplate
            title="Divider"
            description={<p>A purely presentational layout component used to add visible separation lines between content sections. Supports length constraints, predefined spacing scales, and both horizontal and vertical orientations.</p>}
            a11yNotes={`Uses \`role="separator"\`. If the divider has content (e.g., text), it functions as a visual separator but screen readers will still read the text.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
}
