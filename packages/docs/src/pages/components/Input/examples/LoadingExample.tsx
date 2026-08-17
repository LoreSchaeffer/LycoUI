import { Col, Input, Row } from '@loreschaeffer/lyco-ui';

const SearchIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);

export const title = 'Loading State';
export const description = <p>When <code>loading</code> is true, a spinner replaces the icon. If no icon is provided, the spinner appears on the right. The input is also disabled during loading.</p>;
export const order = 7;

export const vanillaHtml = `
<!-- Loading state is not supported in vanilla mode (no JS interactivity for spinner). -->
<!-- Use the React component for loading state. -->
<div class="mb-4">
  <input type="text" class="input-custom" placeholder="Searching..." disabled />
</div>
`;

export default function LoadingExample() {
  return (
    <Row>
      <Col span={12} md={6} className="mb-4">
        <div className="text-sm fw-bold mb-2 text-secondary">Loading (Spinner Start)</div>
        <Input
          iconStart={SearchIcon}
          loading
          spinnerPlacement="start"
          placeholder="Please wait..."
        />
      </Col>
      <Col span={12} md={6} className="mb-4">
        <div className="text-sm fw-bold mb-2 text-secondary">Loading (Spinner End)</div>
        <Input
          loading
          placeholder="Please wait..."
        />
      </Col>
      <Col span={12} md={6} className="mb-4">
        <div className="text-sm fw-bold mb-2 text-secondary">Loading (Growing Spinner)</div>
        <Input
          loading
          spinnerType="growing"
          variant="success"
          placeholder="Please wait..."
        />
      </Col>
    </Row>
  );
}
