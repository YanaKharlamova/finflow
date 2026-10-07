import {
  CATEGORY_OPTIONS,
  TRANSACTION_TYPES,
} from "src/shared/modals/constants";

export const ALL_FILTER_VALUE = "all";

export const DEFAULT_PAGE_SIZE = 10;

export const TRANSACTION_TYPE_OPTIONS = [
  { value: ALL_FILTER_VALUE, label: "All types", mobileLabel: "Type" },
  { value: "income", label: "Income", mobileLabel: "Income" },
  { value: "expense", label: "Expense", mobileLabel: "Expense" },
] as const;

export const TRANSACTION_CATEGORY_OPTIONS = [
  { value: ALL_FILTER_VALUE, label: "All categories" },
  ...CATEGORY_OPTIONS[TRANSACTION_TYPES.income],
  ...CATEGORY_OPTIONS[TRANSACTION_TYPES.expense],
] as const;

export const SORT_ORDERS = {
  newest: "newest",
  oldest: "oldest",
  amountDesc: "amount-desc",
  amountAsc: "amount-asc",
} as const;

export const TRANSACTION_SORT_OPTIONS = [
  { value: SORT_ORDERS.newest, label: "Newest first", mobileLabel: "Newest" },
  { value: SORT_ORDERS.oldest, label: "Oldest first", mobileLabel: "Oldest" },
  {
    value: SORT_ORDERS.amountDesc,
    label: "Amount: high to low",
    mobileLabel: "High to low",
  },
  {
    value: SORT_ORDERS.amountAsc,
    label: "Amount: low to high",
    mobileLabel: "Low to high",
  },
] as const;

export const TABLE_COLUMNS = [
  { label: "Date", width: 18, align: "left" },
  { label: "Transaction", width: 34, align: "left" },
  { label: "Category", width: 18, align: "left" },
  { label: "Amount", width: 18, align: "right" },
  { label: "Actions", width: 12, align: "right" },
] as const;
