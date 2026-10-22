import {type ReactNode} from 'react';
import {PaginationCompact} from './PaginationCompact';
import {PaginationStandard} from './PaginationStandard';
interface Props { variant: 'standard' | 'compact'; currentPage: number; totalPages: number; siblingCount: number; disabled: boolean; prevIcon: ReactNode; nextIcon: ReactNode; onChange: (page: number) => void; }
export const PaginationRenderer = (props: Props) => props.variant === 'compact' ? <PaginationCompact {...props}/> : <PaginationStandard {...props}/>;
