import {type ReactNode} from 'react';
import clsx from 'clsx';
import {pageWindow} from './pagination-model';
interface Props { currentPage: number; totalPages: number; siblingCount: number; disabled: boolean; prevIcon: ReactNode; nextIcon: ReactNode; onChange: (page: number) => void; }
export const PaginationStandard = ({currentPage, totalPages, siblingCount, disabled, prevIcon, nextIcon, onChange}: Props) => <ul className="pagination-list">
    <li className="pagination-item"><button className={clsx('pagination-btn', 'pagination-btn-prev', (disabled || currentPage <= 1) && 'is-disabled')} onClick={() => onChange(currentPage - 1)} disabled={disabled || currentPage <= 1} aria-label="Previous page">{prevIcon}</button></li>
    {pageWindow(totalPages, currentPage, siblingCount).map((page, index) => typeof page === 'string' ? <li key={`${page}-${index}`} className="pagination-item"><span className="pagination-link pagination-ellipsis" aria-hidden="true">...</span></li> : <li key={page} className="pagination-item"><button className={clsx('pagination-link', page === currentPage && 'is-active', disabled && 'is-disabled')} onClick={() => onChange(page)} aria-current={page === currentPage ? 'page' : undefined} aria-label={`Page ${page}`} disabled={disabled}>{page}</button></li>)}
    <li className="pagination-item"><button className={clsx('pagination-btn', 'pagination-btn-next', (disabled || currentPage >= totalPages) && 'is-disabled')} onClick={() => onChange(currentPage + 1)} disabled={disabled || currentPage >= totalPages} aria-label="Next page">{nextIcon}</button></li>
</ul>;

