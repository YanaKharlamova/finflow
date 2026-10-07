import { useState } from "react";
import {
  DateFilter,
  Root,
} from "src/pages/transactions/TransactionsFilters.styled";
import { Select } from "src/shared/ui/ui-kit/Select";
import {
  ALL_FILTER_VALUE,
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_SORT_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "src/pages/transactions/constants";
import { SELECT_VARIANTS } from "src/shared/ui/ui-kit/Select.styled";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import { BREAKPOINTS } from "src/shared/styles/breakpoints";
import type {
  TransactionFilterData,
  TransactionFilterUpdate,
} from "src/shared/types/transaction";
import { formatLocalDate } from "src/shared/helpers/formatLocalDate";
import { isValidTransactionDate } from "src/shared/helpers/isValidTransactionDate";
import { DateInput } from "src/shared/ui/ui-kit/DateInput";

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

  const [dateDraft, setDateDraft] = useState(date);
  const [previousDate, setPreviousDate] = useState(date);

  if (date !== previousDate) {
    setPreviousDate(date);
    setDateDraft(date);
  }

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

  const getDateError = (value: string) => {
    if (!value) {
      return "";
    }

    if (!isValidTransactionDate(value)) {
      return "Enter a valid date";
    }

    return value > todayStr ? "Date cannot be in the future" : "";
  };

  const dateError = getDateError(dateDraft);

  const handleDateChange = (nextDate: string) => {
    setDateDraft(nextDate);

    if (!getDateError(nextDate)) {
      onFilterChange({ date: nextDate });
    }
  };

  return (
    <Root>
      <Select
        ariaLabel="Filter by transaction type"
        options={typeOptions}
        value={transactionType}
        onValueChange={(transactionType) => onFilterChange({ transactionType })}
        variant={SELECT_VARIANTS.field}
      />

      <Select
        ariaLabel="Filter by category"
        options={categoryOptions}
        value={category}
        onValueChange={(category) => onFilterChange({ category })}
        variant={SELECT_VARIANTS.field}
      />

      <DateFilter>
        <DateInput
          id="transactions-filter-date"
          ariaLabel="Filter by date"
          value={dateDraft}
          error={dateError}
          onValueChange={handleDateChange}
        />
      </DateFilter>

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
