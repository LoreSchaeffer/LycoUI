import {Divider} from '@loreschaeffer/lyco-ui';

export const title = 'Length Variations';
export const description = <p>Use the <code>length</code> prop to control the size of the line. Length variations automatically stay centered.</p>;
export const order = 1;

export const vanillaHtml = `
<div style="display: flex; flex-direction: column; width: 100%; text-align: center; gap: var(--spacing-4);">
  <small class="text-muted">sm (50%)</small>
  <hr role="separator" aria-orientation="horizontal" class="divider divider--horizontal divider--spacing-none divider--length-sm" />
  
  <small class="text-muted">md (75%)</small>
  <hr role="separator" aria-orientation="horizontal" class="divider divider--horizontal divider--spacing-none divider--length-md" />
  
  <small class="text-muted">lg (98%)</small>
  <hr role="separator" aria-orientation="horizontal" class="divider divider--horizontal divider--spacing-none divider--length-lg" />
  
  <small class="text-muted">full (100%)</small>
  <hr role="separator" aria-orientation="horizontal" class="divider divider--horizontal divider--spacing-none divider--length-full" />
</div>
`;

export default function LengthExample() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', textAlign: 'center', gap: 'var(--spacing-4)'}}>
            <small className="text-muted">sm (50%)</small>
            <Divider length="sm" spacing="none"/>

            <small className="text-muted">md (75%)</small>
            <Divider length="md" spacing="none"/>

            <small className="text-muted">lg (98%)</small>
            <Divider length="lg" spacing="none"/>

            <small className="text-muted">full (100%)</small>
            <Divider length="full" spacing="none"/>
        </div>
    );
}
