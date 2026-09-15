import { ReceiptIcon } from "src/shared/ui/icons/ReceiptIcon";
import {
  NoTransactionsWrapper,
  TextWrapper,
} from "src/pages/transactions/TransactionsContent.styled";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import { TransactionsTable } from "src/pages/transactions/TransactionsTable";
import type { Transaction } from "src/shared/types/transaction";
import { SearchListIcon } from "src/shared/ui/icons/SearchListIcon";
import { TransactionTableSkeleton } from "src/pages/transactions/TransactionTableSkeleton";
import { NoResultsIcon } from "src/shared/ui/icons/NoResultsIcon";
import { Button } from "src/shared/ui/ui-kit/Button";

type Props = {
  transactions: Transaction[];
  pagesAmount: number;
  currentPage: number;
  dataInitialLoading: boolean;
  dataError: boolean;
  hasActiveFilters: boolean;
  onPageChange: (page: number) => void;
  handleReloadData: () => void;
};

export const TransactionsContent = ({
  transactions,
  currentPage,
  pagesAmount,
  dataInitialLoading,
  dataError,
  hasActiveFilters,
  handleReloadData,
  onPageChange,
}: Props) => {
  const hasData = transactions.length > 0;

  if (dataInitialLoading) {
    return <TransactionTableSkeleton onPageChange={onPageChange} />;
  }

  if (dataError) {
    return (
      <NoTransactionsWrapper direction="column" align="center" justify="center">
        <NoResultsIcon />

        <TextWrapper
          direction="column"
          align="center"
          justify="center"
          gap="sm"
        >
          <Typography variant="bodyText">Couldn’t load transactions</Typography>

          <Typography variant="caption">
            Something went wrong while loading your transactions.
          </Typography>

          <Button onClick={() => handleReloadData()}>Try again</Button>
        </TextWrapper>
      </NoTransactionsWrapper>
    );
  }

  if (hasData) {
    return (
      <TransactionsTable
        options={transactions}
        currentPage={currentPage}
        pagesAmount={pagesAmount}
        onPageChange={onPageChange}
      />
    );
  }

  if (hasActiveFilters) {
    return (
      <NoTransactionsWrapper direction="column" align="center" justify="center">
        <SearchListIcon />

        <TextWrapper direction="column" align="center" justify="center">
          <Typography variant="bodyText">No transactions found</Typography>

          <Typography variant="caption">
            Try adjusting your search or filters
          </Typography>
        </TextWrapper>
      </NoTransactionsWrapper>
    );
  }

  return (
    <NoTransactionsWrapper direction="column" align="center" justify="center">
      <ReceiptIcon />

      <TextWrapper direction="column" align="center" justify="center">
        <Typography variant="bodyText">No transactions yet</Typography>

        <Typography variant="caption">
          Add your first transaction to start tracking your finances.
        </Typography>
      </TextWrapper>
    </NoTransactionsWrapper>
  );
};
