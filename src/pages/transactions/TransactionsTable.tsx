import type { Transaction } from "src/shared/types/transaction";
import { TRANSACTION_TYPES } from "src/shared/modals/constants";
import {
  ActionsCell,
  AmountCell,
  CategoryLabel,
  CategoryCell,
  DateCell,
  TableBody,
  TableRow,
  TableStyled,
  TransactionCell,
  TypeBadge,
} from "src/pages/transactions/TransactionsTable.styled";
import { Button } from "src/shared/ui/ui-kit/Button";
import { Typography } from "src/shared/ui/ui-kit/Typography";

import { convertMinorToMajorUnits } from "src/shared/helpers/convertMinorToMajorUnits";
import { Flex } from "src/shared/ui/ui-kit/Flex";
import { TransactionsPagination } from "src/pages/transactions/TransactionsPagination";
import { TransactionsTableHeader } from "src/pages/transactions/TransactionsTableHeader";

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
}: Props) => {
  return (
    <Flex direction="column" gap="xs">
      <TableStyled aria-label="Transactions">
        <TransactionsTableHeader />

        <TableBody>
          {options.map(
            ({ id, date, title, category, amountMinor, type, currency }) => {
              const formattedDate = new Intl.DateTimeFormat("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }).format(new Date(`${date}T00:00:00`));

              const categoryFormatted = category.split("-").join(" ");

              const expenseType = type === TRANSACTION_TYPES.expense;

              const amountFormatted = new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(convertMinorToMajorUnits(amountMinor));

              return (
                <TableRow key={id}>
                  <DateCell>
                    <time dateTime={date}>{formattedDate}</time>
                  </DateCell>

                  <TransactionCell scope="row">
                    <Typography variant="subtitle" as="span">
                      {title}
                    </Typography>
                    <TypeBadge variant={expenseType ? "danger" : "primary"}>
                      {type}
                    </TypeBadge>
                  </TransactionCell>

                  <CategoryCell>
                    <CategoryLabel>Category: </CategoryLabel>
                    {categoryFormatted}
                  </CategoryCell>

                  <AmountCell $danger={expenseType}>
                    {amountFormatted} {currency}
                  </AmountCell>

                  <ActionsCell>
                    <Button variant="danger" aria-label={`Delete ${title}`}>
                      Delete
                    </Button>
                  </ActionsCell>
                </TableRow>
              );
            },
          )}
        </TableBody>
      </TableStyled>

      <TransactionsPagination
        currentPage={currentPage}
        pagesAmount={pagesAmount}
        onPageChange={onPageChange}
      />
    </Flex>
  );
};
