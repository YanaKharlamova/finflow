import { filterTransactionsByPeriod } from "src/mocks/data/handlers/helpers/filterTransactionsByPeriod";
import type {
  ExpenseCategoryPoint,
  PeriodValue,
} from "src/pages/overview/types";
import {
  CATEGORY_OPTIONS,
  TRANSACTION_TYPES,
} from "src/shared/modals/constants";
import type {
  ExpenseCategory,
  Transaction,
} from "src/shared/types/transaction";

type Options = {
  transactions: readonly Transaction[];
  period: PeriodValue;
};

const expenseCategories = CATEGORY_OPTIONS[TRANSACTION_TYPES.expense].map(
  ({ value }) => value,
);

const isExpenseCategory = (
  category: Transaction["category"],
): category is ExpenseCategory =>
  expenseCategories.some((expenseCategory) => expenseCategory === category);

export const calculateExpensesByCategory = ({
  transactions,
  period,
}: Options): ExpenseCategoryPoint[] => {
  const totals = new Map<ExpenseCategory, number>();

  filterTransactionsByPeriod(transactions, period).forEach(
    ({ type, category, amountMinor }) => {
      if (type !== TRANSACTION_TYPES.expense || !isExpenseCategory(category)) {
        return;
      }

      totals.set(category, (totals.get(category) ?? 0) + amountMinor);
    },
  );

  return [...totals.entries()]
    .map(([category, amountMinor]) => ({ category, amountMinor }))
    .sort((a, b) => b.amountMinor - a.amountMinor);
};
