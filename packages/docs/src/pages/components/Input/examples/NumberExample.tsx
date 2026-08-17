import { useState, useCallback } from 'react';
import { Col, Input, Row } from '@loreschaeffer/lyco-ui';

export const title = 'Number Input';
export const description = <p>For <code>type="number"</code>, step buttons are shown by default. They respect <code>min</code>, <code>max</code>, and <code>step</code> constraints. Set <code>showStepButtons=false</code> to hide them.</p>;
export const order = 5;

export const vanillaHtml = `
<div class="mb-4">
  <div class="text-sm fw-bold mb-2 text-secondary">With Step Buttons</div>
  <input type="number" class="input-custom" min="0" max="100" step="1" value="5" />
</div>
<div class="mb-4">
  <div class="text-sm fw-bold mb-2 text-secondary">Custom Step (0.5)</div>
  <input type="number" class="input-custom" data-variant="success" min="0" max="999" step="0.5" value="10" />
</div>
<div>
  <div class="text-sm fw-bold mb-2 text-secondary">Without Step Buttons</div>
  <input type="number" class="input-custom" data-show-step-buttons="false" value="42" />
</div>
`;

export default function NumberExample() {
  const [quantity, setQuantity] = useState('5');
  const [price, setPrice] = useState('10');

  const handleQuantityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  }, []);

  const handlePriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  }, []);

  return (
    <Row>
      <Col span={12} md={6} className="mb-4">
        <div className="text-sm fw-bold mb-2 text-secondary">With Step Buttons</div>
        <Input
          type="number"
          min={0}
          max={100}
          step={1}
          value={quantity}
          onChange={handleQuantityChange}
        />
      </Col>
      <Col span={12} md={6} className="mb-4">
        <div className="text-sm fw-bold mb-2 text-secondary">Custom Step (0.5)</div>
        <Input
          type="number"
          variant="success"
          min={0}
          max={999}
          step={0.5}
          value={price}
          onChange={handlePriceChange}
        />
      </Col>
      <Col span={12} md={6} className="mb-4">
        <div className="text-sm fw-bold mb-2 text-secondary">Without Step Buttons</div>
        <Input
          type="number"
          showStepButtons={false}
          defaultValue={42}
        />
      </Col>
    </Row>
  );
}
