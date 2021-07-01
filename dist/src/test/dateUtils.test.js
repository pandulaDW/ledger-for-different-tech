"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateUtils_1 = require("../app/utils/dateUtils");
describe("date utility unit tests", () => {
    test("returns nextMonthDate correctly when the date is available", () => {
        const nextMonthDate = dateUtils_1.getNextMonthDate(new Date("2020-08-28"), 28);
        expect(nextMonthDate).toEqual(new Date("2020-09-28"));
    });
    test("returns nextMonthDate correctly when the date is not available", () => {
        const nextMonthDate = dateUtils_1.getNextMonthDate(new Date("2020-08-31"), 31);
        expect(nextMonthDate).toEqual(new Date("2020-09-30"));
    });
    test("returns nextMonthDate correctly when previous month has a different date", () => {
        const nextMonthDate = dateUtils_1.getNextMonthDate(new Date("2020-09-30"), 31);
        expect(nextMonthDate).toEqual(new Date("2020-10-31"));
    });
    test("returns nextMonthDate correctly when expanding a year", () => {
        const nextMonthDate = dateUtils_1.getNextMonthDate(new Date("2020-12-31"), 31);
        expect(nextMonthDate).toEqual(new Date("2021-01-31"));
    });
});
//# sourceMappingURL=dateUtils.test.js.map