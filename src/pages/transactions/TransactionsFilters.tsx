import { Root } from "src/pages/transactions/TransactionsFilters.styled";
import { Select } from "src/shared/ui/ui-kit/Select";
import {
  ALL_FILTER_VALUE,
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_SORT_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "src/pages/transactions/constants";
import { type ChangeEvent, useState } from "react";
import { Input } from "src/shared/ui/ui-kit/Input";
import { SELECT_VARIANTS } from "src/shared/ui/ui-kit/Select.styled";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import {
  type TransactionSort,
  type TransactionCategoryFilter,
  type TransactionTypeFilter,
} from "src/pages/transactions/types";

export const TransactionsFilters = () => {
  const mobile = useMediaQuery(`(width < ${BREAKPOINTS.mobileLg}px)`);

  const [transactionType, setTransactionType] =
    useState<TransactionTypeFilter>(ALL_FILTER_VALUE);
  const [category, setCategory] =
    useState<TransactionCategoryFilter>(ALL_FILTER_VALUE);
  const [date, setDate] = useState("");
  const [sort, setSort] = useState<TransactionSort>("newest");

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

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

  const todayStr = new Intl.DateTimeFormat("fr-CA").format(new Date());

  const dateError =
    date && date > todayStr ? "Date cannot be in the future" : "";

  return (
    <Root>
      <Select
        ariaLabel="Filter by transaction type"
        options={typeOptions}
        value={transactionType}
        onValueChange={setTransactionType}
        variant={SELECT_VARIANTS.field}
      />

      <Select
        ariaLabel="Filter by category"
        options={categoryOptions}
        value={category}
        onValueChange={setCategory}
        variant={SELECT_VARIANTS.field}
      />

      <Input
        type="date"
        id="transactions-filter-date"
        aria-label="Filter by date"
        max={todayStr}
        value={date}
        error={dateError}
        onChange={handleDateChange}
      />

      <Select
        ariaLabel="Sort transactions"
        options={sortOptions}
        value={sort}
        onValueChange={setSort}
        variant={SELECT_VARIANTS.field}
      />
    </Root>
  );
};
