import { Accordion, AccordionItem } from 'lyco-ui';

export const title = 'Basic Accordion';
export const description = <p>The default accordion behavior is exclusive: opening an item closes any other open items.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="accordion-custom">
  <div class="accordion-item-custom" data-title="Item #1" data-open="true">
    <strong>This is the first item's body.</strong> It is shown by default.
  </div>
  <div class="accordion-item-custom" data-title="Item #2">
    <strong>This is the second item's body.</strong> It is hidden by default.
  </div>
  <div class="accordion-item-custom" data-title="Item #3" disabled>
    <strong>This is the third item's body.</strong> It cannot be toggled because it is disabled.
  </div>
</div>
`;

export default function BasicExample() {
  return (
    <Accordion defaultActiveKeys={['item-1']}>
      <AccordionItem eventKey="item-1" title="Item #1">
        <strong>This is the first item's body.</strong> It is shown by default.
      </AccordionItem>
      <AccordionItem eventKey="item-2" title="Item #2">
        <strong>This is the second item's body.</strong> It is hidden by default.
      </AccordionItem>
      <AccordionItem eventKey="item-3" title="Item #3" disabled>
        <strong>This is the third item's body.</strong> It cannot be toggled because it is disabled.
      </AccordionItem>
    </Accordion>
  );
}
