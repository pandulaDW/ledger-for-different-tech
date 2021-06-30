import { addDays } from "date-fns";
import { dateDiffInDays, getNextMonthDate } from "../utils/dateUtils";

// return list item type of createDateSeq function
export interface SeqItem {
  startDate: string;
  endDate: string;
  dateDiff: number | null;
  isFullRange: boolean;
}

// helper function to create a seq item
const createSeqItem = (
  start: Date,
  end: Date,
  dateDiff: number | null,
  isFullRange = true
) => {
  return {
    startDate: start.toISOString(),
    endDate: end.toISOString(),
    dateDiff,
    isFullRange,
  };
};

// returns a list of SeqItem for WEEKLY and FORTNIGHTLY frequency types
export const createDateSeq = (startDate: Date, endDate: Date, freq: number) => {
  let currentStartDate = startDate;
  let currentEndDate = addDays(startDate, freq);
  const dateSeq: Array<SeqItem> = [createSeqItem(currentStartDate, currentEndDate, freq)];

  while (true) {
    if (currentEndDate >= endDate) {
      dateSeq.pop();
      const dateDiff = dateDiffInDays(currentStartDate, endDate);
      dateSeq.push(createSeqItem(currentStartDate, currentEndDate, dateDiff));
      break;
    }

    currentStartDate = addDays(currentEndDate, 2);
    currentEndDate = addDays(currentStartDate, freq);
    const tuple = createSeqItem(currentStartDate, currentEndDate, freq);
    dateSeq.push(tuple);
  }

  return dateSeq;
};

// returns a list of SeqItem for MONTHLY frequency types
export const createMonthSeq = (startDate: Date, endDate: Date) => {
  const requiredDay = startDate.getDate();
  let currentStartDate = startDate;
  let currentEndDate = getNextMonthDate(startDate, requiredDay);
  const dateSeq: Array<SeqItem> = [createSeqItem(currentStartDate, currentEndDate, null)];

  // if the end date doesn't even fullfil one month
  if (currentEndDate > endDate) {
    dateSeq.pop();
    return [createSeqItem(startDate, endDate, dateDiffInDays(startDate, endDate), false)];
  }

  while (true) {
    currentStartDate = addDays(currentEndDate, 1);
    currentEndDate = getNextMonthDate(currentEndDate, requiredDay);
    dateSeq.push(createSeqItem(currentStartDate, currentEndDate, null));
    if (currentEndDate > endDate) break;
  }

  return dateSeq;
};
