import {Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Vertical alignment';
export const description = <p>Use the <code>align</code> prop to change the vertical alignment of columns within a row.</p>;
export const order = 3;

export const vanillaHtml = `
<div class="row row--align-center mb-4">
    <div class="col col--4"><div class="col-example" style="height: 100px;">Tall</div></div>
    <div class="col col--2"><div class="col-example">Inherited</div></div>
    <div class="col col--2 col--align-start"><div class="col-example">Start aligned</div></div>
    <div class="col col--2 col--align-center"><div class="col-example">Center aligned</div></div>
    <div class="col col--2 col--align-end"><div class="col-example">End aligned</div></div>
</div>
`;

export default function VerticalAlignmentExample() {
    return (
        <Row align="center">
            <Col span={4}>
                <div className={'col-example'} style={{height: '100px'}}>Tall</div>
            </Col>
            <Col span={2}>
                <div className={'col-example'}>Inherited</div>
            </Col>
            <Col span={2} align="start">
                <div className={'col-example'}>Start aligned</div>
            </Col>
            <Col span={2} align="center">
                <div className={'col-example'}>Center aligned</div>
            </Col>
            <Col span={2} align="end">
                <div className={'col-example'}>End aligned</div>
            </Col>
        </Row>
    );
}
