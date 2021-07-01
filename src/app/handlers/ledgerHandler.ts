import { Request, Response } from "express";
import { createLedgerResponse } from "../services";
import { Frequency, LedgerRequest } from "../models";

interface Params {
  [key: string]: string;
}

export const getLedgerEntries = (req: Request, res: Response) => {
  const params = req.query as Params;
  const reqObj: LedgerRequest = {
    startDate: new Date(params["start_date"]),
    endDate: new Date(params["end_date"]),
    frequency: params["frequency"] as Frequency,
    weeklyRent: Number(params["weekly_rent"]),
    timezone: params["timezone"],
  };

  const ledgerLines = createLedgerResponse(reqObj);
  res.status(200).json({ ledgerLines, numberOfLines: ledgerLines.length });
};
