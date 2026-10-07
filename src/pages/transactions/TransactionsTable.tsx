import type { Transaction } from "src/shared/types/transaction";
import {
  TableBody,
  TableStyled,
} from "src/pages/transactions/TransactionsTable.styled";
import { Flex } from "src/shared/ui/ui-kit/Flex";
import { TransactionsPagination } from "src/pages/transactions/TransactionsPagination";
import { TransactionsTableHeader } from "src/pages/transactions/TransactionsTableHeader";
import { TransactionRow } from "src/pages/transactions/TransactionRow";

type Props = {
  options: Transaction[];
  currentPage: number;
  pagesAmount: number;
  onPageChange: (page: number) => void;
};

export const TransactionsTable = ({
  options,
  currentPage,
  pagesAmount,
  onPageChange,
}: Props) => (
  <Flex direction="column" gap="xs">
    <TableStyled aria-label="Transactions">
      <TransactionsTableHeader />

      <TableBody>
        {options.map((transaction) => (
          <TransactionRow key={transaction.id} transaction={transaction} />
        ))}
      </TableBody>
    </TableStyled>

    <TransactionsPagination
      currentPage={currentPage}
      pagesAmount={pagesAmount}
      onPageChange={onPageChange}
    />
  </Flex>
);
