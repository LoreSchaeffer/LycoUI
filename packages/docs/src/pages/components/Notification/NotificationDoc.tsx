import { NotificationProvider } from 'lyco-ui';
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
                description="A rich, position-aware notification system with auto-dismiss, progress bar, semantic icons, and hover-to-pause."
                exampleModules={exampleModules}
                rawSources={rawSources as any}
                apiConfig={apiConfig as any}
            />
        </NotificationProvider>
    );
}
