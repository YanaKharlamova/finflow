import type { PeriodValue } from "src/pages/overview/types";
import { PERIODS } from "src/pages/overview/constants";
import type { Transaction } from "src/shared/types/transaction";
import { MILLISECONDS_PER_DAY } from "src/mocks/data/handlers/constants";

const subtractMonths = (date: Date, monthsToSubtract: number): Date => {
  const year = date.getUTCFullYear();
  const targetMonth = date.getUTCMonth() - monthsToSubtract;
  const originalDayOfMonth = date.getUTCDate();
  const sameDayInTargetMonth = new Date(
    Date.UTC(year, targetMonth, originalDayOfMonth),
  );

  if (sameDayInTargetMonth.getUTCDate() === originalDayOfMonth) {
    return sameDayInTargetMonth;
  }

  const lastDayOfTargetMonth = new Date(Date.UTC(year, targetMonth + 1, 0));

  return lastDayOfTargetMonth;
};

export const filterTransactionsByPeriod = (
  transactions: readonly Transaction[],
  period: PeriodValue,
  now = new Date(),
): Transaction[] => {
  const todayTimestamp = Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const threeMonthsAgo = subtractMonths(new Date(todayTimestamp), 3);

  return transactions.filter(({ date }) => {
    const transactionDate = new Date(date);
    const daysAgo =
      (todayTimestamp - transactionDate.getTime()) / MILLISECONDS_PER_DAY;

    if (daysAgo < 0) {
      return false;
    }

    switch (period) {
      case PERIODS.last7Days:
        return daysAgo < 7;

      case PERIODS.last30Days:
        return daysAgo < 30;

      case PERIODS.last3Months:
        return transactionDate >= threeMonthsAgo;

      case PERIODS.thisYear:
        return transactionDate.getUTCFullYear() === now.getFullYear();
    }
  });
};
