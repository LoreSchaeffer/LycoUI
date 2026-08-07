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
            description="Small count and labeling components. Badges scale to match the size of the immediate parent element by using relative font sizing and em units."
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
}
