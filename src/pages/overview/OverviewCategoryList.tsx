import type { ExpenseCategoryPoint } from "src/pages/overview/types";
import { Bullet, Root } from "src/pages/overview/OverviewCategoryList.styled";
import { formatCurrencyToMajorUnits } from "src/shared/helpers/formatCurrencyToMajorUnits";
import type { Currency } from "src/shared/types/transaction";
import {
  EXPENSE_CATEGORY_COLORS,
  EXPENSE_CATEGORY_LABELS,
} from "src/pages/overview/constants";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import { Flex } from "src/shared/ui/ui-kit/Flex";

type Props = {
  data: ExpenseCategoryPoint[];
  currency: Currency;
  totalExpensesMinor: number;
};

export const OverviewCategoryList = ({
  data,
  currency,
  totalExpensesMinor,
}: Props) => {
  const formattedList = data.map(({ category, amountMinor }) => ({
    category,
    label: EXPENSE_CATEGORY_LABELS[category],
    amount: formatCurrencyToMajorUnits({
      amount: amountMinor,
      currency,
    }),
    percentage:
      totalExpensesMinor > 0
        ? ((amountMinor / totalExpensesMinor) * 100).toFixed(1)
        : 0,
    bulletColor: EXPENSE_CATEGORY_COLORS[category],
  }));

  return (
    <Root>
      {formattedList.map((el) => (
        <li key={el.category}>
          <Flex align="center" justify="space-between" gap="sm">
            <Flex align="center" gap="sm">
              <Bullet $color={el.bulletColor} aria-hidden="true" />

              <Typography as="span" variant="bodyText">
                {el.label}
              </Typography>
            </Flex>

            <Flex align="center" gap="md">
              <Typography as="span" variant="bodyText">
                {el.amount}
              </Typography>

              <Typography as="span" variant="caption" color="secondary">
                {el.percentage}%
              </Typography>
            </Flex>
          </Flex>
        </li>
      ))}
    </Root>
  );
};
