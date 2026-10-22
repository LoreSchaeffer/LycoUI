export interface DismissableLayerOptions {
  contains(target: Node): boolean;
  onDismiss(): void;
}

export function createDismissableLayer({contains, onDismiss}: DismissableLayerOptions): () => void {
  const onPointerDown = (event: MouseEvent): void => {
    if (event.target instanceof Node && !contains(event.target)) onDismiss();
  };
  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') onDismiss();
  };
  document.addEventListener('mousedown', onPointerDown);
  document.addEventListener('keydown', onKeyDown);
  return () => {
    document.removeEventListener('mousedown', onPointerDown);
    document.removeEventListener('keydown', onKeyDown);
  };
}
