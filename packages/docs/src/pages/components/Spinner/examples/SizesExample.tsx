import {Spinner} from 'lyco-ui';

export const title = 'Sizes';
export const description = <p>Use the <code>size</code> prop to control the size of the spinner.</p>;
export const order = 2;

export default function VariantsExample() {
    return (
        <>
            <Spinner size="sm"/>
            <Spinner size="base"/>
            <Spinner size="lg"/>
        </>
    )
}