// returns new date after adding given numberOfDays, including itself
export const addDays = (date: Date, days: number): Date => {
  const copiedDate = new Date(Number(date));
  copiedDate.setDate(date.getDate() + days - 1);
  return copiedDate;
};

// returns the difference between two given days
export const dateDiffInDays = (a: Date, b: Date): number => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};
