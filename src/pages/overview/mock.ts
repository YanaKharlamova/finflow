import type {
  CashFlowPoint,
  ExpenseCategoryPoint,
  OverviewSummary,
} from "src/pages/overview/types";

const CASH_FLOW_MOCK: CashFlowPoint[] = [
  {
    label: "Aug 27",
    incomeMinor: 0,
    expensesMinor: 45_000,
    netMinor: -45_000,
  },
  {
    label: "Aug 28",
    incomeMinor: 425_000,
    expensesMinor: 32_000,
    netMinor: 393_000,
  },
  {
    label: "Aug 29",
    incomeMinor: 0,
    expensesMinor: 8_645,
    netMinor: -8_645,
  },
  {
    label: "Aug 30",
    incomeMinor: 0,
    expensesMinor: 120_000,
    netMinor: -120_000,
  },
  {
    label: "Aug 31",
    incomeMinor: 0,
    expensesMinor: 24_500,
    netMinor: -24_500,
  },
  {
    label: "Sep 1",
    incomeMinor: 0,
    expensesMinor: 32_895,
    netMinor: -32_895,
  },
  {
    label: "Sep 2",
    incomeMinor: 0,
    expensesMinor: 35_000,
    netMinor: -35_000,
  },
];

const EXPENSE_CATEGORY_MOCK: ExpenseCategoryPoint[] = [
  {
    category: "housing",
    amountMinor: 120_000,
  },
  {
    category: "food",
    amountMinor: 86_450,
  },
  {
    category: "transport",
    amountMinor: 48_740,
  },
  {
    category: "other-expense",
    amountMinor: 42_850,
  },
];

const SUMMARY_MOCK: OverviewSummary = {
  currency: "USD",
  currentBalanceMinor: 1_248_050,
  incomeMinor: 425_000,
  expensesMinor: 298_040,
};

export const MOCK_OVERVIEW_RESPONSE = {
  summary: SUMMARY_MOCK,
  cashFlow: CASH_FLOW_MOCK,
  expensesByCategory: EXPENSE_CATEGORY_MOCK,
};
