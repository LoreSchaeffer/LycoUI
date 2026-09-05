import {Accordion, AccordionItem, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Multiple Open Items';
export const description = <p>By default, only one accordion item can be open at a time. Use the <code>allowMultiple</code> prop to allow independent toggling of multiple items. This is particularly useful for filtering sidebars where users
    might want to view multiple filter categories at once.</p>;
export const order = 4;

export const vanillaHtml = `
<div class="accordion-custom" data-allow-multiple="true">
  <div class="accordion-item-custom" data-title="Product Categories" data-open="true">
    <div class="d-flex flex-column" style="gap: 8px;">
      <label><input type="checkbox" /> Laptops & Computers</label>
      <label><input type="checkbox" /> Mobile Phones</label>
      <label><input type="checkbox" /> Accessories</label>
    </div>
  </div>
  <div class="accordion-item-custom" data-title="Price Range" data-open="true">
    <div class="d-flex flex-column" style="gap: 8px;">
      <label><input type="checkbox" /> Under $50</label>
      <label><input type="checkbox" /> $50 to $200</label>
      <label><input type="checkbox" /> Over $200</label>
    </div>
  </div>
</div>
`;

export default function MultipleExample() {
    return (
        <Row>
            <Col span={12} md={8}>
                <Accordion allowMultiple defaultActiveKeys={['1', '2']}>
                    <AccordionItem eventKey="1" title="Product Categories">
                        <div className="d-flex flex-column" style={{gap: '8px'}}>
                            <label><input type="checkbox"/> Laptops & Computers</label>
                            <label><input type="checkbox"/> Mobile Phones</label>
                            <label><input type="checkbox"/> Accessories</label>
                        </div>
                    </AccordionItem>
                    <AccordionItem eventKey="2" title="Price Range">
                        <div className="d-flex flex-column" style={{gap: '8px'}}>
                            <label><input type="checkbox"/> Under $50</label>
                            <label><input type="checkbox"/> $50 to $200</label>
                            <label><input type="checkbox"/> Over $200</label>
                        </div>
                    </AccordionItem>
                </Accordion>
            </Col>
        </Row>
    );
}
