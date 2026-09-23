import { http, HttpResponse, delay } from "msw";

import type {
  Transaction,
  TransactionsResponse,
} from "src/shared/types/transaction";
import {
  ALL_FILTER_VALUE,
  DEFAULT_PAGE_SIZE,
  TRANSACTION_SORT_OPTIONS,
} from "src/pages/transactions/constants";
import {
  DEFAULT_CURRENCY,
  FIRST_PAGE,
  transactions,
} from "src/mocks/data/handlers/constants";
import { isValidTransaction } from "src/mocks/data/handlers/types";
import { parsePositiveInteger } from "src/mocks/data/handlers/helpers/parsePositiveInteger";
import { sortTransactions } from "src/mocks/data/handlers/helpers/sortTransactions";
import { SEED_TRANSACTIONS } from "src/mocks/data/seedTransactions";

type Options = {
  search: string;
  type: string;
  category: string;
  date: string;
};

const filterTransactions = ({
  search,
  type: typeFilter,
  category: categoryFilter,
  date: dateFilter,
}: Options): Transaction[] => {
  return transactions.filter(
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
};

export const transactionsHandlers = [
  http.post("/api/transactions/demo-data", async () => {
    await delay(600);

    if (transactions.length > 0) {
      return HttpResponse.json(
        { error: "Demo data can only be added to an empty transaction list" },
        { status: 409 },
      );
    }

    transactions.push(
      ...SEED_TRANSACTIONS.map((transaction) => ({ ...transaction })),
    );

    return new HttpResponse(null, { status: 204 });
  }),
  http.get("/api/transactions", async ({ request }) => {
    await delay(600);

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
    const sortParam = url.searchParams.get("sort");
    const sort =
      TRANSACTION_SORT_OPTIONS.find(({ value }) => value === sortParam)
        ?.value ?? "newest";

    const startElementIndex = (page - FIRST_PAGE) * limit;
    const endElementIndex = startElementIndex + limit;

    const filteredTransactions = filterTransactions({
      search,
      type,
      category,
      date,
    });

    const sortedElements = sortTransactions(filteredTransactions, sort);

    const response: TransactionsResponse = {
      items: sortedElements.slice(startElementIndex, endElementIndex),
      total: sortedElements.length,
      page,
      limit,
    };

    return HttpResponse.json(response);
  }),
  http.post("/api/transactions", async ({ request }) => {
    await delay(600);

    const newTransaction = await request.json();

    if (!isValidTransaction(newTransaction)) {
      return HttpResponse.json(
        { error: "Invalid transaction data" },
        { status: 400 },
      );
    }

    const { amount, ...transactionData } = newTransaction;

    const transaction = {
      ...transactionData,
      id: crypto.randomUUID(),
      title: transactionData.title.trim(),
      currency: DEFAULT_CURRENCY,
      amountMinor: Math.round(amount * 100),
    } satisfies Transaction;

    transactions.push(transaction);

    return HttpResponse.json(transaction, { status: 201 });
  }),
  http.delete("/api/transactions/:id", async ({ params }) => {
    await delay(600);

    const { id } = params;

    const elToDeleteIndex = transactions.findIndex((tr) => tr.id === id);

    if (elToDeleteIndex === -1) {
      return HttpResponse.json(
        { error: "Transaction not found" },
        { status: 404 },
      );
    }

    transactions.splice(elToDeleteIndex, 1);

    return new HttpResponse(null, { status: 204 });
  }),
];
