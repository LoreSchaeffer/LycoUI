import React, {useEffect, useRef, useState} from 'react';
import {Badge, Card, Code, getContrastColor, Switch, Table, TableBody, TableCell, TableHead, TableRow, useNotification} from '@loreschaeffer/lyco-ui';

const hues = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'teal', 'cyan', 'blue', 'indigo', 'purple', 'fuchsia', 'pink'];
const lightnessSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const neutralSteps = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950];
const neutralThemes = [
    {name: 'Slate', colors: ['#ffffff', '#e5e5e6', '#dbdee3', '#d0d6e0', '#c1c7d1', '#b2b8c2', '#9ea4ad', '#8a8f98', '#767b83', '#62666d', '#575b61', '#4c4f55', '#42454a', '#383b3f', '#2e3035', '#23252a', '#1d1e21', '#161718', '#0f1011']},
    {name: 'Gray', colors: ['#fbfbfb', '#eeeeee', '#e3e3e3', '#d8d8d8', '#cbcbcb', '#bdbdbd', '#aaaaaa', '#969696', '#838383', '#707070', '#636363', '#555555', '#494949', '#3d3d3d', '#333333', '#292929', '#222222', '#1a1a1a', '#101010']},
    {name: 'Zinc', colors: ['#fbfaf9', '#f4f1ee', '#ede9e4', '#e6e0da', '#dcd4cd', '#d2c8bf', '#bdb2a9', '#a89c92', '#958980', '#81766e', '#726861', '#635a54', '#564e49', '#49423e', '#3d3734', '#302c2a', '#262322', '#1c1a19', '#100f0e']}
];

const semanticColors = [
    {name: 'Primary', var: '--color-primary'},
    {name: 'Success', var: '--color-success'},
    {name: 'Warning', var: '--color-warning'},
    {name: 'Danger', var: '--color-danger'},
    {name: 'Info', var: '--color-info'},
    {name: 'Secondary', var: '--color-secondary'}
];

interface ColorSwatchProps {
    colorVar: string;
    label: string | number;
    textColor?: string;
    colorValue?: string;
    hexValue?: string;
    copyHexValues: boolean;
}

const rgbToHex = (value: string) => {
    const match = value.match(/\d+/g);
    if (!match || match.length < 3) return value;
    return `#${match.slice(0, 3).map(channel => Number(channel).toString(16).padStart(2, '0')).join('')}`;
};

const ColorSwatch: React.FC<ColorSwatchProps> = ({colorVar, label, textColor, colorValue, hexValue, copyHexValues}) => {
    const {showNotification} = useNotification();
    const swatchRef = useRef<HTMLDivElement>(null);
    const [resolvedHex, setResolvedHex] = useState(hexValue);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (!resolvedHex && swatchRef.current) {
            setResolvedHex(rgbToHex(getComputedStyle(swatchRef.current).backgroundColor));
        }
    };

    const handleCopy = () => {
        const copyValue = copyHexValues ? (resolvedHex || hexValue || colorValue || '') : `var(${colorVar})`;
        navigator.clipboard.writeText(copyValue);
        showNotification({
            title: 'Copied to clipboard',
            description: `${copyValue} has been copied.`,
            variant: 'success'
        });
    };

    return (
        <Card
            className="docs-colors__palette-step"
            ref={swatchRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                backgroundColor: colorValue || `var(${colorVar})`,
                color: textColor || 'var(--neutral-950)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '48px',
                border: 'none',
                boxShadow: 'none',
                borderRadius: 'var(--radius-sm)'
            }}
            title={`Copy ${copyHexValues ? (resolvedHex || hexValue || 'HEX value') : `var(${colorVar})`}`}
            onClick={handleCopy}
            role="button"
            tabIndex={0}
        >
            <span className="docs-colors__step-label" style={{fontSize: 'var(--text-caption)'}}>{isHovered && resolvedHex ? resolvedHex : label}</span>
        </Card>
    );
};

const SemanticColorSwatch: React.FC<{ color: { name: string; var: string } }> = ({color}) => {
    const {showNotification} = useNotification();
    const colorRef = useRef<HTMLDivElement>(null);
    const [semanticHex, setSemanticHex] = useState('');

    useEffect(() => {
        if (colorRef.current) {
            setSemanticHex(rgbToHex(getComputedStyle(colorRef.current).backgroundColor));
        }
    }, []);

    const handleCopyVar = () => {
        navigator.clipboard.writeText(`var(${color.var})`);
        showNotification({
            title: 'Copied to clipboard',
            description: `var(${color.var}) has been copied.`,
            variant: 'success'
        });
    };

    const handleCopyHex = () => {
        navigator.clipboard.writeText(semanticHex);
        showNotification({
            title: 'Copied to clipboard',
            description: `${semanticHex} has been copied.`,
            variant: 'success'
        });
    };

    const handleValueKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, copy: () => void) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            copy();
        }
    };

    return (
        <Card
            className="docs-colors__swatch"
            style={{cursor: 'pointer', overflow: 'hidden'}}
        >
            <div ref={colorRef} className="docs-colors__swatch-color" style={{backgroundColor: `var(${color.var})`, height: '80px'}}/>
            <div className="docs-colors__swatch-info" style={{padding: '16px 16px 14px'}}>
                <div style={{fontWeight: '700', fontSize: 'var(--text-body)', marginBottom: '12px', letterSpacing: '-0.01em'}}>
                    {color.name}
                </div>
                <div
                    className="docs-colors__semantic-value"
                    onClick={handleCopyVar}
                    title={`Copy var(${color.var})`}
                    aria-label={`Copy var(${color.var})`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={event => handleValueKeyDown(event, handleCopyVar)}
                    style={{display: 'flex', alignItems: 'baseline', gap: '8px', color: 'var(--text-secondary)', fontSize: 'var(--text-body-sm)', fontFamily: 'var(--font-mono)', cursor: 'copy', padding: '5px 0', borderBottom: '1px solid var(--border-subtle)'}}
                >var({color.var})</div>
                <div
                    className="docs-colors__semantic-value"
                    onClick={handleCopyHex}
                    title="Copy HEX value"
                    aria-label={`Copy HEX value ${semanticHex}`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={event => handleValueKeyDown(event, handleCopyHex)}
                    style={{display: 'flex', alignItems: 'baseline', gap: '8px', color: 'var(--text-primary)', fontSize: 'var(--text-body-sm)', fontFamily: 'var(--font-mono)', fontWeight: '600', cursor: 'copy', padding: '5px 0'}}
                >{semanticHex || 'Resolving HEX value…'}</div>
            </div>
        </Card>
    );
};

const Colors: React.FC = () => {
    const [copyHexValues, setCopyHexValues] = useState(false);

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

                <div className="mb-6">
                    <Switch
                        label="Copy HEX values"
                        checked={copyHexValues}
                        onChange={event => setCopyHexValues(event.currentTarget.checked)}
                    />
                </div>

                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {hues.map(hue => (
                        <div key={hue} className="docs-colors__palette-row mb-1" style={{display: 'flex', alignItems: 'center'}}>
                            <span className="docs-colors__palette-title" style={{width: '80px', fontWeight: 'bold'}}>{hue}</span>
                            <div className="docs-colors__palette-steps" style={{display: 'grid', gridTemplateColumns: 'repeat(11, 1fr)', flex: 1, gap: '4px'}}>
                                {lightnessSteps.map(step => {
                                    const colorVar = `--${hue}-${step}`;
                                    let textColor = 'var(--neutral-950)';
                                    if (step >= 600) textColor = 'var(--white)';
                                    else if (step === 500) textColor = getContrastColor(hue);

                                    return (
                                        <ColorSwatch
                                            key={step}
                                            colorVar={colorVar}
                                            label={step}
                                            textColor={textColor}
                                            copyHexValues={copyHexValues}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="mt-12 mb-6">Neutral Palettes</h2>
                <p className="text-secondary mb-8">
                    Compare the cool Slate, neutral Gray, and warm Zinc source scales below. Each scale includes every 50-point increment from <Code inline>--neutral-50</Code> through <Code inline>--neutral-950</Code>; the active <Code inline>data-theme</Code> selects which values those aliases resolve to.
                </p>

                {neutralThemes.map(theme => (
                    <div key={theme.name} className="docs-colors__palette-row mb-3" style={{display: 'flex', alignItems: 'center'}}>
                        <span className="docs-colors__palette-title" style={{minWidth: '80px', flexShrink: 0, fontWeight: 'bold'}}>{theme.name}</span>
                        <div className="docs-colors__palette-steps" style={{display: 'grid', gridTemplateColumns: 'repeat(19, minmax(48px, 1fr))', flex: 1, minWidth: 0, overflowX: 'auto', gap: '4px'}}>
                            {neutralSteps.map((step, index) => (
                                <ColorSwatch
                                    key={step}
                                    colorVar={`--neutral-${step}`}
                                    colorValue={theme.colors[index]}
                                    label={step}
                                    textColor={step >= 600 ? 'var(--white)' : 'var(--neutral-950)'}
                                    hexValue={theme.colors[index]}
                                    copyHexValues={copyHexValues}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            <section className="mb-12">
                <h2 className="mt-12 mb-6">Neutral Themes</h2>
                <p className="text-secondary mb-6">
                    The default neutral theme is cool slate. Set <Code inline>data-theme</Code> on the document element to switch every <Code inline>--neutral-*</Code> alias globally: use <Code inline>gray</Code> for a neutral temperature or <Code inline>zinc</Code> for a warmer temperature.
                </p>
                <Code
                    language="html"
                    code={`<!doctype html>
<html data-theme="zinc">
  <!-- All var(--neutral-50) through var(--neutral-950) values use zinc. -->
</html>`}
                />
                <p className="text-secondary mt-6 mb-0">
                    Omit the attribute or use <Code inline>data-theme="slate"</Code> to use the default slate scale. Apply the attribute to <Code inline>&lt;html&gt;</Code>, rather than an individual component, so surfaces and components stay in the same neutral family.
                </p>
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
                            <TableCell><Code inline language="css">{".text-neutral-{step}"}</Code> / <Code inline language="css">{".bg-neutral-{step}"}</Code></TableCell>
                            <TableCell><Badge variant="secondary">Neutral</Badge></TableCell>
                            <TableCell>Standard properties for the active neutral theme. Examples: <Code inline>text-neutral-200</Code>, <Code inline>bg-neutral-950</Code></TableCell>
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
