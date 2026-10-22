export const classContract = {
    button: {
        root: 'btn',
        size: (size: 'sm' | 'md' | 'lg') => `btn-${size}`,
        outline: 'btn-outline',
        icon: 'btn-icon',
        iconStart: 'btn-icon-start',
        iconEnd: 'btn-icon-end',
        flat: 'btn-flat'
    },
    card: {header: 'card-header'},
    grid: {rowAlign: (alignment: string) => `row-align-${alignment}`, column: (breakpoint: string, span: number) => `col-${breakpoint}-${span}`},
    dropdown: {
        root: 'dropdown',
        trigger: 'dropdown-trigger',
        menu: 'dropdown-menu',
        item: 'dropdown-item',
        divider: 'dropdown-divider'
    },
    carousel: {
        root: 'carousel',
        track: 'carousel-track',
        slide: 'carousel-slide',
        arrow: 'carousel-arrow',
        arrowPrevious: 'carousel-arrow-prev',
        arrowNext: 'carousel-arrow-next',
        dots: 'carousel-dots',
        dot: 'carousel-dot'
    }
} as const;
