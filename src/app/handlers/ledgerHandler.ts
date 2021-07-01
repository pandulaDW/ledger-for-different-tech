import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { createLedgerResponse } from "../services";
import { Frequency, LedgerRequest } from "../models";

export const getLedgerEntries = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let validationErrors: { [key: string]: string } = {};
    errors.array().forEach((error) => {
      validationErrors = { ...validationErrors, [error.param]: error.msg };
    });
    return res.status(400).json({ validationErrors });
  }

  res.status(200).json({ message: "success" });
};
