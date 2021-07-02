import express from "express";
import {
  ledgerRequestValidation,
  constructLedgerValidationResponse,
} from "../middlewares";
import { getLedgerEntries } from "../handlers";

const router = express.Router();

router.get(
  "/",
  ledgerRequestValidation,
  constructLedgerValidationResponse,
  getLedgerEntries
);

export default router;
