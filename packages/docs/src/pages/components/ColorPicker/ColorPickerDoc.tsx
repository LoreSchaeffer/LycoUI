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
            description={<p>Choose a color from preset swatches, the native color selector, or an editable HEX or RGB value.</p>}
            importCode="import { ColorPicker } from '@loreschaeffer/lyco-ui';"
            a11yNotes="The Choose color button opens a labeled dialog and announces its expanded state. Escape and outside interaction close the dialog. The color value has an accessible label, and disabled controls cannot be changed."
            exampleModules={exampleModules}
            rawSources={rawSources as Record<string, string>}
            apiConfig={apiConfig}
        />
    );
}
