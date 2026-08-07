import { Badge } from 'lyco-ui';

export const title = 'Basic Badges';
export const description = <p>Badges support all standard theme colors. By default, they have a solid background, a subtle shadow, and a top highlight.</p>;
export const order = 1;

export const vanillaHtml = `
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-neutral">Neutral</span>
`;

export default function BasicExample() {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="white">White</Badge>
    </div>
  );
}
