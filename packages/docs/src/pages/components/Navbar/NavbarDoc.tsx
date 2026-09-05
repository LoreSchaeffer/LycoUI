import {DocTemplate} from '../../../components/DocTemplate';
import {apiConfig} from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true,
});

export default function NavbarDoc() {
    return (
        <DocTemplate
            title="Navbar"
            description={<p>A responsive navigation header positioned at the top of the page, containing branding, links, and actions.</p>}
            a11yNotes={`Uses the \`<nav>\` element with a clear \`aria-label\`. Interactive elements must be keyboard accessible.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
}
