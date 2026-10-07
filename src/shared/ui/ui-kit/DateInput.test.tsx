import { expect, test, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
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
    pickerInput: screen.getByLabelText(PICKER_LABEL, {
      selector: 'input[type="date"]',
    }) as HTMLInputElement,
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

test("opens the native picker from the calendar button", async () => {
  const user = userEvent.setup();
  const { pickerButton, pickerInput } = setup();
  const showPicker = vi.fn();

  Object.defineProperty(pickerInput, "showPicker", {
    configurable: true,
    value: showPicker,
  });

  await user.click(pickerButton);

  expect(showPicker).toHaveBeenCalledOnce();
  expect(pickerInput).toHaveFocus();
});

test("falls back to clicking the native input when showPicker throws", async () => {
  const user = userEvent.setup();
  const { pickerButton, pickerInput } = setup();
  const pickerClick = vi.spyOn(pickerInput, "click").mockImplementation(() => {});

  Object.defineProperty(pickerInput, "showPicker", {
    configurable: true,
    value: vi.fn(() => {
      throw new Error("showPicker is unavailable");
    }),
  });

  await user.click(pickerButton);

  expect(pickerClick).toHaveBeenCalledOnce();
});

test("commits a picked date and restores button focus on the next frame", () => {
  const { onValueChange, pickerButton, pickerInput } = setup();
  const frameCallbacks: FrameRequestCallback[] = [];
  const originalAnimationFrame = Object.getOwnPropertyDescriptor(
    window,
    "requestAnimationFrame",
  );
  const pickerBlur = vi.spyOn(pickerInput, "blur");
  const buttonFocus = vi.spyOn(pickerButton, "focus");

  Object.defineProperty(window, "requestAnimationFrame", {
    configurable: true,
    value: vi.fn((callback: FrameRequestCallback) => {
      frameCallbacks.push(callback);
      return frameCallbacks.length;
    }),
  });

  try {
    fireEvent.change(pickerInput, {
      target: { value: "2024-01-31" },
    });

    expect(onValueChange).toHaveBeenCalledWith("2024-01-31");
    expect(frameCallbacks).toHaveLength(1);
    expect(pickerBlur).not.toHaveBeenCalled();
    expect(buttonFocus).not.toHaveBeenCalled();

    frameCallbacks[0](0);

    expect(pickerBlur).toHaveBeenCalledOnce();
    expect(buttonFocus).toHaveBeenCalledWith({ preventScroll: true });
  } finally {
    if (originalAnimationFrame) {
      Object.defineProperty(
        window,
        "requestAnimationFrame",
        originalAnimationFrame,
      );
    } else {
      Reflect.deleteProperty(window, "requestAnimationFrame");
    }
  }
});
