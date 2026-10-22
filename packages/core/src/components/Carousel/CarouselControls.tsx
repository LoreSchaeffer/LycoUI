import clsx from 'clsx';
interface CarouselControlsProps { count: number; index: number; infinite: boolean; showArrows: boolean; showDots: boolean; onMove: (direction: 1 | -1) => void; onSelect: (index: number) => void; }
export function CarouselControls({count, index, infinite, showArrows, showDots, onMove, onSelect}: CarouselControlsProps) {
    if (count <= 1) return null;
    return <>{showArrows && <><button type="button" className="carousel__arrow carousel__arrow--prev" onClick={() => onMove(-1)} disabled={!infinite && index === 0} aria-label="Previous slide">‹</button><button type="button" className="carousel__arrow carousel__arrow--next" onClick={() => onMove(1)} disabled={!infinite && index === count - 1} aria-label="Next slide">›</button></>}{showDots && <div className="carousel__dots">{Array.from({length: count}, (_, item) => <button type="button" key={item} className={clsx('carousel__dot', {'is-active': index === item})} onClick={() => onSelect(item)} aria-label={`Go to slide ${item + 1}`} aria-current={index === item ? 'true' : undefined}/>)}</div>}</>;
}
