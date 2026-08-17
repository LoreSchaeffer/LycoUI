import { Accordion, AccordionItem } from '@loreschaeffer/lyco-ui';

export const title = 'Multiple Open Items';
export const description = <p>By default, only one accordion item can be open at a time. Use the <code>allowMultiple</code> prop to allow independent toggling of multiple items.</p>;
export const order = 4;

export const vanillaHtml = `
<div class="accordion-custom" data-allow-multiple="true">
  <div class="accordion-item-custom" data-title="Item #1" data-open="true">
    First content
  </div>
  <div class="accordion-item-custom" data-title="Item #2" data-open="true">
    Second content
  </div>
</div>
`;

export default function MultipleExample() {
  return (
    <Accordion allowMultiple defaultActiveKeys={['1', '2']}>
      <AccordionItem eventKey="1" title="Item #1">
        This is the first item's body. It is shown by default.
      </AccordionItem>
      <AccordionItem eventKey="2" title="Item #2">
        This is the second item's body. It is also shown by default, and opening another item will not close this one.
      </AccordionItem>
      <AccordionItem eventKey="3" title="Item #3">
        This is the third item's body.
      </AccordionItem>
    </Accordion>
  );
}
