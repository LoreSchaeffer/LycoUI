import {Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Responsive classes';
export const description = <p>Using a single set of <code>md</code> props, you can create a basic grid system that starts out stacked on mobile devices and tablet devices before becoming horizontal on desktop.</p>;
export const order = 2;

export const vanillaHtml = `
<div class="row">
    <div class="col col-12 col-md-8"><div class="col-example">span=12 md=8</div></div>
    <div class="col col-12 col-md-4"><div class="col-example">span=12 md=4</div></div>
</div>
`;

export default function ResponsiveSizingExample() {
    return (
        <Row>
            <Col span={12} md={8}>
                <div className={'col-example'}>span=12 md=8</div>
            </Col>
            <Col span={12} md={4}>
                <div className={'col-example'}>span=12 md=4</div>
            </Col>
        </Row>
    );
}