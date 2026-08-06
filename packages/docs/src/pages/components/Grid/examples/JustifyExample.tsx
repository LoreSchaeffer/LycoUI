import {Col, Row} from 'lyco-ui';

export const title = 'Horizontal alignment';
export const description = <p>Use the <code>justify</code> prop to change the horizontal distribution of columns within a row.</p>;
export const order = 4;

export const vanillaHtml = `
<div class="row row-justify-center">
    <div class="col col-4"><div class="col-example">Center aligned</div></div>
    <div class="col col-4"><div class="col-example">Center aligned</div></div>
</div>
`;

export default function JustifyExample() {
    return (
        <Row justify="center">
            <Col span={4}>
                <div className="col-example">Center aligned</div>
            </Col>
            <Col span={4}>
                <div className="col-example">Center aligned</div>
            </Col>
        </Row>
    );
}