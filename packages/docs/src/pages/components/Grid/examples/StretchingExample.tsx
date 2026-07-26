import {Col, Row} from 'lyco-ui';

export const title = 'Column stretching';
export const description = <p>The <code>stretch</code> prop transforms the column into a flex container, automatically forcing any direct child element to grow and fill the vertical space.</p>;
export const order = 5;

export default function StretchingExample() {
    return (
        <Row>
            <Col span={6}>
                <div className={'col-example'} style={{height: '150px'}}>Fixed height content</div>
            </Col>
            <Col span={6} stretch>
                <div className={'col-example'} style={{
                    backgroundColor: 'var(--color-primary-dim)',
                    borderColor: 'var(--color-primary)'
                }}>
                    I automatically stretch to fill the 150px height dictacted by my sibling.
                </div>
            </Col>
        </Row>
    );
}