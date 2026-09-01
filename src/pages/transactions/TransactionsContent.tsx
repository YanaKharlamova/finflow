import { TRANSACTIONS_MOCK } from "src/pages/transactions/mock";
import { ReceiptIcon } from "src/shared/ui/icons/ReceiptIcon";
import {
  NoTransactionsWrapper,
  TextWrapper,
} from "src/pages/transactions/TransactionsContent.styled";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import { TransactionsTable } from "src/pages/transactions/TransactionsTable";
import { getTransactions } from "src/pages/transactions/helpers/getTransactions";
import type { TransactionFilterData } from "src/pages/transactions/types";

type Props = { filters: TransactionFilterData };

export const TransactionsContent = ({ filters }: Props) => {
  const transactions = getTransactions({
    transactions: TRANSACTIONS_MOCK,
    filters,
  });

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

  return transactions.length ? (
    <TransactionsTable options={transactions} />
  ) : (
    transactionsEmptyState
  );
};
