import { Accordion, AccordionItem } from 'lyco-ui';

export const title = 'Semantic Variants';
export const description = <p>Change the <code>variant</code> prop to apply semantic colors. This affects the text color, background tint, and focus rings of the open headers.</p>;
export const order = 3;

export const vanillaHtml = `
<div class="accordion-custom" data-variant="success">
  <div class="accordion-item-custom" data-title="Success Accordion" data-open="true">
    This accordion uses the success variant.
  </div>
</div>
<div class="accordion-custom" data-variant="purple">
  <div class="accordion-item-custom" data-title="Purple Accordion" data-open="true">
    This accordion uses a custom theme color.
  </div>
</div>
`;

export default function VariantsExample() {
  return (
    <div className="d-flex flex-column" style={{ gap: '1rem' }}>
      <Accordion variant="success" defaultActiveKeys={['1']}>
        <AccordionItem eventKey="1" title="Success Accordion">
          This accordion uses the success variant. Notice the green text and background tint on the open header.
        </AccordionItem>
      </Accordion>

      <Accordion variant="danger" defaultActiveKeys={['1']}>
        <AccordionItem eventKey="1" title="Danger Accordion">
          This accordion uses the danger variant. Useful for destructive actions or warnings.
        </AccordionItem>
      </Accordion>

      <Accordion variant="purple" defaultActiveKeys={['1']}>
        <AccordionItem eventKey="1" title="Purple Accordion">
          This accordion uses a custom theme color (purple).
        </AccordionItem>
      </Accordion>
    </div>
  );
}
