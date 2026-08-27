import React, { useState } from 'react';
import { PiCheckBold, PiCopy } from 'react-icons/pi';
import { Table, TableHead, TableBody, TableRow, TableCell, Code } from '@loreschaeffer/lyco-ui';
const spacingSteps = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '12', '14', '16', '20', '24', '32'];

export const SpacingDoc: React.FC = () => {
    return (
        <article className="mb-10">
            <h1 className="mb-8">Spacing</h1>
            <p className="text-secondary mb-6">
                Our spacing scale is built on a strict 4-point baseline grid. Use these variables for margin, padding, and gaps to ensure consistent rhythm across the UI.
            </p>

            <section className="mb-10">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell isHeader>Name</TableCell>
                            <TableCell isHeader>Token</TableCell>
                            <TableCell isHeader>Preview</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {spacingSteps.map(step => {
                            const cssVar = `--spacing-${step}`;
                            return <SpacingRow key={step} step={step} cssVar={cssVar} />;
                        })}
                    </TableBody>
                </Table>
            </section>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Spacing Utilities</h2>
                <p className="text-secondary mb-6">
                    LycoUI provides a set of zero-runtime global utility classes for margins and paddings.
                    The naming convention follows the pattern <code>.{'{prefix}'}{'{direction}'}-{'{step}'}</code>.
                </p>

                <ul className="text-secondary mb-6 ml-6">
                    <li><strong>Prefix:</strong> <code>m</code> for margin, <code>p</code> for padding.</li>
                    <li><strong>Direction:</strong> Specifies the sides to apply the spacing to (see table below).</li>
                    <li><strong>Step:</strong> A number from <code>1</code> to <code>12</code> matching our spacing scale.</li>
                </ul>

                <div className="mb-8">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell isHeader>Format</TableCell>
                                <TableCell isHeader>Target Sides</TableCell>
                                <TableCell isHeader>CSS Properties Applied</TableCell>
                                <TableCell isHeader>Example</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell><code>m-*</code> / <code>p-*</code></TableCell>
                                <TableCell>All sides</TableCell>
                                <TableCell><code>margin</code> / <code>padding</code></TableCell>
                                <TableCell><code>m-4</code>, <code>p-4</code></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><code>mt-*</code> / <code>pt-*</code></TableCell>
                                <TableCell>Top</TableCell>
                                <TableCell><code>margin-top</code> / <code>padding-top</code></TableCell>
                                <TableCell><code>mt-2</code>, <code>pt-2</code></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><code>mb-*</code> / <code>pb-*</code></TableCell>
                                <TableCell>Bottom</TableCell>
                                <TableCell><code>margin-bottom</code> / <code>padding-bottom</code></TableCell>
                                <TableCell><code>mb-6</code>, <code>pb-6</code></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><code>ml-*</code> / <code>pl-*</code></TableCell>
                                <TableCell>Left</TableCell>
                                <TableCell><code>margin-left</code> / <code>padding-left</code></TableCell>
                                <TableCell><code>ml-3</code>, <code>pl-3</code></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><code>mr-*</code> / <code>pr-*</code></TableCell>
                                <TableCell>Right</TableCell>
                                <TableCell><code>margin-right</code> / <code>padding-right</code></TableCell>
                                <TableCell><code>mr-3</code>, <code>pr-3</code></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><code>mx-*</code> / <code>px-*</code></TableCell>
                                <TableCell>Horizontal (X-axis)</TableCell>
                                <TableCell>left & right</TableCell>
                                <TableCell><code>mx-auto</code>, <code>px-5</code></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><code>my-*</code> / <code>py-*</code></TableCell>
                                <TableCell>Vertical (Y-axis)</TableCell>
                                <TableCell>top & bottom</TableCell>
                                <TableCell><code>my-8</code>, <code>py-8</code></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <p className="text-secondary mb-4">Usage Example:</p>
                <Code language="html">
                    {`<div className="mx-auto mt-8 mb-4 px-6 py-4">...</div>`}
                </Code>
            </section>
        </article>
    );
};

const SpacingRow = ({ step, cssVar }: { step: string; cssVar: string }) => {
    const [copied, setCopied] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`var(${cssVar})`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <TableRow
            onClick={handleCopy}
            style={{ cursor: 'pointer' }}
            hover
            title={`Copy var(${cssVar})`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <TableCell>spacing-{step}</TableCell>
            <TableCell>
                <code style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    var({cssVar})
                    <span style={{
                        display: 'inline-flex',
                        width: '1em',
                        opacity: (copied || isHovered) ? 1 : 0,
                        transition: 'opacity 0.2s ease',
                        color: copied ? 'var(--color-success)' : 'var(--color-text-secondary)'
                    }}>
                        {copied ? <PiCheckBold/> : <PiCopy/>}
                    </span>
                </code>
            </TableCell>
            <TableCell>
                <div style={{ width: `var(${cssVar})`, height: '24px', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-sm)' }} />
            </TableCell>
        </TableRow>
    );
};

export default SpacingDoc;