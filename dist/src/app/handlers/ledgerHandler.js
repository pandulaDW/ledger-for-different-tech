"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLedgerEntries = void 0;
const express_validator_1 = require("express-validator");
const services_1 = require("../services");
const getLedgerEntries = (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        let validationResponse = { validationErrors: {} };
        errors.array().forEach((error) => {
            validationResponse["validationErrors"] = Object.assign(Object.assign({}, validationResponse["validationErrors"]), { [error.param]: error.msg });
        });
        return res.status(400).json(validationResponse);
    }
    const ledgerRequest = {
        startDate: new Date(req.query["start_date"]),
        endDate: new Date(req.query["end_date"]),
        frequency: req.query["frequency"],
        weeklyRent: Number(req.query["weekly_rent"]),
        timezone: req.query["timezone"],
    };
    const ledgerResponse = services_1.createLedgerResponse(ledgerRequest);
    res
        .status(200)
        .json({ ledgerLines: ledgerResponse, numberOfLedgerLines: ledgerResponse.length });
};
exports.getLedgerEntries = getLedgerEntries;
//# sourceMappingURL=ledgerHandler.js.map