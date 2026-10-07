export const parseLocalDate = (value: string): Date =>
  new Date(`${value}T00:00:00`);
