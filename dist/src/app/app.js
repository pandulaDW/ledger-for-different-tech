"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ledgerRouter_1 = __importDefault(require("./routers/ledgerRouter"));
const app = express_1.default();
// routers
app.use("/api/v1/ledger", ledgerRouter_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map