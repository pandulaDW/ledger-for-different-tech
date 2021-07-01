import express from "express";
import ledgerRouter from "./routers/ledgerRouter";

const app = express();

// routers
app.use("/api/v1/ledger", ledgerRouter);

export default app;
