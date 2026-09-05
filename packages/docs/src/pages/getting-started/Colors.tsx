import React from 'react';
import {Badge, Card, getContrastColor, Table, TableBody, TableCell, TableHead, TableRow, useNotification} from '@loreschaeffer/lyco-ui';

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
                <h2 className="mt-12 mb-6">Text Colors</h2>
                <p className="text-secondary mb-6">
                    Quickly apply semantic text colors using these classes.
                </p>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell isHeader>Class</TableCell>
                            <TableCell isHeader>Property</TableCell>
                            <TableCell isHeader>Example</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow hover>
                            <TableCell><Badge variant="secondary">.text-primary</Badge></TableCell>
                            <TableCell><Badge variant="secondary">color: var(--color-text-primary)</Badge></TableCell>
                            <TableCell><span className="text-primary">Primary Text</span></TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell><Badge variant="secondary">.text-secondary</Badge></TableCell>
                            <TableCell><Badge variant="secondary">color: var(--color-text-secondary)</Badge></TableCell>
                            <TableCell><span className="text-secondary">Secondary Text</span></TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell><Badge variant="secondary">.text-muted</Badge></TableCell>
                            <TableCell><Badge variant="secondary">color: var(--color-text-muted)</Badge></TableCell>
                            <TableCell><span className="text-muted">Muted Text</span></TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell><Badge variant="secondary">.text-success</Badge></TableCell>
                            <TableCell><Badge variant="secondary">color: var(--color-text-success)</Badge></TableCell>
                            <TableCell><span className="text-success">Success Text</span></TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell><Badge variant="secondary">.text-warning</Badge></TableCell>
                            <TableCell><Badge variant="secondary">color: var(--color-text-warning)</Badge></TableCell>
                            <TableCell><span className="text-warning">Warning Text</span></TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell><Badge variant="secondary">.text-danger</Badge></TableCell>
                            <TableCell><Badge variant="secondary">color: var(--color-text-danger)</Badge></TableCell>
                            <TableCell><span className="text-danger">Danger Text</span></TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell><Badge variant="secondary">.text-info</Badge></TableCell>
                            <TableCell><Badge variant="secondary">color: var(--color-text-info)</Badge></TableCell>
                            <TableCell><span className="text-info">Info Text</span></TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell><Badge variant="secondary">.text-white</Badge></TableCell>
                            <TableCell><Badge variant="secondary">color: var(--color-text-white)</Badge></TableCell>
                            <TableCell><span className="text-white">White Text</span></TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell><Badge variant="secondary">.text-black</Badge></TableCell>
                            <TableCell><Badge variant="secondary">color: var(--color-text-black)</Badge></TableCell>
                            <TableCell><span className="text-black">Black Text</span></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>
        </article>
    );
};

export default Colors;
