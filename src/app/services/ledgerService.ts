import { Frequency, LedgerRequest, LedgerResponse, LedgerLineItem } from "../models";
import { createDateSeq, createMonthSeq, SeqItem } from "../utils/ledgerUtils";

export const createLedgerResponse = (req: LedgerRequest): LedgerResponse => {
  let dateSeq: Array<SeqItem>;

  switch (req.frequency) {
    case Frequency.WEEKLY:
      dateSeq = createDateSeq(req.startDate, req.endDate, 7);
      break;
    case Frequency.FORTNIGHTLY:
      dateSeq = createDateSeq(req.startDate, req.endDate, 14);
      break;
    case Frequency.MONTHLY:
      dateSeq = createMonthSeq(req.startDate, req.endDate);
  }

  const ledgerResponse: LedgerResponse = dateSeq.map((seqItem) =>
    createLedgerItem(req, seqItem)
  );

  return ledgerResponse;
};

export const createLedgerItem = (req: LedgerRequest, item: SeqItem): LedgerLineItem => {
  const { frequency, weeklyRent } = req;
  const { startDate, endDate, dateDiff, isFullRange } = item;

  if (dateDiff === 7 && frequency === Frequency.WEEKLY) {
    return { startDate, endDate, totalRent: weeklyRent };
  }

  if (dateDiff === 14 && frequency === Frequency.FORTNIGHTLY) {
    return { startDate, endDate, totalRent: weeklyRent * 2 };
  }

  if (isFullRange && frequency === Frequency.MONTHLY) {
    return { startDate, endDate, totalRent: ((weeklyRent / 7) * 365) / 12 };
  }

  return { startDate, endDate, totalRent: (weeklyRent / 7) * dateDiff };
};
