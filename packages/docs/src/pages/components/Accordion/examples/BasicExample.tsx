import React from 'react';
import {Accordion, AccordionItem, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Basic Accordion';
export const description = <p>A clean, linear-styled Accordion for hiding secondary content. It features a right-aligned rotating chevron and subtle hover states for headers.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="accordion-custom">
  <div class="accordion-item-custom" data-title="Account Settings" data-open="true">
    Manage your personal information, security preferences, and connected accounts. Keep your email and phone number updated to avoid losing access.
  </div>
  <div class="accordion-item-custom" data-title="Billing Information">
    View your payment history, update your credit card details, and manage your active subscriptions.
  </div>
  <div class="accordion-item-custom" data-title="Notification Preferences">
    Control which emails and push notifications you receive. You can unsubscribe from marketing materials at any time.
  </div>
</div>
`;

export default function BasicExample() {
    return (
        <Row>
            <Col span={12} md={8}>
                <Accordion defaultActiveKeys={['1']}>
                    <AccordionItem title="Account Settings" eventKey="1">
                        Manage your personal information, security preferences, and connected accounts. Keep your email and phone number updated to avoid losing access.
                    </AccordionItem>
                    <AccordionItem title="Billing Information" eventKey="2">
                        View your payment history, update your credit card details, and manage your active subscriptions.
                    </AccordionItem>
                    <AccordionItem title="Notification Preferences" eventKey="3">
                        Control which emails and push notifications you receive. You can unsubscribe from marketing materials at any time.
                    </AccordionItem>
                </Accordion>
            </Col>
        </Row>
    );
}
