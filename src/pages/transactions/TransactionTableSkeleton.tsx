import { DEFAULT_PAGE_SIZE } from "src/pages/transactions/constants";
import { TransactionsTableHeader } from "src/pages/transactions/TransactionsTableHeader";
import {
  ActionsCell,
  AmountCell,
  CategoryLabel,
  CategoryCell,
  DateCell,
  TableBody,
  TableStyled,
  TransactionCell,
  TypeBadge,
} from "src/pages/transactions/TransactionsTable.styled";
import {
  SkeletonTime,
  TransactionSkeletonRow,
} from "src/pages/transactions/TransactionSkeleton.styled";
import { Button } from "src/shared/ui/ui-kit/Button";
import { Flex } from "src/shared/ui/ui-kit/Flex";
import { Typography } from "src/shared/ui/ui-kit/Typography";
import { TransactionsPagination } from "src/pages/transactions/TransactionsPagination";

type Props = {
  onPageChange: (page: number) => void;
};

export const TransactionTableSkeleton = ({ onPageChange }: Props) => (
  <Flex direction="column" gap="xs">
    <TableStyled aria-label="Loading transactions" aria-busy="true">
      <TransactionsTableHeader />

      <TableBody>
        {Array.from({ length: DEFAULT_PAGE_SIZE }, (_, index) => (
          <TransactionSkeletonRow key={index} aria-hidden="true">
            <DateCell>
              <SkeletonTime>Aug 25, 2026</SkeletonTime>
            </DateCell>

            <TransactionCell scope="row">
              <Typography variant="subtitle" as="span" shimmer>
                Transaction title
              </Typography>
              <TypeBadge variant="danger" shimmer>
                expense
              </TypeBadge>
            </TransactionCell>

            <CategoryCell>
              <CategoryLabel>
                <Typography variant="inherit" as="span" shimmer>
                  Category:
                </Typography>
              </CategoryLabel>{" "}
              <Typography variant="inherit" as="span" shimmer>
                other expense
              </Typography>
            </CategoryCell>

            <AmountCell>
              <Typography variant="inherit" as="span" shimmer>
                0,000.00 USD
              </Typography>
            </AmountCell>

            <ActionsCell>
              <Button variant="danger" shimmer>
                Delete
              </Button>
            </ActionsCell>
          </TransactionSkeletonRow>
        ))}
      </TableBody>
    </TableStyled>

    <TransactionsPagination
      currentPage={1}
      pagesAmount={1}
      onPageChange={onPageChange}
      shimmer
    />
  </Flex>
);
