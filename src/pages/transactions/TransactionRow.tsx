import { Popover } from "radix-ui";
import { useDeleteTransactionMutation } from "src/api/transactionsApi";
import { convertMinorToMajorUnits } from "src/shared/helpers/convertMinorToMajorUnits";
import { parseLocalDate } from "src/shared/helpers/parseLocalDate";
import { DemoDataPopoverContent as PopoverContent } from "src/shared/layout/PageHeader.styled";
import { TRANSACTION_TYPES } from "src/shared/modals/constants";
import type { Transaction } from "src/shared/types/transaction";
import { InfoIcon } from "src/shared/ui/icons/InfoIcon";
import { Button } from "src/shared/ui/ui-kit/Button";
import { Flex } from "src/shared/ui/ui-kit/Flex";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import {
  ActionsCell,
  AmountCell,
  CategoryCell,
  CategoryLabel,
  DateCell,
  DeleteErrorTrigger,
  TableRow,
  TransactionCell,
  TypeBadge,
} from "src/pages/transactions/TransactionsTable.styled";

type Props = {
  transaction: Transaction;
};

export const TransactionRow = ({ transaction }: Props) => {
  const { id, date, title, category, amountMinor, type, currency } =
    transaction;
  const [deleteTransaction, { isLoading, isError, isSuccess }] =
    useDeleteTransactionMutation();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parseLocalDate(date));

  const categoryFormatted = category.split("-").join(" ");
  const expenseType = type === TRANSACTION_TYPES.expense;
  const deleteDisabled = isLoading || isSuccess;

  const amountFormatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertMinorToMajorUnits(amountMinor));

  return (
    <TableRow>
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
        <Flex align="center" gap="xs" aria-live="polite">
          <Popover.Root>
            <DeleteErrorTrigger
              type="button"
              disabled={!isError}
              aria-hidden={!isError}
              aria-label={`Delete error details for ${title}`}
              aria-invalid={isError || undefined}
            >
              <InfoIcon width="16" height="16" />
            </DeleteErrorTrigger>

            {isError ? (
              <Popover.Portal>
                <PopoverContent
                  side="bottom"
                  align="end"
                  sideOffset={8}
                  collisionPadding={8}
                >
                  <Typography as="span" variant="caption" color="danger">
                    Couldn’t delete. Try again.
                  </Typography>
                </PopoverContent>
              </Popover.Portal>
            ) : null}
          </Popover.Root>

          <Button
            size="compact"
            disabled={deleteDisabled}
            variant="danger"
            aria-label={`Delete ${title}`}
            aria-busy={isLoading}
            onClick={() => deleteTransaction(id)}
          >
            Delete
          </Button>
        </Flex>
      </ActionsCell>
    </TableRow>
  );
};
