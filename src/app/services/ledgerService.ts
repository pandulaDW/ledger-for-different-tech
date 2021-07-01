import { Frequency, LedgerRequest, LedgerResponse } from "../models";
import { createDateSeq, createMonthSeq, SeqItem } from "../utils/ledgerUtils";

export const createLedgerResponse = (req: LedgerRequest): LedgerResponse => {
  const { frequency, weeklyRent } = req;
  let dateSeq: Array<SeqItem>;

  switch (frequency) {
    case Frequency.WEEKLY:
      dateSeq = createDateSeq(req.startDate, req.endDate, 7);
    case Frequency.FORTNIGHTLY:
      dateSeq = createDateSeq(req.startDate, req.endDate, 14);
    case Frequency.MONTHLY:
      dateSeq = createMonthSeq(req.startDate, req.endDate);
  }

  const ledgerResponse: LedgerResponse = dateSeq.map((seqItem) => {
    const { startDate, endDate, dateDiff, isFullRange } = seqItem;

    if (dateDiff === 6 && frequency === Frequency.WEEKLY) {
      return { startDate, endDate, totalRent: weeklyRent };
    }

    if (dateDiff === 13 && frequency === Frequency.FORTNIGHTLY) {
      return { startDate, endDate, totalRent: weeklyRent * 2 };
    }

    if (isFullRange && frequency === Frequency.MONTHLY) {
      return { startDate, endDate, totalRent: ((weeklyRent / 7) * 365) / 12 };
    }

    return { startDate, endDate, totalRent: (weeklyRent / 7) * dateDiff };
  });

  return ledgerResponse;
};
