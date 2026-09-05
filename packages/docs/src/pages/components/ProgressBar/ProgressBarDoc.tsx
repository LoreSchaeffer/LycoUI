import {DocTemplate} from '../../../components/DocTemplate';
import {apiConfig} from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

export default function ProgressBarDoc() {
    return (
        <DocTemplate
            title="ProgressBar"
            description={<p>A visual indicator of completion for a task, displaying the percentage completed.</p>}
            a11yNotes="Uses native <progress> element when possible, or role='progressbar' with aria-valuenow, aria-valuemin, and aria-valuemax attributes. Indeterminate states omit aria-valuenow."
            exampleModules={exampleModules}
            rawSources={rawSources as Record<string, string>}
            apiConfig={apiConfig}
        />
    );
}
