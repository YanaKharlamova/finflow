import { expect, test, vi } from "vitest";
import { fireEvent, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DateInput } from "src/shared/ui/ui-kit/DateInput";
import { renderWithProviders } from "src/test/renderWithProviders";

const PICKER_LABEL = "Choose date from calendar";

const setup = (value = "") => {
  const onValueChange = vi.fn();

  renderWithProviders(
    <DateInput
      id="date"
      ariaLabel="Date"
      value={value}
      onValueChange={onValueChange}
    />,
  );

  return {
    onValueChange,
    textInput: screen.getByRole("textbox", { name: "Date" }),
    pickerButton: screen.getByRole("button", { name: PICKER_LABEL }),
  };
};

test.each([
  ["20241", "2024-1"],
  ["202401", "2024-01"],
  ["20240131", "2024-01-31"],
  ["2024/01/31", "2024-01-31"],
  ["2024013199", "2024-01-31"],
])("formats manual date input %s as %s", (draft, expected) => {
  const { textInput, onValueChange } = setup();

  fireEvent.change(textInput, { target: { value: draft } });

  expect(onValueChange).toHaveBeenCalledWith(expected);
});

test("opens the calendar from the calendar button", async () => {
  const user = userEvent.setup();
  const { pickerButton } = setup();

  await user.click(pickerButton);

  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

test("clears an incomplete date from the calendar", async () => {
  const user = userEvent.setup();
  const { onValueChange, pickerButton } = setup("2026");

  await user.click(pickerButton);
  await user.click(screen.getByRole("button", { name: "Clear" }));

  expect(onValueChange).toHaveBeenCalledWith("");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("commits a selected date and closes the calendar", async () => {
  const user = userEvent.setup();
  const { onValueChange, pickerButton } = setup("2024-01-15");

  await user.click(pickerButton);
  const calendar = screen.getByRole("dialog");
  await user.click(
    within(calendar).getByRole("button", { name: /January 20.*2024/i }),
  );

  expect(onValueChange).toHaveBeenCalledWith("2024-01-20");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
