import './Pagination.scss';
import {type CSSProperties, forwardRef, type HTMLAttributes, type ReactNode} from 'react';
import clsx from 'clsx';
import type {FullVariant, SizeVariant} from '../../types/types.ts';
import {getContrastColor} from '../../utils/theme.ts';
import {clampPage} from './pagination-model';
import {PaginationRenderer} from './PaginationRenderer';
export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> { variant?: 'standard' | 'compact'; currentPage: number; totalPages: number; onChange?: (page: number) => void; size?: SizeVariant; colorVariant?: FullVariant; prevIcon?: ReactNode; nextIcon?: ReactNode; siblingCount?: number; disabled?: boolean; }
const ChevronLeft = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>;
const ChevronRight = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>;
export const Pagination = forwardRef<HTMLElement, PaginationProps>(({variant = 'standard', currentPage, totalPages, onChange, size = 'md', colorVariant = 'primary', prevIcon = <ChevronLeft/>, nextIcon = <ChevronRight/>, siblingCount = 1, disabled = false, className, ...props}, ref) => {
    const safeCurrentPage = clampPage(currentPage, totalPages);
    const handleChange = (page: number) => { if (page !== safeCurrentPage && page >= 1 && page <= totalPages) onChange?.(page); };
    return <nav ref={ref} aria-label="Pagination" className={clsx('pagination', size !== 'md' && `pagination-${size}`, variant === 'compact' && 'pagination-compact', disabled && 'is-disabled', className)} data-variant={variant} data-total-pages={totalPages} data-current-page={safeCurrentPage} aria-disabled={disabled} style={{...props.style, '--pagination-color-base': `var(--${colorVariant}-500, var(--color-${colorVariant}))`, '--pagination-color-contrast': getContrastColor(colorVariant), '--compact-digits': totalPages.toString().length} as CSSProperties} {...props}><PaginationRenderer variant={variant} currentPage={safeCurrentPage} totalPages={totalPages} siblingCount={siblingCount} disabled={disabled} prevIcon={prevIcon} nextIcon={nextIcon} onChange={handleChange}/></nav>;
});
Pagination.displayName = 'Pagination';
