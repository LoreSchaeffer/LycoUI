import './CodeExample.scss';
import React, {type CSSProperties, useCallback, useMemo, useState} from 'react';
import {FiCheck, FiCopy} from 'react-icons/fi';
import clsx from 'clsx';
import {SyntaxHighlighter} from "./syntax/SyntaxHighlighter.tsx";
import {renderToStaticMarkup} from "react-dom/server";
import {formatHtml} from "../utils/html-formatter.ts";
import {formatReact} from "../utils/react-formatter.ts";

export interface CodeExampleProps {
    title: string;
    description?: React.ReactNode;
    reactCode: string;
    htmlHint?: string;
    previewLayout?: 'row' | 'column';
    previewStyles?: CSSProperties;
    children: React.ReactNode;
}

export const CodeExample: React.FC<CodeExampleProps> = ({
                                                            title,
                                                            description,
                                                            reactCode,
                                                            htmlHint,
                                                            previewLayout = 'row',
                                                            previewStyles,
                                                            children
                                                        }) => {
    const [activeTab, setActiveTab] = useState<'react' | 'html'>('react');
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const generatedHtml = useMemo(() => {
        const rawHtml = renderToStaticMarkup(<>{children}</>);
        const beautifiedHtml = formatHtml(rawHtml);

        if (!htmlHint) return beautifiedHtml;

        const safeHtmlHint = htmlHint.replace(/-->/g, '-- >').trim();
        return `<!-- ${safeHtmlHint} -->\n${beautifiedHtml}`;
    }, [children, htmlHint]);

    const activeCode = activeTab === 'react' ? formatReact(reactCode).trim() : generatedHtml;

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(activeCode);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy code to clipboard', error);
        }
    }, [activeCode]);

    return (
        <section className="docs-code-example">
            <h2 className="docs-code-example__title">{title}</h2>

            {description && (
                <div className="docs-code-example__description">
                    {description}
                </div>
            )}

            <div className={clsx('docs-code-example__preview', `layout-${previewLayout}`)} style={previewStyles}>
                {children}
            </div>

            <div className="docs-code-example__toolbar">
                <div className="docs-code-example__tabs">
                    <button
                        type="button"
                        className={clsx('docs-code-example__tab', activeTab === 'react' && 'is-active')}
                        onClick={() => setActiveTab('react')}
                        aria-pressed={activeTab === 'react'}
                    >
                        React
                    </button>
                    <button
                        type="button"
                        className={clsx('docs-code-example__tab', activeTab === 'html' && 'is-active')}
                        onClick={() => setActiveTab('html')}
                        aria-pressed={activeTab === 'html'}
                    >
                        HTML
                    </button>
                </div>

                <button
                    type="button"
                    className="docs-code-example__copy"
                    onClick={handleCopy}
                    aria-label="Copy code to clipboard"
                    title="Copy code"
                >
                    {isCopied ? <FiCheck className="text-success"/> : <FiCopy/>}
                </button>
            </div>

            <div className="docs-code-example__code-wrapper">
                <SyntaxHighlighter
                    code={activeCode}
                    language={activeTab === 'react' ? 'tsx' : 'html'}
                />
            </div>
        </section>
    );
};