import {act} from 'react';
import {createRoot} from 'react-dom/client';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {ImageViewer} from '../../packages/core/src/components/ImageViewer/ImageViewer';
import {initLycoImageViewers} from '../../packages/core/src/components/ImageViewer/ImageViewer.vanilla';
import {initLycoModals} from '../../packages/core/src/components/Modal/Modal.vanilla';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('ImageViewer', () => {
    let container: HTMLDivElement | undefined;
    let root: ReturnType<typeof createRoot> | undefined;

    afterEach(async () => {
        if (root) await act(async () => root?.unmount());
        container?.remove();
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        root = undefined;
        container = undefined;
    });

    it('locks body scrolling while open and restores it when closed', async () => {
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'scroll';
        container = document.createElement('div');
        document.body.append(container);
        root = createRoot(container);

        await act(async () => root?.render(<ImageViewer isOpen images={[{id: 1, url: '/image.jpg'}]} onClose={vi.fn()}/>));
        expect(document.body.style.overflow).toBe('hidden');
        expect(document.documentElement.style.overflow).toBe('hidden');

        await act(async () => root?.render(<ImageViewer isOpen={false} images={[{id: 1, url: '/image.jpg'}]} onClose={vi.fn()}/>));
        expect(document.body.style.overflow).toBe('auto');
        expect(document.documentElement.style.overflow).toBe('scroll');
    });

    it('closes on the image viewer backdrop without closing from image clicks', async () => {
        const onClose = vi.fn();
        container = document.createElement('div');
        document.body.append(container);
        root = createRoot(container);

        await act(async () => root?.render(<ImageViewer isOpen images={[{id: 1, url: '/image.jpg'}]} onClose={onClose}/>));
        const backdrop = document.querySelector<HTMLElement>('.image-viewer-container')!;
        const image = document.querySelector<HTMLImageElement>('.image-viewer-image')!;

        await act(async () => image.click());
        expect(onClose).not.toHaveBeenCalled();
        await act(async () => backdrop.click());
        expect(onClose).toHaveBeenCalledOnce();
    });
});

describe('Vanilla ImageViewer', () => {
    afterEach(() => {
        document.body.innerHTML = '';
        document.body.style.overflow = '';
    });

    it('closes from its backdrop without closing when the image is clicked', () => {
        document.body.innerHTML = '<div class="modal image-viewer"><div class="image-viewer-container" data-lyco-dismiss="modal"><div class="image-viewer-image-wrapper"><img class="image-viewer-image" src="/image.jpg" alt="Image"></div></div></div>';
        initLycoModals(document);
        initLycoImageViewers(document);

        const viewer = document.querySelector<HTMLElement>('.image-viewer') as HTMLElement & {lycoModal?: {show: () => void}};
        viewer.lycoModal?.show();
        const image = viewer.querySelector<HTMLImageElement>('.image-viewer-image')!;
        const backdrop = viewer.querySelector<HTMLElement>('.image-viewer-container')!;

        image.click();
        expect(viewer.style.display).toBe('flex');
        backdrop.click();
        expect(viewer.style.display).toBe('none');
    });
});
