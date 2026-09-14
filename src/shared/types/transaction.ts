import type {
  CATEGORY_OPTIONS,
  TRANSACTION_TYPES,
} from "src/shared/modals/constants";
import {
  type TRANSACTION_CATEGORY_OPTIONS,
  type TRANSACTION_SORT_OPTIONS,
  type TRANSACTION_TYPE_OPTIONS,
} from "src/pages/transactions/constants";

export type Currency = "USD";

export type TransactionType =
  (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];

export type Category =
  (typeof CATEGORY_OPTIONS)[TransactionType][number]["value"];

export type ExpenseCategory =
  (typeof CATEGORY_OPTIONS)["expense"][number]["value"];

export type Transaction = {
  id: string;
  title: string;
  date: string;
  type: TransactionType;
  category: Category;
  amountMinor: number;
  currency: Currency;
};

export type TransactionSort =
  (typeof TRANSACTION_SORT_OPTIONS)[number]["value"];

export type TransactionCategoryFilter =
  (typeof TRANSACTION_CATEGORY_OPTIONS)[number]["value"];

export type TransactionTypeFilter =
  (typeof TRANSACTION_TYPE_OPTIONS)[number]["value"];

export type TransactionFilterData = {
  transactionType: TransactionTypeFilter;
  category: TransactionCategoryFilter;
  date: string;
  sort: TransactionSort;
  search: string;
};

export type TransactionFilterUpdate = Partial<TransactionFilterData>;

export type TransactionsParams = {
  search?: string;
  type?: TransactionTypeFilter;
  category?: TransactionCategoryFilter;
  date?: string;
  sort?: TransactionSort;
  page: number;
  limit: number;
};

// GET /transactions
export type TransactionsResponse = {
  items: Transaction[];
  total: number;
  page: number;
  limit: number;
};
