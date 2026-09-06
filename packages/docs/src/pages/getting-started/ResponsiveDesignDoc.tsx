import React from 'react';
import {Alert, Badge, Code, Table, TableBody, TableCell, TableHead, TableRow} from '@loreschaeffer/lyco-ui';

const ResponsiveDesignDoc: React.FC = () => {
    return (
        <article className="mb-10">
            <h1 className="mb-8">Responsive Design</h1>

            <Alert variant="info" className="mb-6">
                LycoUI provides a set of global utility classes to quickly adjust layout, spacing, and typography without writing custom CSS. These are especially useful for Vanilla HTML consumers.
            </Alert>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Responsive Modifiers</h2>
                <p className="text-secondary mb-4">
                    Many utilities for layout, sizing, and spacing can be conditionally applied at specific breakpoints using our responsive prefixes.
                </p>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell isHeader>Prefix</TableCell>
                            <TableCell isHeader>Minimum Width</TableCell>
                            <TableCell isHeader>Example</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell><Badge variant="secondary">sm:</Badge></TableCell>
                            <TableCell>640px</TableCell>
                            <TableCell><Code inline language="css">sm:d-flex</Code></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Badge variant="secondary">md:</Badge></TableCell>
                            <TableCell>768px</TableCell>
                            <TableCell><Code inline language="css">md:gap-4</Code></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Badge variant="secondary">lg:</Badge></TableCell>
                            <TableCell>1024px</TableCell>
                            <TableCell><Code inline language="css">lg:w-100</Code></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Badge variant="secondary">xl:</Badge></TableCell>
                            <TableCell>1280px</TableCell>
                            <TableCell><Code inline language="css">xl:flex-row</Code></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Badge variant="secondary">xxl:</Badge></TableCell>
                            <TableCell>1536px</TableCell>
                            <TableCell><Code inline language="css">xxl:p-8</Code></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>
        </article>
    );
};

export default ResponsiveDesignDoc;
