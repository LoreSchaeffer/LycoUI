const SAFE_SVG_ELEMENTS = new Set(['svg', 'path', 'line', 'polyline', 'polygon', 'circle', 'rect', 'g', 'title']);
const SAFE_SVG_ATTRIBUTES = new Set(['viewbox', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'd', 'x', 'y', 'x1', 'x2', 'y1', 'y2', 'cx', 'cy', 'r', 'width', 'height', 'points', 'role', 'aria-hidden', 'focusable']);

export function setSafeText(target: Element, value: string): void {
  target.textContent = value;
}

export function createSafeSvg(markup: string): SVGSVGElement | null {
  const parsed = new DOMParser().parseFromString(markup, 'image/svg+xml');
  const root = parsed.documentElement;
  if (root.nodeName === 'parsererror' || root.localName !== 'svg') return null;

  for (const element of [root, ...root.querySelectorAll('*')]) {
    if (!SAFE_SVG_ELEMENTS.has(element.localName)) return null;
    for (const attribute of [...element.attributes]) {
      const name = attribute.name.toLowerCase();
      if (!SAFE_SVG_ATTRIBUTES.has(name) || name.startsWith('on')) return null;
      if ((name === 'href' || name === 'xlink:href') && !attribute.value.startsWith('#')) return null;
    }
  }

  return document.importNode(root, true) as unknown as SVGSVGElement;
}
