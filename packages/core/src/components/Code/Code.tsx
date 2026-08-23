import './Code.scss';
import { forwardRef, useEffect, useState, useRef, useCallback } from 'react';
import type { HTMLAttributes, ChangeEvent, UIEvent } from 'react';
import clsx from 'clsx';
import { Select } from '../Select/Select';
import { getShikiHighlighter } from '../../utils/shiki.config';
// Shiki types (if available) for better developer experience.
// Shiki is an optional peer dependency.


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
  /** Callback fired when code changes (only works if editable=true) */
  onChange?: (code: string) => void;
}


// Simple SVG Icons
const CopyIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const Code = forwardRef<HTMLElement, CodeProps>((
  {
    className,
    code: propCode,
    defaultCode = '',
    language: propLanguage = 'javascript',
    theme = 'andromeeda',
    editable = false,
    inline = false,
    showCopy = false,
    showDownload = false,
    showLanguageSelector = false,
    supportedLanguages = ['javascript', 'typescript', 'html', 'css', 'json', 'bash', 'tsx', 'jsx', 'scss'],
    fileName = 'snippet',
    onChange,
    children, // If children is provided and code isn't, use children as string
    ...props
  },
  ref
) => {
  const [internalCode, setInternalCode] = useState(propCode ?? (typeof children === 'string' ? children : defaultCode));
  const [internalLang, setInternalLang] = useState(propLanguage);
  
  const [highlightedHtml, setHighlightedHtml] = useState<string>('');
  const [highlightStatus, setHighlightStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [isCopied, setIsCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isControlled = propCode !== undefined;
  const currentCode = isControlled ? propCode : internalCode;

  // Highlight code on change
  useEffect(() => {
    let isMounted = true;

    const processCode = async () => {
      try {
        setHighlightStatus('loading');
        
        // We initialize the highlighter with our supported languages.
        // The getShikiHighlighter function internally handles caching and the 'lyco-dark' theme setup.
        const highlighter = await getShikiHighlighter(supportedLanguages);
        
        const html = highlighter.codeToHtml(currentCode, {
          lang: internalLang,
          theme: 'lyco-dark', // Use our custom OKLCH theme!
        });

        if (isMounted) {
          setHighlightedHtml(html);
          setHighlightStatus('success');
        }
      } catch (error) {
        console.warn('Syntax highlighting failed or shiki is not installed:', error);
        if (isMounted) {
          setHighlightStatus('error');
        }
      }
    };

    processCode();

    return () => {
      isMounted = false;
    };
  }, [currentCode, internalLang, theme, supportedLanguages]);

  // Handle external language changes
  useEffect(() => {
    setInternalLang(propLanguage);
  }, [propLanguage]);

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
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }, [currentCode]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([currentCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.${internalLang}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [currentCode, fileName, internalLang]);

  // Sync scroll between textarea and pre
  const handleScroll = useCallback((e: UIEvent<HTMLTextAreaElement>) => {
    const pre = e.currentTarget.nextElementSibling as HTMLPreElement | null;
    if (pre) {
      pre.scrollTop = e.currentTarget.scrollTop;
      pre.scrollLeft = e.currentTarget.scrollLeft;
    }
  }, []);

  // Check if we need the header
  const hasHeader = !inline && (showCopy || showDownload || showLanguageSelector);

  // If inline, render a simple <code> tag
  if (inline) {
    return (
      <code 
        ref={ref}
        className={clsx('code', 'code--inline', className)}
        {...props}
      >
        {currentCode}
      </code>
    );
  }

  return (
    <div
      ref={ref as any}
      className={clsx(
        'code',
        'code--block',
        editable && 'is-editable',
        className
      )}
      data-language={internalLang}
      {...props}
    >
      {hasHeader && (
        <div className="code__header">
          <div className="code__header-left">
            {showLanguageSelector ? (
              <Select 
                className="code__lang-select"
                size="sm"
                value={internalLang}
                onChange={(val) => setInternalLang(String(val))}
                options={supportedLanguages.map(lang => ({ label: lang, value: lang }))}
              />
            ) : (
              <span className="code__lang-label">{internalLang}</span>
            )}
          </div>
          <div className="code__header-right">
            {showCopy && (
              <button 
                type="button" 
                className={clsx('code__action', isCopied && 'is-copied')}
                onClick={handleCopy}
                title="Copy code"
                aria-label="Copy code"
              >
                <span className="icon-default"><CopyIcon /></span>
                <span className="icon-success"><CheckIcon /></span>
              </button>
            )}
            {showDownload && (
              <button 
                type="button" 
                className="code__action" 
                onClick={handleDownload}
                title="Download code"
                aria-label="Download code"
              >
                <DownloadIcon />
              </button>
            )}
          </div>
        </div>
      )}

      <div className="code__body">
        {editable && (
          <textarea
            ref={textareaRef}
            className="code__textarea"
            value={currentCode}
            onChange={handleChange}
            onScroll={handleScroll}
            spellCheck={false}
            aria-label="Code editor"
          />
        )}
        
        {highlightedHtml && highlightStatus === 'success' ? (
          <div 
            className="code__highlight"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            aria-hidden={editable}
          />
        ) : (
          <div className="code__highlight">
            <pre style={{ color: highlightStatus === 'loading' ? 'transparent' : undefined }}>
              <code>{currentCode}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
});

Code.displayName = 'Code';
