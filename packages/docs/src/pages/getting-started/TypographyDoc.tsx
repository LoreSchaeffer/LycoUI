import React, {useState} from 'react';
import {PiCheckBold, PiCopy} from 'react-icons/pi';
import {Badge, Card, Table, TableBody, TableCell, TableHead, TableRow} from '@loreschaeffer/lyco-ui';

const fontSizes = ['caption', 'body-sm', 'body-lg', 'subheading', 'heading-sm', 'heading', 'heading-lg', 'display'];
const fontWeights = ['regular', 'medium', 'semibold', 'bold'];
const fontFamilies = ['base', 'mono'];

export const TypographyDoc: React.FC = () => {
    return (
        <article className="mb-10">
            <h1 className="mb-8">Typography</h1>
            <p className="text-secondary mb-6">
                Our typography system uses geometric sans-serif for standard text and monospaced fonts for code. Variables exist for font families, sizes, weights, line-heights (leading), and letter-spacing (tracking).
            </p>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Font Sizes</h2>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell isHeader>Name</TableCell>
                            <TableCell isHeader>Token</TableCell>
                            <TableCell isHeader>Preview</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fontSizes.map(size => {
                            const cssVar = `--text-${size}`;
                            return <TypographySizeRow key={size} size={size} cssVar={cssVar}/>;
                        })}
                    </TableBody>
                </Table>
            </section>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Font Weights</h2>
                <div className="docs-foundation__grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px'}}>
                    {fontWeights.map(weight => {
                        const cssVar = `--font-weight-${weight}`;
                        return <TypographyCard key={weight} name={`font-weight-${weight}`} cssVar={cssVar} style={{fontWeight: `var(${cssVar})`}}/>;
                    })}
                </div>
            </section>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Font Families</h2>
                <div className="docs-foundation__grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px'}}>
                    {fontFamilies.map(family => {
                        const cssVar = `--font-family-${family}`;
                        return <TypographyCard key={family} name={`font-family-${family}`} cssVar={cssVar} style={{fontFamily: `var(${cssVar})`}}/>;
                    })}
                </div>
            </section>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Native HTML Elements</h2>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell isHeader>Element</TableCell>
                            <TableCell isHeader>Preview</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell><Badge variant="secondary">&lt;h1&gt;</Badge></TableCell>
                            <TableCell><h1>Heading 1</h1></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Badge variant="secondary">&lt;h2&gt;</Badge></TableCell>
                            <TableCell><h2>Heading 2</h2></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Badge variant="secondary">&lt;h3&gt;</Badge></TableCell>
                            <TableCell><h3>Heading 3</h3></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Badge variant="secondary">&lt;h4&gt;</Badge></TableCell>
                            <TableCell><h4>Heading 4</h4></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Badge variant="secondary">&lt;h5&gt;</Badge></TableCell>
                            <TableCell><h5>Heading 5</h5></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Badge variant="secondary">&lt;h6&gt;</Badge></TableCell>
                            <TableCell><h6>Heading 6</h6></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Badge variant="secondary">&lt;p&gt;</Badge></TableCell>
                            <TableCell><p>This is a standard paragraph. It should be used for body text and descriptive content throughout the application.</p></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Badge variant="secondary">&lt;small&gt;</Badge></TableCell>
                            <TableCell><small>This is small text, often used for captions or fine print.</small></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Badge variant="secondary">&lt;strong&gt;</Badge></TableCell>
                            <TableCell><strong>Strong / Bold Text</strong></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Badge variant="secondary">&lt;a&gt;</Badge></TableCell>
                            <TableCell><a href="#">Standard Link</a></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Badge variant="secondary">&lt;code&gt;</Badge></TableCell>
                            <TableCell><Badge variant="secondary">console.log('hello world');</Badge></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Typography Utilities</h2>
                <p className="text-secondary mb-6">
                    Override default typography styles with these utility classes.
                </p>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell isHeader>Class</TableCell>
                            <TableCell isHeader>Description</TableCell>
                            <TableCell isHeader>Example</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow hover>
                            <TableCell><Badge variant="secondary">.text-display</Badge></TableCell>
                            <TableCell>Applies the largest display text styling.</TableCell>
                            <TableCell><span className="text-display">Display</span></TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell><Badge variant="secondary">.text-heading-lg</Badge></TableCell>
                            <TableCell>Applies the large heading text styling.</TableCell>
                            <TableCell><span className="text-heading-lg">Heading Lg</span></TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell><Badge variant="secondary">.text-center</Badge></TableCell>
                            <TableCell>Centers the text horizontally.</TableCell>
                            <TableCell>
                                <div className="text-center" style={{width: '100%'}}>Centered</div>
                            </TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell><Badge variant="secondary">.text-truncate</Badge></TableCell>
                            <TableCell>Applies fast, single-line ellipsis clipping.</TableCell>
                            <TableCell>
                                <div className="text-truncate" style={{maxWidth: '120px'}}>This is a very long text that will truncate</div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>
        </article>
    );
};

const TypographySizeRow = ({size, cssVar}: { size: string, cssVar: string }) => {
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
            <TableCell>text-{size}</TableCell>
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
                <span style={{display: 'inline-block', paddingBottom: '0.2em', fontSize: `var(${cssVar})`, lineHeight: `var(--leading-${size})`, letterSpacing: `var(--tracking-${size})`}}>
                    Ag
                </span>
            </TableCell>
        </TableRow>
    );
}

const TypographyCard = ({name, cssVar, style}: { name: string, cssVar: string, style: React.CSSProperties }) => {
    const [copied, setCopied] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(`var(${cssVar})`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card
            onClick={handleCopy}
            className="docs-foundation__card--interactive"
            style={{cursor: 'pointer'}}
            title={`Copy var(${cssVar})`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{fontSize: 'var(--text-heading-sm)', ...style}}>Aa</span>
            </div>
            <div style={{padding: '16px', borderTop: '1px solid var(--color-border-subtle)'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px'}}>
                    <strong>{name}</strong>
                    <span style={{
                        display: 'inline-flex',
                        width: '1em',
                        opacity: (copied || isHovered) ? 1 : 0,
                        transition: 'opacity 0.2s ease',
                        color: copied ? 'var(--color-success)' : 'var(--color-text-secondary)'
                    }}>
                        {copied ? <PiCheckBold/> : <PiCopy/>}
                    </span>
                </div>
                <div style={{color: 'var(--text-secondary)', fontSize: 'var(--text-body-sm)'}}>
                    var({cssVar})
                </div>
            </div>
        </Card>
    );
}

export default TypographyDoc;
