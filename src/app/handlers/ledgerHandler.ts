import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { createLedgerResponse } from "../services";
import { Frequency, LedgerRequest, ValidationErrors } from "../models";

export const getLedgerEntries = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let validationResponse: ValidationErrors = { validationErrors: {} };
    errors.array().forEach((error) => {
      validationResponse["validationErrors"] = {
        ...validationResponse["validationErrors"],
        [error.param]: error.msg,
      };
    });
    return res.status(400).json(validationResponse);
  }

  const ledgerRequest: LedgerRequest = {
    startDate: new Date(req.query["start_date"] as string),
    endDate: new Date(req.query["end_date"] as string),
    frequency: req.query["frequency"] as Frequency,
    weeklyRent: Number(req.query["weekly_rent"]),
    timezone: req.query["timezone"] as string,
  };

  const ledgerResponse = createLedgerResponse(ledgerRequest);
  res
    .status(200)
    .json({ ledgerLines: ledgerResponse, numberOfLedgerLines: ledgerResponse.length });
};
