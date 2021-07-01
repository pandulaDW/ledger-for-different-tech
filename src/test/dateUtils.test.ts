import { getNextMonthDate } from "../app/utils/dateUtils";

describe("date utility unit tests", () => {
  test("returns nextMonthDate correctly when the date is available", () => {
    const nextMonthDate = getNextMonthDate(new Date("2020-08-28"), 28);
    expect(nextMonthDate).toEqual(new Date("2020-09-28"));
  });

  test("returns nextMonthDate correctly when the date is not available", () => {
    const nextMonthDate = getNextMonthDate(new Date("2020-08-31"), 31);
    expect(nextMonthDate).toEqual(new Date("2020-09-30"));
  });

  test("returns nextMonthDate correctly when previous month has a different date", () => {
    const nextMonthDate = getNextMonthDate(new Date("2020-09-30"), 31);
    expect(nextMonthDate).toEqual(new Date("2020-10-31"));
  });

  test("returns nextMonthDate correctly when expanding a year", () => {
    const nextMonthDate = getNextMonthDate(new Date("2020-12-31"), 31);
    expect(nextMonthDate).toEqual(new Date("2021-01-31"));
  });
});
