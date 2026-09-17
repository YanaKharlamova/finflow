import { DEFAULT_CURRENCY } from "src/mocks/data/handlers/constants";
import type { OverviewSummary } from "src/pages/overview/types";
import { TRANSACTION_TYPES } from "src/shared/modals/constants";
import type { Transaction } from "src/shared/types/transaction";

type Options = {
  transactions: readonly Transaction[];
  periodTransactions: readonly Transaction[];
};

const sumTransactionsByType = (
  transactions: readonly Transaction[],
  type: Transaction["type"],
) =>
  transactions.reduce(
    (total, transaction) =>
      transaction.type === type ? total + transaction.amountMinor : total,
    0,
  );

export const calculateSummary = ({
  transactions,
  periodTransactions,
}: Options): OverviewSummary => {
  const currentBalanceMinor =
    sumTransactionsByType(transactions, TRANSACTION_TYPES.income) -
    sumTransactionsByType(transactions, TRANSACTION_TYPES.expense);

  const incomeMinor = sumTransactionsByType(
    periodTransactions,
    TRANSACTION_TYPES.income,
  );
  const expensesMinor = sumTransactionsByType(
    periodTransactions,
    TRANSACTION_TYPES.expense,
  );

  return {
    currency: DEFAULT_CURRENCY,
    currentBalanceMinor,
    incomeMinor,
    expensesMinor,
  };
};
