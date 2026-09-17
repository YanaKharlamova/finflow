import { delay, http, HttpResponse } from "msw";
import { DEFAULT_PERIOD, PERIOD_OPTIONS } from "src/pages/overview/constants";
import { calculateSummary } from "src/mocks/data/handlers/helpers/calculateSummary";
import { transactions } from "src/mocks/data/handlers/constants";
import { filterTransactionsByPeriod } from "src/mocks/data/handlers/helpers/filterTransactionsByPeriod";
import { calculateCashFlow } from "src/mocks/data/handlers/helpers/calculateCashFlow";
import { calculateExpensesByCategory } from "src/mocks/data/handlers/helpers/calculateExpensesByCategory";
import type { OverviewData } from "src/pages/overview/types";

export const overviewHandlers = [
  http.get("/api/overview", async ({ request }) => {
    await delay(600);

    const url = new URL(request.url);
    const periodParam = url.searchParams.get("period");
    const period =
      PERIOD_OPTIONS.find(({ value }) => value === periodParam)?.value ??
      DEFAULT_PERIOD;

    const periodTransactions = filterTransactionsByPeriod(transactions, period);

    const response = {
      summary: calculateSummary({ transactions, periodTransactions }),
      cashFlow: calculateCashFlow({ transactions, period }),
      expensesByCategory: calculateExpensesByCategory({
        transactions,
        period,
      }),
    } satisfies OverviewData;

    return HttpResponse.json(response);
  }),
];
