import React from 'react';
import {Badge, Code, Table, TableBody, TableCell, TableHead, TableRow} from '@loreschaeffer/lyco-ui';

const SizingDoc: React.FC = () => {
    return (
        <article className="mb-10">
            <h1 className="mb-8">Sizing</h1>

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

export default SizingDoc;
