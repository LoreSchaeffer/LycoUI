import React from 'react';
import {Badge, Code, Table, TableBody, TableCell, TableHead, TableRow} from '@loreschaeffer/lyco-ui';

export const ZIndexDoc: React.FC = () => {
    return (
        <article className="mb-10">
            <h1 className="mb-8">Z-Index</h1>
            <p className="text-secondary mb-6">
                Our z-index scale defines a clear stacking order to manage depth and overlays within the application.
            </p>

            <section className="mb-10">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell isHeader>Name</TableCell>
                            <TableCell isHeader>Token</TableCell>
                            <TableCell isHeader>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow hover><TableCell>hide</TableCell><TableCell><Badge variant="secondary">var(--z-hide)</Badge></TableCell><TableCell>-1</TableCell></TableRow>
                        <TableRow hover><TableCell>base</TableCell><TableCell><Badge variant="secondary">var(--z-base)</Badge></TableCell><TableCell>0</TableCell></TableRow>
                        <TableRow hover><TableCell>dropdown</TableCell><TableCell><Badge variant="secondary">var(--z-dropdown)</Badge></TableCell><TableCell>1000</TableCell></TableRow>
                        <TableRow hover><TableCell>sticky</TableCell><TableCell><Badge variant="secondary">var(--z-sticky)</Badge></TableCell><TableCell>1020</TableCell></TableRow>
                        <TableRow hover><TableCell>fixed</TableCell><TableCell><Badge variant="secondary">var(--z-fixed)</Badge></TableCell><TableCell>1030</TableCell></TableRow>
                        <TableRow hover><TableCell>backdrop</TableCell><TableCell><Badge variant="secondary">var(--z-backdrop)</Badge></TableCell><TableCell>1040</TableCell></TableRow>
                        <TableRow hover><TableCell>modal</TableCell><TableCell><Badge variant="secondary">var(--z-modal)</Badge></TableCell><TableCell>1050</TableCell></TableRow>
                        <TableRow hover><TableCell>popover</TableCell><TableCell><Badge variant="secondary">var(--z-popover)</Badge></TableCell><TableCell>1060</TableCell></TableRow>
                        <TableRow hover><TableCell>tooltip</TableCell><TableCell><Badge variant="secondary">var(--z-tooltip)</Badge></TableCell><TableCell>1070</TableCell></TableRow>
                    </TableBody>
                </Table>
            </section>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Z-Index Utilities</h2>
                <p className="text-secondary mb-6">
                    Use these utility classes to quickly apply z-index elevation.
                </p>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell isHeader>Class Name</TableCell>
                            <TableCell isHeader>CSS Property Applied</TableCell>
                            <TableCell isHeader>Example</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell><Code inline language="css">{".z-{layer}"}</Code></TableCell>
                            <TableCell><Badge variant="secondary">{"z-index: var(--z-{layer}) !important;"}</Badge></TableCell>
                            <TableCell><Code inline language="html">{`<div class="z-sticky">`}</Code></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>
        </article>
    );
};

export default ZIndexDoc;
