import type { CashFlowPoint } from "src/pages/overview/types";
import type { Currency } from "src/shared/types/transaction";
import {
  ChartContent,
  ChartSkeleton,
  ChartState,
} from "src/pages/overview/OverviewCashFlowCharts.styled";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import { Button } from "src/shared/ui/ui-kit/Button";
import { OverviewCashFlowChart } from "src/pages/overview/OverviewCashFlowChart";
import { CashFlowEmptyState } from "src/pages/overview/CashFlowEmptyState";

export type CashFlowContentProps = {
  data?: CashFlowPoint[];
  dataLoading: boolean;
  dataFetching: boolean;
  currency?: Currency;
  hasDataError: boolean;
  onModalToggle: (toggleState: boolean) => void;
  onRetry: () => void;
};

export const CashFlowContent = ({
  data,
  dataLoading,
  dataFetching,
  currency,
  hasDataError,
  onModalToggle,
  onRetry,
}: CashFlowContentProps) => {
  if (dataLoading) {
    return <ChartSkeleton aria-hidden="true" />;
  }

  if (hasDataError) {
    return (
      <ChartState
        role="alert"
        direction="column"
        align="center"
        justify="center"
        gap="sm"
      >
        <Typography color="primary" variant="bodyText">
          Failed to load cash flow
        </Typography>

        <Button onClick={onRetry} disabled={dataFetching}>
          Try again
        </Button>
      </ChartState>
    );
  }

  const hasNonZeroChartData =
    data?.some(
      ({ incomeMinor, expensesMinor }) =>
        incomeMinor !== 0 || expensesMinor !== 0,
    ) ?? false;

  if (hasNonZeroChartData && currency && data) {
    return (
      <ChartContent $fetching={dataFetching} inert={dataFetching}>
        <OverviewCashFlowChart data={data} currency={currency} />
      </ChartContent>
    );
  }

  return (
    <ChartContent $fetching={dataFetching} inert={dataFetching}>
      <CashFlowEmptyState onModalToggle={onModalToggle} />
    </ChartContent>
  );
};
