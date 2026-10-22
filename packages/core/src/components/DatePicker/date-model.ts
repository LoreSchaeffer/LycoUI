export function parseLocalDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return date.getFullYear() === Number(match[1]) && date.getMonth() === Number(match[2]) - 1 && date.getDate() === Number(match[3]) ? date : null;
}

export function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function clampDate(date: Date, min?: Date, max?: Date): Date {
  if (min && date < min) return min;
  if (max && date > max) return max;
  return date;
}

export function formatDateString(date: Date, format: string, locale?: string): string {
  if (['short', 'medium', 'long', 'full'].includes(format)) return new Intl.DateTimeFormat(locale, {dateStyle: format as 'short' | 'medium' | 'long' | 'full'}).format(date);
  return format.replace('yyyy', String(date.getFullYear())).replace('MM', String(date.getMonth() + 1).padStart(2, '0')).replace('dd', String(date.getDate()).padStart(2, '0'));
}

export function parseDateString(value: string, format: string): Date | null {
  if (['short', 'medium', 'long', 'full'].includes(format)) {
    const numericParts = value.match(/\d+/g) ?? [];
    const hasFourDigitYear = numericParts.some(part => /^\d{4}$/.test(part));
    const hasCompleteDateParts = numericParts.length >= 3 || (numericParts.length >= 2 && /[a-zA-Z]/.test(value));
    if (!hasFourDigitYear || !hasCompleteDateParts) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;

    const yearIndex = numericParts.findIndex(part => /^\d{4}$/.test(part));
    const dayPart = numericParts.length >= 3
      ? numericParts[yearIndex === 0 ? 2 : 1]
      : numericParts.find((_, index) => index !== yearIndex);
    if (!dayPart || date.getFullYear() !== Number(numericParts[yearIndex]) || date.getDate() !== Number(dayPart)) return null;

    if (numericParts.length >= 3) {
      const monthPart = yearIndex === 0 ? numericParts[1] : numericParts[0];
      if (date.getMonth() + 1 !== Number(monthPart)) return null;
    }

    return date;
  }
  const pattern = format.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace('yyyy', '(\\d{4})').replace('MM', '(\\d{1,2})').replace('dd', '(\\d{1,2})');
  const match = new RegExp(`^${pattern}$`).exec(value);
  if (!match) return null;
  const tokens = format.match(/yyyy|MM|dd/g) ?? [];
  let year = 0; let month = 0; let day = 0;
  tokens.forEach((token, index) => { const number = Number(match[index + 1]); if (token === 'yyyy') year = number; if (token === 'MM') month = number; if (token === 'dd') day = number; });
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : null;
}
