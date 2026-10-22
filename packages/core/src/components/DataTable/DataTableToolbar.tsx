import type {ReactNode} from 'react';
import {Input} from '../Input';

function SearchIcon(): React.ReactElement {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
}

function ClearIcon(): React.ReactElement {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
}

export interface DataTableToolbarProps {
    searchable: boolean;
    dragEnabled: boolean;
    searchPlaceholder: string;
    searchQuery: string;
    onSearch: (query: string) => void;
    topActions?: ReactNode;
    dragInfo?: ReactNode;
}

export function DataTableToolbar({searchable, dragEnabled, searchPlaceholder, searchQuery, onSearch, topActions, dragInfo}: DataTableToolbarProps): React.ReactElement {
    return <div className="data-table__toolbar">
        {searchable && !dragEnabled && <div className="data-table__search"><Input size="sm" placeholder={searchPlaceholder} value={searchQuery} onChange={(event) => onSearch(event.target.value)} iconStart={<SearchIcon/>} iconEnd={searchQuery ? <ClearIcon/> : undefined} onIconEndClick={searchQuery ? () => onSearch('') : undefined}/></div>}
        {!dragEnabled && topActions && <div className="data-table__toolbar-actions">{topActions}</div>}
        {dragEnabled && <div className="data-table__drag-info">{dragInfo}</div>}
    </div>;
}
