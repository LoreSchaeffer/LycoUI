import {Button} from 'lyco-ui';

export const title = 'Color Variants';
export const description = <p>The <code>variant</code> prop dynamically maps to global theme hues and automatically calculates optimal text contrast.</p>;
export const order = 0;

export default function VariantsExample() {
    return (
        <>
            <Button variant="primary">Primary</Button>
            <Button variant="neutral">Neutral</Button>
            <Button variant="red">Red</Button>
            <Button variant="orange">Orange</Button>
            <Button variant="yellow">Yellow</Button>
            <Button variant="green">Green</Button>
            <Button variant="teal">Teal</Button>
            <Button variant="cyan">Cyan</Button>
            <Button variant="blue">Blue</Button>
            <Button variant="indigo">Indigo</Button>
            <Button variant="purple">Purple</Button>
            <Button variant="magenta">Magenta</Button>
            <Button variant="white">White</Button>
        </>
    );
}