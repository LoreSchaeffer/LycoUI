import {Spinner} from 'lyco-ui';

export const title = 'Types';
export const description = <p>Use the <code>type</code> prop to control the spinner's animation.</p>;
export const order = 0;

export default function TypesExample() {
    return (
        <>
            <Spinner type="classic"/>
            <Spinner type="growing"/>
        </>
    )
}