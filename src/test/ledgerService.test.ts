import { Frequency, LedgerRequest } from "../app/models";
import { createLedgerItem } from "../app/services";
import { SeqItem } from "../app/utils/ledgerUtils";

describe("ledger service unit tests", () => {
  test("returns correct ledger line for full-range WEEKLY seq item", () => {
    expect(
      createLedgerItem(
        { frequency: Frequency.WEEKLY, weeklyRent: 555 } as LedgerRequest,
        { dateDiff: 7 } as SeqItem
      ).totalRent
    ).toBe(555);
  });

  test("returns correct ledger line for partial-range WEEKLY seq item", () => {
    expect(
      createLedgerItem(
        { frequency: Frequency.WEEKLY, weeklyRent: 555 } as LedgerRequest,
        { dateDiff: 4 } as SeqItem
      ).totalRent
    ).toBe(317.14);
  });

  test("returns correct ledger line for full-range FORTNIGHTLY seq item", () => {
    expect(
      createLedgerItem(
        { frequency: Frequency.FORTNIGHTLY, weeklyRent: 555 } as LedgerRequest,
        { dateDiff: 14 } as SeqItem
      ).totalRent
    ).toBe(1110);
  });

  test("returns correct ledger line for partial-range FORTNIGHTLY seq item", () => {
    expect(
      createLedgerItem(
        { frequency: Frequency.FORTNIGHTLY, weeklyRent: 555 } as LedgerRequest,
        { dateDiff: 10 } as SeqItem
      ).totalRent
    ).toBe(792.86);
  });

  test("returns correct ledger line for full-range MONTHLY seq item", () => {
    expect(
      createLedgerItem(
        { frequency: Frequency.MONTHLY, weeklyRent: 555 } as LedgerRequest,
        { isFullRange: true } as SeqItem
      ).totalRent
    ).toBe(2411.61);
  });

  test("returns correct ledger line for partial-range MONTHLY seq item", () => {
    expect(
      createLedgerItem(
        { frequency: Frequency.FORTNIGHTLY, weeklyRent: 555 } as LedgerRequest,
        { dateDiff: 24 } as SeqItem
      ).totalRent
    ).toBe(1902.86);
  });
});
