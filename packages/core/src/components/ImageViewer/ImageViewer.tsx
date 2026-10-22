import React, {useEffect, useState} from 'react';
import {Modal} from '../Modal';
import {lockBodyScroll} from '../../interaction/body-scroll-lock';
import {clampGalleryIndex, nextGalleryIndex} from './gallery-model';
import {ImageViewerRenderer, type GalleryImage} from './ImageViewerRenderer';
import {useImageTransform} from './useImageTransform';
import './ImageViewer.scss';
export interface ImageViewerImage extends GalleryImage {}
export interface ImageViewerProps { isOpen: boolean; images: ImageViewerImage[]; initialIndex?: number; onClose: () => void; className?: string; id?: string; }
export const ImageViewer = React.forwardRef<HTMLDialogElement, ImageViewerProps>(({isOpen, images, initialIndex = 0, onClose, className = '', id}, ref) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const transform = useImageTransform();
    useEffect(() => {
        if (!isOpen || images.length === 0) return;
        return lockBodyScroll();
    }, [isOpen]);
    useEffect(() => { if (isOpen) setCurrentIndex(clampGalleryIndex(initialIndex, images.length)); transform.reset(); }, [isOpen, initialIndex, images.length]);
    if (!isOpen || images.length === 0) return null;
    const stop = (handler: () => void) => () => handler();
    const pointerDown = (event: React.PointerEvent<HTMLDivElement>) => { if (transform.scale > 1) { transform.start(event); event.currentTarget.setPointerCapture(event.pointerId); } };
    const pointerUp = (event: React.PointerEvent<HTMLDivElement>) => { transform.end(); if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); };
    return <Modal isOpen={isOpen} onClose={onClose} className={`image-viewer ${className}`} id={id} closeOnOverlayClick closeOnEscape ref={ref}><ImageViewerRenderer images={images} currentIndex={currentIndex} scale={transform.scale} position={transform.position} isDragging={transform.isDragging} onClose={onClose} onPrevious={stop(() => { setCurrentIndex(value => nextGalleryIndex(value, images.length, -1, false)); transform.reset(); })} onNext={stop(() => { setCurrentIndex(value => nextGalleryIndex(value, images.length, 1, false)); transform.reset(); })} onSelect={index => { setCurrentIndex(index); transform.reset(); }} onWheel={transform.wheel} onPointerDown={pointerDown} onPointerMove={transform.move} onPointerUp={pointerUp}/></Modal>;
});
ImageViewer.displayName = 'ImageViewer';
