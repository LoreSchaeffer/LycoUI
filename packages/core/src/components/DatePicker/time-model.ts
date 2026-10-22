export function parseTime(value: string): {hours: number; minutes: number} | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  return hours <= 23 && minutes <= 59 ? {hours, minutes} : null;
}

export function formatTime({hours, minutes}: {hours: number; minutes: number}, use12Hour = false): string {
  if (!use12Hour) return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const hour = hours % 12 || 12;
  return `${hour}:${String(minutes).padStart(2, '0')} ${suffix}`;
}
