import type { TransactionType } from "src/pages/transactions/types";

export const TRANSACTION_TYPES = {
  income: "income",
  expense: "expense",
} as const;

export const CATEGORY_OPTIONS = {
  [TRANSACTION_TYPES.income]: [
    { value: "salary", label: "Salary" },
    { value: "freelance", label: "Freelance" },
    { value: "other-income", label: "Other" },
  ],
  [TRANSACTION_TYPES.expense]: [
    { value: "housing", label: "Housing" },
    { value: "food", label: "Food" },
    { value: "transport", label: "Transport" },
    { value: "other-expense", label: "Other" },
  ],
} as const;

export type Category =
  (typeof CATEGORY_OPTIONS)[TransactionType][number]["value"];
