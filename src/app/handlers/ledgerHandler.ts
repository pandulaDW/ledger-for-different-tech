import { Request, Response } from "express";
import { createLedgerResponse } from "../services";

export const getLedgerEntries = (req: Request, res: Response) => {
  const params = req.query;
  // const response = createLedgerResponse();
  res.status(200).json(params);
};
