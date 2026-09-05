import React from 'react';
import {DocTemplate} from '../../../components/DocTemplate';
import {apiConfig} from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

export default function ModalDoc() {
    return (
        <DocTemplate
            title="Modal"
            description={<p>A dialog window overlaid on the primary window, rendering the content underneath inert.</p>}
            apiConfig={apiConfig}
            a11yNotes="Uses HTMLDialogElement internally. Focus is trapped within the modal, and the background is aria-hidden."
            exampleModules={exampleModules}
            rawSources={rawSources}
        />
    );
}
