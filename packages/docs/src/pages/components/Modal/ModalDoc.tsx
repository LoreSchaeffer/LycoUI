import React from 'react';
import { DocTemplate } from '../../../components/DocTemplate';
import { apiConfig } from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', { eager: true });
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

export default function ModalDoc() {
    return (
        <DocTemplate
            title="Modal"
            description="A flexible dialog overlay that interrupts the user's workflow to communicate important information, ask for a decision, or present a form."
            apiConfig={apiConfig}
            exampleModules={exampleModules}
            rawSources={rawSources}
        />
    );
}
