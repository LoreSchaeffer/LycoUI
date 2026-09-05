import React, {useState} from 'react';
import {PiCheckBold, PiCopy} from 'react-icons/pi';
import {Badge, Table, TableBody, TableCell, TableHead, TableRow} from '@loreschaeffer/lyco-ui';

const radiiSteps = ['sm', 'md', 'xl', '2xl', 'full'];

export const RadiiDoc: React.FC = () => {
    return (
        <article className="mb-10">
            <h1 className="mb-8">Border Radius</h1>
            <p className="text-secondary mb-6">
                Our radii scale applies subtle rounding to components for a softer, premium aesthetic while maintaining a sharp overall geometry.
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
                        {radiiSteps.map(step => {
                            const cssVar = `--radius-${step}`;
                            return <RadiiRow key={step} step={step} cssVar={cssVar}/>;
                        })}
                    </TableBody>
                </Table>
            </section>
        </article>
    );
};

const RadiiRow = ({step, cssVar}: { step: string, cssVar: string }) => {
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
            <TableCell>radius-{step}</TableCell>
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
                <div style={{width: '60px', height: '60px', backgroundColor: 'var(--color-primary)', borderRadius: `var(${cssVar})`}}/>
            </TableCell>
        </TableRow>
    );
};

export default RadiiDoc;
