import React from 'react';
import {Badge, Code, Table, TableBody, TableCell, TableHead, TableRow} from '@loreschaeffer/lyco-ui';

const LayoutDoc: React.FC = () => {
    return (
        <article className="mb-10">
            <h1 className="mb-8">Layout &amp; Visibility</h1>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Display &amp; Visibility</h2>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell isHeader>Class Name</TableCell>
                            <TableCell isHeader>Category</TableCell>
                            <TableCell isHeader>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell><Code inline language="css">.hidden</Code></TableCell>
                            <TableCell><Badge variant="primary">Display</Badge></TableCell>
                            <TableCell>Applies <Code inline>display: none !important;</Code> to forcefully hide an element.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Code inline language="css">.d-none</Code></TableCell>
                            <TableCell><Badge variant="primary">Display</Badge></TableCell>
                            <TableCell>Applies <Code inline>display: none !important;</Code>. Identical to <Code inline>.hidden</Code> but can be prefixed with breakpoints (e.g. <Code inline>md:d-none</Code>).</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Code inline language="css">.d-block</Code></TableCell>
                            <TableCell><Badge variant="primary">Display</Badge></TableCell>
                            <TableCell>Applies <Code inline>display: block !important;</Code>. Useful for overriding default display at specific breakpoints.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Code inline language="css">.d-inline-block</Code></TableCell>
                            <TableCell><Badge variant="primary">Display</Badge></TableCell>
                            <TableCell>Applies <Code inline>display: inline-block !important;</Code>.</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Flexbox Utilities</h2>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell isHeader>Class Name</TableCell>
                            <TableCell isHeader>Category</TableCell>
                            <TableCell isHeader>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell><Code inline language="css">.d-flex</Code></TableCell>
                            <TableCell><Badge variant="warning">Flexbox</Badge></TableCell>
                            <TableCell>Applies <code>display: flex !important;</code>.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Code inline language="css">.flex-column</Code></TableCell>
                            <TableCell><Badge variant="warning">Flexbox</Badge></TableCell>
                            <TableCell>Applies <code>flex-direction: column !important;</code>.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Code inline language="css">.align-items-center</Code></TableCell>
                            <TableCell><Badge variant="warning">Flexbox</Badge></TableCell>
                            <TableCell>Applies <code>align-items: center !important;</code>.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Code inline language="css">.justify-content-center</Code></TableCell>
                            <TableCell><Badge variant="warning">Flexbox</Badge></TableCell>
                            <TableCell>Applies <code>justify-content: center !important;</code>.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Code inline language="css">.justify-content-between</Code></TableCell>
                            <TableCell><Badge variant="warning">Flexbox</Badge></TableCell>
                            <TableCell>Applies <code>justify-content: space-between !important;</code>.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Code inline language="css">.flex-wrap</Code></TableCell>
                            <TableCell><Badge variant="warning">Flexbox</Badge></TableCell>
                            <TableCell>Applies <code>flex-wrap: wrap !important;</code>.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Code inline language="css">{".gap-{n}"}</Code></TableCell>
                            <TableCell><Badge variant="warning">Flexbox</Badge></TableCell>
                            <TableCell>Applies <Code inline>{"gap: var(--spacing-{n}) !important;"}</Code>.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Code inline language="css">{".row-gap-{n}"}</Code></TableCell>
                            <TableCell><Badge variant="warning">Flexbox</Badge></TableCell>
                            <TableCell>Applies <Code inline>{"row-gap: var(--spacing-{n}) !important;"}</Code>.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Code inline language="css">{".col-gap-{n}"}</Code></TableCell>
                            <TableCell><Badge variant="warning">Flexbox</Badge></TableCell>
                            <TableCell>Applies <Code inline>{"column-gap: var(--spacing-{n}) !important;"}</Code>.</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>
        </article>
    );
};

export default LayoutDoc;
