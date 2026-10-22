import {handleListKeyboardNav} from '../../utils/keyboard';
import {setAriaSelected} from '../../utils/aria';

/**
 * Controller for the Vanilla JS Tabs component.
 * Manages WAI-ARIA states and keyboard navigation.
 */
export class TabsController {
    private element: HTMLElement;
    private triggers: NodeListOf<HTMLButtonElement>;
    private contents: NodeListOf<HTMLElement>;
    private boundHandleClick: (e: MouseEvent) => void;
    private boundHandleKeyDown: (e: KeyboardEvent) => void;

    /**
     * Initializes the Tabs controller.
     * @param element - The root DOM element containing the tabs.
     */
    constructor(element: HTMLElement) {
        this.element = element;
        this.triggers = this.element.querySelectorAll('[data-lyco-tab-value][role="tab"]');
        this.contents = this.element.querySelectorAll('[data-lyco-tab-value][role="tabpanel"]');
        this.boundHandleClick = this.handleClick.bind(this);
        this.boundHandleKeyDown = this.handleKeyDown.bind(this);

        if (this.element.dataset.lycoInitialized === 'true') return;

        this.init();
    }

    /**
     * Binds event listeners and sets initial states.
     */
    private init() {
        const activeTrigger = Array.from(this.triggers).find(t => t.classList.contains('is-active') && !t.disabled && !t.classList.contains('is-disabled')) || Array.from(this.triggers).find(t => !t.disabled && !t.classList.contains('is-disabled'));
        const activeValue = activeTrigger ? activeTrigger.dataset.lycoTabValue : null;

        const idPrefix = `lyco-tabs-${Math.random().toString(36).substr(2, 9)}`;

        this.triggers.forEach(trigger => {
            const value = trigger.dataset.lycoTabValue;
            if (!value) return;

            if (!trigger.id) trigger.id = `${idPrefix}-tab-${value}`;
            if (!trigger.hasAttribute('aria-controls')) trigger.setAttribute('aria-controls', `${idPrefix}-panel-${value}`);
            trigger.tabIndex = trigger === activeTrigger ? 0 : -1;

            trigger.addEventListener('click', this.boundHandleClick);
        });

        this.contents.forEach(content => {
            const value = content.dataset.lycoTabValue;
            if (!value) return;

            if (!content.id) content.id = `${idPrefix}-panel-${value}`;
            if (!content.hasAttribute('aria-labelledby')) content.setAttribute('aria-labelledby', `${idPrefix}-tab-${value}`);

            if (value !== activeValue) {
                content.style.display = 'none';
                content.hidden = true;
                content.setAttribute('aria-hidden', 'true');
            } else {
                content.removeAttribute('aria-hidden');
                content.hidden = false;
            }
        });

        this.element.addEventListener('keydown', this.boundHandleKeyDown);
        this.element.dataset.lycoInitialized = 'true';
    }

    private handleKeyDown(e: KeyboardEvent) {
        const list = e.target as HTMLElement;
        if (!list.closest('.tabs-list')) return;

        handleListKeyboardNav(
            e,
            this.element,
            '[role="tab"]:not(.is-disabled):not(:disabled)',
            true,
            true,
            (item) => item.click()
        );
    }

    private handleClick(e: MouseEvent) {
        const trigger = (e.target as HTMLElement).closest('[data-lyco-tab-value][role="tab"]') as HTMLButtonElement;
        if (!trigger) return;

        if (trigger.disabled || trigger.classList.contains('is-disabled')) return;

        const eventValue = trigger.dataset.lycoTabValue;
        if (!eventValue) return;

        this.triggers.forEach(t => {
            t.classList.remove('is-active');
            setAriaSelected(t, false);
            t.tabIndex = -1;
        });

        trigger.classList.add('is-active');
        setAriaSelected(trigger, true);
        trigger.tabIndex = 0;

        this.contents.forEach(content => {
            if (content.dataset.lycoTabValue === eventValue) {
                content.style.display = '';
                content.hidden = false;
                content.removeAttribute('aria-hidden');
            } else {
                content.style.display = 'none';
                content.hidden = true;
                content.setAttribute('aria-hidden', 'true');
            }
        });
    }

    /**
     * Destroys the controller, removing all event listeners to prevent memory leaks.
     */
    public destroy() {
        this.triggers.forEach(trigger => {
            trigger.removeEventListener('click', this.boundHandleClick);
        });
        this.element.removeEventListener('keydown', this.boundHandleKeyDown);
        delete this.element.dataset.lycoInitialized;
    }
}

export const initTabs = () => {
    const elements = document.querySelectorAll('.tabs:not([data-lyco-initialized])');
    elements.forEach(element => {
        new TabsController(element as HTMLElement);
    });
};


