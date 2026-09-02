export type OverviewSummary = {
  currency: string;
  currentBalanceMinor: number;
  incomeMinor: number;
  expensesMinor: number;
};

export type CashFlowPoint = {
  label: string;
  incomeMinor: number;
  expensesMinor: number;
  netMinor: number;
};
