import {Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Setting one column width';
export const description = <p>Auto-layout for flexbox grid columns also means you can set the width of one column and have the sibling columns automatically resize around it.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="row">
    <div class="col"><div class="col-example">Auto-layout</div></div>
    <div class="col col-6"><div class="col-example">col-6</div></div>
    <div class="col"><div class="col-example">Auto-layout</div></div>
</div>
`;

export default function OneColumnWidthExample() {
    return (
        <Row>
            <Col>
                <div className={'col-example'}>1 of 3</div>
            </Col>
            <Col span={6}>
                <div className={'col-example'}>2 of 3 (wider)</div>
            </Col>
            <Col>
                <div className={'col-example'}>3 of 3</div>
            </Col>
        </Row>
    );
}