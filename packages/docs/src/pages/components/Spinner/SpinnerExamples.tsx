import {Spinner} from 'lyco-ui';

export const spinnerExamples = {
    types: {
        reactCode: `
<Spinner type="classic" />
<Spinner type="growing" />
        `.trim(),
        preview: (
            <div style={{display: 'flex', gap: 'var(--spacing-6)'}}>
                <Spinner type="classic"/>
                <Spinner type="growing"/>
            </div>
        )
    },
    variants: {
        reactCode: `
<Spinner variant="primary" />
<Spinner variant="green" />
<Spinner variant="red" />
<Spinner variant="yellow" />
<Spinner variant="neutral" />
        `.trim(),
        preview: (
            <div style={{display: 'flex', gap: 'var(--spacing-6)', flexWrap: 'wrap'}}>
                <Spinner variant="primary"/>
                <Spinner variant="green"/>
                <Spinner variant="red"/>
                <Spinner variant="yellow"/>
                <Spinner variant="neutral"/>
            </div>
        )
    },
    sizes: {
        reactCode: `
<Spinner size="sm" />
<Spinner size="base" />
<Spinner size="lg" />
        `.trim(),
        preview: (
            <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)'}}>
                <Spinner size="sm"/>
                <Spinner size="base"/>
                <Spinner size="lg"/>
            </div>
        )
    }
};