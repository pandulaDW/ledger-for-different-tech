const {
  addMonths,
  lastDayOfMonth,
  addDays,
  differenceInCalendarDays: diff,
} = require("date-fns");

const getNextMonthDate = (date, requiredDay) => {
  const nextMonthDate = addMonths(date, 1);

  if (lastDayOfMonth(nextMonthDate).getDate() < requiredDay) {
    return nextMonthDate;
  }

  return new Date(
    Date.UTC(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), requiredDay)
  );
};

const createSeqItem = (start, end, dateDiff = 0, isFullRange = true) => {
  return {
    startDate: start.toISOString(),
    endDate: end.toISOString(),
    dateDiff,
    isFullRange,
  };
};

const createMonthSeq = (startDate, endDate) => {
  const requiredDay = startDate.getDate();
  let currentStartDate = startDate;
  let currentEndDate = getNextMonthDate(startDate, requiredDay);
  const dateSeq = [createSeqItem(currentStartDate, currentEndDate, 0)];

  while (true) {
    if (currentEndDate >= endDate) {
      console.log(currentEndDate, endDate);
      dateSeq.pop();
      if (currentEndDate.toISOString() === endDate.toISOString())
        dateSeq.push(createSeqItem(currentStartDate, endDate, 0, true));
      else
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

    currentStartDate = addDays(currentEndDate, 1);
    currentEndDate = getNextMonthDate(currentEndDate, requiredDay);
    dateSeq.push(createSeqItem(currentStartDate, currentEndDate, 0));
  }

  return dateSeq;
};

let x1 = new Date("2020-08-31");
let x2 = new Date("2020-11-24");

console.log(createMonthSeq(x1, x2));
