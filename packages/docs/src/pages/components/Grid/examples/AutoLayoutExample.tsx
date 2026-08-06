import {Col, Row} from 'lyco-ui';

export const title = 'Auto-layout columns';
export const description = <p>Utilize breakpoint-specific column classes for easy column sizing without an explicit numbered class.</p>;
export const order = 0;

export const vanillaHtml = `
<div class="row">
    <div class="col"><div class="col-example">Column 1</div></div>
    <div class="col"><div class="col-example">Column 2</div></div>
    <div class="col"><div class="col-example">Column 3</div></div>
</div>
`;

export default function AutoLayoutExample() {
    return (
        <Row>
            <Col>
                <div className={'col-example'}>Column 1</div>
            </Col>
            <Col>
                <div className={'col-example'}>Column 2</div>
            </Col>
            <Col>
                <div className={'col-example'}>Column 3</div>
            </Col>
        </Row>
    );
}