import React, {useState} from 'react';
import {Button, ImageViewer} from '@loreschaeffer/lyco-ui';

export const title = 'Gallery Mode';
export const description = 'When passing multiple images, the viewer automatically enables gallery mode with navigation arrows and a thumbnail strip.';
export const order = 2;

export const vanillaHtml = `
<button class="button button--primary" data-lyco-toggle="modal" data-lyco-target="#my-viewer-gallery">
  View Gallery
</button>

<div class="modal image-viewer" id="my-viewer-gallery" data-lyco-image-viewer="true" style="display: none;">
  <div class="image-viewer__container" data-lyco-dismiss="modal">
    <button class="image-viewer__close" aria-label="Close" data-lyco-dismiss="modal">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    
    <button class="image-viewer__nav image-viewer__nav--prev" aria-label="Previous image">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>

    <div class="image-viewer__image-wrapper">
      <img src="https://picsum.photos/seed/lyco1/800/600" class="image-viewer__image" />
    </div>

    <button class="image-viewer__nav image-viewer__nav--next" aria-label="Next image">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>

    <div class="image-viewer__thumbnails">
      <div class="image-viewer__thumbnails-track">
        <button class="image-viewer__thumbnail is-active" aria-current="true" data-image-src="https://picsum.photos/seed/lyco1/800/600">
          <img src="https://picsum.photos/seed/lyco1/200/200" />
        </button>
        <button class="image-viewer__thumbnail" data-image-src="https://picsum.photos/seed/lyco2/800/600">
          <img src="https://picsum.photos/seed/lyco2/200/200" />
        </button>
        <button class="image-viewer__thumbnail" data-image-src="https://picsum.photos/seed/lyco3/800/600">
          <img src="https://picsum.photos/seed/lyco3/200/200" />
        </button>
      </div>
    </div>
  </div>
</div>
`;

export default function GalleryExample() {
    const [isOpen, setIsOpen] = useState(false);

    const images = [
        {
            id: '1',
            url: 'https://picsum.photos/seed/lyco1/800/600',
            thumbnailUrl: 'https://picsum.photos/seed/lyco1/200/200',
            alt: 'Random image 1'
        },
        {
            id: '2',
            url: 'https://picsum.photos/seed/lyco2/800/600',
            thumbnailUrl: 'https://picsum.photos/seed/lyco2/200/200',
            alt: 'Random image 2'
        },
        {
            id: '3',
            url: 'https://picsum.photos/seed/lyco3/800/600',
            thumbnailUrl: 'https://picsum.photos/seed/lyco3/200/200',
            alt: 'Random image 3'
        }
    ];

    return (
        <div>
            <Button variant="primary" onClick={() => setIsOpen(true)}>
                View Gallery
            </Button>

            <ImageViewer
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                images={images}
                initialIndex={0}
            />
        </div>
    );
}
