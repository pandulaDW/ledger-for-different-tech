import { query } from "express-validator";
import { Frequency } from "../models";

// compiling regex expressions for improved performance
const frequencyRegex = new RegExp(
  `^(${Frequency.WEEKLY}|${Frequency.FORTNIGHTLY}|${Frequency.MONTHLY})$`
);
const timezoneRegex = new RegExp(/^[A-Z][a-z]+\/[A-Z][a-z]+$/);

export const ledgerRequestValidation = [
  query("start_date")
    .notEmpty()
    .withMessage("start_date cannot be undefined")
    .bail()
    .isISO8601()
    .withMessage("start_date is not a valid ISO date"),

  query("end_date")
    .notEmpty()
    .withMessage("end_date cannot be undefined")
    .bail()
    .isISO8601()
    .withMessage("end_date is not a valid ISO date"),

  query("frequency")
    .notEmpty()
    .withMessage("frequency cannot be undefined")
    .bail()
    .matches(frequencyRegex)
    .withMessage(
      `frequency should be one of ${Frequency.WEEKLY}, ${Frequency.FORTNIGHTLY} or ${Frequency.MONTHLY}`
    ),

  query("weekly_rent")
    .notEmpty()
    .withMessage("weekly_rent cannot be undefined")
    .bail()
    .isNumeric()
    .withMessage("weekly_rent should be a numeric value"),

  query("timezone")
    .notEmpty()
    .withMessage("timezone cannot be undefined")
    .bail()
    .matches(timezoneRegex)
    .withMessage("timezone should be valid timezone name"),
];
