import { expect, test, vi } from "vitest";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, Routes, useLocation } from "react-router-dom";
import { http, HttpResponse } from "msw";

import { transactions } from "src/mocks/data/handlers/constants";
import { TransactionsPage } from "src/pages/transactions/TransactionsPage";
import { AppLayout } from "src/shared/layout/AppLayout";
import { renderWithProviders } from "src/test/renderWithProviders";
import { server } from "src/test/server";

const LocationDisplay = () => {
  const { search } = useLocation();

  return <span data-testid="location-search">{search}</span>;
};

const renderTransactionsPage = () => {
  const user = userEvent.setup();

  renderWithProviders(
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/transactions" element={<TransactionsPage />} />
        </Route>
      </Routes>
      <LocationDisplay />
    </>,
    { route: "/transactions" },
  );

  return user;
};

const addTestTransactions = (count: number) => {
  for (let index = 1; index <= count; index++) {
    transactions.push({
      id: `test-transaction-${index}`,
      title: `Test transaction ${index}`,
      date: "2024-01-01",
      type: "expense",
      category: "food",
      amountMinor: 100,
      currency: "USD",
    });
  }
};

test("deletes a transaction and displays the empty state", async () => {
  transactions.push({
    id: "test-transaction",
    title: "Grocery shopping",
    date: "2024-01-01",
    type: "expense",
    category: "food",
    amountMinor: 2550,
    currency: "USD",
  });

  const user = renderTransactionsPage();

  const transactionRow = await screen.findByRole("row", {
    name: /grocery shopping/i,
  });
  const deleteButton = within(transactionRow).getByRole("button", {
    name: /delete grocery shopping/i,
  });

  await user.click(deleteButton);

  await waitFor(() => {
    expect(
      screen.queryByRole("row", { name: /grocery shopping/i }),
    ).not.toBeInTheDocument();
  });

  expect(await screen.findByText("No transactions yet")).toBeInTheDocument();
});

test("shows a row error when deleting a transaction fails and allows retrying", async () => {
  transactions.push({
    id: "test-transaction",
    title: "Grocery shopping",
    date: "2024-01-01",
    type: "expense",
    category: "food",
    amountMinor: 2550,
    currency: "USD",
  });

  const deleteRequest = vi.fn();

  server.use(
    http.delete("/api/transactions/:id", ({ params }) => {
      deleteRequest(params.id);

      return HttpResponse.json(
        { error: "Failed to delete transaction" },
        { status: 500 },
      );
    }),
  );

  const user = renderTransactionsPage();
  const transactionRow = await screen.findByRole("row", {
    name: /grocery shopping/i,
  });
  const deleteButton = within(transactionRow).getByRole("button", {
    name: /delete grocery shopping/i,
  });

  await user.click(deleteButton);

  const errorDetailsButton = await within(transactionRow).findByRole("button", {
    name: /delete error details for grocery shopping/i,
  });
  expect(deleteButton).toBeEnabled();

  await user.click(errorDetailsButton);

  expect(await screen.findByText("Couldn’t delete. Try again.")).toBeVisible();

  await user.click(deleteButton);

  await waitFor(() => {
    expect(deleteRequest).toHaveBeenCalledTimes(2);
  });
});

test("searches transactions across all pages", async () => {
  addTestTransactions(11);

  const eleventhTransaction = transactions[10];
  const user = renderTransactionsPage();

  await user.type(screen.getByRole("searchbox"), eleventhTransaction.title);

  expect(
    await screen.findByText(eleventhTransaction.title),
  ).toBeInTheDocument();
});

test("navigates to the next page and updates the URL", async () => {
  addTestTransactions(11);

  const user = renderTransactionsPage();

  await screen.findByText("Test transaction 1");
  await user.click(screen.getByRole("button", { name: /next/i }));

  await waitFor(() => {
    expect(screen.getByTestId("location-search")).toHaveTextContent("?page=2");
  });

  expect(await screen.findByText("Test transaction 11")).toBeInTheDocument();
});

test("displays an error state and retries loading transactions", async () => {
  server.use(
    http.get("/api/transactions", () =>
      HttpResponse.json(
        { error: "Failed to load transactions" },
        { status: 500 },
      ),
    ),
  );

  const user = renderTransactionsPage();

  expect(
    await screen.findByText("Couldn’t load transactions"),
  ).toBeInTheDocument();

  const retryButton = screen.getByRole("button", { name: /try again/i });

  server.resetHandlers();
  await user.click(retryButton);

  expect(await screen.findByText("No transactions yet")).toBeInTheDocument();
});

test("adds demo data and displays it in the transactions table", async () => {
  const user = renderTransactionsPage();

  const addDemoDataButton = screen.getByRole("button", {
    name: /add demo data/i,
  });

  await waitFor(() => {
    expect(addDemoDataButton).toBeEnabled();
  });

  await user.click(addDemoDataButton);

  await waitFor(() => {
    expect(addDemoDataButton).toBeDisabled();
  });

  expect(
    await screen.findByRole("row", { name: /monthly salary/i }),
  ).toBeInTheDocument();
});
