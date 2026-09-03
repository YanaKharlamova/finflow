import { MOCK_OVERVIEW_RESPONSE } from "src/pages/overview/mock";
import { convertMinorToMajorUnits } from "src/shared/helpers/convertMinorToMajorUnits";

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertMinorToMajorUnits(amount));

export const getCardData = () => {
  const {
    summary: { currency, currentBalanceMinor, incomeMinor, expensesMinor },
  } = MOCK_OVERVIEW_RESPONSE;

  return {
    currentTotalBalance: formatAmount(currentBalanceMinor),
    income: formatAmount(incomeMinor),
    expenses: formatAmount(expensesMinor),
    currency,
  };
};
