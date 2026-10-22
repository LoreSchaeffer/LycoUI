import './Code.scss';
import type {ChangeEvent, HTMLAttributes, UIEvent} from 'react';
import {forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import {CodeToolbar} from './CodeToolbar';
import {CodeEditor} from './CodeEditor';
import {useCodeHighlight} from './useCodeHighlight';


/**
 * CodeProps.
 */
export interface CodeProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
    /** The code snippet to display */
    code?: string;
    /** Initial code if used in uncontrolled editable mode */
    defaultCode?: string;
    /** Language of the code */
    language?: string;
    /** Theme to use for syntax highlighting (requires shiki) */
    theme?: string;
    /** Whether the code is editable (only for block level) */
    editable?: boolean;
    /** Renders the code as inline text instead of a block */
    inline?: boolean;
    /** Shows a copy button in the header (only for block level) */
    showCopy?: boolean;
    /** Shows a download button in the header (only for block level) */
    showDownload?: boolean;
    /** Shows a language selector in the header (only for block level) */
    showLanguageSelector?: boolean;
    /** Supported languages in the selector */
    supportedLanguages?: string[];
    /** Name of the file for the download button */
    fileName?: string;
    /** The number of spaces per tab */
    tabSize?: number;
    /** Callback fired when code changes (only works if editable=true) */
    onChange?: (code: string) => void;
}


/**
 * Code component.
 */
export const Code = memo(forwardRef<HTMLElement, CodeProps>((
    {
        className,
        code: propCode,
        defaultCode = '',
        language: propLanguage = 'javascript',
        theme = 'lyco-dark',
        editable = false,
        inline = false,
        showCopy = false,
        showDownload = false,
        showLanguageSelector = false,
        supportedLanguages = ['javascript', 'typescript', 'html', 'css', 'json', 'bash', 'tsx', 'jsx', 'scss'],
        fileName = 'snippet',
        tabSize = 2,
        onChange,
        children,
        ...props
    },
    ref
) => {
    const [internalCode, setInternalCode] = useState(propCode ?? (typeof children === 'string' ? children : defaultCode));
    const [internalLang, setInternalLang] = useState(propLanguage);

    const [isCopied, setIsCopied] = useState(false);
    const copyTimer = useRef<number | undefined>(undefined);

    const isControlled = propCode !== undefined;
    const rawCode = isControlled ? propCode : internalCode;

    const currentCode = useMemo(() => {
        if (!rawCode) return '';
        return rawCode.replace(/^( {4})+/gm, (match) => {
            return ' '.repeat((match.length / 4) * tabSize);
        });
    }, [rawCode, tabSize]);

    const {html: highlightedHtml, status: highlightStatus} = useCodeHighlight(currentCode, internalLang, theme, supportedLanguages);

    useEffect(() => {
        setInternalLang(propLanguage);
    }, [propLanguage]);

    useEffect(() => () => {
        if (copyTimer.current) window.clearTimeout(copyTimer.current);
    }, []);

    const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        const newCode = e.target.value;
        if (!isControlled) {
            setInternalCode(newCode);
        }
        onChange?.(newCode);
    }, [isControlled, onChange]);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(currentCode);
            setIsCopied(true);
            if (copyTimer.current) window.clearTimeout(copyTimer.current);
            copyTimer.current = window.setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    }, [currentCode]);

    const handleDownload = useCallback(() => {
        const blob = new Blob([currentCode], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.${internalLang}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [currentCode, fileName, internalLang]);

    const handleScroll = useCallback((e: UIEvent<HTMLTextAreaElement>) => {
        const pre = e.currentTarget.nextElementSibling as HTMLPreElement | null;
        if (pre) {
            pre.scrollTop = e.currentTarget.scrollTop;
            pre.scrollLeft = e.currentTarget.scrollLeft;
        }
    }, []);

    const hasHeader = !inline && (showCopy || showDownload || showLanguageSelector);

    if (inline) {
        return (
            <code
                ref={ref}
                className={clsx('code', 'code-inline', className)}
                {...props}
            >
                {currentCode}
            </code>
        );
    }

    return (
        <div
            ref={ref as React.Ref<HTMLDivElement>}
            className={clsx(
                'code',
                'code-block',
                editable && 'is-editable',
                className
            )}
            data-language={internalLang}
            style={{'--lyco-code-tab-size': tabSize, ...props.style} as React.CSSProperties}
            {...props}
        >
            {hasHeader && <CodeToolbar language={internalLang} languages={supportedLanguages} showCopy={showCopy} showDownload={showDownload} showLanguageSelector={showLanguageSelector} copied={isCopied} onLanguageChange={setInternalLang} onCopy={handleCopy} onDownload={handleDownload}/>}
            <CodeEditor code={currentCode} editable={editable} html={highlightedHtml} status={highlightStatus} onChange={handleChange} onScroll={handleScroll}/>
        </div>
    );
}));
Code.displayName = 'Code';

