import { Root } from "src/pages/overview/CashFlowEmptyState.styled";
import { AddTransactionButton } from "src/pages/transactions/AddTransactionButton";
import { BarChartOffIcon } from "src/shared/ui/icons/BarChartOffIcon";
import { Typography } from "src/shared/ui/ui-kit/Typography";

type Props = {
  onModalToggle: (toggleState: boolean) => void;
};

export const CashFlowEmptyState = ({ onModalToggle }: Props) => {
  return (
    <Root direction="column" align="center" justify="center" gap="sm">
      <BarChartOffIcon />

      <Typography variant="bodyText">No cash flow data yet</Typography>

      <Typography variant="caption" color="secondary">
        Add your first transaction to start analyzing your cash flow.
      </Typography>

      <AddTransactionButton onModalToggle={onModalToggle} fullLabel />
    </Root>
  );
};
