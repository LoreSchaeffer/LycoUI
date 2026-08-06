import { Button } from 'lyco-ui';

export const title = 'Color Variants';
export const description = <p>The <code>variant</code> prop dynamically maps to global theme hues and automatically calculates optimal text contrast.</p>;
export const order = 0;

export const vanillaHtml = `
<button class="btn btn-primary">Primary</button>
<button class="btn btn-neutral">Neutral</button>
<button class="btn btn-red">Red</button>
<button class="btn btn-yellow">Yellow</button>
<button class="btn btn-green">Green</button>
<button class="btn btn-teal">Teal</button>
<button class="btn btn-magenta">Magenta</button>
<button class="btn btn-white">White</button>
`;

export default function VariantsExample() {
    return (
        <>
            <Button variant="primary">Primary</Button>
            <Button variant="neutral">Neutral</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="yellow">Yellow</Button>
            <Button variant="success">Success</Button>
            <Button variant="teal">Teal</Button>
            <Button variant="magenta">Magenta</Button>
            <Button variant="white">White</Button>
        </>
    );
}