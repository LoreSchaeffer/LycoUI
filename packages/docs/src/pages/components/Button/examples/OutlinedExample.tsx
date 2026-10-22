import {Button} from '@loreschaeffer/lyco-ui';

export const title = 'Outlined Buttons';
export const description = <p>Use the <code>outlined</code> prop to remove background colors and apply an inset border. Hovering inverses the colors.</p>;
export const order = 1;

export const vanillaHtml = `
<button class="btn btn-primary btn-outline">Primary Outlined</button>
<button class="btn btn-success btn-outline">Success Outlined</button>
<button class="btn btn-danger btn-outline">Danger Outlined</button>
<button class="btn btn-warning btn-outline">Warning Outlined</button>
`;

export default function OutlinedExample() {
    return (
        <div className="d-flex" style={{gap: '0.75rem', flexWrap: 'wrap'}}>
            <Button outlined variant="primary">Primary Outlined</Button>
            <Button outlined variant="success">Success Outlined</Button>
            <Button outlined variant="danger">Danger Outlined</Button>
            <Button outlined variant="warning">Warning Outlined</Button>
        </div>
    );
}
