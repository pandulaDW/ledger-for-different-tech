import { Frequency, LedgerRequest, LedgerResponse } from "../models";
import { createDateSeq, SeqItem } from "./ledgerUtils";

export const createLedgerResponse = (req: LedgerRequest): LedgerResponse => {
  const { frequency, weeklyRent } = req;
  let dateSeq: Array<SeqItem>;

  switch (frequency) {
    case Frequency.WEEKLY:
      dateSeq = createDateSeq(req.startDate, req.endDate, 7);
    case Frequency.FORTNIGHTLY:
      dateSeq = createDateSeq(req.startDate, req.endDate, 14);
    case Frequency.MONTHLY:
      dateSeq = [];
  }

  const ledgerResponse: LedgerResponse = dateSeq.map((seqItem) => {
    const { startDate, endDate, dateDiff } = seqItem;

    if (dateDiff === 7 && frequency === Frequency.WEEKLY) {
      return { startDate, endDate, totalRent: weeklyRent };
    }

    if (dateDiff === 14 && frequency === Frequency.FORTNIGHTLY) {
      return { startDate, endDate, totalRent: weeklyRent * 2 };
    }

    if (dateDiff) return { startDate, endDate, totalRent: (weeklyRent / 7) * dateDiff };
  });

  return ledgerResponse;
};
