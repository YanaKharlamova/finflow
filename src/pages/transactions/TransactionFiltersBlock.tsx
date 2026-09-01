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
} from "src/pages/transactions/types";

type Options = {
  filterData: TransactionFilterData;
  onFilterChange: (data: TransactionFilterUpdate) => void;
};

export const TransactionFiltersBlock = ({
  filterData,
  onFilterChange,
}: Options) => {
  return (
    <Root>
      <SearchField>
        <SearchIcon />

        <TransactionSearch
          type={"search"}
          placeholder={"Search transactions by title..."}
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
