const localDateFormatter = new Intl.DateTimeFormat("fr-CA");

export const formatLocalDate = (date: Date): string =>
  localDateFormatter.format(date);
