import {
  Chart,
  Header,
  Root,
} from "src/pages/overview/OverviewCashFlowCharts.styled";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import {
  CashFlowContent,
  type CashFlowContentProps,
} from "src/pages/overview/CashFlowContent";

export const OverviewCashFlow = (props: CashFlowContentProps) => {
  const { dataLoading, dataFetching } = props;

  return (
    <Root
      aria-labelledby="cash-flow-title"
      aria-busy={dataLoading || dataFetching}
    >
      <Header>
        <Typography id="cash-flow-title" as="h2" variant="subtitle">
          Cash flow
        </Typography>

        <Typography variant="caption" color="secondary">
          Income and expenses over time
        </Typography>
      </Header>

      <Chart>
        <CashFlowContent {...props} />
      </Chart>
    </Root>
  );
};
