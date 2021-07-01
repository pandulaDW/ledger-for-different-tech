"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextMonthDate = void 0;
const date_fns_1 = require("date-fns");
// returns next month date of a given date if requiredDay is available,
// else get the last day of that particular month
const getNextMonthDate = (date, requiredDay) => {
    const nextMonthDate = date_fns_1.addMonths(date, 1);
    if (date_fns_1.lastDayOfMonth(nextMonthDate).getDate() < requiredDay) {
        return nextMonthDate;
    }
    return new Date(Date.UTC(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), requiredDay));
};
exports.getNextMonthDate = getNextMonthDate;
//# sourceMappingURL=dateUtils.js.map