import {
  Root,
  SearchField,
  TransactionSearch,
} from "src/pages/transactions/TransactionFiltersBlock.styled";
import { SearchIcon } from "src/shared/ui/icons/SearchIcon";
import { TransactionsFilters } from "src/pages/transactions/TransactionsFilters";

export const TransactionFiltersBlock = () => {
  return (
    <Root>
      <SearchField>
        <SearchIcon />

        <TransactionSearch
          type={"search"}
          placeholder={"Search transactions by title..."}
        />
      </SearchField>

      <TransactionsFilters />
    </Root>
  );
};
