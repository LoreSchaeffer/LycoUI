import { Badge } from '@loreschaeffer/lyco-ui';

export const title = 'Pill & Dim Variations';
export const description = <p>Use the <code>pill</code> prop to make badges fully rounded. Use the <code>dim</code> prop for a softer look with a semi-transparent background. These props can be combined.</p>;
export const order = 2;

export const vanillaHtml = `
<!-- Pill -->
<span class="badge badge-primary badge-pill">Primary</span>

<!-- Dim -->
<span class="badge badge-success badge-dim">Success</span>

<!-- Dim Pill -->
<span class="badge badge-danger badge-pill badge-dim">Danger</span>
`;

export default function PillExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge variant="primary" pill>Primary</Badge>
        <Badge variant="neutral" pill>Neutral</Badge>
        <Badge variant="danger" pill>Danger</Badge>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge variant="primary" dim>Primary</Badge>
        <Badge variant="neutral" dim>Neutral</Badge>
        <Badge variant="warning" dim>Warning</Badge>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge variant="success" pill dim>Success</Badge>
        <Badge variant="info" pill dim>Info</Badge>
        <Badge variant="white" pill dim>White</Badge>
      </div>
    </div>
  );
}
