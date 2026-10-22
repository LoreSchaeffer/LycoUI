export function setPickerValidity(input: HTMLInputElement, valid: boolean, message = 'Invalid value'): void {
  input.setCustomValidity(valid ? '' : message);
  input.setAttribute('aria-invalid', String(!valid));
}

export function emitPickerChange(input: HTMLInputElement, kind: 'date' | 'time' | 'datetime'): void {
  input.dispatchEvent(new CustomEvent('lyco:picker-change', {
    bubbles: true,
    detail: {kind, value: input.value}
  }));
}

export interface PickerShell {
  root: HTMLDivElement;
  trigger: HTMLDivElement;
  popover: HTMLDivElement;
  open: () => void;
  close: (restoreFocus?: boolean) => void;
  destroy: () => void;
}

/** Builds the same desktop trigger/popover landmarks as the React pickers.
 * The input itself stays in the form, so its name, constraints and validity
 * remain native rather than being copied into a surrogate control. */
export function createPickerShell(input: HTMLInputElement, kind: 'date' | 'time' | 'datetime', label: string): PickerShell {
  const parent = input.parentNode;
  if (!parent) throw new Error('Picker input must be connected before initialization');
  const nextSibling = input.nextSibling;
  const original = {
    type: input.type,
    className: input.className,
    hasPopup: input.getAttribute('aria-haspopup'),
    expanded: input.getAttribute('aria-expanded'),
    controls: input.getAttribute('aria-controls')
  };
  const root = document.createElement('div');
  root.className = kind === 'time' ? 'datepicker datepicker-time' : kind === 'datetime' ? 'datepicker datepicker-datetime' : 'datepicker';
  const trigger = document.createElement('div');
  trigger.className = 'datepicker-trigger';
  const icon = document.createElement('span');
  icon.className = 'datepicker-icon';
  icon.setAttribute('aria-hidden', 'true');
  const chevron = document.createElement('span');
  chevron.className = 'datepicker-chevron';
  chevron.setAttribute('aria-hidden', 'true');
  chevron.textContent = '⌄';
  const popover = document.createElement('div');
  popover.className = kind === 'datetime' ? 'datepicker-popover datepicker-popover-datetime' : 'datepicker-popover';
  popover.id = `${input.id || `${kind}-picker`}-popover`;
  popover.setAttribute('role', 'dialog');
  popover.setAttribute('aria-label', label);
  popover.hidden = true;
  input.className = 'datepicker-input';
  input.setAttribute('aria-haspopup', 'dialog');
  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('aria-controls', popover.id);
  parent.insertBefore(root, input);
  root.append(trigger);
  trigger.append(icon, input, chevron);
  document.body.append(popover);
  const close = (restoreFocus = false): void => {
    popover.hidden = true;
    root.classList.remove('is-open');
    input.setAttribute('aria-expanded', 'false');
    if (restoreFocus) input.focus();
  };
  const open = (): void => {
    if (input.disabled || window.matchMedia('(max-width: 768px)').matches) return;
    popover.hidden = false;
    root.classList.add('is-open');
    input.setAttribute('aria-expanded', 'true');
  };
  const onTrigger = (): void => { open(); input.focus(); };
  const onInputKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') { event.preventDefault(); popover.hidden ? open() : close(); }
    if (event.key === 'Escape') { event.preventDefault(); close(true); }
  };
  const onPopoverKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') { event.preventDefault(); close(true); }
  };
  trigger.addEventListener('click', onTrigger);
  input.addEventListener('keydown', onInputKeyDown);
  popover.addEventListener('keydown', onPopoverKeyDown);
  return {root, trigger, popover, open, close, destroy: () => {
    trigger.removeEventListener('click', onTrigger);
    input.removeEventListener('keydown', onInputKeyDown);
    popover.removeEventListener('keydown', onPopoverKeyDown);
    popover.remove();
    input.type = original.type;
    input.className = original.className;
    ([['aria-haspopup', original.hasPopup], ['aria-expanded', original.expanded], ['aria-controls', original.controls]] as const).forEach(([name, value]) => {
      if (value === null) input.removeAttribute(name); else input.setAttribute(name, value);
    });
    if (nextSibling) parent.insertBefore(input, nextSibling); else parent.append(input);
    root.remove();
  }};
}

export function renderCalendar(popover: HTMLElement, viewDate: Date, selected: Date | null, min: Date | undefined, max: Date | undefined, onSelect: (date: Date) => void, onView: (direction: -1 | 1) => void): void {
  const monthLabel = new Intl.DateTimeFormat(undefined, {month: 'long', year: 'numeric'}).format(viewDate);
  const start = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  const calendar = document.createElement('div');
  calendar.className = 'datepicker-calendar';
  const header = document.createElement('div'); header.className = 'datepicker-cal-header';
  const previous = document.createElement('button'); previous.type = 'button'; previous.className = 'datepicker-cal-nav-btn'; previous.setAttribute('aria-label', 'Previous month'); previous.textContent = '‹';
  const title = document.createElement('span'); title.className = 'datepicker-cal-title'; title.setAttribute('aria-live', 'polite'); title.textContent = monthLabel;
  const next = document.createElement('button'); next.type = 'button'; next.className = 'datepicker-cal-nav-btn'; next.setAttribute('aria-label', 'Next month'); next.textContent = '›';
  previous.addEventListener('click', () => onView(-1)); next.addEventListener('click', () => onView(1));
  header.append(previous, title, next);
  const grid = document.createElement('div'); grid.className = 'datepicker-cal-grid'; grid.setAttribute('role', 'grid'); grid.setAttribute('aria-label', monthLabel);
  ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].forEach((name) => { const day = document.createElement('span'); day.className = 'datepicker-cal-weekday'; day.textContent = name; grid.append(day); });
  for (let index = 0; index < 42; index += 1) {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index);
    const button = document.createElement('button'); button.type = 'button'; button.className = 'datepicker-cal-day'; button.setAttribute('role', 'gridcell'); button.textContent = String(date.getDate());
    if (date.getMonth() !== viewDate.getMonth()) button.classList.add('is-outside');
    const disabled = !!(min && date < new Date(min.getFullYear(), min.getMonth(), min.getDate())) || !!(max && date > new Date(max.getFullYear(), max.getMonth(), max.getDate()));
    button.disabled = disabled;
    if (selected && date.getFullYear() === selected.getFullYear() && date.getMonth() === selected.getMonth() && date.getDate() === selected.getDate()) { button.classList.add('is-selected'); button.setAttribute('aria-selected', 'true'); }
    button.addEventListener('click', () => { if (!disabled) onSelect(date); });
    grid.append(button);
  }
  calendar.append(header, grid);
  popover.replaceChildren(calendar);
}

export function renderTimePicker(popover: HTMLElement, hours: number, minutes: number, use12Hour: boolean, onSelect: (hours: number, minutes: number) => void): void {
  const root = document.createElement('div'); root.className = 'datepicker-time';
  const label = document.createElement('span'); label.className = 'datepicker-time-label'; label.textContent = 'Time'; root.append(label);
  const columns = document.createElement('div'); columns.className = 'datepicker-time-columns';
  const addColumn = (ariaLabel: string, values: string[], selected: string, onClick: (value: string) => void): void => {
    const column = document.createElement('div'); column.className = 'datepicker-time-col'; column.tabIndex = 0; column.setAttribute('role', 'listbox'); column.setAttribute('aria-label', ariaLabel);
    values.forEach((value) => { const option = document.createElement('div'); option.className = 'datepicker-time-item'; option.setAttribute('role', 'option'); option.textContent = value; const isSelected = value === selected; option.classList.toggle('is-selected', isSelected); option.setAttribute('aria-selected', String(isSelected)); option.addEventListener('click', () => onClick(value)); column.append(option); });
    columns.append(column);
  };
  const shownHour = use12Hour ? String(hours % 12 || 12).padStart(2, '0') : String(hours).padStart(2, '0');
  const hourValues = Array.from({length: use12Hour ? 12 : 24}, (_, index) => String(use12Hour ? (index + 1) : index).padStart(2, '0'));
  const minuteValues = Array.from({length: 60}, (_, index) => String(index).padStart(2, '0'));
  addColumn('Hours', hourValues, shownHour, (value) => { const hour = Number(value); onSelect(use12Hour ? (hours >= 12 ? (hour % 12) + 12 : hour % 12) : hour, minutes); });
  const separator = document.createElement('span'); separator.className = 'datepicker-time-separator'; separator.setAttribute('aria-hidden', 'true'); separator.textContent = ':'; columns.append(separator);
  addColumn('Minutes', minuteValues, String(minutes).padStart(2, '0'), (value) => onSelect(hours, Number(value)));
  if (use12Hour) addColumn('AM/PM', ['AM', 'PM'], hours >= 12 ? 'PM' : 'AM', (value) => onSelect(value === 'PM' ? hours % 12 + 12 : hours % 12, minutes));
  root.append(columns); popover.replaceChildren(root);
}
