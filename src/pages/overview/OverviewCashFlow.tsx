import type { CashFlowPoint } from "src/pages/overview/types";
import {
  Chart,
  Header,
  Root,
} from "src/pages/overview/OverviewCashFlowCharts.styled";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import { CashFlowEmptyState } from "src/pages/overview/CashFlowEmptyState";
import { OverviewCashFlowChart } from "src/pages/overview/OverviewCashFlowChart";
import type { Currency } from "src/shared/types/transaction";

type Props = {
  data: CashFlowPoint[];
  currency: Currency;
  onModalToggle: (toggleState: boolean) => void;
};

export const OverviewCashFlow = ({ data, currency, onModalToggle }: Props) => {
  return (
    <Root aria-labelledby="cash-flow-title">
      <Header>
        <Typography id="cash-flow-title" as="h2" variant="subtitle">
          Cash flow
        </Typography>

        <Typography variant="caption" color="secondary">
          Income and expenses over time
        </Typography>
      </Header>

      <Chart>
        {data.length > 0 ? (
          <OverviewCashFlowChart data={data} currency={currency} />
        ) : (
          <CashFlowEmptyState onModalToggle={onModalToggle} />
        )}
      </Chart>
    </Root>
  );
};
