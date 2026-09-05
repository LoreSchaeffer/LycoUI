import React, {useState} from 'react';
import {Button, ImageViewer} from '@loreschaeffer/lyco-ui';

export const title = 'Single Image';
export const description = 'A basic image viewer displaying a single image. The navigation arrows and thumbnails are automatically hidden.';
export const order = 1;

export const vanillaHtml = `
<button class="button button--primary" data-lyco-toggle="modal" data-lyco-target="#my-viewer-single">
  View Image
</button>

<div class="modal image-viewer" id="my-viewer-single" data-lyco-image-viewer="true" style="display: none;">
  <div class="image-viewer__container" data-lyco-dismiss="modal">
    <button class="image-viewer__close" aria-label="Close" data-lyco-dismiss="modal">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <div class="image-viewer__image-wrapper">
      <img src="https://picsum.photos/seed/lyco1/800/600" class="image-viewer__image" />
    </div>
  </div>
</div>
`;

export default function SingleImageExample() {
    const [isOpen, setIsOpen] = useState(false);

    const images = [
        {
            id: '1',
            url: 'https://picsum.photos/seed/lyco1/800/600',
            alt: 'Random placeholder'
        }
    ];

    return (
        <div>
            <Button variant="primary" onClick={() => setIsOpen(true)}>
                View Image
            </Button>

            <ImageViewer
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                images={images}
            />
        </div>
    );
}
