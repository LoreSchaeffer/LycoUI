import React, {useState} from 'react';
import {PiCheckBold, PiCopy} from 'react-icons/pi';
import {Badge, Code, Table, TableBody, TableCell, TableHead, TableRow} from '@loreschaeffer/lyco-ui';

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
                            return <SpacingRow key={step} step={step} cssVar={cssVar}/>;
                        })}
                    </TableBody>
                </Table>
            </section>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Spacing Utilities</h2>
                <p className="text-secondary mb-6">
                    LycoUI provides a set of zero-runtime global utility classes for margins and paddings.
                    The naming convention follows the pattern <Badge variant="secondary">.{'{prefix}'}{'{direction}'}-{'{step}'}</Badge>.
                </p>

                <ul className="text-secondary mb-6 ml-6">
                    <li><strong>Prefix:</strong> <Badge variant="secondary">m</Badge> for margin, <Badge variant="secondary">p</Badge> for padding.</li>
                    <li><strong>Direction:</strong> Specifies the sides to apply the spacing to (see table below).</li>
                    <li><strong>Step:</strong> A number from <Badge variant="secondary">1</Badge> to <Badge variant="secondary">12</Badge> matching our spacing scale.</li>
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
                                <TableCell><Badge variant="secondary">m-*</Badge> / <Badge variant="secondary">p-*</Badge></TableCell>
                                <TableCell>All sides</TableCell>
                                <TableCell><Badge variant="secondary">margin</Badge> / <Badge variant="secondary">padding</Badge></TableCell>
                                <TableCell><Badge variant="secondary">m-4</Badge>, <Badge variant="secondary">p-4</Badge></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Badge variant="secondary">mt-*</Badge> / <Badge variant="secondary">pt-*</Badge></TableCell>
                                <TableCell>Top</TableCell>
                                <TableCell><Badge variant="secondary">margin-top</Badge> / <Badge variant="secondary">padding-top</Badge></TableCell>
                                <TableCell><Badge variant="secondary">mt-2</Badge>, <Badge variant="secondary">pt-2</Badge></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Badge variant="secondary">mb-*</Badge> / <Badge variant="secondary">pb-*</Badge></TableCell>
                                <TableCell>Bottom</TableCell>
                                <TableCell><Badge variant="secondary">margin-bottom</Badge> / <Badge variant="secondary">padding-bottom</Badge></TableCell>
                                <TableCell><Badge variant="secondary">mb-6</Badge>, <Badge variant="secondary">pb-6</Badge></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Badge variant="secondary">ml-*</Badge> / <Badge variant="secondary">pl-*</Badge></TableCell>
                                <TableCell>Left</TableCell>
                                <TableCell><Badge variant="secondary">margin-left</Badge> / <Badge variant="secondary">padding-left</Badge></TableCell>
                                <TableCell><Badge variant="secondary">ml-3</Badge>, <Badge variant="secondary">pl-3</Badge></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Badge variant="secondary">mr-*</Badge> / <Badge variant="secondary">pr-*</Badge></TableCell>
                                <TableCell>Right</TableCell>
                                <TableCell><Badge variant="secondary">margin-right</Badge> / <Badge variant="secondary">padding-right</Badge></TableCell>
                                <TableCell><Badge variant="secondary">mr-3</Badge>, <Badge variant="secondary">pr-3</Badge></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Badge variant="secondary">mx-*</Badge> / <Badge variant="secondary">px-*</Badge></TableCell>
                                <TableCell>Horizontal (X-axis)</TableCell>
                                <TableCell>left & right</TableCell>
                                <TableCell><Badge variant="secondary">mx-auto</Badge>, <Badge variant="secondary">px-5</Badge></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Badge variant="secondary">my-*</Badge> / <Badge variant="secondary">py-*</Badge></TableCell>
                                <TableCell>Vertical (Y-axis)</TableCell>
                                <TableCell>top & bottom</TableCell>
                                <TableCell><Badge variant="secondary">my-8</Badge>, <Badge variant="secondary">py-8</Badge></TableCell>
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

const SpacingRow = ({step, cssVar}: { step: string; cssVar: string }) => {
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
            style={{cursor: 'pointer'}}
            hover
            title={`Copy var(${cssVar})`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <TableCell>spacing-{step}</TableCell>
            <TableCell>
                <Badge variant="secondary" style={{display: "inline-flex", alignItems: "center", gap: "8px"}}>
                    var({cssVar})
                    <span style={{
                        opacity: (copied || isHovered) ? 1 : 0,
                        transition: "opacity 0.2s ease",
                        color: copied ? "var(--color-success)" : "inherit"
                    }}>
                        {copied ? <PiCheckBold/> : <PiCopy/>}
                    </span>
                </Badge>
            </TableCell>
            <TableCell>
                <div style={{width: `var(${cssVar})`, height: '24px', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-sm)'}}/>
            </TableCell>
        </TableRow>
    );
};

export default SpacingDoc;
