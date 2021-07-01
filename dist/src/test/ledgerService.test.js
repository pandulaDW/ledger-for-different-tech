"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../app/models");
const services_1 = require("../app/services");
describe("ledger service unit tests", () => {
    test("returns correct ledger line for full-range WEEKLY seq item", () => {
        expect(services_1.createLedgerItem({ frequency: models_1.Frequency.WEEKLY, weeklyRent: 555 }, { dateDiff: 7 }).totalRent).toBe(555);
    });
    test("returns correct ledger line for partial-range WEEKLY seq item", () => {
        expect(services_1.createLedgerItem({ frequency: models_1.Frequency.WEEKLY, weeklyRent: 555 }, { dateDiff: 4 }).totalRent).toBe(317.14285714285717);
    });
    test("returns correct ledger line for full-range FORTNIGHTLY seq item", () => {
        expect(services_1.createLedgerItem({ frequency: models_1.Frequency.FORTNIGHTLY, weeklyRent: 555 }, { dateDiff: 14 }).totalRent).toBe(1110);
    });
    test("returns correct ledger line for partial-range FORTNIGHTLY seq item", () => {
        expect(services_1.createLedgerItem({ frequency: models_1.Frequency.FORTNIGHTLY, weeklyRent: 555 }, { dateDiff: 10 }).totalRent).toBe(792.8571428571429);
    });
    test("returns correct ledger line for full-range MONTHLY seq item", () => {
        expect(services_1.createLedgerItem({ frequency: models_1.Frequency.MONTHLY, weeklyRent: 555 }, { isFullRange: true }).totalRent).toBe(2411.607142857143);
    });
    test("returns correct ledger line for partial-range MONTHLY seq item", () => {
        expect(services_1.createLedgerItem({ frequency: models_1.Frequency.FORTNIGHTLY, weeklyRent: 555 }, { dateDiff: 24 }).totalRent).toBe(1902.8571428571431);
    });
});
//# sourceMappingURL=ledgerService.test.js.map