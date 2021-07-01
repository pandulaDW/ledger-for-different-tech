export enum Frequency {
  WEEKLY = "WEEKLY",
  FORTNIGHTLY = "FORTNIGHTLY",
  MONTHLY = "MONTHLY",
}

export interface LedgerRequest {
  startDate: Date;
  endDate: Date;
  frequency: Frequency;
  weeklyRent: number;
  timezone: string;
}

export interface LedgerLineItem {
  startDate: string;
  endDate: string;
  totalRent: number;
}

export type LedgerResponse = Array<LedgerLineItem>;
