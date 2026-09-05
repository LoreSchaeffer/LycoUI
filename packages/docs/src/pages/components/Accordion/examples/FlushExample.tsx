import {Accordion, AccordionItem, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Flush Style';
export const description = <p>Add the <code>flush</code> prop to remove the outer borders, border-radius, and shadows. This is ideal for embedding accordions seamlessly inside other components like Cards or Sidebars.</p>;
export const order = 2;

export const vanillaHtml = `
<div class="accordion-custom" data-flush="true">
  <div class="accordion-item-custom" data-title="System Architecture">
    Our core infrastructure runs on a distributed microservices architecture, ensuring high availability and fault tolerance across multiple regions.
  </div>
  <div class="accordion-item-custom" data-title="Security Protocols">
    All data is encrypted at rest and in transit using industry-standard AES-256 and TLS 1.3 protocols.
  </div>
  <div class="accordion-item-custom" data-title="Compliance & Audits">
    We undergo regular third-party security audits and maintain compliance with SOC 2 Type II and ISO 27001 standards.
  </div>
</div>
`;

export default function FlushExample() {
    return (
        <Row>
            <Col span={12} md={8}>
                <Accordion flush>
                    <AccordionItem eventKey="1" title="System Architecture">
                        Our core infrastructure runs on a distributed microservices architecture, ensuring high availability and fault tolerance across multiple regions.
                    </AccordionItem>
                    <AccordionItem eventKey="2" title="Security Protocols">
                        All data is encrypted at rest and in transit using industry-standard AES-256 and TLS 1.3 protocols.
                    </AccordionItem>
                    <AccordionItem eventKey="3" title="Compliance & Audits">
                        We undergo regular third-party security audits and maintain compliance with SOC 2 Type II and ISO 27001 standards.
                    </AccordionItem>
                </Accordion>
            </Col>
        </Row>
    );
}
