export interface TimeDurationResult {
  totalMinutes: number;
  hours: number;
  minutes: number;
  totalHoursDecimal: number;
}

/** Parses "HH:MM" (24-hour) into total minutes since midnight. */
export function parseTimeToMinutes(time: string): number {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time.trim());
  if (!match) throw new Error("Enter a valid time in HH:MM format.");
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours < 0 || hours > 23) throw new Error("Hours must be between 0 and 23.");
  if (minutes < 0 || minutes > 59) throw new Error("Minutes must be between 0 and 59.");
  return hours * 60 + minutes;
}

/**
 * Duration between a start and end time (HH:MM, 24-hour). If the end time is
 * earlier than the start time, it's assumed to roll over to the next day.
 */
export function calculateTimeDuration(startTime: string, endTime: string): TimeDurationResult {
  const startMinutes = parseTimeToMinutes(startTime);
  const endMinutes = parseTimeToMinutes(endTime);

  let totalMinutes = endMinutes - startMinutes;
  if (totalMinutes < 0) totalMinutes += 24 * 60;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return {
    totalMinutes,
    hours,
    minutes,
    totalHoursDecimal: Math.round((totalMinutes / 60) * 100) / 100,
  };
}
