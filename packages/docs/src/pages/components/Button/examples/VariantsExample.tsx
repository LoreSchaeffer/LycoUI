import {Button} from '@loreschaeffer/lyco-ui';

export const title = 'Color Variants';
export const description = <p>The <code>variant</code> prop dynamically maps to global theme hues and automatically calculates optimal text contrast.</p>;
export const order = 0;

export const vanillaHtml = `
<button class="btn btn--primary">Primary</button>
<button class="btn btn--neutral">Neutral</button>
<button class="btn btn--danger">Danger</button>
<button class="btn btn--warning">Warning</button>
<button class="btn btn--success">Success</button>
<button class="btn btn--info">Info</button>
<button class="btn btn--purple">Purple</button>
<button class="btn btn--white">White</button>
`;

export default function VariantsExample() {
    return (
        <div className="d-flex" style={{gap: '0.75rem', flexWrap: 'wrap'}}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Neutral</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="success">Success</Button>
            <Button variant="info">Info</Button>
            <Button variant="purple">Purple</Button>
            <Button variant="white">White</Button>
        </div>
    );
}
