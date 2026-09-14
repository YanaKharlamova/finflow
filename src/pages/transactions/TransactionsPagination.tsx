import {
  PageStatus,
  PaginationButton,
  Root,
} from "src/pages/transactions/TransactionsPagination.styled";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import { ChevronLeftIcon } from "src/shared/ui/icons/ChevronLeftIcon";
import { ChevronRightIcon } from "src/shared/ui/icons/ChevronRightIcon";

type Props = {
  currentPage: number;
  pagesAmount: number;
  onPageChange: (page: number) => void;
};

export const TransactionsPagination = ({
  currentPage,
  pagesAmount,
  onPageChange,
}: Props) => {
  const mobile = useMediaQuery(`(width < ${BREAKPOINTS.mobileLg}px)`);

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= pagesAmount;

  return (
    <Root aria-label="Transactions pagination">
      <PaginationButton
        aria-label="Previous page"
        disabled={prevDisabled}
        variant="secondary"
        onClick={() => onPageChange(currentPage - 1)}
      >
        {mobile ? <ChevronLeftIcon /> : "Previous"}
      </PaginationButton>

      <PageStatus variant="bodyText">
        Page {currentPage} of {pagesAmount}
      </PageStatus>

      <PaginationButton
        aria-label="Next page"
        disabled={nextDisabled}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {mobile ? <ChevronRightIcon /> : "Next"}
      </PaginationButton>
    </Root>
  );
};
