export function parseTime(value: string): {hours: number; minutes: number} | null {
  const match = /^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i.exec(value);
  if (!match) return null;
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const meridiem = match[3]?.toUpperCase();
  if (meridiem && (hours < 1 || hours > 12)) return null;
  if (meridiem === 'AM' && hours === 12) hours = 0;
  if (meridiem === 'PM' && hours !== 12) hours += 12;
  return hours <= 23 && minutes <= 59 ? {hours, minutes} : null;
}

export function formatTime({hours, minutes}: {hours: number; minutes: number}, use12Hour = false): string {
  if (!use12Hour) return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const hour = hours % 12 || 12;
  return `${hour}:${String(minutes).padStart(2, '0')} ${suffix}`;
}
