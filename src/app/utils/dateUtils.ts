import { addMonths, lastDayOfMonth } from "date-fns";

// returns next month date of a given date if requiredDay is available,
// else get the last day of that particular month
export const getNextMonthDate = (date: Date, requiredDay: number) => {
  const nextMonthDate = addMonths(date, 1);

  if (lastDayOfMonth(nextMonthDate).getDate() < requiredDay) {
    return nextMonthDate;
  }

  return new Date(
    Date.UTC(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), requiredDay)
  );
};
