import { Handler } from "express";
import { validationResult } from "express-validator";
import { ValidationErrors } from "../models";

// will run after the request validation and construct the validation object
export const constructLedgerValidationResponse: Handler = (req, _, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) next();

  let validationResponse: ValidationErrors = { validationErrors: {} };

  errors.array().forEach((error) => {
    validationResponse["validationErrors"] = {
      ...validationResponse["validationErrors"],
      [error.param]: error.msg,
    };
  });

  req.validationErrors = validationResponse;

  next();
};
