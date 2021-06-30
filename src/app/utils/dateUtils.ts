// returns the difference between two given days
export const dateDiffInDays = (a: Date, b: Date): number => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

// returns the last day of the month of a given year and month
const getLastDayOfMonth = (year: number, month: number) => {
  const lastDate = new Date(year, month, 0).getDate();
  return new Date(`${year}-${month}-${lastDate}`);
};

// returns next month date of a given date if requiredDate is available,
// else get the last day of that particular month
export const getNextMonthDate = (date: Date, requiredDay: number) => {
  if (date.getMonth() === 11) {
    return new Date(`${date.getFullYear() + 1}-01-${requiredDay}`);
  }

  const nextMonthDate = new Date(
    `${date.getFullYear()}-${date.getMonth() + 2}-${requiredDay}`
  );

  if (nextMonthDate.getMonth() !== date.getMonth() + 1) {
    return getLastDayOfMonth(date.getFullYear(), date.getMonth() + 2);
  }

  return nextMonthDate;
};
