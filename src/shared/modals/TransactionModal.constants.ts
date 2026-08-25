export const TRANSACTION_TYPES = {
  income: "income",
  expense: "expense",
} as const;

export type TransactionType =
  (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];
