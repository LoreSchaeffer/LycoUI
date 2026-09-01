import { DocTemplate } from '../../../components/DocTemplate';
import { apiConfig } from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', { eager: true });
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

export default function RangeDoc() {
  return (
    <DocTemplate
      title="Range"
      description="An interactive slider component with a customizable droplet tooltip."
      exampleModules={exampleModules}
      rawSources={rawSources as Record<string, string>}
      apiConfig={apiConfig}
    />
  );
}
