import {Badge, Button} from '@loreschaeffer/lyco-ui';

export const title = 'Scaling inside Parent Elements';
export const description = <p>Badges automatically scale their size to match the parent element's font size. They are perfect for counters inside buttons or headings.</p>;
export const order = 3;

export const vanillaHtml = `
<button class="btn btn-primary">
  Notifications <span class="badge badge--white badge--pill">4</span>
</button>

<h2>Heading <span class="badge badge--neutral">New</span></h2>
`;

export default function InsideElementsExample() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                <Button variant="primary">
                    Notifications
                    <Badge variant="white" pill>4</Badge>
                </Button>
                <Button variant="secondary" className="btn-outlined">
                    Messages
                    <Badge variant="danger" pill>99+</Badge>
                </Button>
            </div>

            <div>
                <h1>Heading H1 <Badge variant="primary">New</Badge></h1>
                <h2>Heading H2 <Badge variant="success">New</Badge></h2>
                <h3>Heading H3 <Badge variant="warning">New</Badge></h3>
                <h4>Heading H4 <Badge variant="danger">New</Badge></h4>
                <h5>Heading H5 <Badge variant="info">New</Badge></h5>
                <h6>Heading H6 <Badge variant="purple">New</Badge></h6>
            </div>
        </div>
    );
}
