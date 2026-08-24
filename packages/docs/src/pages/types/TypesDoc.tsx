import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@loreschaeffer/lyco-ui';
import '../../components/api-reference/ApiReference.scss';

export default function TypesDoc() {
    const getColorBg = (val: string) => {
        if (val === 'white') return 'white';
        return `var(--${val}-500)`;
    };
    
    const getTextColor = (val: string) => {
        const lightColors = ['yellow', 'lime', 'green', 'cyan', 'white', 'success', 'warning', 'info'];
        return lightColors.includes(val) ? 'var(--color-void)' : 'white';
    };

    return (
        <article>
            <h1>Custom Types</h1>
            <div className="text-lead mb-8">
                <p>
                    Lyco UI uses several shared custom TypeScript types to maintain consistency across the component library.
                    Whenever a component's property accepts one of these types, it refers to the exact string literal values defined below.
                </p>
            </div>

            <section className="mb-10" id="color-variant">
                <h2 className="mb-4">ColorVariant</h2>
                <p className="text-secondary mb-4">
                    The core colors from the design system palette. These directly map to the CSS variables in the theme.
                </p>
                <div className="table-wrapper">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell isHeader>Value</TableCell>
                                <TableCell isHeader>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'teal', 'cyan', 'blue', 'indigo', 'purple', 'fuchsia', 'pink', 'white'].map(val => (
                                <TableRow key={val}>
                                    <TableCell className="td-prop"><code>'{val}'</code></TableCell>
                                    <TableCell className="td-description">
                                        Maps to the <code style={{ backgroundColor: getColorBg(val), color: getTextColor(val) }}>{`--${val}`}</code> theme palette color.
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

            <section className="mb-10" id="semantic-variant">
                <h2 className="mb-4">SemanticVariant</h2>
                <p className="text-secondary mb-4">
                    Semantic states used for conveying meaning (e.g. success, error, warning).
                </p>
                <div className="table-wrapper">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell isHeader>Value</TableCell>
                                <TableCell isHeader>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key="primary">
                                <TableCell className="td-prop"><code>'primary'</code></TableCell>
                                <TableCell className="td-description">
                                    Maps to the <code style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>--color-primary</code> semantic theme color.
                                </TableCell>
                            </TableRow>
                            <TableRow key="neutral">
                                <TableCell className="td-prop"><code>'neutral'</code></TableCell>
                                <TableCell className="td-description">
                                    Maps to the <code style={{ backgroundColor: 'var(--color-ash)', color: 'white' }}>--color-ash</code> semantic theme color.
                                </TableCell>
                            </TableRow>
                            {['success', 'warning', 'danger', 'info'].map(val => (
                                <TableRow key={val}>
                                    <TableCell className="td-prop"><code>'{val}'</code></TableCell>
                                    <TableCell className="td-description">
                                        Maps to the <code style={{ backgroundColor: `var(--color-${val})`, color: getTextColor(val) }}>--color-{val}</code> semantic color mapping.
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

            <section className="mb-10" id="full-variant">
                <h2 className="mb-4">FullVariant</h2>
                <p className="text-secondary mb-4">
                    A union type combining both <code>ColorVariant</code> and <code>SemanticVariant</code>. Used by components that support both core palette colors and semantic states.
                </p>
                <div className="table-wrapper">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell isHeader>Value</TableCell>
                                <TableCell isHeader>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell className="td-prop">
                                    <code>
                                        <a href="#color-variant" style={{ color: 'inherit', textDecoration: 'underline' }}>ColorVariant</a> |{' '}
                                        <a href="#semantic-variant" style={{ color: 'inherit', textDecoration: 'underline' }}>SemanticVariant</a>
                                    </code>
                                </TableCell>
                                <TableCell className="td-description">Any valid string literal from the ColorVariant or SemanticVariant types.</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </section>

            <section className="mb-10" id="size-variant">
                <h2 className="mb-4">SizeVariant</h2>
                <p className="text-secondary mb-4">
                    Standard sizing scale used across interactive components like Buttons, Inputs, and Spinners.
                </p>
                <div className="table-wrapper">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell isHeader>Value</TableCell>
                                <TableCell isHeader>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow><TableCell className="td-prop"><code>'sm'</code></TableCell><TableCell className="td-description">Small size, typically reducing padding and font-size.</TableCell></TableRow>
                            <TableRow><TableCell className="td-prop"><code>'md'</code></TableCell><TableCell className="td-description">Medium (default) size.</TableCell></TableRow>
                            <TableRow><TableCell className="td-prop"><code>'lg'</code></TableCell><TableCell className="td-description">Large size, increasing padding and font-size for higher prominence.</TableCell></TableRow>
                        </TableBody>
                    </Table>
                </div>
            </section>

            <section className="mb-10" id="alignment">
                <h2 className="mb-4">Alignment</h2>
                <p className="text-secondary mb-4">
                    Controls horizontal alignment of content within flex or grid containers.
                </p>
                <div className="table-wrapper">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell isHeader>Value</TableCell>
                                <TableCell isHeader>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow><TableCell className="td-prop"><code>'start'</code></TableCell><TableCell className="td-description">Aligns content to the beginning of the container.</TableCell></TableRow>
                            <TableRow><TableCell className="td-prop"><code>'center'</code></TableCell><TableCell className="td-description">Centers content horizontally.</TableCell></TableRow>
                            <TableRow><TableCell className="td-prop"><code>'end'</code></TableCell><TableCell className="td-description">Aligns content to the end of the container.</TableCell></TableRow>
                        </TableBody>
                    </Table>
                </div>
            </section>

            <section className="mb-10" id="orientation">
                <h2 className="mb-4">Orientation</h2>
                <p className="text-secondary mb-4">
                    Determines the main axis for flex layouts (e.g. Button Groups).
                </p>
                <div className="table-wrapper">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell isHeader>Value</TableCell>
                                <TableCell isHeader>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow><TableCell className="td-prop"><code>'horizontal'</code></TableCell><TableCell className="td-description">Lays out children side by side.</TableCell></TableRow>
                            <TableRow><TableCell className="td-prop"><code>'vertical'</code></TableCell><TableCell className="td-description">Lays out children stacked on top of one another.</TableCell></TableRow>
                        </TableBody>
                    </Table>
                </div>
            </section>
        </article>
    );
}
