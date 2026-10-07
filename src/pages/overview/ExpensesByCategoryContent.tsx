import type { ExpenseCategoryPoint } from "src/pages/overview/types";
import type { Currency } from "src/shared/types/transaction";
import {
  Chart,
  ChartContent,
  ChartSkeleton,
  ChartState,
} from "src/pages/overview/OverviewCashFlowCharts.styled";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import { Button } from "src/shared/ui/ui-kit/Button";
import { OverviewExpensesChart } from "src/pages/overview/OverviewExpensesChart";
import { OverviewChartDataEmptyState } from "src/pages/overview/OverviewChartDataEmptyState";
import {
  CategoryChart,
  CategoryListSkeleton,
  Content,
} from "src/pages/overview/OverviewExpensesChart.styled";

export type ExpensesByCategoryContentProps = {
  data?: ExpenseCategoryPoint[];
  totalExpensesMinor?: number;
  currency?: Currency;
  dataLoading: boolean;
  dataFetching: boolean;
  hasDataError: boolean;
  onRetry: () => void;
};

export const ExpensesByCategoryContent = ({
  data,
  totalExpensesMinor,
  currency,
  dataLoading,
  dataFetching,
  hasDataError,
  onRetry,
}: ExpensesByCategoryContentProps) => {
  if (dataLoading) {
    return (
      <Content aria-hidden="true">
        <CategoryChart>
          <ChartSkeleton />
        </CategoryChart>
        <CategoryListSkeleton />
      </Content>
    );
  }

  if (hasDataError) {
    return (
      <Chart>
        <ChartState
          role="alert"
          direction="column"
          align="center"
          justify="center"
          gap="sm"
        >
          <Typography color="danger" variant="bodyText">
            Failed to load expenses by category
          </Typography>

          <Button onClick={onRetry} disabled={dataFetching}>
            Try again
          </Button>
        </ChartState>
      </Chart>
    );
  }

  if (data?.length && currency && totalExpensesMinor) {
    return (
      <ChartContent $fetching={dataFetching} inert={dataFetching}>
        <OverviewExpensesChart
          data={data}
          currency={currency}
          totalExpensesMinor={totalExpensesMinor}
        />
      </ChartContent>
    );
  }

  return (
    <ChartContent $fetching={dataFetching} inert={dataFetching}>
      <OverviewChartDataEmptyState />
    </ChartContent>
  );
};
