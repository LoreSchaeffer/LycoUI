import {DocTemplate} from '../../../components/DocTemplate';
import {apiConfig} from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true,
});

export default function ColorPickerDoc() {
    return (
        <DocTemplate
            title="ColorPicker"
            description={<p>Choose a color with preset swatches or the platform-native picker. A swatch palette also supports editable HEX and RGB values.</p>}
            importCode="import { ColorPicker } from '@loreschaeffer/lyco-ui';"
            a11yNotes="With swatches, the trigger opens a labeled dialog and announces its expanded state. Without swatches, the trigger opens the native color picker directly. The color value has an accessible label, and disabled controls cannot be changed."
            exampleModules={exampleModules}
            rawSources={rawSources as Record<string, string>}
            apiConfig={apiConfig}
        />
    );
}
