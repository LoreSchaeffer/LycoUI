import {Spinner} from '@loreschaeffer/lyco-ui';

export const title = 'Sizes';
export const description = <p>Use the <code>size</code> prop to control the size of the spinner.</p>;
export const order = 2;

export const vanillaHtml = `
<span class="spinner spinner--classic spinner--primary spinner--sm" role="status" aria-label="Loading"></span>
<span class="spinner spinner--classic spinner--primary" role="status" aria-label="Loading"></span>
<span class="spinner spinner--classic spinner--primary spinner--lg" role="status" aria-label="Loading"></span>
`;

export default function VariantsExample() {
    return (
        <>
            <Spinner size="sm"/>
            <Spinner size="md"/>
            <Spinner size="lg"/>
        </>
    )
}