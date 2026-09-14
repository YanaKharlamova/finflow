import { http, HttpResponse } from "msw";

import { SEED_TRANSACTIONS } from "src/mocks/data/seedTransactions";
import type {
  Transaction,
  TransactionsResponse,
} from "src/shared/types/transaction";
import {
  ALL_FILTER_VALUE,
  DEFAULT_PAGE_SIZE,
} from "src/pages/transactions/constants";

const FIRST_PAGE = 1;

type Options = {
  search: string;
  type: string;
  category: string;
  date: string;
};

const parsePositiveInteger = (
  value: string | null,
  fallback: number,
): number => {
  const parsedValue = Number(value);

  return Number.isInteger(parsedValue) && parsedValue > 0
    ? parsedValue
    : fallback;
};

const filterTransactions = ({
  search,
  type: typeFilter,
  category: categoryFilter,
  date: dateFilter,
}: Options): Transaction[] =>
  SEED_TRANSACTIONS.filter(
    ({
      title,
      type: transactionType,
      category: transactionCategory,
      date: transactionDate,
    }) =>
      title.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter === ALL_FILTER_VALUE || transactionType === typeFilter) &&
      (categoryFilter === ALL_FILTER_VALUE ||
        transactionCategory === categoryFilter) &&
      (!dateFilter || transactionDate === dateFilter),
  );

export const transactionsHandlers = [
  http.get("/api/transactions", ({ request }) => {
    const url = new URL(request.url);

    const page = parsePositiveInteger(url.searchParams.get("page"), FIRST_PAGE);
    const limit = parsePositiveInteger(
      url.searchParams.get("limit"),
      DEFAULT_PAGE_SIZE,
    );

    const search = url.searchParams.get("search")?.trim() || "";
    const type = url.searchParams.get("type") || ALL_FILTER_VALUE;
    const category = url.searchParams.get("category") || ALL_FILTER_VALUE;
    const date = url.searchParams.get("date") || "";
    const sort = url.searchParams.get("sort") || "newest";

    const startElementIndex = (page - FIRST_PAGE) * limit;
    const endElementIndex = startElementIndex + limit;

    const filteredTransactions = filterTransactions({
      search,
      type,
      category,
      date,
    });

    const sortedElements = [...filteredTransactions].sort((a, b) => {
      switch (sort) {
        case "oldest":
          return a.date.localeCompare(b.date);

        case "amount-desc":
          return b.amountMinor - a.amountMinor;

        case "amount-asc":
          return a.amountMinor - b.amountMinor;

        case "newest":
        default:
          return b.date.localeCompare(a.date);
      }
    });

    const response: TransactionsResponse = {
      items: sortedElements.slice(startElementIndex, endElementIndex),
      total: sortedElements.length,
      page,
      limit,
    };

    return HttpResponse.json(response);
  }),
];
