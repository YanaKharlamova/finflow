import { type ChangeEvent, useRef } from "react";
import { formatLocalDate } from "src/shared/helpers/formatLocalDate";
import {
  isValidTransactionDate,
  MIN_TRANSACTION_DATE,
} from "src/shared/helpers/isValidTransactionDate";
import { CalendarIcon } from "src/shared/ui/icons/CalendarIcon";
import { ErrorMessage } from "src/shared/ui/ui-kit/FormControl.styled";
import {
  DateInputControl,
  DateInputRoot,
  DatePickerButton,
  DateTextInput,
  NativeDateInput,
} from "src/shared/ui/ui-kit/DateInput.styled";

const PICKER_LABEL = "Choose date from calendar";

const formatAsISODate = (value: string): string => {
  // Format numeric input as YYYY-MM-DD for mobile keyboards.
  const digits = value.replace(/\D/g, "").slice(0, 8);

  return [digits.slice(0, 4), digits.slice(4, 6), digits.slice(6)]
    .filter(Boolean)
    .join("-");
};

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
  const pickerRef = useRef<HTMLInputElement>(null);
  const pickerButtonRef = useRef<HTMLButtonElement>(null);
  const errorId = `${id}-error`;

  const pickerValue = isValidTransactionDate(value) ? value : "";
  const maxDate = formatLocalDate(new Date());

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) =>
    onValueChange(formatAsISODate(event.currentTarget.value));

  const handleOpenPicker = () => {
    const picker = pickerRef.current;

    if (!picker) {
      return;
    }

    picker.focus({ preventScroll: true });

    // Fallback: use showPicker() for modern browsers, click() for older engines.
    try {
      picker.showPicker();
    } catch {
      picker.click();
    }
  };

  const handlePickerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const picker = event.currentTarget;

    onValueChange(picker.value);

    // Cross-browser fix: allows Safari to close the picker and restores keyboard focus
    window.requestAnimationFrame(() => {
      picker.blur();
      pickerButtonRef.current?.focus({ preventScroll: true });
    });
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

        <DatePickerButton
          as="button"
          ref={pickerButtonRef}
          type="button"
          aria-label={PICKER_LABEL}
          onClick={handleOpenPicker}
        >
          <CalendarIcon width="20" height="20" />
        </DatePickerButton>

        <NativeDateInput
          ref={pickerRef}
          type="date"
          tabIndex={-1}
          aria-label={PICKER_LABEL}
          min={MIN_TRANSACTION_DATE}
          max={maxDate}
          value={pickerValue}
          onChange={handlePickerChange}
        />
      </DateInputControl>

      {error || reserveErrorSpace ? (
        <ErrorMessage id={errorId} role="alert">
          {error}
        </ErrorMessage>
      ) : null}
    </DateInputRoot>
  );
};
