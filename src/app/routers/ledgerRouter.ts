import express from "express";
import { ledgerRequestValidation } from "../middlewares";
import { getLedgerEntries } from "../handlers";

const router = express.Router();

router.get("/", ledgerRequestValidation, getLedgerEntries);

export default router;
