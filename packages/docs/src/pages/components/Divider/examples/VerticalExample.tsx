import { Button, Divider } from '@loreschaeffer/lyco-ui';

export const title = 'Vertical Divider';
export const description = <p>Change the <code>orientation</code> prop to <code>vertical</code> to create separation in flex rows (like toolbars or inline groups).</p>;
export const order = 3;

export const vanillaHtml = `
<div style="display: flex; align-items: center; gap: var(--spacing-4); height: var(--spacing-8); background: var(--surface-floating); padding: var(--spacing-2) var(--spacing-4); border-radius: var(--radius-full); width: max-content;">
  <span class="text-primary font-weight-semibold">File</span>
  
  <div role="separator" aria-orientation="vertical" class="divider divider--vertical divider--spacing-none divider--length-full"></div>
  
  <button class="button button--neutral button--sm">Edit</button>
  <button class="button button--neutral button--sm">View</button>
</div>
`;

export default function VerticalExample() {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center',
      gap: 'var(--spacing-4)',
      height: 'var(--spacing-8)',
      background: 'var(--surface-floating)', 
      padding: 'var(--spacing-2) var(--spacing-4)', 
      borderRadius: 'var(--radius-full)',
      width: 'max-content'
    }}>
      <span className="text-primary" style={{ fontWeight: 'var(--font-weight-semibold)' }}>File</span>
      
      <Divider orientation="vertical" length="full" spacing="none" />
      
      <Button variant="neutral" size="sm">Edit</Button>
      <Button variant="neutral" size="sm">View</Button>
    </div>
  );
}
