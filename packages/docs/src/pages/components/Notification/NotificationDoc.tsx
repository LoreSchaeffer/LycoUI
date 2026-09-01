import { NotificationProvider, Code } from '@loreschaeffer/lyco-ui';
import { DocTemplate } from '../../../components/DocTemplate';
import { apiConfig } from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', { eager: true });
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

export default function NotificationDoc() {
    return (
        <NotificationProvider position="bottom-right">
            <DocTemplate
                title="Notification"
                description={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <p>
                            A rich, position-aware notification system featuring automatic dismissal, progress bars, semantic icons, and hover-to-pause logic. Use it to deliver system-level alerts and feedback.
                        </p>
                        <div style={{ padding: '1rem', backgroundColor: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)' }}>
                            <strong>Setup Instructions</strong>
                            <p style={{ margin: '0.5rem 0 1rem 0', color: 'var(--color-text-secondary)' }}>
                                To use notifications in your React application, you <strong>must</strong> wrap your app (or a relevant subtree) in a <code>&lt;NotificationProvider&gt;</code>. Then, use the <code>useNotification()</code> hook to trigger toasts from any component.
                            </p>
                            <Code language="tsx" isInline={false}>
{`// App.tsx
import { NotificationProvider } from '@loreschaeffer/lyco-ui';

export default function App() {
  return (
    <NotificationProvider position="bottom-right">
      <YourApp />
    </NotificationProvider>
  );
}`}
                            </Code>
                        </div>
                    </div>
                }
                exampleModules={exampleModules}
                rawSources={rawSources as Record<string, string>}
                apiConfig={apiConfig}
            />
        </NotificationProvider>
    );
}
