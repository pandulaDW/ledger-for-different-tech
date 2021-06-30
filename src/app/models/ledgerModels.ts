enum Frequency {
  WEEKLY = "WEEKLY",
  FORTNIGHTLY = "FORTNIGHTLY",
  MONTHLY = "MONTHLY",
}

interface LedgerRequest {
  start_date: Date;
  end_date: Date;
  frequency: Frequency;
  weekly_rent: number;
  timezone: string;
}

interface LedgerLineItem {
  start_date: string;
  end_date: string;
  total_amount: number;
}

type LedgerResponse = Array<LedgerLineItem>;
