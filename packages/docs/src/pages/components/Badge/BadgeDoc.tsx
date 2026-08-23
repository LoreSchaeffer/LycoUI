import { DocTemplate } from '../../../components/DocTemplate';
import { apiConfig } from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', { eager: true });
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true,
});

export default function BadgeDoc() {
    return (
        <DocTemplate
            title="Badge"
            description={<p>Highlight information with badges. Our architecture provides two core semantics: <strong>Default (Solid)</strong> for high-emphasis alerts and counters, and <strong>Dim</strong> for subtle, low-emphasis metadata. Badges scale automatically to match their parent's font size.</p>}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
}
