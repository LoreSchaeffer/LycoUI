import { Divider } from '@loreschaeffer/lyco-ui';

export const title = 'Thickness Variations';
export const description = <p>Use the <code>thickness</code> prop to control the line weight. It accepts any valid CSS size (e.g., <code>2px</code>, <code>0.25rem</code>) or a raw number that defaults to pixels.</p>;
export const order = 5;

export const vanillaHtml = `
<div style="display: flex; flex-direction: column; width: 100%; text-align: center; gap: var(--spacing-4);">
  <small class="text-muted">1px (Default)</small>
  <hr role="separator" aria-orientation="horizontal" class="divider divider--horizontal divider--spacing-none divider--length-full" />
  
  <small class="text-muted">2px</small>
  <hr role="separator" aria-orientation="horizontal" class="divider divider--horizontal divider--spacing-none divider--length-full" style="--divider-thickness: 2px;" />
  
  <small class="text-muted">4px</small>
  <hr role="separator" aria-orientation="horizontal" class="divider divider--horizontal divider--spacing-none divider--length-full" style="--divider-thickness: 4px;" />
</div>
`;

export default function ThicknessExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', textAlign: 'center', gap: 'var(--spacing-4)' }}>
      <small className="text-muted">1px (Default)</small>
      <Divider spacing="none" />

      <small className="text-muted">2px</small>
      <Divider thickness={2} spacing="none" />

      <small className="text-muted">4px</small>
      <Divider thickness="4px" spacing="none" />
    </div>
  );
}
