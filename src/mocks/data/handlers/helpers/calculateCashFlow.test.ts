import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { calculateCashFlow } from "src/mocks/data/handlers/helpers/calculateCashFlow";
import { PERIODS } from "src/pages/overview/constants";
import { TRANSACTION_TYPES } from "src/shared/modals/constants";
import type { Transaction } from "src/shared/types/transaction";

const createTransaction = (
  id: string,
  date: string,
  type: Transaction["type"],
  amountMinor: number,
): Transaction => ({
  id,
  title: `Transaction ${id}`,
  date,
  type,
  category: type === TRANSACTION_TYPES.income ? "salary" : "food",
  amountMinor,
  currency: "USD",
});

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2026, 5, 15, 12));
});

afterEach(() => {
  vi.useRealTimers();
});

test("groups transactions by day and calculates cash flow totals", () => {
  const transactions = [
    createTransaction("1", "2026-06-14", TRANSACTION_TYPES.income, 30000),
    createTransaction("2", "2026-06-14", TRANSACTION_TYPES.expense, 8000),
    createTransaction("3", "2026-06-15", TRANSACTION_TYPES.income, 100000),
    createTransaction("4", "2026-06-15", TRANSACTION_TYPES.expense, 25000),
  ];

  expect(
    calculateCashFlow({ transactions, period: PERIODS.last7Days }),
  ).toEqual([
    { label: "Jun 9", incomeMinor: 0, expensesMinor: 0, netMinor: 0 },
    { label: "Jun 10", incomeMinor: 0, expensesMinor: 0, netMinor: 0 },
    { label: "Jun 11", incomeMinor: 0, expensesMinor: 0, netMinor: 0 },
    { label: "Jun 12", incomeMinor: 0, expensesMinor: 0, netMinor: 0 },
    { label: "Jun 13", incomeMinor: 0, expensesMinor: 0, netMinor: 0 },
    {
      label: "Jun 14",
      incomeMinor: 30000,
      expensesMinor: 8000,
      netMinor: 22000,
    },
    {
      label: "Jun 15",
      incomeMinor: 100000,
      expensesMinor: 25000,
      netMinor: 75000,
    },
  ]);
});

test("groups transactions by month and adds points for empty months", () => {
  const transactions = [
    createTransaction("1", "2026-03-20", TRANSACTION_TYPES.income, 40000),
    createTransaction("2", "2026-03-31", TRANSACTION_TYPES.expense, 10000),
    createTransaction("3", "2026-05-10", TRANSACTION_TYPES.expense, 15000),
    createTransaction("4", "2026-06-01", TRANSACTION_TYPES.income, 50000),
    createTransaction("5", "2026-06-12", TRANSACTION_TYPES.expense, 5000),
  ];

  expect(
    calculateCashFlow({ transactions, period: PERIODS.last3Months }),
  ).toEqual([
    {
      label: "Mar",
      incomeMinor: 40000,
      expensesMinor: 10000,
      netMinor: 30000,
    },
    { label: "Apr", incomeMinor: 0, expensesMinor: 0, netMinor: 0 },
    {
      label: "May",
      incomeMinor: 0,
      expensesMinor: 15000,
      netMinor: -15000,
    },
    {
      label: "Jun",
      incomeMinor: 50000,
      expensesMinor: 5000,
      netMinor: 45000,
    },
  ]);
});
