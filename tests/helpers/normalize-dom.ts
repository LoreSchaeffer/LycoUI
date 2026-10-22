const GENERATED_ID = /^lyco-\d+$/;
const ID_REFERENCE_ATTRIBUTES = new Set([
  'aria-activedescendant',
  'aria-controls',
  'aria-describedby',
  'aria-details',
  'aria-errormessage',
  'aria-labelledby',
  'for',
]);

export interface DomDifference {
  equal: boolean;
  differences: string[];
}

function normalizeElement(element: Element): void {
  element.removeAttribute('data-lyco-initialized');

  for (const attribute of [...element.attributes]) {
    if (attribute.name === 'id' && GENERATED_ID.test(attribute.value)) {
      element.setAttribute(attribute.name, '__generated_id__');
      continue;
    }

    if (ID_REFERENCE_ATTRIBUTES.has(attribute.name)) {
      const normalized = attribute.value
        .split(/\s+/)
        .map((value) => (GENERATED_ID.test(value) ? '__generated_id__' : value))
        .join(' ');
      element.setAttribute(attribute.name, normalized);
    }
  }

  for (const child of [...element.children]) {
    normalizeElement(child);
  }
}

function rootFor(html: string): HTMLElement {
  const document = new DOMParser().parseFromString(html, 'text/html');
  const root = document.body.firstElementChild;
  if (!root || document.body.children.length !== 1) {
    throw new Error('Expected exactly one DOM root');
  }
  return root as HTMLElement;
}

export function normalizeDom(html: string): string {
  const root = rootFor(html);
  normalizeElement(root);
  return root.outerHTML;
}

function compareElements(left: Element, right: Element, path: string, differences: string[]): void {
  if (left.tagName !== right.tagName) {
    differences.push(`${path}: tag ${left.tagName.toLowerCase()} !== ${right.tagName.toLowerCase()}`);
  }

  const names = new Set([...left.getAttributeNames(), ...right.getAttributeNames()]);
  for (const name of names) {
    if (left.getAttribute(name) !== right.getAttribute(name)) {
      differences.push(`${path}: ${name} ${left.getAttribute(name)} !== ${right.getAttribute(name)}`);
    }
  }

  if (left.childNodes.length !== right.childNodes.length) {
    differences.push(`${path}: child count ${left.childNodes.length} !== ${right.childNodes.length}`);
    return;
  }

  for (let index = 0; index < left.childNodes.length; index += 1) {
    const leftChild = left.childNodes[index];
    const rightChild = right.childNodes[index];
    const childPath = `${path}/${index}`;
    if (leftChild.nodeType !== rightChild.nodeType) {
      differences.push(`${childPath}: node type differs`);
    } else if (leftChild.nodeType === Node.ELEMENT_NODE && rightChild.nodeType === Node.ELEMENT_NODE) {
      compareElements(leftChild as Element, rightChild as Element, childPath, differences);
    } else if (leftChild.textContent !== rightChild.textContent) {
      differences.push(`${childPath}: text differs`);
    }
  }
}

export function diffNormalizedDom(leftHtml: string, rightHtml: string): DomDifference {
  const left = rootFor(normalizeDom(leftHtml));
  const right = rootFor(normalizeDom(rightHtml));
  const differences: string[] = [];
  compareElements(left, right, 'root', differences);
  return { equal: differences.length === 0, differences };
}
