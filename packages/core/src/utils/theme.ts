const LIGHT_COLORS = [
    'orange',
    'amber',
    'yellow',
    'lime',
    'warning'
];

/**
 * Returns the appropriate CSS variable for text/icon contrast based on the variant.
 */
export const getContrastColor = (variant: string | undefined): string => {
    if (!variant) return 'var(--white, #ffffff)';

    const isLight = LIGHT_COLORS.includes(variant);
    return isLight ? 'var(--color-carbon, #0f1011)' : 'var(--white, #ffffff)';
};
