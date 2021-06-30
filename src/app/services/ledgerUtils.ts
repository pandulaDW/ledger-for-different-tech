import { addDays, dateDiffInDays } from "../utils/dateUtils";

// A tuple type consisting of startDate, endDate and the date difference
export type SeqTuple = [Date, Date, number];

// returns a list of SeqTuple tuples for WEEKLY and FORTNIGHTLY frequency types
export const createDateSeq = (startDate: Date, endDate: Date, freq: number) => {
  let currentStartDate = startDate;
  let currentEndDate = addDays(startDate, freq);
  const dateTupleList: Array<SeqTuple> = [
    [currentStartDate, currentEndDate, freq],
  ];

  while (true) {
    if (currentEndDate >= endDate) {
      dateTupleList.pop();
      const dateDiff = dateDiffInDays(currentStartDate, endDate);
      dateTupleList.push([currentStartDate, endDate, dateDiff]);
      break;
    }

    currentStartDate = addDays(currentEndDate, 2);
    currentEndDate = addDays(currentStartDate, freq);
    const tuple: SeqTuple = [currentStartDate, currentEndDate, freq];
    dateTupleList.push(tuple);
  }

  return dateTupleList;
};

export const creatMonthSeq = (startDate: Date, endDate: Date) => {
  let currentStartDate = startDate;
  let currentEndDate = endDate;
  let currentStartMonth = startDate.getMonth;
};
