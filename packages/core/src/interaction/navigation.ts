export interface NavigationRequest {
  key: string;
  currentIndex: number;
  enabledIndices: readonly number[];
  orientation: 'vertical' | 'horizontal';
  loop: boolean;
}

export type NavigationAction = { type: 'focus'; index: number } | { type: 'none' };

export function nextNavigationAction(request: NavigationRequest): NavigationAction {
  const { enabledIndices, currentIndex, key, orientation, loop } = request;
  if (enabledIndices.length === 0) return { type: 'none' };
  const previousKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
  const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
  if (key === 'Home') return { type: 'focus', index: enabledIndices[0] };
  if (key === 'End') return { type: 'focus', index: enabledIndices.at(-1)! };
  if (key !== previousKey && key !== nextKey) return { type: 'none' };

  const current = enabledIndices.indexOf(currentIndex);
  const direction = key === nextKey ? 1 : -1;
  const next = current === -1 ? (direction > 0 ? 0 : enabledIndices.length - 1) : current + direction;
  if (next >= 0 && next < enabledIndices.length) return { type: 'focus', index: enabledIndices[next] };
  if (!loop) return { type: 'focus', index: enabledIndices[current] ?? enabledIndices[0] };
  return { type: 'focus', index: direction > 0 ? enabledIndices[0] : enabledIndices.at(-1)! };
}
