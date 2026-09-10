import { http, HttpResponse } from "msw";

import { SEED_TRANSACTIONS } from "src/mocks/data/seedTransactions";
import type { TransactionsResponse } from "src/shared/types/transaction";

const FIRST_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

const parsePositiveInteger = (
  value: string | null,
  fallback: number,
): number => {
  const parsedValue = Number(value);

  return Number.isInteger(parsedValue) && parsedValue > 0
    ? parsedValue
    : fallback;
};

export const transactionsHandlers = [
  http.get("/api/transactions", ({ request }) => {
    const url = new URL(request.url);

    const page = parsePositiveInteger(url.searchParams.get("page"), FIRST_PAGE);
    const limit = parsePositiveInteger(
      url.searchParams.get("limit"),
      DEFAULT_PAGE_SIZE,
    );

    const startElementIndex = (page - FIRST_PAGE) * limit;
    const endElementIndex = startElementIndex + limit;

    const response: TransactionsResponse = {
      items: SEED_TRANSACTIONS.slice(startElementIndex, endElementIndex),
      total: SEED_TRANSACTIONS.length,
      page,
      limit,
    };

    return HttpResponse.json(response);
  }),
];
