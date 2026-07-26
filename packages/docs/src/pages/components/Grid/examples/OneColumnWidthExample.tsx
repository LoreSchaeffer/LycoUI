import {Col, Row} from 'lyco-ui';

export const title = 'Setting one column width';
export const description = <p>Auto-layout for flexbox grid columns also means you can set the width of one column and have the sibling columns automatically resize around it.</p>;
export const order = 1;

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