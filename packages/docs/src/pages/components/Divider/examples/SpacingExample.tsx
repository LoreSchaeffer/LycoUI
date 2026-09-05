import {Divider} from '@loreschaeffer/lyco-ui';

export const title = 'Spacing Variations';
export const description = <p>Use the <code>spacing</code> prop to adjust the margin surrounding the divider. By default, it uses <code>md</code>.</p>;
export const order = 2;

export const vanillaHtml = `
<div style="display: flex; flex-direction: column; gap: 0;">
  <div style="background: var(--surface-elevated); padding: var(--spacing-4); border-radius: var(--radius-md);">
    <p class="mb-0">Block A</p>
  </div>
  
  <hr role="separator" aria-orientation="horizontal" class="divider divider--horizontal divider--spacing-lg divider--length-full" />
  
  <div style="background: var(--surface-elevated); padding: var(--spacing-4); border-radius: var(--radius-md);">
    <p class="mb-0">Block B</p>
  </div>
</div>
`;

export default function SpacingExample() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: 0}}>
            <div style={{background: 'var(--surface-elevated)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-md)'}}>
                <p className="mb-0">Block A</p>
            </div>

            <Divider spacing="lg"/>

            <div style={{background: 'var(--surface-elevated)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-md)'}}>
                <p className="mb-0">Block B</p>
            </div>
        </div>
    );
}
