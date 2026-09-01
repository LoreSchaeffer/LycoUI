import { DocTemplate } from '../../../components/DocTemplate';
import { apiConfig } from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', { eager: true });
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

export default function AccordionDoc() {
    return (
        <DocTemplate
            title="Accordion"
            description="Vertically collapsing accordions based on CSS Grid. Perfect for hiding and showing content panels."
            importCode="import { Accordion, AccordionItem } from '@loreschaeffer/lyco-ui';"
            exampleModules={exampleModules}
            rawSources={rawSources as Record<string, string>}
            apiConfig={apiConfig}
        />
    );
}
