import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Modal} from '../Modal';
import './ImageViewer.scss';

/**
 * ImageViewerImage.
 */
export interface ImageViewerImage {
    id: string | number;
    url: string;
    thumbnailUrl?: string;
    alt?: string;
}

/**
 * Props for the ImageViewer component.
 */
export interface ImageViewerProps {
    /** Whether the viewer is open */
    isOpen: boolean;
    /** Array of images to display in the gallery */
    images: ImageViewerImage[];
    /** The index of the image to show initially */
    initialIndex?: number;
    /** Callback fired when the viewer requests to be closed */
    onClose: () => void;
    /** Optional CSS class */
    className?: string;
    /** Element ID */
    id?: string;
}

/**
 * ImageViewer component.
 * A UI component for LycoUI.
 */
export const ImageViewer = React.forwardRef<HTMLDialogElement, ImageViewerProps>(({
                                                                                      isOpen,
                                                                                      images,
                                                                                      initialIndex = 0,
                                                                                      onClose,
                                                                                      className = '',
                                                                                      id
                                                                                  }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [scale, setScale] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0});
    const dragStart = useRef({x: 0, y: 0});

    // Reset state when opening/closing or when images change
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex >= 0 && initialIndex < images.length ? initialIndex : 0);
        }
        setScale(1);
        setPosition({x: 0, y: 0});
    }, [isOpen, initialIndex, images.length]);

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setScale(1);
            setPosition({x: 0, y: 0});
        }
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentIndex < images.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setScale(1);
            setPosition({x: 0, y: 0});
        }
    };

    const handleThumbnailClick = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setCurrentIndex(index);
        setScale(1);
        setPosition({x: 0, y: 0});
    };

    const handleWheel = useCallback((e: React.WheelEvent) => {
        if (e.deltaY < 0) {
            setScale(prev => Math.min(prev + 0.1, 4));
        } else {
            setScale(prev => Math.max(prev - 0.1, 0.5));
            if (scale - 0.1 <= 1) {
                setPosition({x: 0, y: 0});
            }
        }
    }, [scale]);

    const handlePointerDown = (e: React.PointerEvent) => {
        if (scale > 1) {
            setIsDragging(true);
            dragStart.current = {
                x: e.clientX - position.x,
                y: e.clientY - position.y
            };
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
        }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y
        });
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        setIsDragging(false);
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    };

    if (!isOpen || images.length === 0) return null;

    const currentImage = images[currentIndex];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className={`image-viewer ${className}`}
            id={id}
            closeOnOverlayClick={true}
            closeOnEscape={true}
            ref={ref}
        >
            <div className="image-viewer__container">
                <button
                    type="button"
                    className="image-viewer__close"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    aria-label="Close"
                    data-lyco-dismiss="modal"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                {currentIndex > 0 && (
                    <button
                        type="button"
                        className="image-viewer__nav image-viewer__nav--prev"
                        onClick={handlePrev}
                        aria-label="Previous image"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                )}

                <div
                    className="image-viewer__image-wrapper"
                    onClick={(e) => e.stopPropagation()}
                    onWheel={handleWheel}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                    }}
                >
                    <img
                        src={currentImage.url}
                        alt={currentImage.alt || ''}
                        className="image-viewer__image"
                        draggable={false}
                    />
                </div>

                {currentIndex < images.length - 1 && (
                    <button
                        type="button"
                        className="image-viewer__nav image-viewer__nav--next"
                        onClick={handleNext}
                        aria-label="Next image"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                )}

                {images.length > 1 && (
                    <div className="image-viewer__thumbnails" onClick={(e) => e.stopPropagation()}>
                        <div className="image-viewer__thumbnails-track">
                            {images.map((image, idx) => (
                                <button
                                    key={image.id}
                                    type="button"
                                    className={`image-viewer__thumbnail ${idx === currentIndex ? 'is-active' : ''}`}
                                    onClick={(e) => handleThumbnailClick(e, idx)}
                                    aria-label={`View image ${idx + 1}`}
                                    aria-current={idx === currentIndex ? 'true' : undefined}
                                >
                                    <img
                                        src={image.thumbnailUrl || image.url}
                                        alt={image.alt || `Thumbnail ${idx + 1}`}
                                        draggable={false}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
});

ImageViewer.displayName = 'ImageViewer';
