import {Spinner} from '@loreschaeffer/lyco-ui';

export const title = 'Types';
export const description = <p>Use the <code>type</code> prop to control the spinner's animation.</p>;
export const order = 0;

export const vanillaHtml = `
<span class="spinner spinner--classic spinner--primary" role="status" aria-label="Loading"></span>
<span class="spinner spinner--growing spinner--primary" role="status" aria-label="Loading"></span>
`;

export default function TypesExample() {
    return (
        <div className="d-flex flex-wrap gap-4 align-items-center">
            <Spinner type="classic"/>
            <Spinner type="growing"/>
        </div>
    )
}
