import { Chart } from "src/pages/overview/OverviewCashFlowCharts.styled";
import { Root as EmptyState } from "src/pages/overview/CashFlowEmptyState.styled";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import { AddChartIcon } from "src/shared/ui/icons/AddChartIcon";

export const OverviewChartDataEmptyState = () => {
  return (
    <Chart>
      <EmptyState direction="column" align="center" justify="center" gap="sm">
        <AddChartIcon />

        <Typography variant="bodyText">No expenses for this period</Typography>

        <Typography variant="caption" color="secondary">
          Add an expense to see your spending breakdown.
        </Typography>
      </EmptyState>
    </Chart>
  );
};
