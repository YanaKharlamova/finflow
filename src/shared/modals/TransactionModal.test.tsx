import { expect, test, vi } from "vitest";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Routes, Route } from "react-router-dom";

import { AppLayout } from "src/shared/layout/AppLayout";
import { TransactionsPage } from "src/pages/transactions/TransactionsPage";
import { renderWithProviders } from "src/test/renderWithProviders";
import { http, HttpResponse } from "msw";
import { server } from "src/test/server";

const requiredFieldCases = [
  ["title", "Title is required!"],
  ["amount", "Amount is required"],
  ["category", "Category is required!"],
  ["date", "Date is required!"],
] as const;

const setupTransactionModal = async () => {
  const user = userEvent.setup();

  renderWithProviders(
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/transactions" element={<TransactionsPage />} />
      </Route>
    </Routes>,
    { route: "/transactions" },
  );

  await user.click(screen.getByRole("button", { name: /add transaction/i }));

  const dialog = await screen.findByRole("dialog", {
    name: /add transaction/i,
  });

  return { user, dialog, form: within(dialog) };
};

const mockSuccessfulPostTransaction = () => {
  const postRequest = vi.fn();

  server.use(
    http.post("/api/transactions", () => {
      postRequest();

      return HttpResponse.json(
        {
          id: "test-transaction",
          title: "Grocery shopping",
          date: "2026-09-24",
          type: "expense",
          category: "food",
          amountMinor: 2550,
          currency: "USD",
        },
        { status: 201 },
      );
    }),
  );

  return postRequest;
};

const mockFailedPostTransaction = () => {
  const postRequest = vi.fn();

  server.use(
    http.post("/api/transactions", () => {
      postRequest();

      return HttpResponse.json(
        { error: "Failed to create transaction" },
        { status: 500 },
      );
    }),
  );

  return postRequest;
};

test("opens the add transaction modal", async () => {
  const { dialog } = await setupTransactionModal();

  expect(dialog).toBeInTheDocument();
});

test("does not submit when required fields are empty", async () => {
  const postRequest = mockSuccessfulPostTransaction();
  const { user, form } = await setupTransactionModal();

  await user.click(form.getByRole("button", { name: /^add transaction$/i }));

  expect(await form.findByText("Title is required!")).toBeInTheDocument();
  expect(form.getByText("Amount is required")).toBeInTheDocument();
  expect(form.getByText("Category is required!")).toBeInTheDocument();

  expect(postRequest).not.toHaveBeenCalled();
});

test.each(requiredFieldCases)(
  "does not submit without %s",
  async (missingField, expectedError) => {
    const postRequest = mockSuccessfulPostTransaction();
    const { user, form } = await setupTransactionModal();

    if (missingField !== "title") {
      await user.type(form.getByLabelText(/^title$/i), "Grocery shopping");
    }

    if (missingField !== "amount") {
      await user.type(form.getByLabelText(/^amount$/i), "25.50");
    }

    if (missingField !== "category") {
      await user.click(form.getByLabelText(/^category$/i));
      await user.click(await screen.findByRole("option", { name: /^food$/i }));
    }

    if (missingField === "date") {
      await user.clear(form.getByLabelText(/^date$/i));
    }

    await user.click(form.getByRole("button", { name: /^add transaction$/i }));

    expect(await form.findByText(expectedError)).toBeInTheDocument();
    expect(postRequest).not.toHaveBeenCalled();
  },
);

test("keeps entered data and allows retry after a failed request", async () => {
  const postRequest = mockFailedPostTransaction();
  const { user, dialog, form } = await setupTransactionModal();

  const titleInput = form.getByLabelText(/^title$/i);
  const amountInput = form.getByLabelText(/^amount$/i);
  const categorySelect = form.getByLabelText(/^category$/i);
  const submitButton = form.getByRole("button", {
    name: /^add transaction$/i,
  });

  await user.type(titleInput, "Grocery shopping");
  await user.type(amountInput, "25.50");
  await user.click(categorySelect);
  await user.click(await screen.findByRole("option", { name: /^food$/i }));
  await user.click(submitButton);

  expect(
    await form.findByText("Something went wrong! Please try again."),
  ).toBeInTheDocument();
  expect(dialog).toBeInTheDocument();
  expect(titleInput).toHaveValue("Grocery shopping");
  expect(amountInput).toHaveValue(25.5);
  expect(categorySelect).toHaveTextContent("Food");
  expect(submitButton).toBeEnabled();
  expect(postRequest).toHaveBeenCalledTimes(1);

  await user.click(submitButton);

  await waitFor(() => {
    expect(postRequest).toHaveBeenCalledTimes(2);
  });
});

test("creates a transaction and displays it in the table", async () => {
  const { user, form } = await setupTransactionModal();

  await user.type(form.getByLabelText(/^title$/i), "Grocery shopping");

  await user.type(form.getByLabelText(/^amount$/i), "25.50");

  await user.click(form.getByLabelText(/^category$/i));
  await user.click(await screen.findByRole("option", { name: /^food$/i }));

  await user.click(form.getByRole("button", { name: /^add transaction$/i }));

  const transactionRow = await screen.findByRole("row", {
    name: /grocery shopping/i,
  });

  expect(within(transactionRow).getByText("25.50 USD")).toBeInTheDocument();
});
