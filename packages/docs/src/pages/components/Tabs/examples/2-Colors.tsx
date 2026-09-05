import {Card, Col, Row, TabContent, Tabs, TabsList, TabTrigger} from '@loreschaeffer/lyco-ui';

export const title = 'Color Variants';
export const description = <p>The Tabs component supports semantic color variants to match different contexts.</p>;
export const order = 2;

export const vanillaHtml = `
<div class="tabs tabs--success" data-lyco-tabs>
  <div class="tabs__list" role="tablist">
    <button type="button" class="tabs__trigger is-active" role="tab" aria-selected="true" data-lyco-tab-value="1">Success Tab 1</button>
    <button type="button" class="tabs__trigger" role="tab" aria-selected="false" data-lyco-tab-value="2">Success Tab 2</button>
  </div>
  <div class="tabs__content" role="tabpanel" data-lyco-tab-value="1">Content 1</div>
  <div class="tabs__content" role="tabpanel" data-lyco-tab-value="2" hidden aria-hidden="true" style="display: none;">Content 2</div>
</div>
`;

export default function ColorsExample() {
    return (
        <Row>
            <Col>
                <Card>
                    <Card.Body style={{display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)'}}>

                        {/* Primary (Default) */}
                        <Tabs defaultValue="1" color="primary">
                            <TabsList>
                                <TabTrigger value="1">Primary 1</TabTrigger>
                                <TabTrigger value="2">Primary 2</TabTrigger>
                                <TabTrigger value="3">Primary 3</TabTrigger>
                            </TabsList>
                            <TabContent value="1">Primary default styling.</TabContent>
                            <TabContent value="2">Content 2</TabContent>
                            <TabContent value="3">Content 3</TabContent>
                        </Tabs>

                        {/* Success */}
                        <Tabs defaultValue="1" color="success">
                            <TabsList>
                                <TabTrigger value="1">Success 1</TabTrigger>
                                <TabTrigger value="2">Success 2</TabTrigger>
                            </TabsList>
                            <TabContent value="1">Great for positive confirmation states.</TabContent>
                            <TabContent value="2">Content 2</TabContent>
                        </Tabs>

                        {/* Danger */}
                        <Tabs defaultValue="1" color="danger">
                            <TabsList>
                                <TabTrigger value="1">Danger 1</TabTrigger>
                                <TabTrigger value="2">Danger 2</TabTrigger>
                            </TabsList>
                            <TabContent value="1">Useful for destructive or critical settings.</TabContent>
                            <TabContent value="2">Content 2</TabContent>
                        </Tabs>

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
