import type { Transaction } from "src/pages/transactions/types";
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
  TypeLabel,
} from "src/pages/transactions/TransactionsTable.styled";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import { TABLE_COLUMNS } from "src/pages/transactions/constants";

type Props = {
  options: Transaction[];
};

export const TransactionsTable = ({ options }: Props) => {
  return (
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
            }).format(amountMinor / 100);

            return (
              <TableRow key={id}>
                <DateCell>
                  <time dateTime={date}>{formattedDate}</time>
                </DateCell>

                <TransactionCell scope="row">
                  <Typography variant="subtitle" as="span">
                    {title}
                  </Typography>
                  <TypeLabel variant="caption" as="span" $danger={expenseType}>
                    {type}
                  </TypeLabel>
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
  );
};
