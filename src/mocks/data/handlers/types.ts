import type {
  Category,
  Transaction,
  TransactionType,
} from "src/shared/types/transaction";

import {
  AMOUNT_PATTERN,
  CATEGORY_OPTIONS,
  TRANSACTION_TYPES,
} from "src/shared/modals/constants";
import { formatLocalDate } from "src/shared/helpers/formatLocalDate";
import { isValidTransactionDate } from "src/shared/helpers/isValidTransactionDate";
import { isNumber, isString } from "src/shared/types/typeguards";

type NewTransaction = Omit<Transaction, "id" | "currency" | "amountMinor"> & {
  amount: number;
};

const hasText = (value: unknown): value is string =>
  isString(value) && Boolean(value.trim());

const isValidAmount = (value: unknown): value is number =>
  isNumber(value) &&
  Number.isFinite(value) &&
  value > 0 &&
  AMOUNT_PATTERN.test(String(value)) &&
  Number.isSafeInteger(Math.round(value * 100));

const isValidDate = (value: unknown): value is string =>
  isValidTransactionDate(value) && value <= formatLocalDate(new Date());

const isTransactionType = (value: unknown): value is TransactionType =>
  value === TRANSACTION_TYPES.income || value === TRANSACTION_TYPES.expense;

const isCategory = (value: unknown, type: TransactionType): value is Category =>
  isString(value) &&
  CATEGORY_OPTIONS[type].some(({ value: category }) => category === value);

export const isValidTransaction = (value: unknown): value is NewTransaction => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const { title, date, type, category, amount } = value as Record<
    keyof NewTransaction,
    unknown
  >;

  return (
    hasText(title) &&
    isValidDate(date) &&
    isTransactionType(type) &&
    isCategory(category, type) &&
    isValidAmount(amount)
  );
};
