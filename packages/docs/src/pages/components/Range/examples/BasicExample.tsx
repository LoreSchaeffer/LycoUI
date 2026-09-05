import React, {useState} from 'react';
import {Col, Range, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Basic Usage';
export const description = <p>A simple range slider with live value binding. Ideal for adjusting volume, brightness, or percentage limits.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="mb-4">
  <div class="d-flex justify-content-between text-sm fw-bold mb-2">
    <span>Volume</span>
    <span class="text-secondary">75%</span>
  </div>
  <input type="range" class="range-custom" min="0" max="100" value="75" />
</div>
<div>
  <div class="d-flex justify-content-between text-sm fw-bold mb-2">
    <span>Max Participants (Disabled)</span>
    <span class="text-secondary">10</span>
  </div>
  <input type="range" class="range-custom" disabled min="1" max="50" value="10" />
</div>
`;

export default function BasicExample() {
    const [volume, setVolume] = useState(75);

    return (
        <Row>
            <Col span={12} md={6} className="mb-8">
                <div className="d-flex justify-content-between text-sm fw-bold mb-2">
                    <span>Master Volume</span>
                    <span className="text-secondary">{volume}%</span>
                </div>
                <Range
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(val) => setVolume(val as number)}
                />
            </Col>
            <Col span={12} md={6}>
                <div className="d-flex justify-content-between text-sm fw-bold mb-2">
                    <span>Max Participants (Disabled)</span>
                    <span className="text-secondary">10</span>
                </div>
                <Range defaultValue={10} min={1} max={50} disabled/>
            </Col>
        </Row>
    );
}
