import {Button} from '@loreschaeffer/lyco-ui';

export const title = 'Size Scaling';
export const description = <p>Scale buttons proportionally using the <code>size</code> prop. Padding, font sizes, and border-radii adjust automatically.</p>;
export const order = 3;

export const vanillaHtml = `
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Base</button>
<button class="btn btn-primary btn-lg">Large</button>
`;

export default function SizesExample() {
    return (
        <>
                <Button size="sm">Small</Button>
                <Button size="md">Base</Button>
                <Button size="lg">Large</Button>
        </>
    );
}