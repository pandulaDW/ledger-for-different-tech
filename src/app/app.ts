import express from "express";
import { getLedgerEntries } from "./handlers";

const app = express();

app.get("/ledger", getLedgerEntries);

export default app;
