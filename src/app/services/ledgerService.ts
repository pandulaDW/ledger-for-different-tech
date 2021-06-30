import { Frequency, LedgerRequest, LedgerResponse } from "../models";
import { createDateSeq, SeqTuple } from "./ledgerUtils";

export const createLedgerResponse = (req: LedgerRequest): LedgerResponse => {
  const { startDate, endDate, frequency, weeklyRent } = req;
  let dateSeq: Array<SeqTuple>;

  switch (frequency) {
    case Frequency.WEEKLY:
      dateSeq = createDateSeq(startDate, endDate, 7);
    case Frequency.FORTNIGHTLY:
      dateSeq = createDateSeq(startDate, endDate, 14);
    case Frequency.MONTHLY:
      dateSeq = [];
  }

  const ledgerResponse: LedgerResponse = dateSeq.map((seq) => {
    if (seq[2] === 7 && frequency === Frequency.WEEKLY) {
      return {
        startDate: seq[0].toISOString(),
        endDate: seq[1].toISOString(),
        totalAmount: weeklyRent,
      };
    }

    if (seq[2] === 14 && frequency === Frequency.FORTNIGHTLY) {
      return {
        startDate: seq[0].toISOString(),
        endDate: seq[1].toISOString(),
        totalAmount: weeklyRent * 2,
      };
    }

    return {
      startDate: seq[0].toISOString(),
      endDate: seq[1].toISOString(),
      totalAmount: (weeklyRent / 7) * seq[2],
    };
  });

  return ledgerResponse;
};
