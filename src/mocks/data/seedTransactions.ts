import type { Transaction } from "src/shared/types/transaction";
import { formatLocalDate } from "src/shared/helpers/formatLocalDate";

const today = new Date();

const getDateDaysAgo = (days: number): string => {
  const date = new Date(today);
  date.setDate(date.getDate() - days);

  return formatLocalDate(date);
};

export const SEED_TRANSACTIONS: Transaction[] = [
  {
    id: "transaction-1",
    title: "Monthly salary",
    date: getDateDaysAgo(0),
    type: "income",
    category: "salary",
    amountMinor: 425000,
    currency: "USD",
  },
  {
    id: "transaction-2",
    title: "Grocery shopping",
    date: getDateDaysAgo(1),
    type: "expense",
    category: "food",
    amountMinor: 8645,
    currency: "USD",
  },
  {
    id: "transaction-3",
    title: "Apartment rent",
    date: getDateDaysAgo(5),
    type: "expense",
    category: "housing",
    amountMinor: 120000,
    currency: "USD",
  },
  {
    id: "transaction-4",
    title: "Website project",
    date: getDateDaysAgo(7),
    type: "income",
    category: "freelance",
    amountMinor: 98000,
    currency: "USD",
  },
  {
    id: "transaction-5",
    title: "Monthly transport pass",
    date: getDateDaysAgo(10),
    type: "expense",
    category: "transport",
    amountMinor: 4500,
    currency: "USD",
  },
  {
    id: "transaction-6",
    title: "Electricity bill",
    date: getDateDaysAgo(13),
    type: "expense",
    category: "other-expense",
    amountMinor: 3275,
    currency: "USD",
  },
  {
    id: "transaction-7",
    title: "Dinner with friends",
    date: getDateDaysAgo(16),
    type: "expense",
    category: "food",
    amountMinor: 7250,
    currency: "USD",
  },
  {
    id: "transaction-8",
    title: "Performance bonus",
    date: getDateDaysAgo(20),
    type: "income",
    category: "other-income",
    amountMinor: 50000,
    currency: "USD",
  },
  {
    id: "transaction-9",
    title: "Taxi ride",
    date: getDateDaysAgo(22),
    type: "expense",
    category: "transport",
    amountMinor: 1890,
    currency: "USD",
  },
  {
    id: "transaction-10",
    title: "Home insurance",
    date: getDateDaysAgo(24),
    type: "expense",
    category: "housing",
    amountMinor: 15400,
    currency: "USD",
  },
  {
    id: "transaction-11",
    title: "Consulting session",
    date: getDateDaysAgo(28),
    type: "income",
    category: "freelance",
    amountMinor: 35000,
    currency: "USD",
  },
  {
    id: "transaction-12",
    title: "Online subscription",
    date: getDateDaysAgo(31),
    type: "expense",
    category: "other-expense",
    amountMinor: 1299,
    currency: "USD",
  },
];
