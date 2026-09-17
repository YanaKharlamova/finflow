import type {
  CashFlowPoint,
  ExpenseCategoryPoint,
  OverviewSummary,
} from "src/pages/overview/types";

const CASH_FLOW_MOCK: CashFlowPoint[] = [
  {
    label: "Aug 27",
    incomeMinor: 0,
    expensesMinor: 45000,
    netMinor: -45000,
  },
  {
    label: "Aug 28",
    incomeMinor: 425000,
    expensesMinor: 32000,
    netMinor: 393000,
  },
  {
    label: "Aug 29",
    incomeMinor: 0,
    expensesMinor: 8645,
    netMinor: -8645,
  },
  {
    label: "Aug 30",
    incomeMinor: 0,
    expensesMinor: 120000,
    netMinor: -120000,
  },
  {
    label: "Aug 31",
    incomeMinor: 0,
    expensesMinor: 24500,
    netMinor: -24500,
  },
  {
    label: "Sep 1",
    incomeMinor: 0,
    expensesMinor: 32895,
    netMinor: -32895,
  },
  {
    label: "Sep 2",
    incomeMinor: 0,
    expensesMinor: 35000,
    netMinor: -35000,
  },
];

const EXPENSE_CATEGORY_MOCK: ExpenseCategoryPoint[] = [
  {
    category: "housing",
    amountMinor: 120000,
  },
  {
    category: "food",
    amountMinor: 86450,
  },
  {
    category: "transport",
    amountMinor: 48740,
  },
  {
    category: "other-expense",
    amountMinor: 42850,
  },
];

const SUMMARY_MOCK: OverviewSummary = {
  currency: "USD",
  currentBalanceMinor: 1248050,
  incomeMinor: 425000,
  expensesMinor: 298040,
};

export const MOCK_OVERVIEW_RESPONSE = {
  summary: SUMMARY_MOCK,
  cashFlow: CASH_FLOW_MOCK,
  expensesByCategory: EXPENSE_CATEGORY_MOCK,
};
