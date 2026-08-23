import { DocTemplate } from '../../../components/DocTemplate';
import { apiConfig } from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', { eager: true });
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

export default function InputDoc() {
  return (
    <DocTemplate
      title="Input"
      description="A premium, Linear-style text and number input component with strict BEM architecture, floating labels, icons, validation, and step buttons."
      exampleModules={exampleModules}
      rawSources={rawSources as any}
      apiConfig={apiConfig}
    />
  );
}
