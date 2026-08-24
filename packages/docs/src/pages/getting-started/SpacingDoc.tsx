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
                <h2 className="mt-12 mb-6">Margin Utilities</h2>
                <p className="text-secondary mb-6">
                    LycoUI provides a set of zero-runtime global utility classes for margins to maintain consistent vertical rhythm. The pattern is <code>.m{'{direction}'}-{'{step}'}</code> where <code>{'{direction}'}</code> is <code>t</code> (top) or <code>b</code> (bottom), and <code>{'{step}'}</code> is <code>1-12</code>.
                </p>
                <Code language="html">
                    {`<div className="mt-8 mb-4">...</div>`}
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
