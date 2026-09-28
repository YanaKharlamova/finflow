import {
  Root,
  SearchField,
  TransactionSearch,
} from "src/pages/transactions/TransactionFiltersBlock.styled";
import { SearchIcon } from "src/shared/ui/icons/SearchIcon";
import { TransactionsFilters } from "src/pages/transactions/TransactionsFilters";
import type {
  TransactionFilterData,
  TransactionFilterUpdate,
} from "src/shared/types/transaction";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";

type Options = {
  filterData: TransactionFilterData;
  onFilterChange: (data: TransactionFilterUpdate) => void;
};

export const TransactionFiltersBlock = ({
  filterData,
  onFilterChange,
}: Options) => {
  const mobile = useMediaQuery(`(width < ${BREAKPOINTS.mobileLg}px)`);

  return (
    <Root>
      <SearchField>
        <SearchIcon />

        <TransactionSearch
          value={filterData.search}
          type="search"
          placeholder={
            mobile ? "Search by title" : "Search transactions by title..."
          }
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </SearchField>

      <TransactionsFilters
        filterData={filterData}
        onFilterChange={onFilterChange}
      />
    </Root>
  );
};
