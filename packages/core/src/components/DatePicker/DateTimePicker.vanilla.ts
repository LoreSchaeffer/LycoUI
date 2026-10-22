import {formatLocalDate, parseLocalDate} from './date-model';
import {formatTime, parseTime} from './time-model';
import {createPickerShell, emitPickerChange, renderCalendar, renderTimePicker, setPickerValidity, type PickerShell} from './PickerRenderer';
import {controllerRegistry} from '../../vanilla/controller-registry';

export class LycoDateTimePickerController {
  private readonly input: HTMLInputElement;
  private readonly shell: PickerShell;
  private draftDate: Date;
  private draftTime: {hours: number; minutes: number};
  private readonly onChange = (): void => this.normalize();

  constructor(input: HTMLInputElement) {
    this.input = input;
    const [dateValue, timeValue] = input.value.split('T');
    this.draftDate = dateValue ? parseLocalDate(dateValue) ?? new Date() : new Date();
    this.draftTime = timeValue ? parseTime(timeValue) ?? {hours: 0, minutes: 0} : {hours: 0, minutes: 0};
    this.shell = createPickerShell(input, 'datetime', 'Date and time picker');
    this.renderPopover();
    input.addEventListener('change', this.onChange);
  }

  private renderPopover(): void {
    const body = document.createElement('div'); body.className = 'datepicker-datetime-body';
    const calendarSection = document.createElement('div'); calendarSection.className = 'datepicker-calendar-section';
    const timeSection = document.createElement('div'); timeSection.className = 'datepicker-time-section';
    body.append(calendarSection, timeSection);
    const footer = document.createElement('div'); footer.className = 'datepicker-datetime-footer';
    const apply = document.createElement('button'); apply.type = 'button'; apply.className = 'datepicker-btn datepicker-btn-primary'; apply.textContent = 'Apply';
    apply.addEventListener('click', () => {
      this.input.value = `${formatLocalDate(this.draftDate)}T${formatTime(this.draftTime)}`;
      this.normalize();
      this.shell.close(true);
    });
    footer.append(apply); this.shell.popover.replaceChildren(body, footer);
    const min = this.input.min ? parseLocalDate(this.input.min.slice(0, 10)) ?? undefined : undefined;
    const max = this.input.max ? parseLocalDate(this.input.max.slice(0, 10)) ?? undefined : undefined;
    renderCalendar(calendarSection, this.draftDate, this.draftDate, min, max, (date) => { this.draftDate = date; this.renderPopover(); }, (direction) => { this.draftDate = new Date(this.draftDate.getFullYear(), this.draftDate.getMonth() + direction, 1); this.renderPopover(); });
    renderTimePicker(timeSection, this.draftTime.hours, this.draftTime.minutes, this.input.getAttribute('data-use-12-hour') === 'true', (hours, minutes) => { this.draftTime = {hours, minutes}; this.renderPopover(); });
  }

  private normalize(): void {
    if (!this.input.value) {
      setPickerValidity(this.input, true);
      emitPickerChange(this.input, 'datetime');
      return;
    }
    const [dateValue, timeValue] = this.input.value.split('T');
    const date = dateValue ? parseLocalDate(dateValue) : null;
    const time = timeValue ? parseTime(timeValue) : null;
    if (!date || !time) {
      setPickerValidity(this.input, false);
      return;
    }
    const normalized = `${formatLocalDate(date)}T${formatTime(time)}`;
    this.input.value = this.input.min && normalized < this.input.min
      ? this.input.min
      : this.input.max && normalized > this.input.max
        ? this.input.max
        : normalized;
    setPickerValidity(this.input, true);
    emitPickerChange(this.input, 'datetime');
  }

  destroy(): void {
    this.input.removeEventListener('change', this.onChange);
    this.shell.destroy();
  }
}

export function initLycoDateTimePickers(root: ParentNode = document): void {
  root.querySelectorAll<HTMLInputElement>('[data-lyco-datetimepicker]').forEach((input) => {
    if (controllerRegistry.get(input, 'datetimepicker')) return;
    controllerRegistry.register(input, 'datetimepicker', new LycoDateTimePickerController(input));
  });
}
