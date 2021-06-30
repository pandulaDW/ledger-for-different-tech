const { addDays } = require("date-fns");

const date = new Date("2020-09-30");

const tomorrow = addDays(date, 1);

console.log(date.toISOString());
console.log(tomorrow.toISOString());
