import {DocTemplate} from '../../../components/DocTemplate';
import {apiConfig} from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true,
});

export default function CodeDoc() {
    return (
        <DocTemplate
            title="Code"
            description={
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    <p>Display syntax-highlighted code snippets using Shiki. Features optional toolbars for copying and downloading, and an editable mode for live text input.</p>

                    <div style={{padding: '1rem', backgroundColor: 'var(--color-obsidian)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)'}}>
                        <strong>Installation Required:</strong>
                        <p style={{margin: '0.5rem 0'}}>To use syntax highlighting, you must manually install <code>shiki</code>. It is an optional dependency to keep our core library small. If missing, it safely falls back to standard
                            text.</p>
                        <pre style={{margin: 0, padding: '0.5rem 1rem', background: 'var(--color-bg-root)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-subtle)'}}><code>npm install shiki</code></pre>
                    </div>
                </div>
            }
            a11yNotes={`Provides syntax highlighting with \`aria-hidden="true"\` on decorative formatting spans. Copy and download actions are accessible via keyboard with descriptive \`aria-label\`s.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
}
