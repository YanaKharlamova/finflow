import type {
  Currency,
  ExpenseCategory,
} from "src/shared/types/transaction";
import type { PERIODS } from "src/pages/overview/constants";

export type OverviewSummary = {
  currency: Currency;
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

export type ExpenseCategoryPoint = {
  category: ExpenseCategory;
  amountMinor: number;
};

export type OverviewData = {
  summary: OverviewSummary;
  cashFlow: CashFlowPoint[];
  expensesByCategory: ExpenseCategoryPoint[];
};

export type PeriodValue = (typeof PERIODS)[keyof typeof PERIODS];
