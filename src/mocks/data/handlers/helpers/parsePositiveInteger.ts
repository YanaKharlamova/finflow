export const parsePositiveInteger = (
  value: string | null,
  fallback: number,
): number => {
  const parsedValue = Number(value);

  return Number.isInteger(parsedValue) && parsedValue > 0
    ? parsedValue
    : fallback;
};
