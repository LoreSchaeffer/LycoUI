import type {CssVarDefinition, PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const rowPropsData: PropDefinition[] = [
    {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'Grid content rendered inside the row.'
    },
    {
        name: 'align',
        type: 'RowAlign',
        defaultValue: "'stretch'",
        description: <>Vertical alignment of children columns. Applies <code>.row-align-*</code>.</>
    },
    {
        name: 'justify',
        type: 'RowJustify',
        defaultValue: "'start'",
        description: <>Horizontal distribution of children columns. Applies <code>.row-justify-*</code>.</>
    }
];

export const colPropsData: PropDefinition[] = [
    {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'Content rendered inside the column.'
    },
    {
        name: 'span',
        type: 'ColumnSpan',
        description: 'Base column span (mobile-first). Auto-layout if omitted.'
    },
    {
        name: 'xs',
        type: 'ColumnSpan',
        description: <>Semantic alias for <code>span</code>. Sets the base (mobile-first) column width without media queries. Clearer intent when used alongside responsive props (<code>xs={12} md={6}</code>).</>
    },
    {
        name: 'sm',
        type: 'ColumnSpan',
        description: 'Small breakpoint column span.'
    },
    {
        name: 'md',
        type: 'ColumnSpan',
        description: 'Medium breakpoint column span.'
    },
    {
        name: 'lg',
        type: 'ColumnSpan',
        description: 'Large breakpoint column span.'
    },
    {
        name: 'xl',
        type: 'ColumnSpan',
        description: 'Extra-large breakpoint column span.'
    },
    {
        name: 'xxl',
        type: 'ColumnSpan',
        description: 'Double-extra-large breakpoint column span.'
    },
    {
        name: 'stretch',
        type: 'boolean',
        defaultValue: 'false',
        description: <>Converts column into a flex container forcing children to stretch vertically (<code>.col-stretch</code>).</>
    },
    {
        name: 'align',
        type: 'ColumnAlign',
        defaultValue: "'auto'",
        description: <>Overrides the row's vertical alignment for this specific column. Applies <code>.col-align-*</code>.</>
    }
];

export const gridCssVarsData: CssVarDefinition[] = [
    {
        name: '--gutter-x',
        defaultValue: 'var(--spacing-4)',
        description: 'Horizontal padding applied to columns and negative margin to row.'
    },
    {
        name: '--gutter-y',
        defaultValue: '0',
        description: 'Vertical spacing applied as top margin to columns.'
    }
];

export const apiConfig = [
    {name: 'rowPropsData', data: rowPropsData},
    {name: 'colPropsData', data: colPropsData},
    {name: 'gridCssVarsData', data: gridCssVarsData}
];
