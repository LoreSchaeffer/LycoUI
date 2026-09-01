import { DocTemplate } from '../../../components/DocTemplate';
import { apiConfig } from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', { eager: true });
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

export default function ProgressBarDoc() {
  return (
    <DocTemplate
      title="ProgressBar"
      description="A visual indicator for progress or completion."
      exampleModules={exampleModules}
      rawSources={rawSources as Record<string, string>}
      apiConfig={apiConfig}
    />
  );
}
