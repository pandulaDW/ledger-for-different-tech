"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMonthSeq = exports.createDateSeq = void 0;
const date_fns_1 = require("date-fns");
const dateUtils_1 = require("./dateUtils");
// helper function to create a seq item
const createSeqItem = (start, end, dateDiff = 0, isFullRange = true) => {
    return {
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        dateDiff,
        isFullRange,
    };
};
// returns a list of SeqItem for WEEKLY and FORTNIGHTLY frequency types
const createDateSeq = (startDate, endDate, freq) => {
    let currentStartDate = startDate;
    let currentEndDate = date_fns_1.addDays(startDate, freq - 1);
    const dateSeq = [createSeqItem(currentStartDate, currentEndDate, freq)];
    while (true) {
        if (date_fns_1.isEqual(currentEndDate, endDate) || date_fns_1.isAfter(currentEndDate, endDate)) {
            dateSeq.pop();
            dateSeq.push(createSeqItem(currentStartDate, endDate, date_fns_1.differenceInCalendarDays(endDate, currentStartDate) + 1));
            break;
        }
        currentStartDate = date_fns_1.addDays(currentEndDate, 1);
        currentEndDate = date_fns_1.addDays(currentStartDate, freq - 1);
        dateSeq.push(createSeqItem(currentStartDate, currentEndDate, freq));
    }
    return dateSeq;
};
exports.createDateSeq = createDateSeq;
// returns a list of SeqItem for MONTHLY frequency types
const createMonthSeq = (startDate, endDate) => {
    const requiredDay = startDate.getDate();
    let currentStartDate = startDate;
    let currentEndDate = dateUtils_1.getNextMonthDate(startDate, requiredDay);
    const dateSeq = [createSeqItem(currentStartDate, currentEndDate, 0)];
    while (true) {
        if (date_fns_1.isEqual(currentEndDate, endDate) || date_fns_1.isAfter(currentEndDate, endDate)) {
            dateSeq.pop();
            if (date_fns_1.isEqual(currentEndDate, endDate))
                dateSeq.push(createSeqItem(currentStartDate, endDate, 0, true));
            else
                dateSeq.push(createSeqItem(currentStartDate, endDate, date_fns_1.differenceInCalendarDays(endDate, currentStartDate) + 1, false));
            break;
        }
        currentStartDate = date_fns_1.addDays(currentEndDate, 1);
        currentEndDate = dateUtils_1.getNextMonthDate(currentEndDate, requiredDay);
        dateSeq.push(createSeqItem(currentStartDate, currentEndDate, 0));
    }
    return dateSeq;
};
exports.createMonthSeq = createMonthSeq;
//# sourceMappingURL=ledgerUtils.js.map