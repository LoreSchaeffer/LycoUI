import React, { useState } from 'react';
import { PiCheckBold } from 'react-icons/pi';
import './FoundationDocs.scss';

const fontSizes = ['caption', 'body-sm', 'body-lg', 'subheading', 'heading-sm', 'heading', 'heading-lg', 'display'];
const fontWeights = ['regular', 'medium', 'semibold', 'bold'];
const fontFamilies = ['base', 'mono'];

export const TypographyDoc: React.FC = () => {
    return (
        <article className="docs-foundation">
            <h1 className="docs-foundation__title">Typography</h1>
            <p className="docs-foundation__description">
                Our typography system uses geometric sans-serif for standard text and monospaced fonts for code. Variables exist for font families, sizes, weights, line-heights (leading), and letter-spacing (tracking).
            </p>

            <section className="docs-foundation__section">
                <h2 className="docs-foundation__subtitle">Font Sizes</h2>
                <div className="docs-foundation__list">
                    {fontSizes.map(size => {
                        const cssVar = `--text-${size}`;
                        const [copied, setCopied] = useState(false);
                        const handleCopy = () => {
                            navigator.clipboard.writeText(`var(${cssVar})`);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                        };

                        return (
                            <div
                                key={size}
                                className="docs-foundation__row docs-foundation__row--interactive"
                                onClick={handleCopy}
                                title={`Copy var(${cssVar})`}
                            >
                                <div className="docs-foundation__row-preview">
                                    <span style={{ fontSize: `var(${cssVar})`, lineHeight: `var(--leading-${size})`, letterSpacing: `var(--tracking-${size})` }}>
                                        Ag
                                    </span>
                                </div>
                                <div className="docs-foundation__row-info">
                                    <span className="docs-foundation__row-name">
                                        text-{size}
                                        {copied && <PiCheckBold style={{ marginLeft: 8, color: 'var(--color-success)' }} />}
                                    </span>
                                    <span className="docs-foundation__row-value">var({cssVar})</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="docs-foundation__section">
                <h2 className="docs-foundation__subtitle">Font Weights</h2>
                <div className="docs-foundation__grid">
                    {fontWeights.map(weight => {
                        const cssVar = `--font-weight-${weight}`;
                        const [copied, setCopied] = useState(false);
                        const handleCopy = () => {
                            navigator.clipboard.writeText(`var(${cssVar})`);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                        };

                        return (
                            <div
                                key={weight}
                                className="docs-foundation__card docs-foundation__card--interactive"
                                onClick={handleCopy}
                                title={`Copy var(${cssVar})`}
                            >
                                <div className="docs-foundation__card-visual" style={{ minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ fontSize: 'var(--text-heading-sm)', fontWeight: `var(${cssVar})` }}>Aa</span>
                                </div>
                                <div className="docs-foundation__card-info">
                                    <span className="docs-foundation__card-name">
                                        font-weight-{weight}
                                        {copied && <PiCheckBold style={{ marginLeft: 8, color: 'var(--color-success)' }} />}
                                    </span>
                                    <span className="docs-foundation__card-value">var({cssVar})</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="docs-foundation__section">
                <h2 className="docs-foundation__subtitle">Font Families</h2>
                <div className="docs-foundation__grid">
                    {fontFamilies.map(family => {
                        const cssVar = `--font-family-${family}`;
                        const [copied, setCopied] = useState(false);
                        const handleCopy = () => {
                            navigator.clipboard.writeText(`var(${cssVar})`);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                        };

                        return (
                            <div
                                key={family}
                                className="docs-foundation__card docs-foundation__card--interactive"
                                onClick={handleCopy}
                                title={`Copy var(${cssVar})`}
                            >
                                <div className="docs-foundation__card-visual" style={{ minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ fontSize: 'var(--text-heading-sm)', fontFamily: `var(${cssVar})` }}>Aa</span>
                                </div>
                                <div className="docs-foundation__card-info">
                                    <span className="docs-foundation__card-name">
                                        font-family-{family}
                                        {copied && <PiCheckBold style={{ marginLeft: 8, color: 'var(--color-success)' }} />}
                                    </span>
                                    <span className="docs-foundation__card-value">var({cssVar})</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </article>
    );
};

export default TypographyDoc;
