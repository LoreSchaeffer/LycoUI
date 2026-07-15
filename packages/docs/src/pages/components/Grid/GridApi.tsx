import type {CssVarDefinition, PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const rowPropsData: PropDefinition[] = [
    {
        name: 'align',
        type: "'stretch' | 'start' | 'center' | 'end'",
        defaultValue: "'stretch'",
        description: <>Vertical alignment of children columns. Applies <code>.lyco-row--align-*</code></>
    },
    {
        name: 'justify',
        type: "'start' | 'center' | 'end' | 'between'",
        description: <>Horizontal distribution of children columns. Applies <code>.lyco-row--justify-*</code></>
    }
];

export const colPropsData: PropDefinition[] = [
    {
        name: 'span',
        type: '1 | 2 | ... | 12',
        description: 'Base column span (mobile-first). Auto-layout if omitted.'
    },
    {
        name: 'sm, md, lg, xl, xxl',
        type: '1 | 2 | ... | 12',
        description: 'Responsive column spans for specific breakpoint dimensions.'
    },
    {
        name: 'stretch',
        type: 'boolean',
        defaultValue: 'false',
        description: <>Converts column into a flex container forcing children to stretch (<code>.lyco-col--stretch</code>).</>
    },
    {
        name: 'align',
        type: "'auto' | 'start' | 'center' | 'end' | 'stretch'",
        description: <>Overrides the row's vertical alignment for this specific column. Applies <code>.lyco-col--align-*</code></>
    }
];

export const gridCssVarsData: CssVarDefinition[] = [
    {
        name: '--lyco-gutter-x',
        defaultValue: 'var(--spacing-4)',
        description: 'Horizontal padding applied to columns and negative margin to row.'
    },
    {
        name: '--lyco-gutter-y',
        defaultValue: '0',
        description: 'Vertical spacing applied as top margin to columns.'
    }
];