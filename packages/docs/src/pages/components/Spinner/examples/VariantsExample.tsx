import {Spinner} from 'lyco-ui';

export const title = 'Variants';
export const description = <p>Use the <code>variant</code> prop to control the color of the spinner.</p>;
export const order = 1;

export const vanillaHtml = `
<span class="spinner spinner-classic spinner-primary" role="status" aria-label="Loading"></span>
<span class="spinner spinner-classic spinner-neutral" role="status" aria-label="Loading"></span>
<span class="spinner spinner-classic spinner-success" role="status" aria-label="Loading"></span>
`;

export default function VariantsExample() {
    return (
        <>
            <Spinner variant="primary"/>
            <Spinner variant="success"/>
            <Spinner variant="warning"/>
            <Spinner variant="danger"/>
            <Spinner variant="info"/>
            <Spinner type="growing" variant="orange"/>
            <Spinner type="growing" variant="magenta"/>
            <Spinner type="growing" variant="purple"/>
            <Spinner type="growing" variant="white"/>
        </>
    )
}