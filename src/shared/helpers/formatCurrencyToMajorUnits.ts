import type { Currency } from "src/shared/types/transaction";
import { convertMinorToMajorUnits } from "src/shared/helpers/convertMinorToMajorUnits";

type Options = {
  currency: Currency;
  amount: number | string;
};

export const formatCurrencyToMajorUnits = ({ currency, amount }: Options) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 1,
  });

  return formatter.format(convertMinorToMajorUnits(amount));
};
