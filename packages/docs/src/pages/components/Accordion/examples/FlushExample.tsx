import { Accordion, AccordionItem } from '@loreschaeffer/lyco-ui';

export const title = 'Flush Accordion';
export const description = <p>Add the <code>flush</code> prop to remove the outer borders, border-radius, and shadows. This is ideal for embedding accordions seamlessly inside other components like Cards.</p>;
export const order = 2;

export const vanillaHtml = `
<div class="accordion-custom" data-flush="true">
  <div class="accordion-item-custom" data-title="Item #1">
    Content for the first item...
  </div>
  <div class="accordion-item-custom" data-title="Item #2">
    Content for the second item...
  </div>
</div>
`;

export default function FlushExample() {
  return (
    <Accordion flush>
      <AccordionItem eventKey="1" title="Item #1">
        Content for the first item...
      </AccordionItem>
      <AccordionItem eventKey="2" title="Item #2">
        Content for the second item...
      </AccordionItem>
      <AccordionItem eventKey="3" title="Item #3">
        Content for the third item...
      </AccordionItem>
    </Accordion>
  );
}
