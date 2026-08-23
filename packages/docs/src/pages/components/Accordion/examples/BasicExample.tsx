import React from 'react';
import { Accordion, AccordionItem, Row, Col } from '@loreschaeffer/lyco-ui';

export const title = 'Basic Accordion';
export const description = <p>A clean, linear-styled Accordion for hiding secondary content. It features a right-aligned rotating chevron and subtle hover states for headers.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="row">
  <div class="col-12 col-md-8">
    <div class="accordion">
      <div class="accordion__item is-open">
        <h2 class="accordion__header" id="heading-1">
          <button class="accordion__button" type="button" aria-expanded="true" aria-controls="collapse-1">
            Account Settings
            <svg class="accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </h2>
        <div class="accordion__collapse" id="collapse-1" aria-labelledby="heading-1" role="region">
          <div class="accordion__collapse-inner">
            <div class="accordion__body">
              Manage your personal information, security preferences, and connected accounts. Keep your email and phone number updated to avoid losing access.
            </div>
          </div>
        </div>
      </div>
      <div class="accordion__item">
        <h2 class="accordion__header" id="heading-2">
          <button class="accordion__button" type="button" aria-expanded="false" aria-controls="collapse-2">
            Billing Information
            <svg class="accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </h2>
        <div class="accordion__collapse" id="collapse-2" aria-labelledby="heading-2" role="region">
          <div class="accordion__collapse-inner">
            <div class="accordion__body">
              View your payment history, update your credit card details, and manage your active subscriptions.
            </div>
          </div>
        </div>
      </div>
    </div>
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
