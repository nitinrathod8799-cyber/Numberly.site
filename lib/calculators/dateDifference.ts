export interface DateDifferenceResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  isReversed: boolean;
}

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function stripTime(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Calculates the difference between any two dates (order-independent). */
export function calculateDateDifference(dateA: Date, dateB: Date): DateDifferenceResult {
  if (Number.isNaN(dateA.getTime()) || Number.isNaN(dateB.getTime())) {
    throw new Error("Please enter two valid dates.");
  }

  const isReversed = dateA.getTime() > dateB.getTime();
  const start = stripTime(isReversed ? dateB : dateA);
  const end = stripTime(isReversed ? dateA : dateB);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const daysInPrevMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    days += daysInPrevMonth;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.round((end.getTime() - start.getTime()) / MS_PER_DAY);

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks: Math.floor(totalDays / 7),
    totalMonths: years * 12 + months,
    isReversed,
  };
}
