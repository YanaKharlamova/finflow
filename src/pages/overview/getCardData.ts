import { convertMinorToMajorUnits } from "src/shared/helpers/convertMinorToMajorUnits";
import type { OverviewSummary } from "src/pages/overview/types";

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertMinorToMajorUnits(amount));

export const getCardData = (data: OverviewSummary) => {
  const { currency, currentBalanceMinor, incomeMinor, expensesMinor } = data;

  return {
    currentTotalBalance: formatAmount(currentBalanceMinor),
    income: formatAmount(incomeMinor),
    expenses: formatAmount(expensesMinor),
    currency,
  };
};
