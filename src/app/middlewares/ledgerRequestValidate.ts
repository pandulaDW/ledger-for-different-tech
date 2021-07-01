import { query } from "express-validator";

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

  query("frequency").notEmpty().withMessage("frequency cannot be undefined"),
  query("weekly_rent").notEmpty().withMessage("weekly_rent cannot be undefined"),
  query("timezone").notEmpty().withMessage("timezone cannot be undefined"),
];
