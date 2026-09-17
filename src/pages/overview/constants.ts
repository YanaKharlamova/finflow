import {
  CATEGORY_OPTIONS,
  TRANSACTION_TYPES,
} from "src/shared/modals/constants";
import type { ExpenseCategory } from "src/shared/types/transaction";

export const PERIODS = {
  last7Days: "7d",
  last30Days: "30d",
  last3Months: "3m",
  thisYear: "this-year",
} as const;

export const PERIOD_OPTIONS = [
  {
    value: PERIODS.last7Days,
    desktopLabel: "Last 7 days",
    mobileLabel: "Last 7d",
  },
  {
    value: PERIODS.last30Days,
    desktopLabel: "Last 30 days",
    mobileLabel: "Last 30d",
  },
  {
    value: PERIODS.last3Months,
    desktopLabel: "Last 3 months",
    mobileLabel: "Last 3mo",
  },
  {
    value: PERIODS.thisYear,
    desktopLabel: "This year",
    mobileLabel: "This year",
  },
] as const;

export const DEFAULT_PERIOD = PERIODS.last7Days;

export const EXPENSE_CATEGORY_COLORS = {
  housing: "#4C76BD",
  food: "#E97866",
  transport: "#D7A13F",
  "other-expense": "#7A8799",
};

export const EXPENSE_CATEGORY_LABELS = Object.fromEntries(
  CATEGORY_OPTIONS[TRANSACTION_TYPES.expense].map(({ value, label }) => [
    value,
    label,
  ]),
) as Record<ExpenseCategory, string>;
