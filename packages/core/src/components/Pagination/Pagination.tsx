import './Pagination.scss';
import {type CSSProperties, forwardRef, type HTMLAttributes, type ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import type {FullVariant, SizeVariant} from '../../types/types.ts';
import {getContrastColor} from '../../utils/theme.ts';

/**
 * Props for the Pagination component.
 */
export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
    /** Style variant of the pagination */
    variant?: 'standard' | 'compact';
    /** The current active page (1-indexed) */
    currentPage: number;
    /** Total number of pages available */
    totalPages: number;
    /** Callback fired when a page is selected */
    onChange?: (page: number) => void;
    /** Size of the pagination controls */
    size?: SizeVariant;
    /** Semantic color variant */
    colorVariant?: FullVariant;
    /** Custom previous page icon */
    prevIcon?: ReactNode;
    /** Custom next page icon */
    nextIcon?: ReactNode;
    /** Number of sibling pages to show on each side of current page */
    siblingCount?: number;
    /** If true, disables the pagination completely */
    disabled?: boolean;
}

const ChevronLeft = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

const ChevronRight = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);

/**
 * Pagination component.
 * A UI component for LycoUI.
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>((
    {
        variant = 'standard',
        currentPage,
        totalPages,
        onChange,
        size = 'md',
        colorVariant = 'primary',
        prevIcon = <ChevronLeft/>,
        nextIcon = <ChevronRight/>,
        siblingCount = 1,
        disabled = false,
        className,
        ...props
    }, ref) => {

    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(currentPage.toString());
    const inputRef = useRef<HTMLInputElement>(null);

    const safeCurrentPage = Math.max(1, Math.min(currentPage, Math.max(1, totalPages)));

    useEffect(() => {
        setInputValue(safeCurrentPage.toString());
    }, [safeCurrentPage]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handlePageChange = useCallback((page: number) => {
        if (page !== safeCurrentPage && page >= 1 && page <= totalPages) {
            onChange?.(page);
        }
    }, [safeCurrentPage, totalPages, onChange]);

    const handlePrev = useCallback(() => handlePageChange(safeCurrentPage - 1), [handlePageChange, safeCurrentPage]);
    const handleNext = useCallback(() => handlePageChange(safeCurrentPage + 1), [handlePageChange, safeCurrentPage]);

    const handleInputBlur = useCallback(() => {
        setIsEditing(false);
        const newPage = parseInt(inputValue, 10);
        if (!isNaN(newPage)) {
            handlePageChange(newPage);
        } else {
            setInputValue(safeCurrentPage.toString());
        }
    }, [inputValue, handlePageChange, safeCurrentPage]);

    const handleInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleInputBlur();
        } else if (e.key === 'Escape') {
            setIsEditing(false);
            setInputValue(safeCurrentPage.toString());
        }
    }, [handleInputBlur, safeCurrentPage]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }, []);

    const generatePages = useCallback(() => {
        const totalNumbers = siblingCount * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {
            const startPage = Math.max(2, safeCurrentPage - siblingCount);
            const endPage = Math.min(totalPages - 1, safeCurrentPage + siblingCount);

            let pages: (number | string)[] = [1];

            if (startPage > 2) {
                pages.push('ellipsis-start');
            } else if (startPage === 2) {
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (endPage < totalPages - 1) {
                pages.push('ellipsis-end');
            }

            pages.push(totalPages);
            return pages;
        }

        return Array.from({length: totalPages}, (_, i) => i + 1);
    }, [totalPages, safeCurrentPage, siblingCount]);

    const renderStandard = () => {
        const pages = generatePages();

        return (
            <ul className="pagination__list">
                <li className="pagination__item">
                    <button
                        className={clsx('pagination__btn', 'pagination__btn--prev', (disabled || safeCurrentPage <= 1) && 'is-disabled')}
                        onClick={handlePrev}
                        disabled={disabled || safeCurrentPage <= 1}
                        aria-label="Previous page"
                    >
                        {prevIcon}
                    </button>
                </li>

                {pages.map((page, index) => {
                    if (typeof page === 'string') {
                        return (
                            <li key={`${page}-${index}`} className="pagination__item">
                                <span className="pagination__link pagination__ellipsis" aria-hidden="true">...</span>
                            </li>
                        );
                    }

                    const isCurrent = page === safeCurrentPage;
                    return (
                        <li key={page} className="pagination__item">
                            <button
                                className={clsx('pagination__link', isCurrent && 'is-active', disabled && 'is-disabled')}
                                onClick={() => handlePageChange(page)}
                                aria-current={isCurrent ? 'page' : undefined}
                                aria-label={`Page ${page}`}
                                disabled={disabled}
                            >
                                {page}
                            </button>
                        </li>
                    );
                })}

                <li className="pagination__item">
                    <button
                        className={clsx('pagination__btn', 'pagination__btn--next', (disabled || safeCurrentPage >= totalPages) && 'is-disabled')}
                        onClick={handleNext}
                        disabled={disabled || safeCurrentPage >= totalPages}
                        aria-label="Next page"
                    >
                        {nextIcon}
                    </button>
                </li>
            </ul>
        );
    };

    const renderCompact = () => (
        <>
            <button
                className={clsx('pagination__btn', 'pagination__btn--prev', (disabled || safeCurrentPage <= 1) && 'is-disabled')}
                onClick={handlePrev}
                disabled={disabled || safeCurrentPage <= 1}
                aria-label="Previous page"
            >
                {prevIcon}
            </button>

            <div className="pagination__compact-info">
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="number"
                        className="pagination__current-page--input"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={handleInputKeyDown}
                        min={1}
                        max={totalPages}
                        aria-label="Current page"
                    />
                ) : (
                    <span
                        className={clsx('pagination__current-page', disabled && 'is-disabled')}
                        tabIndex={disabled ? -1 : 0}
                        onClick={() => {
                            if (!disabled) setIsEditing(true);
                        }}
                        onKeyDown={(e) => {
                            if (disabled) return;
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setIsEditing(true);
                            }
                        }}
                        aria-label={`Page ${safeCurrentPage} of ${totalPages}. Click to jump to page.`}
                        aria-disabled={disabled}
                    >
                        {safeCurrentPage}
                    </span>
                )}
                <span className="pagination__separator" aria-hidden="true">/</span>
                <span className="pagination__total-pages">{totalPages}</span>
            </div>

            <button
                className={clsx('pagination__btn', 'pagination__btn--next', (disabled || safeCurrentPage >= totalPages) && 'is-disabled')}
                onClick={handleNext}
                disabled={disabled || safeCurrentPage >= totalPages}
                aria-label="Next page"
            >
                {nextIcon}
            </button>
        </>
    );

    return (
        <nav
            ref={ref}
            aria-label="Pagination"
            className={clsx(
                'pagination',
                size !== 'md' && `pagination-${size}`,
                variant === 'compact' && 'pagination-compact',
                disabled && 'is-disabled',
                className
            )}
            data-variant={variant}
            data-total-pages={totalPages}
            data-current-page={safeCurrentPage}
            aria-disabled={disabled}
            style={{
                ...props.style,
                '--pagination-color-base': `var(--${colorVariant}-500, var(--color-${colorVariant}))`,
                '--pagination-color-contrast': getContrastColor(colorVariant),
                '--compact-digits': totalPages.toString().length
            } as CSSProperties}
            {...props}
        >
            {variant === 'standard' ? renderStandard() : renderCompact()}
        </nav>
    );
});

Pagination.displayName = 'Pagination';
