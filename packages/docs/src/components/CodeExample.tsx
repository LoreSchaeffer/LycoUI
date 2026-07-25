import './CodeExample.scss';
import React, {type CSSProperties, useCallback, useMemo, useState} from 'react';
import {FiCheck, FiCopy} from 'react-icons/fi';
import clsx from 'clsx';
import {SyntaxHighlighter} from "./syntax/SyntaxHighlighter.tsx";
import {renderToStaticMarkup} from "react-dom/server";

const formatHtml = (html: string): string => {
    let indentLevel = 0;
    const tab = '  ';

    return html
        .replace(/>\s+</g, '><')
        .replace(/></g, '>\n<')
        .split('\n')
        .map((line) => {
            const isClosing = line.match(/^<\//);
            const isSelfClosing = line.match(/\/>$/) || line.match(/^<(input|img|br|hr|meta|link)/);
            const hasClosingTagOnSameLine = line.match(/<\/[^>]+>$/);
            const isOpening = line.match(/^<[^/]/) && !isSelfClosing && !hasClosingTagOnSameLine;

            if (isClosing) indentLevel = Math.max(indentLevel - 1, 0);

            const currentIndent = tab.repeat(indentLevel);

            if (isOpening) indentLevel++;

            return `${currentIndent}${line}`;
        })
        .join('\n');
};

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

        return htmlHint
            ? `<!-- ${htmlHint.trim()} -->\n${beautifiedHtml}`
            : beautifiedHtml;
    }, [children, htmlHint]);

    const activeCode = activeTab === 'react' ? reactCode.trim() : generatedHtml;

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
        <section className="lyco-docs-code-example">
            <h2 className="lyco-docs-code-example__title">{title}</h2>

            {description && (
                <div className="lyco-docs-code-example__description">
                    {description}
                </div>
            )}

            <div className={clsx('lyco-docs-code-example__preview', `lyco-layout-${previewLayout}`)} style={previewStyles}>
                {children}
            </div>

            <div className="lyco-docs-code-example__toolbar">
                <div className="lyco-docs-code-example__tabs">
                    <button
                        type="button"
                        className={clsx('lyco-docs-code-example__tab', activeTab === 'react' && 'is-active')}
                        onClick={() => setActiveTab('react')}
                        aria-pressed={activeTab === 'react'}
                    >
                        React
                    </button>
                    <button
                        type="button"
                        className={clsx('lyco-docs-code-example__tab', activeTab === 'html' && 'is-active')}
                        onClick={() => setActiveTab('html')}
                        aria-pressed={activeTab === 'html'}
                    >
                        HTML
                    </button>
                </div>

                <button
                    type="button"
                    className="lyco-docs-code-example__copy"
                    onClick={handleCopy}
                    aria-label="Copy code to clipboard"
                    title="Copy code"
                >
                    {isCopied ? <FiCheck className="lyco-text-success"/> : <FiCopy/>}
                </button>
            </div>

            <div className="lyco-docs-code-example__code-wrapper">
                <SyntaxHighlighter
                    code={activeCode}
                    language={activeTab === 'react' ? 'tsx' : 'html'}
                />
            </div>
        </section>
    );
};