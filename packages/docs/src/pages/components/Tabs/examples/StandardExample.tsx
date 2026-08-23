import { Tabs, TabsList, TabTrigger, TabContent, Row, Col, Card } from '@loreschaeffer/lyco-ui';

export const title = 'Standard Tabs';
export const description = <p>A basic example of the Tabs component with multiple panels.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="tabs" data-lyco-tabs>
  <div class="tabs__list" role="tablist">
    <button type="button" class="tabs__trigger is-active" role="tab" aria-selected="true" data-lyco-tab-trigger="account">Account</button>
    <button type="button" class="tabs__trigger" role="tab" aria-selected="false" data-lyco-tab-trigger="password">Password</button>
    <button type="button" class="tabs__trigger" role="tab" aria-selected="false" data-lyco-tab-trigger="settings">Settings</button>
  </div>
  <div style="padding: var(--spacing-4) 0">
    <div class="tabs__content" role="tabpanel" data-lyco-tab-content="account">
      <p style="margin: 0">Make changes to your account here. Click save when you're done.</p>
    </div>
    <div class="tabs__content" role="tabpanel" data-lyco-tab-content="password" style="display: none;">
      <p style="margin: 0">Change your password here. After saving, you'll be logged out.</p>
    </div>
    <div class="tabs__content" role="tabpanel" data-lyco-tab-content="settings" style="display: none;">
      <p style="margin: 0">Manage your notification settings.</p>
    </div>
  </div>
</div>
`;

export default function StandardExample() {
  return (
    <Row>
      <Col xs={12} md={8}>
        <Card>
          <Card.Body>
            <Tabs defaultActiveKey="account">
              <TabsList>
                <TabTrigger eventKey="account">Account</TabTrigger>
                <TabTrigger eventKey="password">Password</TabTrigger>
                <TabTrigger eventKey="settings">Settings</TabTrigger>
              </TabsList>
              <div style={{ padding: 'var(--spacing-4) 0' }}>
                <TabContent eventKey="account">
                  <p style={{ margin: 0 }}>Make changes to your account here. Click save when you're done.</p>
                </TabContent>
                <TabContent eventKey="password">
                  <p style={{ margin: 0 }}>Change your password here. After saving, you'll be logged out.</p>
                </TabContent>
                <TabContent eventKey="settings">
                  <p style={{ margin: 0 }}>Manage your notification settings.</p>
                </TabContent>
              </div>
            </Tabs>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
