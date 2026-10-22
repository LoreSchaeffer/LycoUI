export interface Rect { top: number; left: number; width: number; height: number; }
export interface FloatingPositionOptions { anchor: Rect; surface: Rect; viewport: Rect; placement: string; gap: number; gutter: number; direction: 'ltr' | 'rtl'; }

export function computeFloatingPosition({anchor, surface, viewport, placement, gap, gutter}: FloatingPositionOptions): { top: number; left: number; placement: string; maxWidth: number; maxHeight: number } {
  let resolved = placement;
  if (placement === 'top' && anchor.top - surface.height - gap < viewport.top + gutter) resolved = 'bottom';
  if (placement === 'bottom' && anchor.top + anchor.height + surface.height + gap > viewport.top + viewport.height - gutter) resolved = 'top';
  const top = resolved === 'top' ? anchor.top - surface.height - gap : anchor.top + anchor.height + gap;
  const left = Math.max(viewport.left + gutter, Math.min(anchor.left + anchor.width / 2 - surface.width / 2, viewport.left + viewport.width - surface.width - gutter));
  return { top, left, placement: resolved, maxWidth: viewport.width - gutter * 2, maxHeight: viewport.height - gutter * 2 };
}
