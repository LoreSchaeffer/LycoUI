import {Select} from '../Select/Select';

interface CodeToolbarProps {
    language: string;
    languages: string[];
    showCopy: boolean;
    showDownload: boolean;
    showLanguageSelector: boolean;
    copied: boolean;
    onLanguageChange: (language: string) => void;
    onCopy: () => void;
    onDownload: () => void;
}

export function CodeToolbar({language, languages, showCopy, showDownload, showLanguageSelector, copied, onLanguageChange, onCopy, onDownload}: CodeToolbarProps) {
    return <div className="code-header">
        <div className="code-header-left">
            {showLanguageSelector ? <Select className="code-lang-select" size="sm" value={language} onChange={value => onLanguageChange(String(value))} options={languages.map(value => ({label: value, value}))}/> : <span className="code-lang-label">{language}</span>}
        </div>
        <div className="code-header-right">
            {showCopy && <button type="button" className={`code-action${copied ? ' is-copied' : ''}`} onClick={onCopy} title="Copy code" aria-label="Copy code">Copy</button>}
            {showDownload && <button type="button" className="code-action" onClick={onDownload} title="Download code" aria-label="Download code">Download</button>}
        </div>
    </div>;
}

