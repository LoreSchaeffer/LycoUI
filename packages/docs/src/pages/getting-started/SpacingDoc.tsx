import React, { useState } from 'react';
import { PiCopyBold, PiCheckBold } from 'react-icons/pi';
import './FoundationDocs.scss';

const spacingSteps = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '12', '14', '16', '20', '24', '32'];

export const SpacingDoc: React.FC = () => {
    return (
        <article className="docs-foundation">
            <h1 className="docs-foundation__title">Spacing</h1>
            <p className="docs-foundation__description">
                Our spacing scale is built on a strict 4-point baseline grid. Use these variables for margin, padding, and gaps to ensure consistent rhythm across the UI.
            </p>

            <section className="docs-foundation__section">
                <div className="docs-foundation__grid">
                    {spacingSteps.map(step => {
                        const cssVar = `--spacing-${step}`;
                        const [copied, setCopied] = useState(false);
                        const handleCopy = () => {
                            navigator.clipboard.writeText(`var(${cssVar})`);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                        };

                        return (
                            <div
                                key={step}
                                className="docs-foundation__card docs-foundation__card--interactive"
                                onClick={handleCopy}
                                title={`Copy var(${cssVar})`}
                            >
                                <div className="docs-foundation__card-visual" style={{ minHeight: 80, display: 'flex', alignItems: 'center' }}>
                                    <div style={{ width: `var(${cssVar})`, height: '24px', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-sm)' }} />
                                </div>
                                <div className="docs-foundation__card-info">
                                    <span className="docs-foundation__card-name">
                                        spacing-{step}
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

export default SpacingDoc;
