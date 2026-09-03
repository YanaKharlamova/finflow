import type { ExpenseCategoryPoint } from "src/pages/overview/types";
import type { Currency } from "src/pages/transactions/types";
import { Header, Root } from "src/pages/overview/OverviewCashFlowCharts.styled";
import { Typography } from "src/shared/ui/ui-kit/Typography";

import { OverviewChartDataEmptyState } from "src/pages/overview/OverviewChartDataEmptyState";
import { OverviewExpensesChart } from "src/pages/overview/OverviewExpensesChart";

type Props = {
  data: ExpenseCategoryPoint[];
  totalExpensesMinor: number;
  currency: Currency;
};

export const OverviewExpensesByCategory = ({
  data,
  totalExpensesMinor,
  currency,
}: Props) => {
  const hasChartData = data.length > 0;

  return (
    <Root aria-labelledby="expenses-by-category-title">
      <Header>
        <Typography id="expenses-by-category-title" as="h2" variant="subtitle">
          Expenses by category
        </Typography>

        <Typography variant="caption" color="secondary">
          Spending in the selected period
        </Typography>
      </Header>

      {hasChartData ? (
        <OverviewExpensesChart
          totalExpensesMinor={totalExpensesMinor}
          currency={currency}
          data={data}
        />
      ) : (
        <OverviewChartDataEmptyState />
      )}
    </Root>
  );
};
