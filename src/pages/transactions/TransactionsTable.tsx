import type { Transaction } from "src/shared/types/transaction";
import { TRANSACTION_TYPES } from "src/shared/modals/constants";
import {
  ActionButton,
  ActionsCell,
  AmountCell,
  CategoryCell,
  DateCell,
  HeaderCell,
  MobileLabel,
  TableBody,
  TableHead,
  TableRow,
  TableStyled,
  TransactionCell,
  TypeBadge,
} from "src/pages/transactions/TransactionsTable.styled";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import { TABLE_COLUMNS } from "src/pages/transactions/constants";
import { convertMinorToMajorUnits } from "src/shared/helpers/convertMinorToMajorUnits";
import { Flex } from "src/shared/ui/ui-kit/Flex";
import { TransactionsPagination } from "src/pages/transactions/TransactionsPagination";

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
        <TableHead>
          <tr>
            {TABLE_COLUMNS.map(({ label, align, width }) => (
              <HeaderCell key={label} scope="col" $align={align} $width={width}>
                {label}
              </HeaderCell>
            ))}
          </tr>
        </TableHead>
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
                    <MobileLabel>Category: </MobileLabel>
                    {categoryFormatted}
                  </CategoryCell>

                  <AmountCell $danger={expenseType}>
                    {amountFormatted} {currency}
                  </AmountCell>

                  <ActionsCell>
                    <ActionButton type="button" aria-label={`Delete ${title}`}>
                      Delete
                    </ActionButton>
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
