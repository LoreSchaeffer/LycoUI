import {Accordion, AccordionItem, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Semantic Variants';
export const description = <p>Change the <code>variant</code> prop to apply semantic colors. This affects the text color, background tint, and focus rings of the open headers, making it ideal for categorized information or warnings.</p>;
export const order = 3;

export const vanillaHtml = `
<div class="d-flex flex-column" style="gap: 1rem;">
  <div class="accordion-custom" data-variant="success">
    <div class="accordion-item-custom" data-title="Payment Successful" data-open="true">
      Your payment of $49.00 has been processed successfully. A receipt has been sent to your registered email address.
    </div>
  </div>
  
  <div class="accordion-custom" data-variant="danger">
    <div class="accordion-item-custom" data-title="Action Required: Account Restricted">
      We noticed unusual login activity from a new device. Please verify your identity within 24 hours to restore full account access.
    </div>
  </div>
  
  <div class="accordion-custom" data-variant="purple">
    <div class="accordion-item-custom" data-title="Pro Features (Custom Theme)">
      Unlock advanced analytics, priority support, and unlimited project creation by upgrading to our Pro tier.
    </div>
  </div>
</div>
`;

export default function VariantsExample() {
    return (
        <Row>
            <Col span={12} md={8}>
                <div className="d-flex flex-column" style={{gap: '1rem'}}>
                    <Accordion variant="success" defaultActiveKeys={['1']}>
                        <AccordionItem eventKey="1" title="Payment Successful">
                            Your payment of $49.00 has been processed successfully. A receipt has been sent to your registered email address.
                        </AccordionItem>
                    </Accordion>

                    <Accordion variant="danger" defaultActiveKeys={['1']}>
                        <AccordionItem eventKey="1" title="Action Required: Account Restricted">
                            We noticed unusual login activity from a new device. Please verify your identity within 24 hours to restore full account access.
                        </AccordionItem>
                    </Accordion>

                    <Accordion variant="purple" defaultActiveKeys={['1']}>
                        <AccordionItem eventKey="1" title="Pro Features (Custom Theme)">
                            Unlock advanced analytics, priority support, and unlimited project creation by upgrading to our Pro tier.
                        </AccordionItem>
                    </Accordion>
                </div>
            </Col>
        </Row>
    );
}
