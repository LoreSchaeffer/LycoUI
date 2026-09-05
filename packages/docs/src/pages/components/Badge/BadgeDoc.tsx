import {DocTemplate} from '../../../components/DocTemplate';
import {apiConfig} from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true,
});

export default function BadgeDoc() {
    return (
        <DocTemplate
            title="Badge"
            description={<p>Highlight information with badges. Our architecture provides two core semantics: <strong>Default (Solid)</strong> for high-emphasis alerts and counters, and <strong>Dim</strong> for subtle, low-emphasis metadata.
                Badges scale automatically to match their parent's font size.</p>}
            a11yNotes={`Visual indicator. Ensure sufficient color contrast. If conveying status (e.g., success, error), ensure the status is also communicated to screen readers via hidden text.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
}
