import { useState, useCallback } from 'react';
import { Col, Input, Row } from 'lyco-ui';

export const title = 'Icons';
export const description = <p>Icons can be placed at the start or end of the input. When an <code>onIconStartClick</code> or <code>onIconEndClick</code> handler is provided, the icon becomes a clickable button.</p>;
export const order = 3;

const SearchIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);

const MailIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const EyeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const ClearIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

export const vanillaHtml = `
<div class="mb-4">
  <input type="text" class="input-custom" data-icon-start='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>' placeholder="Search..." />
</div>
<div class="mb-4">
  <input type="email" class="input-custom" data-icon-start='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>' placeholder="email@example.com" />
</div>
`;

export default function IconsExample() {
  const [search, setSearch] = useState('');

  const handleClear = useCallback(() => {
    setSearch('');
  }, []);

  return (
    <Row>
      <Col span={12} md={6} className="mb-4">
        <Input
          iconStart={SearchIcon}
          iconEnd={search ? ClearIcon : undefined}
          onIconEndClick={search ? handleClear : undefined}
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Col>
      <Col span={12} md={6} className="mb-4">
        <Input
          type="email"
          iconStart={MailIcon}
          placeholder="email@example.com"
        />
      </Col>
      <Col span={12} md={6} className="mb-4">
        <Input
          type="password"
          iconEnd={EyeIcon}
          onIconEndClick={() => {}}
          placeholder="Enter password"
        />
      </Col>
    </Row>
  );
}
