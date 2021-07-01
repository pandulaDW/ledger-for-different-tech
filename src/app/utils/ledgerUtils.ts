import { addDays, differenceInCalendarDays as diff } from "date-fns";
import { getNextMonthDate } from "./dateUtils";

// return list item type of createDateSeq function
export interface SeqItem {
  startDate: string;
  endDate: string;
  dateDiff: number;
  isFullRange: boolean;
}

// helper function to create a seq item
const createSeqItem = (start: Date, end: Date, dateDiff = 0, isFullRange = true) => {
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
  let currentEndDate = addDays(startDate, freq - 1);
  const dateSeq: Array<SeqItem> = [createSeqItem(currentStartDate, currentEndDate, freq)];

  while (true) {
    if (currentEndDate >= endDate) {
      dateSeq.pop();
      dateSeq.push(
        createSeqItem(currentStartDate, endDate, diff(endDate, currentStartDate) + 1)
      );
      break;
    }

    currentStartDate = addDays(currentEndDate, 1);
    currentEndDate = addDays(currentStartDate, freq - 1);
    dateSeq.push(createSeqItem(currentStartDate, currentEndDate, freq));
  }

  return dateSeq;
};

// returns a list of SeqItem for MONTHLY frequency types
export const createMonthSeq = (startDate: Date, endDate: Date) => {
  const requiredDay = startDate.getDate();
  let currentStartDate = startDate;
  let currentEndDate = getNextMonthDate(startDate, requiredDay);
  const dateSeq: Array<SeqItem> = [createSeqItem(currentStartDate, currentEndDate, 0)];

  // if the end date doesn't even fullfil one month
  if (currentEndDate > endDate) {
    dateSeq.pop();
    return [createSeqItem(startDate, endDate, diff(endDate, startDate) + 1, false)];
  }

  while (true) {
    currentStartDate = addDays(currentEndDate, 1);
    currentEndDate = getNextMonthDate(currentEndDate, requiredDay);
    dateSeq.push(createSeqItem(currentStartDate, currentEndDate, 0));
    if (currentEndDate >= endDate) {
      currentStartDate =
        addDays(currentEndDate, 1) > endDate
          ? currentStartDate
          : addDays(currentEndDate, 1);
      dateSeq.pop();
      dateSeq.push(
        createSeqItem(
          currentStartDate,
          endDate,
          diff(endDate, currentStartDate) + 1,
          false
        )
      );
      break;
    }
  }

  return dateSeq;
};
