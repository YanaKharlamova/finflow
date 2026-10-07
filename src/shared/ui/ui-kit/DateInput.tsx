import { type ChangeEvent, useState } from "react";
import { DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css";
import { Popover } from "radix-ui";
import { formatLocalDate } from "src/shared/helpers/formatLocalDate";
import { parseLocalDate } from "src/shared/helpers/parseLocalDate";
import {
  isValidTransactionDate,
  MIN_TRANSACTION_DATE,
} from "src/shared/helpers/isValidTransactionDate";
import { CalendarIcon } from "src/shared/ui/icons/CalendarIcon";
import { ErrorMessage } from "src/shared/ui/ui-kit/FormControl.styled";
import {
  CalendarClearButton,
  CalendarContent,
  DateInputControl,
  DateInputRoot,
  DatePickerButton,
  DateTextInput,
} from "src/shared/ui/ui-kit/DateInput.styled";

const PICKER_LABEL = "Choose date from calendar";

const formatAsISODateInput = (value: string) => {
  // Format numeric input as YYYY-MM-DD for mobile keyboards.
  const digits = value.replace(/\D/g, "").slice(0, 8);

  return [digits.slice(0, 4), digits.slice(4, 6), digits.slice(6)]
    .filter(Boolean)
    .join("-");
};

const MIN_DATE = parseLocalDate(MIN_TRANSACTION_DATE);

type Props = {
  id: string;
  value: string;
  onValueChange: (value: string) => void;
  ariaLabel?: string;
  error?: string;
  reserveErrorSpace?: boolean;
  required?: boolean;
};

export const DateInput = ({
  value,
  onValueChange,
  ariaLabel,
  error,
  reserveErrorSpace,
  id,
  required,
}: Props) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const errorId = `${id}-error`;

  const today = new Date();
  const maxDate = formatLocalDate(today);
  const selectedDate =
    isValidTransactionDate(value) && value <= maxDate
      ? parseLocalDate(value)
      : undefined;

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) =>
    onValueChange(formatAsISODateInput(event.currentTarget.value));

  const handleSelectDate = (date: Date | undefined) => {
    if (date) {
      onValueChange(formatLocalDate(date));
      setPickerOpen(false);
    }
  };

  const handleClearDate = () => {
    onValueChange("");
    setPickerOpen(false);
  };

  return (
    <DateInputRoot>
      <DateInputControl>
        <DateTextInput
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          maxLength={10}
          placeholder="YYYY-MM-DD"
          value={value}
          required={required}
          aria-label={ariaLabel}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={handleTextChange}
        />

        <Popover.Root open={pickerOpen} onOpenChange={setPickerOpen}>
          <Popover.Trigger asChild>
            <DatePickerButton
              as="button"
              type="button"
              aria-label={PICKER_LABEL}
            >
              <CalendarIcon width="20" height="20" />
            </DatePickerButton>
          </Popover.Trigger>

          <Popover.Portal>
            <CalendarContent align="end" sideOffset={4} collisionPadding={8}>
              <DayPicker
                mode="single"
                selected={selectedDate}
                defaultMonth={selectedDate}
                startMonth={MIN_DATE}
                endMonth={today}
                disabled={{ before: MIN_DATE, after: today }}
                onSelect={handleSelectDate}
              />

              <CalendarClearButton
                size="compact"
                variant="secondary"
                onClick={handleClearDate}
              >
                Clear
              </CalendarClearButton>
            </CalendarContent>
          </Popover.Portal>
        </Popover.Root>
      </DateInputControl>

      {error || reserveErrorSpace ? (
        <ErrorMessage id={errorId} role="alert">
          {error}
        </ErrorMessage>
      ) : null}
    </DateInputRoot>
  );
};
