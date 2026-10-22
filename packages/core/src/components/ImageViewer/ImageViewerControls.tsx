export const ImageViewerClose = ({onClose}: {onClose: () => void}) => <button type="button" className="image-viewer-close" onClick={onClose} aria-label="Close" data-lyco-dismiss="modal">×</button>;
export const ImageViewerNavigation = ({direction, onClick}: {direction: 'prev' | 'next'; onClick: () => void}) => <button type="button" className={`image-viewer-nav image-viewer-nav-${direction}`} onClick={onClick} aria-label={`${direction === 'prev' ? 'Previous' : 'Next'} image`}>{direction === 'prev' ? '‹' : '›'}</button>;

