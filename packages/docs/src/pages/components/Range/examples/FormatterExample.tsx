import { Col, Range, Row } from '@loreschaeffer/lyco-ui';

export const title = 'Custom Formatter (Time)';
export const description = <p>Supply a custom function to format the tooltip value. In Vanilla JS, register your function in <code>window.lycoFormatters</code>.</p>;
export const order = 6;

export const vanillaHtml = `
<!-- To use a custom formatter in Vanilla JS: -->
<!-- 1. Define window.lycoFormatters.timeFormat = function(value) { ... } -->
<!-- 2. Add data-tooltip-format="timeFormat" to the input -->

<input type="range" class="range-custom" data-variant="warning" data-tooltip-format="timeFormat" min="0" max="300" value="125" />
`;

export default function FormatterExample() {
  const formatTime = (value: number) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <Row>
      <Col span={6}>
        <Range variant="warning" min={0} max={300} defaultValue={125} tooltipFormatter={formatTime} />
      </Col>
    </Row>
  );
}
