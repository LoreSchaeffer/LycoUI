import {Spinner} from 'lyco-ui';

export const title = 'Variants';
export const description = <p>Use the <code>variant</code> prop to control the color of the spinner.</p>;
export const order = 1;

export default function VariantsExample() {
    return (
        <>
            <Spinner variant="primary"/>
            <Spinner variant="red"/>
            <Spinner variant="green"/>
            <Spinner variant="yellow"/>
            <Spinner type="growing" variant="orange"/>
            <Spinner type="growing" variant="magenta"/>
            <Spinner type="growing" variant="purple"/>
            <Spinner type="growing" variant="white"/>
        </>
    )
}