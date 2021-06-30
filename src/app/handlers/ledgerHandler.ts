import { Request, Response } from "express";

const getLedgerEntries = (req: Request, res: Response) => {
  const params = req.query;
  res.status(200).json(params);
};

export default getLedgerEntries;
