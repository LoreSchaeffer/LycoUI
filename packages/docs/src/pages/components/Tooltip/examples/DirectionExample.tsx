import React from 'react';
import { Tooltip, Button, Card, Row, Col } from '@loreschaeffer/lyco-ui';

export const title = 'Tooltip Examples & Directions';
export const description = <p>Tooltips can be positioned dynamically around their trigger elements. They automatically avoid viewport clipping by using React Portals and smart collision detection.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="row">
  <div class="col-12">
    <div class="card">
      <div class="card__body">
        <div style="display: flex; justify-content: center; align-items: center; min-height: 400px; padding: var(--spacing-8) 0; width: 100%;">
          <div style="display: grid; grid-template-columns: auto auto auto; grid-template-rows: auto auto auto; gap: var(--spacing-4); justify-items: center; align-items: center; width: max-content;">
            
            <div style="grid-column: 2; grid-row: 1;">
              <button type="button" class="btn btn--outline" data-lyco-tooltip="Save document &lt;span style='opacity:0.6; font-size:0.85em; margin-left:var(--spacing-2)'&gt;⌘S&lt;/span&gt;" data-lyco-tooltip-position="top">Save Action</button>
            </div>
            
            <div style="grid-column: 1; grid-row: 2;">
              <button type="button" class="btn btn--outline" data-lyco-tooltip="Tooltip on left" data-lyco-tooltip-position="left">Left</button>
            </div>
            
            <div style="grid-column: 3; grid-row: 2;">
              <button type="button" class="btn btn--outline" data-lyco-tooltip="Tooltip on right" data-lyco-tooltip-position="right">Right</button>
            </div>
            
            <div style="grid-column: 2; grid-row: 3;">
              <button type="button" class="btn btn--primary" data-lyco-tooltip="This action cannot be undone" data-lyco-tooltip-position="bottom">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: var(--spacing-2); vertical-align: text-bottom;">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                Warning
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;

export default function DirectionExample() {
  return (
    <Row>
      <Col span={12}>
        <Card>
          <Card.Body>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', padding: 'var(--spacing-8) 0', width: '100%' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gridTemplateRows: 'auto auto auto', gap: 'var(--spacing-4)', justifyItems: 'center', alignItems: 'center', width: 'max-content' }}>
                <div style={{ gridColumn: 2, gridRow: 1 }}>
                  <Tooltip 
                    content={<span>Save document <span style={{ opacity: 0.6, fontSize: '0.85em', marginLeft: 'var(--spacing-2)' }}>⌘S</span></span>} 
                    position="top"
                  >
                    <Button variant="outline">Save Action</Button>
                  </Tooltip>
                </div>
                <div style={{ gridColumn: 1, gridRow: 2 }}>
                  <Tooltip content="Tooltip on left" position="left">
                    <Button variant="outline">Left</Button>
                  </Tooltip>
                </div>
                <div style={{ gridColumn: 3, gridRow: 2 }}>
                  <Tooltip content="Tooltip on right" position="right">
                    <Button variant="outline">Right</Button>
                  </Tooltip>
                </div>
                <div style={{ gridColumn: 2, gridRow: 3 }}>
                  <Tooltip content="This action cannot be undone" position="bottom">
                    <Button variant="primary">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 'var(--spacing-2)', verticalAlign: 'text-bottom' }}>
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      Warning
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
