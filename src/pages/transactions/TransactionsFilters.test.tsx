import { useState } from "react";
import { expect, test, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TransactionsFilters } from "src/pages/transactions/TransactionsFilters";
import type { TransactionFilterData } from "src/shared/types/transaction";
import { renderWithProviders } from "src/test/renderWithProviders";

const filterData: TransactionFilterData = {
  transactionType: "all",
  category: "all",
  date: "",
  sort: "newest",
  search: "",
};

test("updates the date filter when the date is edited", () => {
  const onFilterChange = vi.fn();

  renderWithProviders(
    <TransactionsFilters
      filterData={filterData}
      onFilterChange={onFilterChange}
    />,
  );

  fireEvent.change(screen.getByLabelText(/filter by date/i), {
    target: { value: "2024-01-31" },
  });

  expect(onFilterChange).toHaveBeenCalledWith({ date: "2024-01-31" });
});

test.each(["2024-01", "2024-02-31", "0202-10-06"])(
  "does not apply invalid date draft %s",
  (dateDraft) => {
    const onFilterChange = vi.fn();

    renderWithProviders(
      <TransactionsFilters
        filterData={filterData}
        onFilterChange={onFilterChange}
      />,
    );

    const dateInput = screen.getByLabelText(/filter by date/i);

    fireEvent.change(dateInput, { target: { value: dateDraft } });

    expect(dateInput).toHaveValue(dateDraft);
    expect(dateInput).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Enter a valid date")).toBeInTheDocument();
    expect(onFilterChange).not.toHaveBeenCalled();
  },
);

test("clears an applied date filter", () => {
  const onFilterChange = vi.fn();

  renderWithProviders(
    <TransactionsFilters
      filterData={{ ...filterData, date: "2024-01-31" }}
      onFilterChange={onFilterChange}
    />,
  );

  const dateInput = screen.getByLabelText(/filter by date/i);

  fireEvent.change(dateInput, { target: { value: "" } });

  expect(dateInput).toHaveValue("");
  expect(dateInput).toHaveAttribute("aria-invalid", "false");
  expect(onFilterChange).toHaveBeenCalledWith({ date: "" });
});

test("syncs the date draft when the applied filter changes externally", async () => {
  const user = userEvent.setup();

  const FiltersHarness = () => {
    const [currentFilterData, setCurrentFilterData] = useState({
      ...filterData,
      date: "2024-01-31",
    });

    return (
      <>
        <button
          type="button"
          onClick={() =>
            setCurrentFilterData((current) => ({ ...current, date: "" }))
          }
        >
          Clear date externally
        </button>
        <TransactionsFilters
          filterData={currentFilterData}
          onFilterChange={vi.fn()}
        />
      </>
    );
  };

  renderWithProviders(<FiltersHarness />);

  expect(screen.getByLabelText(/filter by date/i)).toHaveValue("2024-01-31");

  await user.click(
    screen.getByRole("button", { name: /clear date externally/i }),
  );

  expect(screen.getByLabelText(/filter by date/i)).toHaveValue("");
});
