import type {
  Transaction,
  TransactionFilterData,
} from "src/shared/types/transaction";
import { ALL_FILTER_VALUE } from "src/pages/transactions/constants";

type Options = {
  transactions: Transaction[];
  filters: TransactionFilterData;
};

export const getTransactions = ({ transactions, filters }: Options) => {
  const normalizedSearch = filters.search.trim().toLowerCase();
  const result: Transaction[] = [];

  for (const transaction of transactions) {
    const matchesSearch = transaction.title
      .toLowerCase()
      .includes(normalizedSearch);

    const matchesTransactionType =
      filters.transactionType === ALL_FILTER_VALUE ||
      transaction.type === filters.transactionType;

    const matchesCategory =
      filters.category === ALL_FILTER_VALUE ||
      transaction.category === filters.category;

    const matchesDate = !filters.date || transaction.date === filters.date;

    if (
      matchesSearch &&
      matchesTransactionType &&
      matchesCategory &&
      matchesDate
    ) {
      result.push(transaction);
    }
  }

  switch (filters.sort) {
    case "newest":
      return result.sort((a, b) => b.date.localeCompare(a.date));
    case "oldest":
      return result.sort((a, b) => a.date.localeCompare(b.date));
    case "amount-desc":
      return result.sort((a, b) => b.amountMinor - a.amountMinor);
    case "amount-asc":
      return result.sort((a, b) => a.amountMinor - b.amountMinor);
  }
};
