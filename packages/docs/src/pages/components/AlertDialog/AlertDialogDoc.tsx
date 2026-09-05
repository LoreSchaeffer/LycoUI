import React from 'react';
import {DocTemplate} from '../../../components/DocTemplate';
import {apiConfig} from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

export default function AlertDialogDoc() {
    return (
        <DocTemplate
            title="AlertDialog"
            description="A modal dialog that interrupts the user with important content and expects a response. Built on top of the Modal component, it enforces strict focus trapping and prevents dismissal via overlay click or escape key."
            apiConfig={apiConfig}
            a11yNotes={`Follows the WAI-ARIA Alert Dialog pattern. Focus is immediately trapped within the dialog upon opening. Uses \`role="alertdialog"\` with \`aria-labelledby\` and \`aria-describedby\`.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
        />
    );
}
