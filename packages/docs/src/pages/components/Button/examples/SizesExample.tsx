import {Button} from 'lyco-ui';

export const title = 'Size Scaling';
export const description = <p>Scale buttons proportionally using the <code>size</code> prop. Padding, font sizes, and border-radii adjust automatically.</p>;
export const order = 3;

export default function SizesExample() {
    return (
        <>
                <Button size="sm">Small</Button>
                <Button size="base">Base</Button>
                <Button size="lg">Large</Button>
        </>
    );
}