import { DocTemplate } from '../../../components/DocTemplate';
import { apiConfig } from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', { eager: true });
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <p>Display syntax-highlighted code snippets using Shiki. Features optional toolbars for copying and downloading, and an editable mode for live text input.</p>
                    <div style={{ padding: '1rem', backgroundColor: 'var(--slate-900)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-base)' }}>
                        <strong>Installation Required:</strong>
                        <p style={{ margin: '1rem 0' }}>To use syntax highlighting, you must manually install <code>shiki</code>. It is an optional dependency to keep the core library small.</p>
                        <pre style={{ margin: 0, padding: '0.5rem 1rem', background: 'var(--slate-950)', borderRadius: 'var(--radius-sm)' }}><code>npm install shiki</code></pre>
                    </div>
                </div>
            }
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
}
