import type {CssVarDefinition, PropDefinition} from "../../../components/api-reference/ApiReference.tsx";

export const rowPropsData: PropDefinition[] = [
    {
        name: 'align',
        type: "'stretch' | 'start' | 'center' | 'end'",
        defaultValue: "'stretch'",
        description: <>Vertical alignment of children columns. Applies <code>.row-align-*</code>.</>
    },
    {
        name: 'justify',
        type: "'start' | 'center' | 'end' | 'between'",
        defaultValue: "'start'",
        description: <>Horizontal distribution of children columns. Applies <code>.row-justify-*</code>.</>
    }
];

export const colPropsData: PropDefinition[] = [
    {
        name: 'span',
        type: '1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12',
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
        description: <>Converts column into a flex container forcing children to stretch vertically (<code>.col-stretch</code>).</>
    },
    {
        name: 'align',
        type: "'auto' | 'start' | 'center' | 'end' | 'stretch'",
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