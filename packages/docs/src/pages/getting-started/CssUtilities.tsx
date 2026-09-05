import React from 'react';
import {Alert, Badge, Code, Table, TableBody, TableCell, TableHead, TableRow} from '@loreschaeffer/lyco-ui';

const CssUtilities: React.FC = () => {
    return (
        <article className="mb-10">
            <h1 className="mb-8">CSS Utilities</h1>

            <Alert variant="info" className="mb-6">
                LycoUI provides a set of global utility classes to quickly adjust layout, spacing, and typography without writing custom CSS. These are especially useful for Vanilla HTML consumers.
            </Alert>

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
                            <TableCell>Applies <code>display: none !important;</code> to forcefully hide an element.</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Sizing Utilities</h2>
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
                            <TableCell><Code inline language="css">.w-100</Code></TableCell>
                            <TableCell><Badge variant="info">Sizing</Badge></TableCell>
                            <TableCell>Applies <code>width: 100% !important;</code>.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Code inline language="css">.h-100</Code></TableCell>
                            <TableCell><Badge variant="info">Sizing</Badge></TableCell>
                            <TableCell>Applies <code>height: 100% !important;</code>.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Code inline language="css">.fluid</Code></TableCell>
                            <TableCell><Badge variant="info">Sizing</Badge></TableCell>
                            <TableCell>Applies <code>width: 100%;</code> (without !important).</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Code inline language="css">.w-100vw</Code></TableCell>
                            <TableCell><Badge variant="info">Sizing</Badge></TableCell>
                            <TableCell>Applies <code>width: 100vw !important;</code> (full viewport width).</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Code inline language="css">.h-100vh</Code></TableCell>
                            <TableCell><Badge variant="info">Sizing</Badge></TableCell>
                            <TableCell>Applies <code>height: 100vh !important;</code> (full viewport height).</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Code inline language="css">.h-100svh</Code></TableCell>
                            <TableCell><Badge variant="info">Sizing</Badge></TableCell>
                            <TableCell>Applies <code>height: 100svh !important;</code> (small viewport height for mobile Safari).</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Code inline language="css">.h-100dvh</Code></TableCell>
                            <TableCell><Badge variant="info">Sizing</Badge></TableCell>
                            <TableCell>Applies <code>height: 100dvh !important;</code> (dynamic viewport height).</TableCell>
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
                    </TableBody>
                </Table>
            </section>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Image &amp; Media</h2>
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
                            <TableCell><Code inline language="css">.img-fluid</Code></TableCell>
                            <TableCell><Badge variant="success">Media</Badge></TableCell>
                            <TableCell>Makes images responsive (<code>max-width: 100%; height: auto; display: block;</code>).</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>

        </article>
    );
};

export default CssUtilities;
