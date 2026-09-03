export const PERIOD_OPTIONS = [
  {
    value: "7d",
    desktopLabel: "Last 7 days",
    mobileLabel: "Last 7d",
  },
  {
    value: "30d",
    desktopLabel: "Last 30 days",
    mobileLabel: "Last 30d",
  },
  {
    value: "3m",
    desktopLabel: "Last 3 months",
    mobileLabel: "Last 3mo",
  },
  {
    value: "this-year",
    desktopLabel: "This year",
    mobileLabel: "This year",
  },
] as const;

export const EXPENSE_CATEGORY_COLORS = {
  housing: "#4C76BD",
  food: "#E97866",
  transport: "#D7A13F",
  "other-expense": "#7A8799",
};

export const EXPENSE_CATEGORY_LABELS = {
  housing: "Housing",
  food: "Food",
  transport: "Transport",
  "other-expense": "Other",
};
