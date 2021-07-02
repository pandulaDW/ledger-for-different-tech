"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const handlers_1 = require("../handlers");
const router = express_1.default.Router();
router.get("/", middlewares_1.ledgerRequestValidation, middlewares_1.constructLedgerValidationResponse, handlers_1.getLedgerEntries);
exports.default = router;
//# sourceMappingURL=ledgerRouter.js.map