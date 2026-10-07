import { expect, test, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, Routes, useLocation } from "react-router-dom";
import { http, HttpResponse } from "msw";

import { OverviewPage } from "src/pages/overview/OverviewPage";
import type { OverviewData } from "src/pages/overview/types";
import { TransactionsPage } from "src/pages/transactions/TransactionsPage";
import { AppLayout } from "src/shared/layout/AppLayout";
import { renderWithProviders } from "src/test/renderWithProviders";
import { server } from "src/test/server";

const overviewData = {
  summary: {
    currency: "USD",
    currentBalanceMinor: 215433,
    incomeMinor: 250000,
    expensesMinor: 34567,
  },
  cashFlow: [
    {
      label: "Today",
      incomeMinor: 250000,
      expensesMinor: 34567,
      netMinor: 215433,
    },
  ],
  expensesByCategory: [{ category: "food", amountMinor: 34567 }],
} satisfies OverviewData;

const LocationDisplay = () => {
  const { search } = useLocation();

  return <span data-testid="location-search">{search}</span>;
};

const renderOverviewPage = () => {
  const user = userEvent.setup();

  renderWithProviders(
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Route>
      </Routes>
      <LocationDisplay />
    </>,
    { route: "/" },
  );

  return user;
};

test("displays data returned by the overview request", async () => {
  server.use(http.get("/api/overview", () => HttpResponse.json(overviewData)));

  renderOverviewPage();

  expect(await screen.findByText("2,154.33 USD")).toBeInTheDocument();
  expect(screen.getByText("2,500.00 USD")).toBeInTheDocument();
  expect(screen.getByText("345.67 USD")).toBeInTheDocument();
  expect(screen.getByText("Food")).toBeInTheDocument();
});

test("updates the URL and request when the period changes", async () => {
  const overviewRequest = vi.fn();

  server.use(
    http.get("/api/overview", ({ request }) => {
      const period = new URL(request.url).searchParams.get("period");

      overviewRequest(period);

      return HttpResponse.json(overviewData);
    }),
  );

  const user = renderOverviewPage();

  await waitFor(() => {
    expect(overviewRequest).toHaveBeenCalledWith("7d");
  });

  await user.click(screen.getByRole("combobox", { name: /analytics period/i }));
  await user.click(
    await screen.findByRole("option", { name: /last 30 days/i }),
  );

  await waitFor(() => {
    expect(screen.getByTestId("location-search")).toHaveTextContent(
      "?period=30d",
    );
    expect(overviewRequest).toHaveBeenCalledWith("30d");
  });
});

test("adds demo data and displays the transactions", async () => {
  const user = renderOverviewPage();

  const addDemoDataButton = screen.getByRole("button", {
    name: /add demo data/i,
  });

  await waitFor(() => {
    expect(addDemoDataButton).toBeEnabled();
  });

  await user.click(addDemoDataButton);

  expect(await screen.findByText("4,457.41 USD")).toBeInTheDocument();

  await waitFor(() => {
    expect(addDemoDataButton).toBeDisabled();
  });

  await user.click(screen.getByRole("link", { name: /transactions/i }));

  expect(
    await screen.findByRole("row", { name: /monthly salary/i }),
  ).toBeInTheDocument();
});
