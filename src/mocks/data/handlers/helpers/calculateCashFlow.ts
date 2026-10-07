import { filterTransactionsByPeriod } from "src/mocks/data/handlers/helpers/filterTransactionsByPeriod";
import { PERIODS } from "src/pages/overview/constants";
import type { CashFlowPoint, PeriodValue } from "src/pages/overview/types";
import { TRANSACTION_TYPES } from "src/shared/modals/constants";
import type { Transaction } from "src/shared/types/transaction";
import { MILLISECONDS_PER_DAY } from "src/mocks/data/handlers/constants";

type Options = {
  transactions: readonly Transaction[];
  period: PeriodValue;
};

const dayFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});

const getDayDates = (today: Date, days: number): Date[] =>
  Array.from({ length: days }, (_, index) => {
    const daysBack = days - index - 1;

    return new Date(today.getTime() - daysBack * MILLISECONDS_PER_DAY);
  });

const getMonthDates = (today: Date, months: number): Date[] =>
  Array.from({ length: months }, (_, index) => {
    const monthsBack = months - index - 1;

    return new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - monthsBack, 1),
    );
  });

const getPeriodDates = (period: PeriodValue, today: Date): Date[] => {
  switch (period) {
    case PERIODS.last7Days:
      return getDayDates(today, 7);

    case PERIODS.last30Days:
      return getDayDates(today, 30);

    case PERIODS.last3Months:
      return getMonthDates(today, 4);

    case PERIODS.thisYear:
      return getMonthDates(today, today.getUTCMonth() + 1);
  }
};

export const calculateCashFlow = ({
  transactions,
  period,
}: Options): CashFlowPoint[] => {
  const now = new Date();
  const today = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()),
  );
  const periodTransactions = filterTransactionsByPeriod(
    transactions,
    period,
    now,
  );
  const byDay = period === PERIODS.last7Days || period === PERIODS.last30Days;
  const points = new Map<string, CashFlowPoint>();

  getPeriodDates(period, today).forEach((date) => {
    const key = date.toISOString().slice(0, byDay ? 10 : 7);
    const label = byDay
      ? dayFormatter.format(date)
      : monthFormatter.format(date);

    points.set(key, {
      label,
      incomeMinor: 0,
      expensesMinor: 0,
      netMinor: 0,
    });
  });

  periodTransactions.forEach((transaction) => {
    const key = transaction.date.slice(0, byDay ? 10 : 7);
    const point = points.get(key);

    if (!point) {
      return;
    }

    if (transaction.type === TRANSACTION_TYPES.income) {
      point.incomeMinor += transaction.amountMinor;
    } else {
      point.expensesMinor += transaction.amountMinor;
    }

    point.netMinor = point.incomeMinor - point.expensesMinor;
  });

  return [...points.values()];
};
