import React from 'react';
import {ImageViewerClose, ImageViewerNavigation} from './ImageViewerControls';
export interface GalleryImage { id: string | number; url: string; thumbnailUrl?: string; alt?: string; }
interface Props { images: GalleryImage[]; currentIndex: number; scale: number; position: {x: number; y: number}; isDragging: boolean; onClose: () => void; onPrevious: () => void; onNext: () => void; onSelect: (index: number) => void; onWheel: React.WheelEventHandler<HTMLDivElement>; onPointerDown: React.PointerEventHandler<HTMLDivElement>; onPointerMove: React.PointerEventHandler<HTMLDivElement>; onPointerUp: React.PointerEventHandler<HTMLDivElement>; }
export const ImageViewerRenderer = ({images, currentIndex, scale, position, isDragging, onClose, onPrevious, onNext, onSelect, onWheel, onPointerDown, onPointerMove, onPointerUp}: Props) => {
    const image = images[currentIndex];
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) onClose();
    };
    return <div className="image-viewer-container" onClick={handleBackdropClick}>
        <ImageViewerClose onClose={onClose}/>
        {currentIndex > 0 && <ImageViewerNavigation direction="prev" onClick={onPrevious}/>} 
        <div className="image-viewer-image-wrapper" onWheel={onWheel} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} style={{transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transition: isDragging ? 'none' : 'transform 0.1s ease-out'}}><img src={image.url} alt={image.alt || ''} className="image-viewer-image" draggable={false}/></div>
        {currentIndex < images.length - 1 && <ImageViewerNavigation direction="next" onClick={onNext}/>} 
        {images.length > 1 && <div className="image-viewer-thumbnails"><div className="image-viewer-thumbnails-track">{images.map((item, index) => <button key={item.id} type="button" className={`image-viewer-thumbnail ${index === currentIndex ? 'is-active' : ''}`} onClick={() => onSelect(index)} aria-label={`View image ${index + 1}`} aria-current={index === currentIndex ? 'true' : undefined}><img src={item.thumbnailUrl || item.url} alt={item.alt || `Thumbnail ${index + 1}`} draggable={false}/></button>)}</div></div>}
    </div>;
};

