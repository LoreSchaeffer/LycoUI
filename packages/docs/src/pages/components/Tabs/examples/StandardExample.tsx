import {Col, Row, TabContent, Tabs, TabsList, TabTrigger} from '@loreschaeffer/lyco-ui';

export const title = 'Standard Tabs';
export const description = <p>A basic example of the Tabs component with multiple panels.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="tabs" data-lyco-tabs>
  <div class="tabs__list" role="tablist">
    <button type="button" class="tabs__trigger is-active" role="tab" aria-selected="true" data-lyco-tab-value="overview">Overview</button>
    <button type="button" class="tabs__trigger" role="tab" aria-selected="false" data-lyco-tab-value="integrations">Integrations</button>
    <button type="button" class="tabs__trigger" role="tab" aria-selected="false" data-lyco-tab-value="billing">Billing</button>
    <button type="button" class="tabs__trigger" role="tab" aria-selected="false" data-lyco-tab-value="security">Security</button>
  </div>
  <div style="padding: var(--spacing-4) 0">
    <div class="tabs__content" role="tabpanel" data-lyco-tab-value="overview">
      <p style="margin: 0">Welcome to your dashboard overview. Here you can see a high-level summary of your project's performance.</p>
    </div>
    <div class="tabs__content" role="tabpanel" data-lyco-tab-value="integrations" hidden aria-hidden="true" style="display: none;">
      <p style="margin: 0">Manage your connected third-party apps and webhooks.</p>
    </div>
    <div class="tabs__content" role="tabpanel" data-lyco-tab-value="billing" hidden aria-hidden="true" style="display: none;">
      <p style="margin: 0">View your current subscription plan and payment history.</p>
    </div>
    <div class="tabs__content" role="tabpanel" data-lyco-tab-value="security" hidden aria-hidden="true" style="display: none;">
      <p style="margin: 0">Configure two-factor authentication and review security logs.</p>
    </div>
  </div>
</div>
`;

export default function StandardExample() {
    return (
        <Row>
            <Col md={10}>
                <Tabs defaultValue="overview">
                    <TabsList>
                        <TabTrigger value="overview">Overview</TabTrigger>
                        <TabTrigger value="integrations">Integrations</TabTrigger>
                        <TabTrigger value="billing">Billing</TabTrigger>
                        <TabTrigger value="security">Security</TabTrigger>
                    </TabsList>
                    <div style={{padding: 'var(--spacing-4) 0'}}>
                        <TabContent value="overview">
                            <p style={{margin: 0}}>Welcome to your dashboard overview. Here you can see a high-level summary of your project's performance.</p>
                        </TabContent>
                        <TabContent value="integrations">
                            <p style={{margin: 0}}>Manage your connected third-party apps and webhooks.</p>
                        </TabContent>
                        <TabContent value="billing">
                            <p style={{margin: 0}}>View your current subscription plan and payment history.</p>
                        </TabContent>
                        <TabContent value="security">
                            <p style={{margin: 0}}>Configure two-factor authentication and review security logs.</p>
                        </TabContent>
                    </div>
                </Tabs>
            </Col>
        </Row>
    );
}
