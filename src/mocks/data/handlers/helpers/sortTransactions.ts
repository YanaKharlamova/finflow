import type {
  Transaction,
  TransactionSort,
} from "src/shared/types/transaction";
import { SORT_ORDERS } from "src/pages/transactions/constants";

export const sortTransactions = (
  transactions: readonly Transaction[],
  sort: TransactionSort,
): Transaction[] => {
  return [...transactions].sort((a, b) => {
    switch (sort) {
      case SORT_ORDERS.oldest:
        return a.date.localeCompare(b.date);

      case SORT_ORDERS.amountDesc:
        return b.amountMinor - a.amountMinor;

      case SORT_ORDERS.amountAsc:
        return a.amountMinor - b.amountMinor;

      case SORT_ORDERS.newest:
        return b.date.localeCompare(a.date);
    }
  });
};
