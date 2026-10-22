const LIGHT_COLORS = [
    'orange',
    'amber',
    'yellow',
    'lime',
    'warning',
    'white'
];

/**
 * Returns the CSS color variable for a semantic variant, including the standalone white token.
 */
export const getVariantColor = (variant: string | undefined): string => {
    if (variant === 'white') return 'var(--white, #ffffff)';
    return `var(--${variant ?? 'primary'}-500, var(--color-${variant ?? 'primary'}))`;
};

/**
 * Returns the appropriate CSS variable for text/icon contrast based on the variant.
 */
export const getContrastColor = (variant: string | undefined): string => {
    if (!variant) return 'var(--white, #ffffff)';

    const isLight = LIGHT_COLORS.includes(variant);
    return isLight ? 'var(--neutral-950, #0f1011)' : 'var(--white, #ffffff)';
};
