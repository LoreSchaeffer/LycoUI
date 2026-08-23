import React, { useState } from 'react';
import { Pagination, Row, Col, Card } from '@loreschaeffer/lyco-ui';

export const title = 'Compact Pagination';
export const description = <p>The compact pagination variant displays the current page and total pages. The current page number is interactive: clicking it turns it into an input allowing you to quickly jump to a specific page.</p>;
export const order = 2;

export const vanillaHtml = `
<nav class="pagination-custom" 
     data-variant="compact" 
     data-total-pages="40" 
     data-current-page="1">
</nav>

<script>
    document.querySelector('.pagination-custom').addEventListener('pageChange', (e) => {
        console.log('Page changed to:', e.detail.page);
    });
</script>
`;

export default function CompactExample() {
    const [page, setPage] = useState(1);

    return (
        <Row>
            <Col xs={12} md={8}>
                <Card>
                    <Card.Body>
                        <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--spacing-4) 0' }}>
                            <Pagination
                                variant="compact"
                                currentPage={page}
                                totalPages={40}
                                onChange={setPage}
                                colorVariant="primary"
                            />
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
