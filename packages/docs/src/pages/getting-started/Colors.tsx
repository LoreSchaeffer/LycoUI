import './Colors.scss';
import React, { useEffect, useRef, useState } from 'react';
import { PiCopyBold, PiCheckBold } from 'react-icons/pi';

const hues = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'teal', 'cyan', 'blue', 'indigo', 'purple', 'fuchsia', 'pink'];
const lightnessSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const neutralColors = ['void', 'carbon', 'obsidian', 'graphite', 'smoke', 'ash', 'fog', 'mist', 'bone', 'paper'];

const semanticColors = [
    { name: 'Primary', var: '--color-primary' },
    { name: 'Success', var: '--color-success' },
    { name: 'Warning', var: '--color-warning' },
    { name: 'Danger', var: '--color-danger' },
    { name: 'Info', var: '--color-info' }
];

interface ColorSwatchProps {
    colorVar: string;
    label: string | number;
    isDark?: boolean;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ colorVar, label, isDark }) => {
    const elRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`var(${colorVar})`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            ref={elRef}
            className="docs-colors__palette-step"
            style={{
                backgroundColor: `var(${colorVar})`,
                color: isDark ? 'var(--white)' : 'var(--black)'
            }}
            title={`Copy var(${colorVar})`}
            onClick={handleCopy}
            role="button"
            tabIndex={0}
        >
            <span className="docs-colors__step-label">{label}</span>
            <span className="docs-colors__step-hex">
                {copied ? <PiCheckBold /> : <PiCopyBold />}
                {copied ? 'Copied!' : `var(${colorVar})`}
            </span>
        </div>
    );
};

const SemanticColorSwatch: React.FC<{ color: { name: string; var: string } }> = ({ color }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(`var(${color.var})`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div
            className="docs-colors__swatch"
            onClick={handleCopy}
            style={{ cursor: 'pointer' }}
            title={`Copy var(${color.var})`}
        >
            <div className="docs-colors__swatch-color" style={{ backgroundColor: `var(${color.var})` }} />
            <div className="docs-colors__swatch-info">
                <span className="docs-colors__swatch-name">
                    {color.name}
                    {copied && <PiCheckBold style={{ marginLeft: 8, color: 'var(--color-success)' }} />}
                </span>
                <span className="docs-colors__swatch-value">var({color.var})</span>
            </div>
        </div>
    );
};

const Colors: React.FC = () => {
    return (
        <article className="docs-colors">
            <h1 className="docs-colors__title">Colors</h1>
            <p className="docs-colors__description">
                Lyco UI proudly uses a meticulously hand-crafted, perceptually uniform palette based on OKLCH color space principles (using Huetone), providing static HEX tokens. Unlike many systems, it entirely avoids automated SCSS white/black mixing, guaranteeing zero chroma-loss and perfect vibrancy across the entire 50-950 scale. This means all colors at the same "step" share the exact same perceived lightness and chroma, providing perfect contrast regardless of hue.
            </p>

            <section className="docs-colors__section">
                <h2 className="docs-colors__title">Semantic Colors</h2>
                <p className="docs-colors__description">
                    Use these variables for expressing intent and state. They map directly to our base color palette (e.g., Primary is Blue, Success is Green, Warning is Amber, Danger is Red, Info is Blue).
                </p>
                <div className="docs-colors__grid">
                    {semanticColors.map(color => (
                        <SemanticColorSwatch key={color.name} color={color} />
                    ))}
                </div>
            </section>

            <section className="docs-colors__section">
                <h2 className="docs-colors__title">Base Palette</h2>
                <p className="docs-colors__description">
                    The core hues used across the library. These are built from OKLCH values with a consistent chroma of 0.20 (vibrant).
                    Step 500 is the luminous base color.
                </p>

                {hues.map(hue => (
                    <div key={hue} className="docs-colors__palette-row">
                        <span className="docs-colors__palette-title">{hue}</span>
                        <div className="docs-colors__palette-steps">
                            {lightnessSteps.map(step => {
                                const colorVar = `--${hue}-${step}`;
                                const isDark = step >= 500;
                                return (
                                    <ColorSwatch
                                        key={step}
                                        colorVar={colorVar}
                                        label={step}
                                        isDark={isDark}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ))}
            </section>

            <section className="docs-colors__section">
                <h2 className="docs-colors__title">Neutral Colors</h2>
                <p className="docs-colors__description">
                    Our neutral palette for backgrounds, surfaces, and typography. From the deep, rich 'void' to the crisp 'paper', these named tokens form the structural foundation of our UI.
                </p>

                <div className="docs-colors__palette-row">
                    <span className="docs-colors__palette-title">Neutral</span>
                    <div className="docs-colors__palette-steps">
                        {neutralColors.map((name, index) => {
                            const colorVar = `--color-${name}`;
                            const isDark = index < 6; // void through ash are dark
                            return (
                                <ColorSwatch
                                    key={name}
                                    colorVar={colorVar}
                                    label={name}
                                    isDark={isDark}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>
        </article>
    );
};

export default Colors;
