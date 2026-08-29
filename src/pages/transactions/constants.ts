import {
  CATEGORY_OPTIONS,
  TRANSACTION_TYPES,
} from "src/shared/modals/constants";

export const ALL_FILTER_VALUE = "all";

export const TRANSACTION_TYPE_OPTIONS = [
  { value: ALL_FILTER_VALUE, label: "All types", mobileLabel: "Type" },
  { value: "income", label: "Income", mobileLabel: "Income" },
  { value: "expense", label: "Expense", mobileLabel: "Expense" },
] as const;

export type TransactionTypeFilter =
  (typeof TRANSACTION_TYPE_OPTIONS)[number]["value"];

export const TRANSACTION_CATEGORY_OPTIONS = [
  { value: ALL_FILTER_VALUE, label: "All categories" },
  ...CATEGORY_OPTIONS[TRANSACTION_TYPES.income],
  ...CATEGORY_OPTIONS[TRANSACTION_TYPES.expense],
] as const;

export type TransactionCategoryFilter =
  (typeof TRANSACTION_CATEGORY_OPTIONS)[number]["value"];

export const TRANSACTION_SORT_OPTIONS = [
  { value: "newest", label: "Newest first", mobileLabel: "Newest" },
  { value: "oldest", label: "Oldest first", mobileLabel: "Oldest" },
  {
    value: "amount-desc",
    label: "Amount: high to low",
    mobileLabel: "High to low",
  },
  {
    value: "amount-asc",
    label: "Amount: low to high",
    mobileLabel: "Low to high",
  },
] as const;

export type TransactionSort =
  (typeof TRANSACTION_SORT_OPTIONS)[number]["value"];
