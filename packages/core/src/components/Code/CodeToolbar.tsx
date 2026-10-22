import {Select} from '../Select/Select';

const CopyIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
</svg>;

const DownloadIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v12"/>
    <path d="m7 10 5 5 5-5"/>
    <path d="M5 21h14"/>
</svg>;

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
            {showCopy && <button type="button" className={`code-action${copied ? ' is-copied' : ''}`} onClick={onCopy} title="Copy" aria-label="Copy"><CopyIcon/></button>}
            {showDownload && <button type="button" className="code-action" onClick={onDownload} title="Download" aria-label="Download"><DownloadIcon/></button>}
        </div>
    </div>;
}

