import { TRANSACTIONS_MOCK } from "src/pages/transactions/mock";
import { ReceiptIcon } from "src/shared/ui/icons/ReceiptIcon";
import {
  NoTransactionsWrapper,
  TextWrapper,
} from "src/pages/transactions/TransactionsContent.styled";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import { TransactionsTable } from "src/pages/transactions/TransactionsTable";

export const TransactionsContent = () => {
  const hasTransactions = TRANSACTIONS_MOCK;

  const transactionsEmptyState = (
    <NoTransactionsWrapper>
      <ReceiptIcon />

      <TextWrapper>
        <Typography variant={"bodyText"}>No transactions yet</Typography>

        <Typography variant={"caption"}>
          Add your first transaction to start tracking your finances.
        </Typography>
      </TextWrapper>
    </NoTransactionsWrapper>
  );

  return hasTransactions ? (
    <TransactionsTable options={TRANSACTIONS_MOCK} />
  ) : (
    transactionsEmptyState
  );
};
