import {Col, Row} from 'lyco-ui';

export const title = 'Vertical alignment';
export const description = <p>Use the <code>align</code> prop to change the vertical alignment of columns within a row.</p>;
export const order = 3;

export const vanillaHtml = `
<div class="row row-align-center" style="min-height: 100px;">
    <div class="col col-4"><div class="col-example">Center aligned</div></div>
    <div class="col col-4"><div class="col-example">Center aligned</div></div>
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