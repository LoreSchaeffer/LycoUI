import {useEffect, useRef, useState, type KeyboardEvent, type PointerEvent} from 'react';
import {SidebarResizeController} from './SidebarResizeController';

export function useSidebarResize({initialWidth = 256, minWidth = 200, maxWidth = 400}: {initialWidth?: number; minWidth?: number; maxWidth?: number}) {
  const [width, setWidth] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);
  const controller = useRef<SidebarResizeController | null>(null);
  if (!controller.current) controller.current = new SidebarResizeController({initialWidth, minWidth, maxWidth, onChange: setWidth});

  useEffect(() => () => controller.current?.destroy(), []);

  const begin = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsResizing(true);
    controller.current?.begin(event.clientX);
  };
  const move = (event: PointerEvent<HTMLElement>) => controller.current?.move(event.clientX);
  const end = () => { controller.current?.end(); setIsResizing(false); };
  const keyboard = (event: KeyboardEvent<HTMLElement>) => {
    const delta = event.key === 'ArrowLeft' ? -10 : event.key === 'ArrowRight' ? 10 : 0;
    if (!delta) return;
    event.preventDefault();
    controller.current?.set(width + delta);
  };
  return {width, isResizing, begin, move, end, keyboard};
}
