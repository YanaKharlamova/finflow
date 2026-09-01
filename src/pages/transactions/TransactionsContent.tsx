import { ReceiptIcon } from "src/shared/ui/icons/ReceiptIcon";
import {
  NoTransactionsWrapper,
  TextWrapper,
} from "src/pages/transactions/TransactionsContent.styled";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import { TransactionsTable } from "src/pages/transactions/TransactionsTable";
import { getTransactions } from "src/pages/transactions/helpers/getTransactions";
import type {
  Transaction,
  TransactionFilterData,
} from "src/pages/transactions/types";
import { SearchListIcon } from "src/shared/ui/icons/SearchListIcon";

type Props = { filters: TransactionFilterData; transactions: Transaction[] };

export const TransactionsContent = ({ filters, transactions }: Props) => {
  const transactionsFiltered: Transaction[] = getTransactions({
    transactions,
    filters,
  });

  if (transactionsFiltered.length) {
    return <TransactionsTable options={transactionsFiltered} />;
  }

  if (transactions.length) {
    return (
      <NoTransactionsWrapper
        direction="column"
        align="center"
        justify="center"
      >
        <SearchListIcon />

        <TextWrapper
          direction="column"
          align="center"
          justify="center"
        >
          <Typography variant="bodyText">No transactions found</Typography>

          <Typography variant="caption">
            Try adjusting your search or filters
          </Typography>
        </TextWrapper>
      </NoTransactionsWrapper>
    );
  }

  return (
    <NoTransactionsWrapper
      direction="column"
      align="center"
      justify="center"
    >
      <ReceiptIcon />

      <TextWrapper
        direction="column"
        align="center"
        justify="center"
      >
        <Typography variant="bodyText">No transactions yet</Typography>

        <Typography variant="caption">
          Add your first transaction to start tracking your finances.
        </Typography>
      </TextWrapper>
    </NoTransactionsWrapper>
  );
};
