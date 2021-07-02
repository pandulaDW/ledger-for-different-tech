"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructLedgerValidationResponse = void 0;
const express_validator_1 = require("express-validator");
// will run after the request validation and construct the validation object
const constructLedgerValidationResponse = (req, _, next) => {
    const errors = express_validator_1.validationResult(req);
    if (errors.isEmpty())
        next();
    let validationResponse = { validationErrors: {} };
    errors.array().forEach((error) => {
        validationResponse["validationErrors"] = Object.assign(Object.assign({}, validationResponse["validationErrors"]), { [error.param]: error.msg });
    });
    req.validationErrors = validationResponse;
    next();
};
exports.constructLedgerValidationResponse = constructLedgerValidationResponse;
//# sourceMappingURL=ledgerConstructValidation.js.map