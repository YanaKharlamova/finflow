import { isString } from "src/shared/types/typeguards";

export const MIN_TRANSACTION_DATE = "1900-01-01";

const TRANSACTION_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export const isValidTransactionDate = (value: unknown): value is string => {
  if (!isString(value) || value < MIN_TRANSACTION_DATE) {
    return false;
  }

  const match = TRANSACTION_DATE_PATTERN.exec(value);

  if (!match) {
    return false;
  }

  const [, yearValue, monthValue, dayValue] = match;
  const year = Number(yearValue);
  const month = Number(monthValue);
  const day = Number(dayValue);
  const date = new Date(Date.UTC(year, month - 1, day));

  const dateExists =
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day;

  return dateExists;
};
