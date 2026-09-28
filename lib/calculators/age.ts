export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  nextBirthday: {
    date: Date;
    daysAway: number;
  };
}

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Calculates age between a date of birth and a reference date (defaults to
 * "today"). The reference date is an explicit parameter — never hard-coded —
 * so this function is fully deterministic and testable.
 */
export function calculateAge(dateOfBirth: Date, referenceDate: Date = new Date()): AgeResult {
  const dob = stripTime(dateOfBirth);
  const today = stripTime(referenceDate);

  if (Number.isNaN(dob.getTime())) {
    throw new Error("Invalid date of birth.");
  }
  if (dob.getTime() > today.getTime()) {
    throw new Error("Date of birth cannot be in the future.");
  }

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months -= 1;
    const daysInPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += daysInPrevMonth;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.round((today.getTime() - dob.getTime()) / MS_PER_DAY);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;

  const nextBirthday = getNextBirthday(dob, today);
  const daysAway = Math.round((nextBirthday.getTime() - today.getTime()) / MS_PER_DAY);

  return {
    years,
    months,
    days,
    totalMonths,
    totalWeeks,
    totalDays,
    nextBirthday: { date: nextBirthday, daysAway },
  };
}

function getNextBirthday(dob: Date, today: Date): Date {
  let next = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());

  // Feb 29 birthdays on non-leap years: celebrate on Feb 28.
  if (dob.getMonth() === 1 && dob.getDate() === 29 && !isLeapYear(today.getFullYear())) {
    next = new Date(today.getFullYear(), 1, 28);
  }

  if (next.getTime() < today.getTime()) {
    const year = today.getFullYear() + 1;
    next = new Date(year, dob.getMonth(), dob.getDate());
    if (dob.getMonth() === 1 && dob.getDate() === 29 && !isLeapYear(year)) {
      next = new Date(year, 1, 28);
    }
  }

  return next;
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function stripTime(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
