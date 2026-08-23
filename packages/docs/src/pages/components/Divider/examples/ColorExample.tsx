import { Divider } from '@loreschaeffer/lyco-ui';

export const title = 'Color Customization';
export const description = <p>Use the <code>color</code> prop to override the default subtle border color. You can pass any valid CSS color, including theme variables.</p>;
export const order = 4;

export const vanillaHtml = `
<div style="display: flex; flex-direction: column; width: 100%; text-align: center; gap: var(--spacing-4);">
  <hr role="separator" aria-orientation="horizontal" class="divider divider--horizontal divider--spacing-none divider--length-full" style="--divider-color: var(--color-primary);" />
  
  <hr role="separator" aria-orientation="horizontal" class="divider divider--horizontal divider--spacing-none divider--length-full" style="--divider-color: var(--color-danger);" />
  
  <hr role="separator" aria-orientation="horizontal" class="divider divider--horizontal divider--spacing-none divider--length-full" style="--divider-color: #10b981;" />
</div>
`;

export default function ColorExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', textAlign: 'center', gap: 'var(--spacing-4)' }}>
      <Divider color="var(--color-primary)" spacing="none" />
      <Divider color="var(--color-danger)" spacing="none" />
      <Divider color="#10b981" spacing="none" />
    </div>
  );
}
