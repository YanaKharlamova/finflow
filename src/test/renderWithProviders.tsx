import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { createAppStore } from "src/app/store";
import { theme } from "src/shared/styles/theme";

export const renderWithProviders = (
  ui: ReactElement,
  { route = "/" }: { route?: string } = {},
) => {
  const store = createAppStore();

  return {
    store,
    ...render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
        </ThemeProvider>
      </Provider>,
    ),
  };
};
