"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ledgerRequestValidation = void 0;
const express_validator_1 = require("express-validator");
const date_fns_1 = require("date-fns");
const models_1 = require("../models");
// compiling regex expressions for improved performance
const frequencyRegex = new RegExp(`^(${models_1.Frequency.WEEKLY}|${models_1.Frequency.FORTNIGHTLY}|${models_1.Frequency.MONTHLY})$`);
const timezoneRegex = new RegExp(/^[A-Z][a-z]+\/[A-Z][a-z]+$/);
exports.ledgerRequestValidation = [
    express_validator_1.query("start_date")
        .notEmpty()
        .withMessage("start_date cannot be undefined")
        .bail()
        .isISO8601()
        .withMessage("start_date is not a valid ISO date"),
    express_validator_1.query("end_date")
        .notEmpty()
        .withMessage("end_date cannot be undefined")
        .bail()
        .isISO8601()
        .withMessage("end_date is not a valid ISO date")
        .bail()
        .custom((endDate, { req }) => {
        const query = req.query;
        const startDate = new Date(query["start_date"]);
        if (date_fns_1.isValid(startDate) && date_fns_1.isBefore(new Date(endDate), startDate)) {
            throw new Error("start_date should come before the end_date");
        }
        return true;
    }),
    express_validator_1.query("frequency")
        .notEmpty()
        .withMessage("frequency cannot be undefined")
        .bail()
        .matches(frequencyRegex)
        .withMessage(`frequency should be one of ${models_1.Frequency.WEEKLY}, ${models_1.Frequency.FORTNIGHTLY} or ${models_1.Frequency.MONTHLY}`),
    express_validator_1.query("weekly_rent")
        .notEmpty()
        .withMessage("weekly_rent cannot be undefined")
        .bail()
        .isNumeric()
        .withMessage("weekly_rent should be a numeric value"),
    express_validator_1.query("timezone")
        .notEmpty()
        .withMessage("timezone cannot be undefined")
        .bail()
        .matches(timezoneRegex)
        .withMessage("timezone should be valid timezone name"),
];
//# sourceMappingURL=ledgerRequestValidate.js.map