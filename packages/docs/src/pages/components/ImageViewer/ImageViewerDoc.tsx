import React from 'react';
import {DocTemplate} from '../../../components/DocTemplate';
import {apiConfig} from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

export default function ImageViewerDoc() {
    return (
        <DocTemplate
            title="Image Viewer"
            description={<p>A component for displaying images with built-in zoom, pan, and full-screen capabilities.</p>}
            apiConfig={apiConfig}
            a11yNotes="Images must have meaningful alt text. Viewer controls are fully accessible via keyboard (tab to buttons, arrows to pan)."
            exampleModules={exampleModules}
            rawSources={rawSources}
        />
    );
}
