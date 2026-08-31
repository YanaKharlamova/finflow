import type { Category, TransactionType } from "src/shared/modals/constants";
import {
  TRANSACTION_SORT_OPTIONS,
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "src/pages/transactions/constants";

export type Currency = "USD";

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
