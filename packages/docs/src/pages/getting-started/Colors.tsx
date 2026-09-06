import React from 'react';
import {Badge, Card, Code, getContrastColor, Table, TableBody, TableCell, TableHead, TableRow, useNotification} from '@loreschaeffer/lyco-ui';

const hues = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'teal', 'cyan', 'blue', 'indigo', 'purple', 'fuchsia', 'pink'];
const lightnessSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const secondaryColors = ['void', 'carbon', 'obsidian', 'graphite', 'smoke', 'ash', 'fog', 'mist', 'bone', 'paper'];

const semanticColors = [
    {name: 'Primary', var: '--color-primary'},
    {name: 'Success', var: '--color-success'},
    {name: 'Warning', var: '--color-warning'},
    {name: 'Danger', var: '--color-danger'},
    {name: 'Info', var: '--color-info'},
    {name: 'Secondary', var: '--color-ash'}
];

interface ColorSwatchProps {
    colorVar: string;
    label: string | number;
    textColor?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({colorVar, label, textColor}) => {
    const {showNotification} = useNotification();

    const handleCopy = () => {
        navigator.clipboard.writeText(`var(${colorVar})`);
        showNotification({
            title: 'Copied to clipboard',
            description: `var(${colorVar}) has been copied.`,
            variant: 'success'
        });
    };

    return (
        <Card
            className="docs-colors__palette-step"
            style={{
                backgroundColor: `var(${colorVar})`,
                color: textColor || 'var(--color-carbon)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '48px',
                border: 'none',
                boxShadow: 'none',
                borderRadius: 'var(--radius-sm)'
            }}
            title={`Copy var(${colorVar})`}
            onClick={handleCopy}
            role="button"
            tabIndex={0}
        >
            <span className="docs-colors__step-label" style={{fontSize: 'var(--text-caption)'}}>{label}</span>
        </Card>
    );
};

const SemanticColorSwatch: React.FC<{ color: { name: string; var: string } }> = ({color}) => {
    const {showNotification} = useNotification();
    const handleCopy = () => {
        navigator.clipboard.writeText(`var(${color.var})`);
        showNotification({
            title: 'Copied to clipboard',
            description: `var(${color.var}) has been copied.`,
            variant: 'success'
        });
    };
    return (
        <Card
            className="docs-colors__swatch"
            onClick={handleCopy}
            style={{cursor: 'pointer', overflow: 'hidden'}}
            title={`Copy var(${color.var})`}
        >
            <div className="docs-colors__swatch-color" style={{backgroundColor: `var(${color.var})`, height: '80px'}}/>
            <div className="docs-colors__swatch-info" style={{padding: '16px'}}>
                <div style={{fontWeight: '600', marginBottom: '4px'}}>
                    {color.name}
                </div>
                <div style={{color: 'var(--text-secondary)', fontSize: 'var(--text-body-sm)'}}>var({color.var})</div>
            </div>
        </Card>
    );
};

const Colors: React.FC = () => {
    return (
        <article className="mb-10">
            <h1 className="mb-8">Colors</h1>
            <p className="text-secondary mb-6">
                Lyco UI proudly uses a meticulously hand-crafted, perceptually uniform palette based on OKLCH color space principles (using Huetone), providing static HEX tokens. Unlike many systems, it entirely avoids automated SCSS
                white/black mixing, guaranteeing zero chroma-loss and perfect vibrancy across the entire 50-950 scale. This means all colors at the same "step" share the exact same perceived lightness and chroma, providing perfect contrast
                regardless of hue.
            </p>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Semantic Colors</h2>
                <p className="text-secondary mb-6">
                    Use these variables for expressing intent and state. They map directly to our base color palette (e.g., Primary is Blue, Success is Green, Warning is Amber, Danger is Red, Info is Blue). Note that Primary and Secondary
                    are semantic states too.
                </p>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '32px'}}>
                    {semanticColors.map(color => (
                        <SemanticColorSwatch key={color.name} color={color}/>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="mt-12 mb-6">Base Palette</h2>
                <p className="text-secondary mb-8">
                    The core hues used across the library. These are built from OKLCH values with a consistent chroma of 0.20 (vibrant).
                    Step 500 is the luminous base color.
                </p>

                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {hues.map(hue => (
                        <div key={hue} className="docs-colors__palette-row mb-1" style={{display: 'flex', alignItems: 'center'}}>
                            <span className="docs-colors__palette-title" style={{width: '80px', fontWeight: 'bold'}}>{hue}</span>
                            <div className="docs-colors__palette-steps" style={{display: 'grid', gridTemplateColumns: 'repeat(11, 1fr)', flex: 1, gap: '4px'}}>
                                {lightnessSteps.map(step => {
                                    const colorVar = `--${hue}-${step}`;
                                    let textColor = 'var(--color-carbon)';
                                    if (step >= 600) textColor = 'var(--white)';
                                    else if (step === 500) textColor = getContrastColor(hue);

                                    return (
                                        <ColorSwatch
                                            key={step}
                                            colorVar={colorVar}
                                            label={step}
                                            textColor={textColor}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="mt-12 mb-6">Secondary Colors</h2>
                <p className="text-secondary mb-8">
                    Our secondary palette for backgrounds, surfaces, and typography. From the deep, rich 'void' to the crisp 'paper', these named tokens form the structural foundation of our UI.
                </p>

                <div className="docs-colors__palette-row mb-1" style={{display: 'flex', alignItems: 'center'}}>
                    <span className="docs-colors__palette-title" style={{width: '80px', fontWeight: 'bold'}}>Secondary</span>
                    <div className="docs-colors__palette-steps" style={{display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', flex: 1, gap: '4px'}}>
                        {secondaryColors.map((name) => {
                            const colorVar = `--color-${name}`;
                            const isLightSecondary = ['mist', 'bone', 'paper', 'white'].includes(name);
                            return (
                                <ColorSwatch
                                    key={name}
                                    colorVar={colorVar}
                                    label={name}
                                    textColor={isLightSecondary ? 'var(--color-carbon)' : 'var(--white)'}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="mt-12 mb-6">Color Utilities</h2>
                <p className="text-secondary mb-6">
                    Lyco UI provides a comprehensive suite of generated color utilities. Every color in the palette (semantic, neutral, and base scale) is available for text, backgrounds, and borders.
                </p>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell isHeader>Class Format</TableCell>
                            <TableCell isHeader>Category / Property</TableCell>
                            <TableCell isHeader>Description / Example</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow hover>
                            <TableCell><Code inline language="css">{".text-{color}-{step}"}</Code></TableCell>
                            <TableCell><Badge variant="secondary">Text Color</Badge></TableCell>
                            <TableCell>Applies <Code inline>{"color: var(--{color}-{step}) !important;"}</Code>. Example: <Code inline>text-blue-500</Code></TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell><Code inline language="css">{".bg-{color}-{step}"}</Code></TableCell>
                            <TableCell><Badge variant="secondary">Background</Badge></TableCell>
                            <TableCell>Applies <Code inline>{"background-color: var(--{color}-{step}) !important;"}</Code>. Example: <Code inline>bg-red-500</Code></TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell><Code inline language="css">{".border-{color}-{step}"}</Code></TableCell>
                            <TableCell><Badge variant="secondary">Border Color</Badge></TableCell>
                            <TableCell>Applies <Code inline>{"border-color: var(--{color}-{step}) !important;"}</Code>. Example: <Code inline>border-green-400</Code></TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell><Code inline language="css">{".text-{name}"}</Code> / <Code inline language="css">{".bg-{name}"}</Code></TableCell>
                            <TableCell><Badge variant="secondary">Semantic & Neutral</Badge></TableCell>
                            <TableCell>Standard properties for semantics and neutrals. Examples: <Code inline>text-primary</Code>, <Code inline>bg-void</Code></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <h3 className="mt-8 mb-4">State Variants (Hover & Active)</h3>
                <p className="text-secondary mb-6">
                    Use pseudo-class modifiers to easily style interactive states. Remember to escape colons if used in vanilla CSS selectors, but in HTML simply write them as-is (e.g., <Code inline language="html">class="hover:bg-blue-500"</Code>).
                </p>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell isHeader>Class Format</TableCell>
                            <TableCell isHeader>Category / Property</TableCell>
                            <TableCell isHeader>Description / Example</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow hover>
                            <TableCell><Code inline language="css">{".hover\\:text-{color}"}</Code></TableCell>
                            <TableCell><Badge variant="secondary">Hover Text</Badge></TableCell>
                            <TableCell>Applies text color on hover. Example: <Code inline language="html">{`<div class="hover:text-primary">`}</Code></TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell><Code inline language="css">{".hover\\:bg-{color}"}</Code></TableCell>
                            <TableCell><Badge variant="secondary">Hover Background</Badge></TableCell>
                            <TableCell>Applies background color on hover. Example: <Code inline language="html">{`<button class="bg-blue-500 hover:bg-blue-600">`}</Code></TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell><Code inline language="css">{".active\\:bg-{name}"}</Code></TableCell>
                            <TableCell><Badge variant="secondary">Active Background</Badge></TableCell>
                            <TableCell>Applies active background to semantic colors. Example: <Code inline language="html">{`<button class="active:bg-primary">`}</Code></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>
        </article>
    );
};

export default Colors;
