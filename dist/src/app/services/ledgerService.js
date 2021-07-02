"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLedgerItem = exports.createLedgerResponse = void 0;
const models_1 = require("../models");
const ledgerUtils_1 = require("../utils/ledgerUtils");
const createLedgerResponse = (req) => {
    let dateSeq;
    switch (req.frequency) {
        case models_1.Frequency.WEEKLY:
            dateSeq = ledgerUtils_1.createDateSeq(req.startDate, req.endDate, 7);
            break;
        case models_1.Frequency.FORTNIGHTLY:
            dateSeq = ledgerUtils_1.createDateSeq(req.startDate, req.endDate, 14);
            break;
        case models_1.Frequency.MONTHLY:
            dateSeq = ledgerUtils_1.createMonthSeq(req.startDate, req.endDate);
    }
    const ledgerResponse = dateSeq.map((seqItem) => exports.createLedgerItem(req, seqItem));
    return ledgerResponse;
};
exports.createLedgerResponse = createLedgerResponse;
const createLedgerItem = (req, item) => {
    const { frequency, weeklyRent } = req;
    const { startDate, endDate, dateDiff, isFullRange } = item;
    if (dateDiff === 7 && frequency === models_1.Frequency.WEEKLY) {
        return { startDate, endDate, totalRent: +weeklyRent.toFixed(2) };
    }
    if (dateDiff === 14 && frequency === models_1.Frequency.FORTNIGHTLY) {
        return { startDate, endDate, totalRent: +(weeklyRent * 2).toFixed(2) };
    }
    if (isFullRange && frequency === models_1.Frequency.MONTHLY) {
        return { startDate, endDate, totalRent: +(((weeklyRent / 7) * 365) / 12).toFixed(2) };
    }
    return { startDate, endDate, totalRent: +((weeklyRent / 7) * dateDiff).toFixed(2) };
};
exports.createLedgerItem = createLedgerItem;
//# sourceMappingURL=ledgerService.js.map