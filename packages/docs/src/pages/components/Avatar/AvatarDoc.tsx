import {DocTemplate} from '../../../components/DocTemplate';
import {apiConfig} from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true,
});

export default function AvatarDoc() {
    return (
        <DocTemplate
            title="Avatar"
            description={<p>Display user profile images, initials, or fallback icons. Avatars automatically handle image loading errors and fallback to secondary content seamlessly.</p>}
            a11yNotes={`Non-interactive element. Provides \`aria-label\` or \`alt\` text for screen readers when an image is used. Fallback initials are hidden from screen readers if they are purely decorative.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
}
