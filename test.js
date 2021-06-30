const { addDays, differenceInCalendarDays: diff } = require("date-fns");

const createSeqItem = (start, end, dateDiff, isFullRange = true) => {
  return {
    startDate: start.toISOString(),
    endDate: end.toISOString(),
    dateDiff,
    isFullRange,
  };
};

const createDateSeq = (startDate, endDate, freq) => {
  let currentStartDate = startDate;
  let currentEndDate = addDays(startDate, freq - 1);
  const dateSeq = [createSeqItem(currentStartDate, currentEndDate, freq)];

  while (true) {
    if (currentEndDate >= endDate) {
      dateSeq.pop();
      dateSeq.push(
        createSeqItem(currentStartDate, endDate, diff(endDate, currentStartDate))
      );
      break;
    }

    currentStartDate = addDays(currentEndDate, 1);
    currentEndDate = addDays(currentStartDate, freq - 1);
    const tuple = createSeqItem(currentStartDate, currentEndDate, freq);
    dateSeq.push(tuple);
  }

  return dateSeq;
};

let x1 = new Date("2020-03-28");
let x2 = new Date("2020-04-05");
console.log(createDateSeq(x1, x2, 7));
