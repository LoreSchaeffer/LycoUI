export function initLycoAccordions(): void {
    const accordions = document.querySelectorAll<HTMLDivElement>('.accordion-custom:not([data-lyco-initialized])');
    accordions.forEach(accordion => {
        if (!accordion.dataset.lycoInitialized) {
            new LycoAccordionController(accordion);
            accordion.dataset.lycoInitialized = 'true';
        }
    });
}

class LycoAccordionController {
    private readonly customElement: HTMLDivElement;
    private readonly wrapper: HTMLDivElement;
    private readonly allowMultiple: boolean;
    private items: AccordionItemController[] = [];

    constructor(customElement: HTMLDivElement) {
        this.customElement = customElement;
        this.allowMultiple = customElement.getAttribute('data-allow-multiple') === 'true';
        const variant = customElement.getAttribute('data-variant') || 'primary';
        const flush = customElement.getAttribute('data-flush') === 'true';

        this.wrapper = document.createElement('div');
        this.wrapper.className = 'accordion';
        this.wrapper.style.setProperty('--accordion-color-base', `var(--${variant}-500, var(--color-${variant}))`);
        if (flush) {
            this.wrapper.classList.add('accordion-flush');
        }

        if (customElement.id) {
            this.wrapper.id = customElement.id;
        }

        const customItems = customElement.querySelectorAll<HTMLDivElement>(':scope > .accordion-item-custom');
        let index = 0;
        customItems.forEach(customItem => {
            const itemController = new AccordionItemController(customItem, this, index++);
            this.items.push(itemController);
            this.wrapper.appendChild(itemController.getElement());
        });

        customElement.parentNode?.replaceChild(this.wrapper, customElement);
    }

    public handleToggle(toggledItem: AccordionItemController): void {
        const isNowOpen = toggledItem.isOpen();

        if (!this.allowMultiple && isNowOpen) {
            this.items.forEach(item => {
                if (item !== toggledItem && item.isOpen()) {
                    item.close();
                }
            });
        }
    }

    public destroy(): void {
        this.items.forEach(item => item.destroy());
        this.wrapper.parentNode?.replaceChild(this.customElement, this.wrapper);
        delete this.customElement.dataset.lycoInitialized;
    }
}

class AccordionItemController {
    private readonly customItem: HTMLDivElement;
    private readonly contentNodes: Node[];
    private readonly element: HTMLDivElement;
    private readonly button: HTMLButtonElement;
    private readonly parent: LycoAccordionController;
    private open = false;

    private readonly _onClick: () => void;

    constructor(customItem: HTMLDivElement, parent: LycoAccordionController, index: number) {
        this.customItem = customItem;
        this.parent = parent;

        const title = customItem.getAttribute('data-title') || 'Item';
        const initiallyOpen = customItem.getAttribute('data-open') === 'true';
        const disabled = customItem.hasAttribute('disabled');
        this.contentNodes = Array.from(customItem.childNodes);

        const baseId = `lyco-acc-${Math.random().toString(36).substr(2, 9)}-${index}`;
        const headerId = `${baseId}-header`;
        const collapseId = `${baseId}-collapse`;

        this.element = document.createElement('div');
        this.element.className = 'accordion__item';
        if (disabled) this.element.classList.add('is-disabled');

        const header = document.createElement('h2');
        header.className = 'accordion__header';
        header.id = headerId;

        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.className = 'accordion__button';
        this.button.setAttribute('aria-expanded', String(initiallyOpen));
        this.button.setAttribute('aria-controls', collapseId);
        if (disabled) this.button.disabled = true;

        this.button.textContent = title;
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'accordion__chevron');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.setAttribute('aria-hidden', 'true');
        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute('points', '6 9 12 15 18 9');
        svg.appendChild(polyline);
        this.button.appendChild(svg);

        header.appendChild(this.button);
        this.element.appendChild(header);

        const collapse = document.createElement('div');
        collapse.className = 'accordion__collapse';
        collapse.id = collapseId;
        collapse.setAttribute('aria-labelledby', headerId);
        collapse.setAttribute('role', 'region');
        collapse.setAttribute('aria-hidden', String(!initiallyOpen || disabled));

        const collapseInner = document.createElement('div');
        collapseInner.className = 'accordion__collapse-inner';

        const body = document.createElement('div');
        body.className = 'accordion__body';

        this.contentNodes.forEach(node => body.appendChild(node));

        collapseInner.appendChild(body);
        collapse.appendChild(collapseInner);
        this.element.appendChild(collapse);

        this._onClick = () => this.toggle();
        this.button.addEventListener('click', this._onClick);

        if (initiallyOpen && !disabled) {
            this.open = true;
            this.element.classList.add('is-open');
        }
    }

    public getElement(): HTMLDivElement {
        return this.element;
    }

    public isOpen(): boolean {
        return this.open;
    }

    public close(): void {
        if (!this.open) return;
        this.open = false;
        this.element.classList.remove('is-open');
        this.button.setAttribute('aria-expanded', 'false');

        const collapse = this.element.querySelector('.accordion__collapse');
        if (collapse) collapse.setAttribute('aria-hidden', 'true');
    }

    public toggle(): void {
        if (this.button.disabled) return;

        this.open = !this.open;
        if (this.open) {
            this.element.classList.add('is-open');
        } else {
            this.element.classList.remove('is-open');
        }

        this.button.setAttribute('aria-expanded', String(this.open));

        const collapse = this.element.querySelector('.accordion__collapse');
        if (collapse) collapse.setAttribute('aria-hidden', String(!this.open));

        this.parent.handleToggle(this);
    }

    public destroy(): void {
        this.button.removeEventListener('click', this._onClick);
        this.contentNodes.forEach(node => this.customItem.appendChild(node));
    }
}

