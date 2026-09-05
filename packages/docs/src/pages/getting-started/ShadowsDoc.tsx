import React, {useState} from 'react';
import {PiCheckBold, PiCopy} from 'react-icons/pi';
import {Badge, Table, TableBody, TableCell, TableHead, TableRow} from '@loreschaeffer/lyco-ui';

const shadowSteps = ['sm', 'md', 'subtle', 'subtle-2', 'xl'];
const glowSteps = ['primary', 'success', 'danger', 'warning'];

export const ShadowsDoc: React.FC = () => {
    return (
        <article className="mb-10">
            <h1 className="mb-8">Shadows & Glows</h1>
            <p className="text-secondary mb-6">
                Our shadow system emphasizes borders and subtle depth rather than heavy blurs. It's built perfectly for dark mode aesthetics.
            </p>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Shadows</h2>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell isHeader>Name</TableCell>
                            <TableCell isHeader>Token</TableCell>
                            <TableCell isHeader>Preview</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shadowSteps.map(step => (
                            <ShadowRow key={step} step={step} prefix="shadow" isGlow={false}/>
                        ))}
                    </TableBody>
                </Table>
            </section>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Ambient Glows</h2>
                <p className="text-secondary mb-6">
                    Used behind charts, key components, or highlights to provide a luminous effect.
                </p>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell isHeader>Name</TableCell>
                            <TableCell isHeader>Token</TableCell>
                            <TableCell isHeader>Preview</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {glowSteps.map(step => (
                            <ShadowRow key={step} step={step} prefix="glow" isGlow={true}/>
                        ))}
                    </TableBody>
                </Table>
            </section>
        </article>
    );
};

const ShadowRow = ({step, prefix, isGlow}: { step: string; prefix: string; isGlow: boolean }) => {
    const cssVar = `--${prefix}-${step}`;
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
            <TableCell>{prefix}-{step}</TableCell>
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
                {isGlow ? (
                    <div style={{
                        width: '120px',
                        height: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'var(--color-void)',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 'var(--radius-md)'
                    }}>
                        <div style={{position: 'absolute', inset: '-50%', background: `var(${cssVar})`}}/>
                    </div>
                ) : (
                    <div style={{width: '60px', height: '60px', backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-md)', boxShadow: `var(${cssVar})`}}/>
                )}
            </TableCell>
        </TableRow>
    );
};

export default ShadowsDoc;
