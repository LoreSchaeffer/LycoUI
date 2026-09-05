import {Avatar, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Sizes & Shapes';
export const description = <p>Avatars come in four standard sizes (<code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>) and two shapes (<code>circle</code> and <code>square</code>). Use squares for team or project avatars,
    and circles for individual users.</p>;
export const order = 2;

export const vanillaHtml = `
<div class="avatar avatar--sm avatar--circle">
  <div class="avatar__fallback">S</div>
</div>
<div class="avatar avatar--md avatar--square">
  <img src="https://i.pravatar.cc/150?img=47" alt="User square" class="avatar__image" />
</div>
`;

export default function SizesExample() {
    return (
        <Row>
            <Col span={12} md={6} className="mb-4">
                <h4 className="mb-3">Circle Avatars</h4>
                <div className="d-flex" style={{gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-end'}}>
                    <Avatar size="sm" fallback="SM"/>
                    <Avatar size="md" fallback="MD"/>
                    <Avatar size="lg" fallback="LG"/>
                    <Avatar size="xl" fallback="XL"/>
                </div>
            </Col>
            <Col span={12} md={6}>
                <h4 className="mb-3">Square Avatars</h4>
                <div className="d-flex" style={{gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-end'}}>
                    <Avatar shape="square" size="sm" src="https://i.pravatar.cc/150?img=47" fallback="SM"/>
                    <Avatar shape="square" size="md" src="https://i.pravatar.cc/150?img=47" fallback="MD"/>
                    <Avatar shape="square" size="lg" src="https://i.pravatar.cc/150?img=47" fallback="LG"/>
                    <Avatar shape="square" size="xl" src="https://i.pravatar.cc/150?img=47" fallback="XL"/>
                </div>
            </Col>
        </Row>
    );
}
