import { Root } from "src/pages/transactions/TransactionsFilters.styled";
import { Select } from "src/shared/ui/ui-kit/Select";
import {
  ALL_FILTER_VALUE,
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_SORT_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "src/pages/transactions/constants";
import { Input } from "src/shared/ui/ui-kit/Input";
import { SELECT_VARIANTS } from "src/shared/ui/ui-kit/Select.styled";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import type {
  TransactionFilterData,
  TransactionFilterUpdate,
} from "src/shared/types/transaction";
import { formatLocalDate } from "src/shared/helpers/formatLocalDate";

type Options = {
  filterData: TransactionFilterData;
  onFilterChange: (data: TransactionFilterUpdate) => void;
};

export const TransactionsFilters = ({
  filterData,
  onFilterChange,
}: Options) => {
  const {
    transactionType = ALL_FILTER_VALUE,
    category = ALL_FILTER_VALUE,
    date = "",
    sort = "newest",
  } = filterData;

  const mobile = useMediaQuery(`(width < ${BREAKPOINTS.mobileLg}px)`);

  const typeOptions = TRANSACTION_TYPE_OPTIONS.map((option) => ({
    value: option.value,
    label: mobile ? option.mobileLabel : option.label,
  }));

  const categoryOptions = TRANSACTION_CATEGORY_OPTIONS.map((option) => ({
    value: option.value,
    label:
      mobile && option.value === ALL_FILTER_VALUE ? "Category" : option.label,
  }));

  const sortOptions = TRANSACTION_SORT_OPTIONS.map((option) => ({
    value: option.value,
    label: mobile ? option.mobileLabel : option.label,
  }));

  const todayStr = formatLocalDate(new Date());

  const dateError =
    date && date > todayStr ? "Date cannot be in the future" : "";

  return (
    <Root>
      <Select
        ariaLabel="Filter by transaction type"
        options={typeOptions}
        value={transactionType}
        onValueChange={(transactionType) =>
          onFilterChange({ transactionType })
        }
        variant={SELECT_VARIANTS.field}
      />

      <Select
        ariaLabel="Filter by category"
        options={categoryOptions}
        value={category}
        onValueChange={(category) => onFilterChange({ category })}
        variant={SELECT_VARIANTS.field}
      />

      <Input
        type="date"
        id="transactions-filter-date"
        aria-label="Filter by date"
        max={todayStr}
        value={date}
        error={dateError}
        onChange={(event) => onFilterChange({ date: event.target.value })}
      />

      <Select
        ariaLabel="Sort transactions"
        options={sortOptions}
        value={sort}
        onValueChange={(sort) => onFilterChange({ sort })}
        variant={SELECT_VARIANTS.field}
      />
    </Root>
  );
};
