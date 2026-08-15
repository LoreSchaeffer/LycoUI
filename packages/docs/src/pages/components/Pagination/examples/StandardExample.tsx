import React, { useState } from 'react';
import { Pagination } from 'lyco-ui';

export const title = 'Standard Pagination';
export const description = <p>The standard pagination variant provides a list of page numbers for navigation.</p>;
export const order = 1;

export const vanillaHtml = `
<!-- Notice: For Vanilla, you only need to write the container. LycoUI JS builds the buttons automatically. -->
<nav class="pagination-custom" 
     data-variant="standard" 
     data-total-pages="10" 
     data-current-page="1">
</nav>

<nav class="pagination-custom mt-4" 
     data-variant="standard" 
     data-color-variant="danger"
     data-total-pages="5" 
     data-current-page="3">
</nav>

<nav class="pagination-custom mt-4" 
     data-variant="standard" 
     data-color-variant="success"
     data-total-pages="8" 
     data-current-page="2">
</nav>

<script>
    // Listen for changes
    document.querySelector('.pagination-custom').addEventListener('pageChange', (e) => {
        console.log('Page changed to:', e.detail.page);
    });
</script>
`;

export default function StandardExample() {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(3);
    const [page3, setPage3] = useState(2);

    return (
        <div>
            <Pagination
                variant="standard"
                currentPage={page1}
                totalPages={10}
                onPageChange={setPage1}
            />
            
            <Pagination
                variant="standard"
                colorVariant="danger"
                currentPage={page2}
                totalPages={5}
                onPageChange={setPage2}
                className="mt-4"
            />

            <Pagination
                variant="standard"
                colorVariant="success"
                currentPage={page3}
                totalPages={8}
                onPageChange={setPage3}
                className="mt-4"
            />
        </div>
    );
}
